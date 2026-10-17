export default function Icon({ name, size = 22, ...props }) {
  const paths = {
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    user: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2Z" />
      </>
    ),
    bag: (
      <>
        <path d="M4 7h16l1 14H3L4 7Z" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      </>
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    close: <path d="m5 5 14 14M19 5 5 19" />,
    truck: (
      <>
        <path d="M1 5h13v12H1zm13 4h4l4 5v3h-8" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 3C7 2 1 9 7 17s15-1 13-14Z" />
        <path d="M4 21 17 7" />
      </>
    ),
    return: (
      <>
        <path d="M4 10a8 8 0 1 1 1 9M4 3v7h7" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
