"use client";

import { useState } from "react";
import Image from "next/image";

const isUnoptimized = (src: string) => src.startsWith("https://") || src.startsWith("/images/products/");

// Main image + thumbnail strip. Thumbnails only show when there is more than one image.
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  const hasMany = images.length > 1;

  function step(delta: number) {
    setActive((i) => (i + delta + images.length) % images.length);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative group" style={{ aspectRatio: "1/1", backgroundColor: "#FFFFFF" }}>
        <Image
          key={current}
          src={current}
          alt={hasMany ? `${alt} — image ${active + 1} of ${images.length}` : alt}
          fill
          className="object-contain"
          style={{ padding: "1rem" }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={active === 0}
          unoptimized={isUnoptimized(current)}
        />

        {hasMany && (
          <>
            <GalleryArrow side="left" onClick={() => step(-1)} />
            <GalleryArrow side="right" onClick={() => step(1)} />
          </>
        )}
      </div>

      {hasMany && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className="relative transition-opacity hover:opacity-100"
              style={{
                aspectRatio: "1/1",
                backgroundColor: "#FFFFFF",
                border: i === active ? "1px solid #0A0A0A" : "1px solid #E8E4DC",
                opacity: i === active ? 1 : 0.7,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain"
                style={{ padding: "0.25rem" }}
                sizes="20vw"
                unoptimized={isUnoptimized(src)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity md:opacity-0 md:group-hover:opacity-100"
      style={{
        [side]: "0.5rem",
        width: 36,
        height: 36,
        backgroundColor: "rgba(255,255,255,0.85)",
        border: "1px solid #E8E4DC",
        color: "#0A0A0A",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={side === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
}
