export function LogoMark({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M100 8 L176 64 L176 156 L100 212 L24 156 L24 64 Z"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <path
        d="M100 8 L100 75 M100 75 L38 148 M100 75 L162 148 M61.8 120 L138.2 120"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 110 L176 110 M24 110 L100 212 M176 110 L100 212"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "", markSize = 26 }: { className?: string; markSize?: number }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={markSize} className="text-foreground shrink-0" />
      <span className="text-lg font-semibold tracking-tight lowercase">assetary</span>
    </span>
  );
}
