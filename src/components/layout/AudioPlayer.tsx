import { useState, useRef, useEffect, useCallback } from "react";

interface Track {
  name: string;
  src: string;
}

const musicTracks: Track[] = [
  { name: "Chrome Oniwaban", src: "/audio/music/Chrome_Oniwaban.mp3" },
  { name: "Chrome Ronin Insertion", src: "/audio/music/Chrome_Ronin_Insertion.mp3" },
  { name: "Colony Zero", src: "/audio/music/Colony_Zero.mp3" },
];

const loopTracks: Track[] = [
  { name: "Undercity Loop 1", src: "/audio/loops/loop_01.mp3" },
  { name: "Undercity Loop 2", src: "/audio/loops/loop_02.mp3" },
  { name: "Undercity Loop 3", src: "/audio/loops/loop_03.mp3" },
  { name: "Undercity Loop 4", src: "/audio/loops/loop_04.mp3" },
];

export function AudioPlayer() {
  const [mode, setMode] = useState<"music" | "loops">("music");
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = mode === "music" ? musicTracks : loopTracks;
  const currentTrack = tracks[trackIndex % tracks.length];
  const isLoop = mode === "loops";

  // Create / update audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.src = currentTrack.src;
    audio.loop = isLoop;
    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch(() => {
        // Autoplay blocked - user hasn't interacted yet
        setIsPlaying(false);
      });
    }

    return () => {
      // Don't pause on cleanup -- we handle that manually
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack.src, isLoop]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // When a music track ends naturally, advance to next
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (!isLoop) {
        // Music mode: auto-advance
        setTrackIndex((prev) => (prev + 1) % tracks.length);
      }
      // Loop mode: the `loop` attribute handles repetition
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [isLoop, tracks.length]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const next = useCallback(() => {
    setTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
    // The useEffect on currentTrack.src will load + play
  }, [tracks.length]);

  const prev = useCallback(() => {
    setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  }, [tracks.length]);

  const switchMode = useCallback((newMode: "music" | "loops") => {
    if (newMode === mode) return;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setMode(newMode);
    setTrackIndex(0);
    setIsPlaying(false);
  }, [mode]);

  if (collapsed) {
    return (
      <div className="fixed bottom-[52px] left-0 right-0 z-40 flex justify-center">
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-1.5 px-3 py-1 bg-bg-secondary/95 backdrop-blur-sm border border-border border-b-0 rounded-t text-[10px] font-stencil tracking-wider text-text-muted hover:text-amber-light transition-colors"
        >
          {isPlaying && (
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 bg-amber animate-pulse" style={{ height: "8px", animationDelay: "0ms" }} />
              <span className="w-0.5 bg-amber animate-pulse" style={{ height: "12px", animationDelay: "150ms" }} />
              <span className="w-0.5 bg-amber animate-pulse" style={{ height: "6px", animationDelay: "300ms" }} />
            </span>
          )}
          AUDIO {isPlaying ? `// ${currentTrack.name}` : ""}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-[52px] left-0 right-0 z-40 bg-bg-secondary/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-lg mx-auto px-3 py-2">
        {/* Top row: mode toggle + collapse */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1">
            {(["music", "loops"] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`px-2 py-0.5 text-[9px] font-stencil tracking-wider rounded transition-colors ${
                  mode === m
                    ? "bg-amber/20 text-amber-light border border-amber-dim"
                    : "text-text-muted hover:text-text-secondary border border-transparent"
                }`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Track name */}
          <div className="flex-1 text-center">
            <span className="text-[10px] font-mono text-text-secondary truncate block px-2">
              {currentTrack.name}
              {isLoop && <span className="text-amber-dim ml-1">↻</span>}
            </span>
          </div>

          <button
            onClick={() => setCollapsed(true)}
            className="text-text-muted hover:text-text-secondary p-0.5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-center gap-3">
          {/* Previous */}
          <button onClick={prev} className="text-text-muted hover:text-text-primary transition-colors p-1">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V7.19c0-1.44-1.555-2.343-2.805-1.628L12 9.53V7.19c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
              isPlaying
                ? "bg-amber/20 border-amber-dim text-amber-light"
                : "bg-bg-tertiary border-border text-text-primary hover:border-amber-dim"
            }`}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button onClick={next} className="text-text-muted hover:text-text-primary transition-colors p-1">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v6.622c0 1.44 1.555 2.343 2.805 1.628L12 12.97v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.06C13.555 4.846 12 5.75 12 7.19v2.34L5.055 5.44Z" />
            </svg>
          </button>

          {/* Volume */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowVolume(!showVolume)}
              className="text-text-muted hover:text-text-primary transition-colors p-1"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                {volume === 0 ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                )}
              </svg>
            </button>
            {showVolume && (
              <div className="absolute bottom-full right-0 mb-2 p-2 bg-bg-primary border border-border rounded shadow-lg">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 h-1 accent-amber cursor-pointer"
                  style={{ accentColor: "#d4910a" }}
                />
                <div className="text-[9px] font-mono text-text-muted text-center mt-1">
                  {Math.round(volume * 100)}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
