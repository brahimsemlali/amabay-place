import type { CSSProperties, HTMLAttributes } from "react";

type MediaPlaceholderProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  type?: "image" | "video" | "map" | "plan";
  tone?: string;
  aspectRatio?: string;
  dark?: boolean;
  showIndex?: string;
};

export function MediaPlaceholder({
  label,
  type = "image",
  tone = "stone-2",
  aspectRatio,
  dark = false,
  showIndex,
  className = "",
  style,
  ...props
}: MediaPlaceholderProps) {
  return (
    <div
      className={`media-placeholder media-placeholder--${type} tone-${tone} ${dark ? "is-dark" : ""} ${className}`}
      style={{ "--media-ratio": aspectRatio, ...style } as CSSProperties}
      data-cursor={type === "video" ? "LIRE" : "VOIR"}
      {...props}
    >
      <span className="media-grain" aria-hidden="true" />
      {type === "video" && (
        <span className="play-mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" role="presentation">
            <circle cx="24" cy="24" r="23.25" />
            <path d="M20 16.5 32 24 20 31.5Z" />
          </svg>
        </span>
      )}
      {type === "map" && <MapDrawing />}
      {type === "plan" && <PlanDrawing />}
      <span className="media-label">{label}</span>
      {showIndex && <span className="media-index">{showIndex}</span>}
    </div>
  );
}

function MapDrawing() {
  return (
    <svg className="map-drawing" viewBox="0 0 900 620" aria-hidden="true">
      <path d="M-20 442C105 389 166 487 279 409s149-199 278-153 178 19 370-76" />
      <path d="M124-21c48 137-16 213 56 294s186 74 235 166 16 154 48 213" />
      <path d="M-12 135c156 28 196-23 328 20s220 34 312-11 175-8 294 28" />
      <path d="M602-14c-14 96-68 132-48 223s99 123 85 226-66 133-37 214" />
      <circle cx="491" cy="314" r="13" />
      <circle className="map-ring" cx="491" cy="314" r="42" />
      <text x="517" y="305">AMABAY PLACE</text>
      <text x="517" y="327">DESTINATION</text>
    </svg>
  );
}

function PlanDrawing() {
  return (
    <svg className="plan-drawing" viewBox="0 0 900 560" aria-hidden="true">
      <path d="M100 91h644l56 69-54 287H138L81 351Z" />
      <path d="m175 152 488-1 62 58-34 169H192l-40-75Z" />
      <path d="M230 215h399l26 29-20 72H247l-26-37Z" />
      <path d="M388 151v64M518 151v64M315 316v62M469 316v62M586 316v62" />
      <circle cx="438" cy="267" r="26" />
      <path d="M81 351h71M744 447l-53-69M100 91l75 61M800 160l-75 49" />
    </svg>
  );
}
