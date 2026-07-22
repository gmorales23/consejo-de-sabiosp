type SealProps = {
  className?: string;
  label?: string;
};

/**
 * El "sello del consejo": elemento de firma visual del sitio. Simula la
 * estampa de un acta oficial — texto curvo alrededor de un escudo simple,
 * con textura de tinta para que no se vea como un ícono vectorial limpio.
 */
export function Seal({ className, label = "CONSEJO DE SABIOS" }: SealProps) {
  const id = "seal-path";
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Sello del Consejo de Sabios"
    >
      <defs>
        <filter id="ink-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
        <path id={id} d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
      </defs>

      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="1.5" />

      <text fill="currentColor" fontSize="13.5" letterSpacing="3" fontFamily="var(--font-mono)">
        <textPath href={`#${id}`} startOffset="2%">
          {label} • {label} •
        </textPath>
      </text>

      <g transform="translate(100,104)">
        <path
          d="M0,-34 L28,-18 L28,16 C28,32 14,44 0,50 C-14,44 -28,32 -28,16 L-28,-18 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <text
          x="0"
          y="8"
          textAnchor="middle"
          fill="currentColor"
          fontSize="30"
          fontFamily="var(--font-display)"
        >
          T
        </text>
      </g>

      <rect width="200" height="200" fill="currentColor" filter="url(#ink-texture)" opacity="0.5" />
    </svg>
  );
}
