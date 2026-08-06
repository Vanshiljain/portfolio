// Hand-built animated icon set. Each icon draws itself in on mount and
// redraws with a slight morph on hover, using the SVG `pathLength` trick
// (dashoffset transition) so it's pure CSS — no JS, no icon-font dependency.

const base = "h-4 w-4";
const drawPath =
  "transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] [animation:icon-draw-in_0.8s_ease_forwards]";

export function ArrowIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path
        d="M4 12h15M13 6l6 6-6 6"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={drawPath}
      />
    </svg>
  );
}

export function DownloadIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path
        d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19.5h16"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={drawPath}
      />
    </svg>
  );
}

export function MailIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path
        d="M3.5 5.5h17v13h-17v-13Z M3.5 5.5l8.5 7 8.5-7"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={drawPath}
      />
    </svg>
  );
}

export function PhoneIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path
        d="M5 4.5c0 8 6.5 14.5 14.5 14.5l1-4-4.5-1.5-1.5 1.8a11.5 11.5 0 0 1-5.8-5.8L10.5 7 9 2.5 5 3.5v1Z"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={drawPath}
      />
    </svg>
  );
}

export function LinkedInIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="2.5"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="1.6"
        className={drawPath}
      />
      <path
        d="M7.8 10.2v6M7.8 7.6v.02M11.6 16.2v-3.6c0-1.4 1-2.3 2.1-2.3 1.2 0 1.9.9 1.9 2.3v3.6"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={drawPath}
      />
    </svg>
  );
}

export function NodeMarkIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="6" cy="12" r="2" fill="currentColor" />
      <circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.6" />
      <path
        d="M8 12h8M9.4 10.6 16.6 7.4M9.4 13.4 16.6 16.6"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
