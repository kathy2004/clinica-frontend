export default function LogoJK({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="120" height="120" rx="24" fill="#000000" />
      <rect x="14" y="70" width="8" height="25" fill="#ffffff" />
      <rect x="26" y="58" width="8" height="37" fill="#ffffff" />
      <rect x="38" y="46" width="8" height="49" fill="#ffffff" />
      <rect x="50" y="34" width="8" height="61" fill="#ffffff" />
      <line x1="58" y1="30" x2="106" y2="18" stroke="#ffffff" strokeWidth="3" />
      <rect x="58" y="30" width="48" height="48" rx="4" fill="none" stroke="#ffffff" strokeWidth="4" />
      <text
        x="82"
        y="62"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="700"
        fontSize="22"
        fill="#ffffff"
      >
        JK
      </text>
    </svg>
  );
}