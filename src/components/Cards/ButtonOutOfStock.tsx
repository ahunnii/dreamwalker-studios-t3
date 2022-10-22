export default function ButtonOutOfStock() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
    >
      <svg
        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        stroke="currentColor"
      >
        <line
          x1={0}
          y1={100}
          x2={100}
          y2={0}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
