import React, { useEffect, useRef } from "react";

/* ============================================================
   LIQUID GLASS BACKGROUND

   Renders a static image through a WebGL fragment shader that
   applies ambient noise-based displacement plus chromatic
   aberration (RGB channel splitting) — the same visual family
   as the "liquid glass" page-transition effect, tuned down to
   a slow, ambient loop instead of a one-shot wipe.

   On top of that ambient loop, the cursor now carries its own
   "lens" of distortion: it follows the mouse, grows stronger
   the faster the mouse moves, and relaxes back down to a
   gentle hover presence (or fully off, off-window) when the
   cursor stops or leaves — all read once per animation frame
   from refs, so mousemove itself never triggers a re-render.

   No external deps (no three.js) — raw WebGL1 + a full-screen
   triangle pair. Safe to drop in anywhere a <video> background
   would normally go.
============================================================ */

interface LiquidGlassBackgroundProps {
  /** Path or imported asset for the background image. */
  imageSrc: string;
  /** Optional extra classes on the <canvas> element. */
  className?: string;
  /**
   * 0–1 overall strength of the ripple/aberration.
   * Keep this low (0.4–0.7) for a portfolio hero — anything
   * near 1 starts to look like a glitch effect rather than glass.
   */
  intensity?: number;
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

  uniform sampler2D u_texture;
  uniform float u_time;
  uniform float u_canvasAspect;
  uniform float u_imageAspect;
  uniform float u_intensity;

  /* Mouse: raw canvas-relative 0..1 coords (same space as v_uv,
     i.e. NOT yet aspect-corrected — coverUv() is applied to it
     below so it lines up with the same texture space as 'uv'). */
  uniform vec2 u_mouse;
  /* 0..1 — how strongly the cursor lens should show right now.
     Ramps up fast while moving, decays slowly when idle, drops
     to 0 when the cursor leaves the window. */
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

