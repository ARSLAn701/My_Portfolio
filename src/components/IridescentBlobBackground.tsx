import React, { useEffect, useRef } from "react";

/* ============================================================
   IRIDESCENT LIQUID BLOB BACKGROUND

   A single glossy, soap-film-like blob that morphs and drifts
   on its own — purely time-driven, no cursor, no source image.
   Meant to sit as one fixed full-viewport layer BEHIND everything
   on the page; whatever content (or none) sits on top is
   irrelevant to the effect itself.

   How the shape/shading works:
   - Domain-warped fbm noise defines a scalar "field". Wherever
     the field crosses a threshold, that's the blob boundary —
     soft-edged via smoothstep, so it always fades rather than
     cuts.
   - The LOCAL GRADIENT of that field (i.e. which way the surface
     is "flowing" at each point) drives a cosine colour palette,
     which is what produces the pearlescent pink/gold/blue sheen
     that ripples along the folds instead of a static gradient.
   - A thin rim band right at the boundary gets an extra
     brightness boost, standing in for the "wet glass" specular
     edge you can see in the reference clip.

   Drop this once near the root of a layout (behind your header,
   hero, everything) — it does not need to live inside any one
   section.
============================================================ */

interface IridescentBlobBackgroundProps {
  /** Extra classes on the <canvas> element. */
  className?: string;
  /** 0–1, how fast the blob drifts/morphs. Default 0.5. */
  speed?: number;
  /** 0–1, overall visibility of the iridescent sheen vs. plain glass. Default 0.6. */
  colorStrength?: number;
  /** Base page colour the blob sits on top of, e.g. "#F1EFF6". */
  backgroundColor?: string;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_speed;
  uniform float u_colorStrength;
  uniform vec3 u_bgColor;

  varying vec2 v_uv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return v;
  }

  /* Soft pastel cosine palette (Inigo Quilez style) — low amplitude
     keeps it "pearlescent" rather than full rainbow-saturated. */
  vec3 pastelPalette(float t) {
    vec3 a = vec3(0.90, 0.90, 0.94);
    vec3 b = vec3(0.14, 0.13, 0.16);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.05, 0.35, 0.65);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = v_uv;
    uv.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.05 * u_speed;

    /* Domain warp: displace the sampling point with its own
       noise field so the blob folds and swirls instead of just
       sliding. */
    vec2 warp = vec2(
      fbm(uv * 1.6 + t),
      fbm(uv * 1.6 - t + 5.2)
    );

    vec2 p = uv + warp * 0.55;

    float field = fbm(p * 1.25 + t * 0.6);

    /* Soft-edged blob mask */
    float threshold = 0.56;
    float edge = 0.05;
    float mask = smoothstep(threshold - edge, threshold + edge, field);

    /* Local gradient of the field -> flow direction -> hue */
    vec2 e = vec2(0.0025, 0.0);
    float fx = fbm((p + e.xy) * 1.25 + t * 0.6) - fbm((p - e.xy) * 1.25 + t * 0.6);
    float fy = fbm((p + e.yx) * 1.25 + t * 0.6) - fbm((p - e.yx) * 1.25 + t * 0.6);
    float angle = atan(fy, fx);

    float hue = fract(angle / 6.28318 + t * 0.8);
    vec3 iridescent = pastelPalette(hue);

    /* Thin bright rim right at the boundary — the "wet glass" edge */
    float distToEdge = abs(field - threshold);
    float rim = 1.0 - clamp(distToEdge / 0.05, 0.0, 1.0);
    rim = pow(rim, 2.5);

    vec3 glassBase = mix(vec3(0.98, 0.975, 0.99), iridescent, u_colorStrength);
    vec3 blobColor = glassBase + rim * 0.45;

    vec3 color = mix(u_bgColor, blobColor, mask);
    color += rim * mask * 0.22;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const IridescentBlobBackground: React.FC<
  IridescentBlobBackgroundProps
> = ({
  className = "",
  speed = 0.5,
  colorStrength = 0.6,
  backgroundColor = "#F1EFF6",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.warn("WebGL unavailable — iridescent blob background skipped.");
      return;
    }

    let destroyed = false;
    let rafId: number | null = null;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const speedLoc = gl.getUniformLocation(program, "u_speed");
    const colorStrengthLoc = gl.getUniformLocation(program, "u_colorStrength");
    const bgColorLoc = gl.getUniformLocation(program, "u_bgColor");

    const hexToRgb01 = (hex: string): [number, number, number] => {
      const clean = hex.replace("#", "");
      const bigint = parseInt(
        clean.length === 3
          ? clean.split("").map((c) => c + c).join("")
          : clean,
        16,
      );
      const r = ((bigint >> 16) & 255) / 255;
      const g = ((bigint >> 8) & 255) / 255;
      const b = (bigint & 255) / 255;
      return [r, g, b];
    };

    const [bgR, bgG, bgB] = hexToRgb01(backgroundColor);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    /* Pause rendering while off-screen to save GPU/battery — this
       layer is meant to sit behind the whole page, so it's easy
       for it to end up scrolled out of view for long stretches. */
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const start = performance.now();

    const render = () => {
      if (destroyed) return;
      rafId = requestAnimationFrame(render);
      if (!isVisible) return;

      const time = (performance.now() - start) / 1000;

      gl.useProgram(program);
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(speedLoc, speed);
      gl.uniform1f(colorStrengthLoc, colorStrength);
      gl.uniform3f(bgColorLoc, bgR, bgG, bgB);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    render();

    return () => {
      destroyed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [speed, colorStrength, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full block pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};

export default IridescentBlobBackground;