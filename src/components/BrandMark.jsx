export default function BrandMark({ light = false, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke={light ? '#FFFFFF' : '#111215'}
          strokeWidth="2.2"
        />
        <path
          d="M11 22.5C11 16.8 14.8 12.2 20 11C18.2 14.2 18.6 18.2 21.8 20.5C17.4 20.6 13.8 22.8 11 22.5Z"
          fill="#C8102E"
        />
        <path
          d="M29 17.5C29 23.2 25.2 27.8 20 29C21.8 25.8 21.4 21.8 18.2 19.5C22.6 19.4 26.2 17.2 29 17.5Z"
          fill={light ? '#FFFFFF' : '#111215'}
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold tracking-[0.18em] ${
            light ? 'text-white' : 'text-[#111215]'
          }`}
        >
          DONGFENG
        </span>
        <span
          className={`text-[10px] font-semibold tracking-[0.28em] mt-1 ${
            light ? 'text-zinc-400' : 'text-zinc-500'
          }`}
        >
          UAE · MAHY KHOORY
        </span>
      </div>
    </div>
  );
}
