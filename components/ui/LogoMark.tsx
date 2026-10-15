interface LogoMarkProps {
  /** Classes for the svg; its text color drives the outlines and dot. */
  className?: string;
  /** Fill classes for the badge background (outer circle). */
  circleClassName?: string;
  /** Accessible name; omit to hide the mark from assistive tech. */
  label?: string;
}

/**
 * Inline Sendero logo mark (geometry from `public/Logo_Dark.svg`, Figma 54:25)
 * so its colors can be driven by CSS, e.g. hover states.
 */
export function LogoMark({ className = '', circleClassName = 'fill-transparent', label }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <circle
        cx="24"
        cy="24"
        r="23.75"
        stroke="currentColor"
        strokeWidth="0.5"
        className={`transition-colors ${circleClassName}`}
      />
      <path
        d="M23.1362 12.4808C23.5221 11.8193 24.4779 11.8193 24.8638 12.4808L37.1227 33.4961C37.5116 34.1628 37.0308 35 36.259 35H11.741C10.9692 35 10.4884 34.1628 10.8773 33.4961L23.1362 12.4808Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="transition-colors"
      />
      <circle cx="24" cy="24" r="2" fill="currentColor" className="transition-colors" />
    </svg>
  );
}
