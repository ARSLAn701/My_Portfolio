import React, { useEffect, useRef } from "react";

/* ============================================================
   AMBIENT LIQUID GLOW (dark / gold variant)
============================================================ */

interface AmbientLiquidGlowProps {
  className?: string;
  /** 0–1, how fast the blob drifts/morphs on its own. Default 0.5. */
  speed?: number;
  /** 0–1, overall opacity of the whole effect. Default 0.8. */
  opacity?: number;
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
  uniform float u_opacity;

  uniform vec2 u_mouse;
  uniform float u_mouseStrength;

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

  vec3 goldPalette(float t) {
    vec3 a = vec3(0.55, 0.44, 0.24);
    vec3 b = vec3(0.36, 0.30, 0.18);
    vec3 c = vec3(1.0, 0.92, 0.65);
    vec3 d = vec3(0.02, 0.14, 0.42);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = v_uv;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 mouseUv = u_mouse;
    mouseUv.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.05 * u_speed;

    // Zoomed in the warp slightly to reduce chaos
    vec2 warp = vec2(
      fbm(uv * 1.2 + t),
      fbm(uv * 1.2 - t + 5.2)
    );

    vec2 p = uv + warp * 0.5;

    float mouseDist = distance(uv, mouseUv);
    float mouseLens = exp(-pow(mouseDist * 2.6, 2.0)) * u_mouseStrength;
    vec2 pushDir = normalize(uv - mouseUv + 0.0001);
    p += pushDir * mouseLens * 0.5;

    // SCALED DOWN the noise frequency (from 1.2 to 0.85) to make blobs larger and less numerous
    float field = fbm(p * 0.85 + t * 0.4);

    // INCREASED the threshold (from 0.6 to 0.78) to drastically reduce the amount of liquid on screen
    float threshold = 0.78; 
    float edge = 0.12; 
    float mask = smoothstep(threshold - edge, threshold + edge, field);

    vec2 e = vec2(0.0025, 0.0);
    // Updated gradient calculations to match the new 0.85 scale
    float fx = fbm((p + e.xy) * 0.85 + t * 0.4) - fbm((p - e.xy) * 0.85 + t * 0.4);
    float fy = fbm((p + e.yx) * 0.85 + t * 0.4) - fbm((p - e.yx) * 0.85 + t * 0.4);
    float angle = atan(fy, fx);

    float hue = fract(angle / 6.28318 + t * 0.8);
    vec3 iridescent = goldPalette(hue);

    float distToEdge = abs(field - threshold);
    float rim = 1.0 - clamp(distToEdge / 0.06, 0.0, 1.0);
    rim = pow(rim, 2.5);

    vec3 color = iridescent + rim * 0.35;
    color += vec3(1.0, 0.92, 0.7) * mouseLens * 0.4;

    float alpha = clamp(mask * 0.85 + rim * 0.3 + mouseLens * 0.25, 0.0, 1.0) * u_opacity;

    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

export const AmbientLiquidGlow: React.FC<AmbientLiquidGlowProps> = ({
  className = "",
  speed = 0.5,
  opacity = 0.8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.warn("WebGL unavailable — ambient liquid glow skipped.");
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

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

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
    const opacityLoc = gl.getUniformLocation(program, "u_opacity");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const mouseStrengthLoc = gl.getUniformLocation(program, "u_mouseStrength");

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

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const rawMouse = { x: -1, y: -1 };

    const handleMouseMove = (e: MouseEvent) => {
      rawMouse.x = e.clientX;
      rawMouse.y = e.clientY;
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        rawMouse.x = -1;
        rawMouse.y = -1;
      }
    };

    if (!isCoarsePointer) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseout", handleMouseOut, { passive: true });
    }

    const mouseCurrent = { x: 0.5, y: 0.5 };
    const mouseTarget = { x: 0.5, y: 0.5 };
    const lastMousePos = { x: 0.5, y: 0.5 };
    let lastMouseMoveTime = performance.now();

    let mouseStrengthCurrent = 0;
    let mouseStrengthTarget = 0;

    const HOVER_BASELINE = 0.18;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const start = performance.now();

    const render = () => {
      if (destroyed) return;
      rafId = requestAnimationFrame(render);
      if (!isVisible) return;

      const time = (performance.now() - start) / 1000;

      if (rawMouse.x >= 0) {
        const rect = canvas.getBoundingClientRect();
        const withinX = rawMouse.x >= rect.left && rawMouse.x <= rect.right;
        const withinY = rawMouse.y >= rect.top && rawMouse.y <= rect.bottom;

        if (withinX && withinY) {
          const nx = (rawMouse.x - rect.left) / Math.max(rect.width, 1);
          const nyScreen = (rawMouse.y - rect.top) / Math.max(rect.height, 1);
          const ny = 1 - nyScreen;

          const now = performance.now();
          const dt = Math.max(now - lastMouseMoveTime, 1) / 1000;
          const dx = nx - lastMousePos.x;
          const dy = ny - lastMousePos.y;
          const speed = Math.sqrt(dx * dx + dy * dy) / dt;

          lastMouseMoveTime = now;
          lastMousePos.x = nx;
          lastMousePos.y = ny;

          mouseTarget.x = nx;
          mouseTarget.y = ny;
          mouseStrengthTarget = Math.max(HOVER_BASELINE, Math.min(speed * 0.6, 1));
        } else {
          mouseStrengthTarget = 0;
        }
      } else {
        mouseStrengthTarget = 0;
      }

      const strengthEase = mouseStrengthTarget > mouseStrengthCurrent ? 0.18 : 0.045;
      mouseStrengthCurrent = lerp(mouseStrengthCurrent, mouseStrengthTarget, strengthEase);

      mouseCurrent.x = lerp(mouseCurrent.x, mouseTarget.x, 0.16);
      mouseCurrent.y = lerp(mouseCurrent.y, mouseTarget.y, 0.16);

      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(speedLoc, speed);
      gl.uniform1f(opacityLoc, opacity);
      gl.uniform2f(mouseLoc, mouseCurrent.x, mouseCurrent.y);
      gl.uniform1f(mouseStrengthLoc, mouseStrengthCurrent);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    render();

    return () => {
      destroyed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      if (!isCoarsePointer) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseout", handleMouseOut);
      }
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default AmbientLiquidGlow;