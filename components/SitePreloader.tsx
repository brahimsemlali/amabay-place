"use client";

import { useEffect, useRef, useState } from "react";

const MINIMUM_DISPLAY_TIME = 1500;
const MAXIMUM_DISPLAY_TIME = 2400;
const EXIT_DURATION = 750;

type PreloaderPhase = "waiting" | "leaving" | "finished";

export function SitePreloader({
  mediaReady,
  onComplete,
}: {
  mediaReady: boolean;
  onComplete: () => void;
}) {
  const [minimumElapsed, setMinimumElapsed] = useState(false);
  const [phase, setPhase] = useState<PreloaderPhase>("waiting");
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const minimumTimer = window.setTimeout(
      () => setMinimumElapsed(true),
      MINIMUM_DISPLAY_TIME,
    );
    const fallbackTimer = window.setTimeout(
      () => setPhase("leaving"),
      MAXIMUM_DISPLAY_TIME,
    );

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (mediaReady && minimumElapsed && phase === "waiting") {
      setPhase("leaving");
    }
  }, [mediaReady, minimumElapsed, phase]);

  useEffect(() => {
    if (phase !== "leaving") return;

    const exitTimer = window.setTimeout(() => {
      setPhase("finished");
      onCompleteRef.current();
    }, EXIT_DURATION);

    return () => window.clearTimeout(exitTimer);
  }, [phase]);

  if (phase === "finished") return null;

  return (
    <div
      className={`site-preloader ${phase === "leaving" ? "is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Chargement d’AMABAY Place"
    >
      <span className="preloader-place" aria-hidden="true">
        Casablanca <i /> Maroc
      </span>

      <div className="preloader-brand" aria-hidden="true">
        <span className="preloader-orbit" />
        <p>
          <strong>AMABAY</strong>
          <em>Place</em>
        </p>
      </div>

      <div className="preloader-progress" aria-hidden="true">
        <span>Une nouvelle destination</span>
        <span className="preloader-track">
          <i />
        </span>
      </div>
    </div>
  );
}
