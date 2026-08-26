"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { MuxBackgroundVideo } from "@mux/mux-background-video/react";

const PLAYBACK_ID = "VrkTpWt1JIszAvNxrEE1qNaOcl8hS3n8t2gY021U4KZc";
const STREAM_URL = `https://stream.mux.com/${PLAYBACK_ID}.m3u8`;
const POSTER_URL = `https://image.mux.com/${PLAYBACK_ID}/thumbnail.webp?time=0&width=1920&fit_mode=preserve`;

function Poster() {
  return (
    <img
      className="hero-poster"
      src={POSTER_URL}
      alt=""
      width={1920}
      height={1080}
      fetchPriority="high"
      decoding="async"
    />
  );
}

export function HeroBackgroundVideo({
  className = "",
  onReady,
}: {
  className?: string;
  onReady?: () => void;
}) {
  const [motionAllowed, setMotionAllowed] = useState<boolean | null>(null);
  const readyNotified = useRef(false);

  const notifyReady = useCallback(() => {
    if (readyNotified.current) return;
    readyNotified.current = true;
    onReady?.();
  }, [onReady]);

  const startPlayback = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    video.muted = true;
    void video.play().catch(() => {
      // The optimized poster remains visible if a browser or power-saving mode blocks autoplay.
    });
  };

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (motionAllowed === false) notifyReady();
  }, [motionAllowed, notifyReady]);

  const handleCanPlay = (event: SyntheticEvent<HTMLVideoElement>) => {
    startPlayback(event);
    notifyReady();
  };

  return (
    <div className={`hero-video ${className}`} aria-hidden="true">
      {motionAllowed ? (
        <MuxBackgroundVideo
          className="mux-hero-player"
          src={STREAM_URL}
          maxResolution="1080p"
          preload="auto"
          onLoadedMetadata={startPlayback}
          onCanPlay={handleCanPlay}
        >
          <Poster />
        </MuxBackgroundVideo>
      ) : (
        <Poster />
      )}
      <span className="media-grain" />
    </div>
  );
}
