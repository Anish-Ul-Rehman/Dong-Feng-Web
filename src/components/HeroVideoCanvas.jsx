import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const DEFAULT_REELS = [
  {
    id: '008',
    label: '008 Flagship',
    src: '/images/hero/hero-008.jpg',
  },
  {
    id: '007',
    label: '007 Fastback',
    src: '/images/models/007.jpg',
  },
  {
    id: 'huge',
    label: 'HUGE SUV',
    src: '/images/models/huge.jpg',
  },
  {
    id: 'mage',
    label: 'MAGE',
    src: '/images/models/mage.jpg',
  },
  {
    id: 'shine',
    label: 'SHINE',
    src: '/images/models/shine.jpg',
  },
  {
    id: 'z9',
    label: 'Z9 Pickup',
    src: '/images/models/z9.jpg',
  },
];

const SLIDE_DURATION_MS = 5000;
const FADE_DURATION_MS = 900;

function drawCoverImage(ctx, img, width, height, progress, direction = 1) {
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = width / height;

  let baseW;
  let baseH;
  if (imgRatio > canvasRatio) {
    baseH = height;
    baseW = height * imgRatio;
  } else {
    baseW = width;
    baseH = width / imgRatio;
  }

  // Smooth Ken Burns zoom & subtle lateral pan for cinematic motion
  const scale = 1.04 + progress * 0.08;
  const drawW = baseW * scale;
  const drawH = baseH * scale;
  const maxOffsetX = (drawW - width) * 0.35;
  const panX = direction * (progress - 0.5) * maxOffsetX;
  const x = (width - drawW) / 2 + panX;
  const y = (height - drawH) / 2;

  ctx.drawImage(img, x, y, drawW, drawH);
}

export default function HeroVideoCanvas({ reels = DEFAULT_REELS, poster = '/images/hero/hero-008.jpg' }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const imagesRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [useCanvasFallback, setUseCanvasFallback] = useState(false);

  const stateRef = useRef({
    activeIndex: 0,
    isPlaying: true,
    slideStartTime: performance.now(),
    elapsedBeforePause: 0,
  });

  useEffect(() => {
    stateRef.current.isPlaying = isPlaying;
    if (isPlaying) {
      stateRef.current.slideStartTime = performance.now() - stateRef.current.elapsedBeforePause;
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      stateRef.current.elapsedBeforePause =
        performance.now() - stateRef.current.slideStartTime;
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    let mounted = true;
    const loaded = reels.map((reel) => {
      const img = new Image();
      img.src = reel.src;
      return img;
    });
    imagesRef.current = loaded;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    // Attach MediaStream to <video> element when captureStream is supported
    if (typeof canvas.captureStream === 'function' && videoRef.current) {
      try {
        const stream = canvas.captureStream(30);
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      } catch {
        setUseCanvasFallback(true);
      }
    } else {
      setUseCanvasFallback(true);
    }

    let rafId;
    const render = (now) => {
      if (!mounted) return;
      const st = stateRef.current;
      const imgs = imagesRef.current;

      if (st.isPlaying) {
        const elapsed = now - st.slideStartTime;
        if (elapsed >= SLIDE_DURATION_MS) {
          const next = (st.activeIndex + 1) % reels.length;
          st.activeIndex = next;
          st.slideStartTime = now;
          setActiveIndex(next);
        }
      }

      const currentElapsed = st.isPlaying
        ? now - st.slideStartTime
        : st.elapsedBeforePause;
      const progress = Math.min(Math.max(currentElapsed / SLIDE_DURATION_MS, 0), 1);

      const currentImg = imgs[st.activeIndex];
      const nextIndex = (st.activeIndex + 1) % reels.length;
      const nextImg = imgs[nextIndex];

      ctx.fillStyle = '#0A0B0D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        ctx.save();
        ctx.globalAlpha = 1;
        drawCoverImage(
          ctx,
          currentImg,
          canvas.width,
          canvas.height,
          progress,
          st.activeIndex % 2 === 0 ? 1 : -1
        );
        ctx.restore();
      }

      // Crossfade into the next car clip near the end of the reel
      const fadeStart = SLIDE_DURATION_MS - FADE_DURATION_MS;
      if (
        currentElapsed > fadeStart &&
        nextImg &&
        nextImg.complete &&
        nextImg.naturalWidth > 0
      ) {
        const fadeAlpha = Math.min((currentElapsed - fadeStart) / FADE_DURATION_MS, 1);
        ctx.save();
        ctx.globalAlpha = fadeAlpha;
        drawCoverImage(
          ctx,
          nextImg,
          canvas.width,
          canvas.height,
          0,
          nextIndex % 2 === 0 ? 1 : -1
        );
        ctx.restore();
      }

      // Subtle animated studio light sweep across the frame
      const sweepX = ((now * 0.08) % (canvas.width + 500)) - 250;
      const grad = ctx.createLinearGradient(sweepX - 180, 0, sweepX + 180, canvas.height);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0.045)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
    };
  }, [reels]);

  const handleSelectReel = (idx) => {
    stateRef.current.activeIndex = idx;
    stateRef.current.slideStartTime = performance.now();
    stateRef.current.elapsedBeforePause = 0;
    setActiveIndex(idx);
    if (!isPlaying) setIsPlaying(true);
  };

  return (
    <>
      {/* Fallback Poster underneath while video initializes */}
      <img
        src={poster}
        alt="DONGFENG UAE Showcase"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Offscreen or Fallback Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={
          useCanvasFallback
            ? 'absolute inset-0 w-full h-full object-cover'
            : 'sr-only'
        }
      />

      {/* HTML5 Video Element Playing Live Showcase Stream */}
      {!useCanvasFallback && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          aria-label="DONGFENG UAE vehicle showcase video"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      {/* Video Reel Controls (Bottom Right on Desktop) */}
      <div className="absolute bottom-6 right-4 sm:right-6 z-20 flex items-center gap-2 bg-[#0A0B0D]/80 backdrop-blur-md border border-white/15 px-3 py-2">
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          aria-label={isPlaying ? 'Pause showcase video' : 'Play showcase video'}
          className="p-1.5 text-white hover:text-[#C8102E] transition-colors cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-white/15">
          {reels.map((reel, idx) => (
            <button
              key={reel.id}
              type="button"
              onClick={() => handleSelectReel(idx)}
              className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                idx === activeIndex
                  ? 'bg-[#C8102E] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {reel.id.toUpperCase()}
            </button>
          ))}
        </div>

        <span className="sm:hidden text-[10px] font-bold uppercase tracking-wider text-zinc-200 pr-1">
          {reels[activeIndex]?.label}
        </span>
      </div>
    </>
  );
}