  /* background-size: cover behaviour for the image inside the canvas */
  vec2 coverUv(vec2 uv) {
    float ratio = u_canvasAspect / u_imageAspect;
    vec2 scale = ratio > 1.0 ? vec2(1.0, 1.0 / ratio) : vec2(ratio, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = coverUv(v_uv);

    /* ---- 1. Continuous ambient liquid motion (always visible) ---- */
    float n1 = noise(uv * 2.4 + u_time * 0.09);
    float n2 = noise(uv * 3.8 - u_time * 0.07);
    vec2 ambientDistort = vec2(n1 - 0.5, n2 - 0.5) * 0.05 * u_intensity;

    /* ---- 2. Periodic sweeping refraction wave (the "liquid glass" pass) ---- */
    float period = 7.0;
    float t = mod(u_time, period) / period;          /* 0..1 loop */
    float wavePos = mix(-0.35, 1.35, t);              /* travels off-left to off-right */
    float diag = uv.x * 0.65 + uv.y * 0.35;            /* diagonal sweep axis */
    float distToWave = diag - wavePos;
    float band = exp(-pow(distToWave * 5.0, 2.0));     /* gaussian falloff around wave front */

    float waveNoise = noise(uv * 9.0 + u_time * 0.6);
    vec2 waveDistort = vec2(waveNoise - 0.5, (waveNoise - 0.5) * 0.6)
      * band * 0.16 * u_intensity;

    /* ---- 3. Cursor-following glass lens ---- */
    vec2 mouseUv = coverUv(u_mouse);
    float mouseDist = distance(uv, mouseUv);
    /* gaussian falloff around the cursor, radius tuned for a
       hand-sized lens rather than a tiny pinpoint */
    float mouseLens = exp(-pow(mouseDist * 4.2, 2.0)) * u_mouseStrength;

    vec2 toMouse = uv - mouseUv;
    float ang = atan(toMouse.y, toMouse.x);
    vec2 radialDir = vec2(cos(ang), sin(ang));

    float mouseNoise = noise(uv * 10.0 + u_time * 0.8 + radialDir * 0.5);
    vec2 mouseDistort = radialDir * mouseLens * (0.055 + mouseNoise * 0.05) * u_intensity;

    vec2 distortion = ambientDistort + waveDistort + mouseDistort;

    float aberration = (0.006 + band * 0.026 + mouseLens * 0.05) * u_intensity;
    vec2 dir = normalize(distortion + 0.0001);

    float r = texture2D(u_texture, uv + distortion + dir * aberration).r;
    float g = texture2D(u_texture, uv + distortion).g;
    float b = texture2D(u_texture, uv + distortion - dir * aberration).b;

    vec3 color = vec3(r, g, b);

    /* subtle glassy highlight riding along the wave front */
    color += vec3(0.06, 0.06, 0.07) * band * u_intensity;

    /* soft highlight under the cursor lens itself */
    color += vec3(0.05, 0.05, 0.06) * mouseLens * u_intensity;

    /* gentle vignette so edges recede into the dark hero background */
    float vignette = smoothstep(1.05, 0.35, length(v_uv - 0.5));
    color *= mix(0.5, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const LiquidGlassBackground: React.FC<LiquidGlassBackgroundProps> = ({
  imageSrc,
  className = "",
  intensity = 0.75,
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
      /* Graceful fallback: browsers without WebGL just see nothing
         here — the dark bg-black on the parent section still holds. */
      console.warn("WebGL unavailable — liquid glass background skipped.");
      return;
    }

    let destroyed = false;
    let rafId: number | null = null;
    let imageAspect = 16 / 9;

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

    /* Full-screen quad (two triangles) */
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
    const canvasAspectLoc = gl.getUniformLocation(program, "u_canvasAspect");
    const imageAspectLoc = gl.getUniformLocation(program, "u_imageAspect");
    const intensityLoc = gl.getUniformLocation(program, "u_intensity");
    const textureLoc = gl.getUniformLocation(program, "u_texture");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const mouseStrengthLoc = gl.getUniformLocation(program, "u_mouseStrength");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    /* 1x1 placeholder pixel (near-black) while the real image loads */
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([10, 8, 6, 255]),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      if (destroyed) return;
      imageAspect = image.width / image.height;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    };
    image.src = imageSrc;

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

    /* Pause the render loop when off-screen (e.g. long page scroll)
       to save GPU/battery. */
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    /* ==========================================================
       MOUSE TRACKING — refs only, no React state. The raw client
       position is stashed by the event listener; everything else
       (normalizing, speed, easing, decay) happens once per frame
       inside the render loop below.
    ========================================================== */

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const rawMouse = { x: -1, y: -1 };

    const handleMouseMove = (e: MouseEvent) => {
      rawMouse.x = e.clientX;
      rawMouse.y = e.clientY;
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Fires when the cursor actually leaves the browser window
      // (relatedTarget/toElement is null in that case).
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

    const HOVER_BASELINE = 0.22; // gentle presence while hovering, even if still
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const start = performance.now();

    const render = () => {
      if (destroyed) return;
      rafId = requestAnimationFrame(render);
      if (!isVisible) return;

      const time = (performance.now() - start) / 1000;

      // ---- Update mouse target + strength from raw client coords ----
      if (rawMouse.x >= 0) {
        const rect = canvas.getBoundingClientRect();
        const nx = (rawMouse.x - rect.left) / Math.max(rect.width, 1);
        const nyScreen = (rawMouse.y - rect.top) / Math.max(rect.height, 1);
        const ny = 1 - nyScreen; // flip: v_uv is bottom-up like GL, screen Y is top-down

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

      // Fast rise so the lens catches up with a quick swipe, slow
      // decay so it trails off like glass settling rather than
      // snapping off the moment the cursor stops.
      const strengthEase = mouseStrengthTarget > mouseStrengthCurrent ? 0.18 : 0.045;
      mouseStrengthCurrent = lerp(mouseStrengthCurrent, mouseStrengthTarget, strengthEase);

      mouseCurrent.x = lerp(mouseCurrent.x, mouseTarget.x, 0.16);
      mouseCurrent.y = lerp(mouseCurrent.y, mouseTarget.y, 0.16);

      gl.useProgram(program);
      gl.uniform1f(timeLoc, time);
      gl.uniform1f(canvasAspectLoc, canvas.width / canvas.height);
      gl.uniform1f(imageAspectLoc, imageAspect);
      gl.uniform1f(intensityLoc, intensity);
      gl.uniform2f(mouseLoc, mouseCurrent.x, mouseCurrent.y);
      gl.uniform1f(mouseStrengthLoc, mouseStrengthCurrent);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(textureLoc, 0);

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
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
    };
  }, [imageSrc, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    />
  );
};

export default LiquidGlassBackground;