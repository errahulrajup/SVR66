import { useState } from "react";

export function Logo({ size = 40, className = "" }: { size?: number; className?: string }) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="/images/logo.png"
        width={size}
        height={size}
        alt="Srivriddhi Enterprise logo"
        className={className}
        style={{ objectFit: "contain", display: "block" }}
        onError={() => setImgError(true)}
      />
    );
  }

  // SVG fallback — yellow circle + leaf motif
  const G = "#FFC107";
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <circle cx="40" cy="40" r="36" fill={G} opacity="0.15" />
      <circle cx="40" cy="40" r="28" fill={G} opacity="0.25" />
      <circle cx="40" cy="40" r="20" fill={G} />
      {/* Leaf / plant motif */}
      <path d="M40 52 C40 52 28 44 28 34 C28 27 33 23 40 23 C47 23 52 27 52 34 C52 44 40 52 40 52Z"
        fill="white" opacity="0.9" />
      <line x1="40" y1="52" x2="40" y2="24" stroke={G} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 38 Q34 34 30 36" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M40 38 Q46 34 50 36" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M40 44 Q35 41 32 43" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M40 44 Q45 41 48 43" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
