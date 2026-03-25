interface DownloadButtonProps {
  href: string;
  variant: 'apple' | 'google';
  label: string;
}

function AppleIcon() {
  return (
    <svg
      aria-label="Apple"
      role="img"
      viewBox="0 0 24 24"
      className="fill-white shrink-0"
      style={{ width: 'clamp(10px, 2vw, 24px)', height: 'clamp(10px, 2vw, 24px)' }}
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.19 1.28-2.17 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      aria-label="Google Play"
      role="img"
      viewBox="0 0 24 24"
      className="fill-white shrink-0"
      style={{ width: 'clamp(10px, 2vw, 24px)', height: 'clamp(10px, 2vw, 24px)' }}
    >
      <path d="M3.18 23.76a2 2 0 0 0 2.07-.22l11.4-6.57-2.54-2.54-10.93 9.33zM20.43 9.37l-2.67-1.54-2.84 2.84 2.84 2.84 2.7-1.56a1.98 1.98 0 0 0-.03-3.58zM1.18.55A2 2 0 0 0 .75 1.8v20.4a2 2 0 0 0 .43 1.25l.07.07 11.43-11.43v-.27L1.25.48l-.07.07zM14.53 8.17L3.18.43 1.11 2.5l10.93 9.33 2.49-3.66z" />
    </svg>
  );
}

const VARIANT_CONFIG = {
  apple: {
    icon: AppleIcon,
    eyebrow: 'Download on the',
    fallbackLabel: 'App Store',
    fallbackHref: 'https://apps.apple.com',
  },
  google: {
    icon: GooglePlayIcon,
    eyebrow: 'Get it on',
    fallbackLabel: 'Google Play',
    fallbackHref: 'https://play.google.com/store',
  },
};

export default function DownloadButton({ href, variant, label }: DownloadButtonProps) {
  const { icon: Icon, eyebrow, fallbackLabel, fallbackHref } = VARIANT_CONFIG[variant];

  return (
    <a
      href={href || fallbackHref}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center bg-black border border-white/20 text-white rounded-lg hover:scale-105 transition-transform"
      style={{ gap: '1vw', padding: 'clamp(4px, 1.2vw, 14px) clamp(6px, 1.8vw, 20px)' }}
    >
      <Icon />
      <div className="text-left">
        <div
          className="text-white/60 uppercase tracking-wide"
          style={{ fontSize: 'clamp(5px, 0.7vw, 9px)' }}
        >
          {eyebrow}
        </div>
        <div className="font-bold" style={{ fontSize: 'clamp(7px, 1.1vw, 14px)' }}>
          {label || fallbackLabel}
        </div>
      </div>
    </a>
  );
}
