'use client';

import Link from 'next/link';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  disabled?: boolean;
  width?: string;
  height?: string;
  target?: string;
}

export default function Button({
  text,
  onClick,
  href,
  className = '',
  type = 'button',
  variant = 'primary',
  disabled = false,
  width,
  height,
  target,
}: ButtonProps) {
  const baseStyles =
    'rounded-lg font-semibold transition-all duration-300 flex items-center justify-center text-center';

  const variants = {
    primary: 'bg-black text-white hover:bg-qgc-gray-deep disabled:bg-white/70',
    secondary: 'bg-white text-black hover:bg-gray-100 disabled:bg-white/70',
    outline:
      'border-2 border-black text-black hover:bg-black hover:text-white disabled:border-black/20 disabled:text-white/70',
    dark: 'bg-[#2B2E33] text-white hover:bg-qgc-gray-deep disabled:bg-white/70',
  };

  const customStyles = {
    width: width || 'auto',
    height: height || 'auto',
  };

  const commonProps = {
    className: `${baseStyles} ${variants[variant]} ${className} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`,
    style: customStyles,
  };

  if (href && !disabled) {
    // If it's an external link
    if (href.startsWith('http') || target === '_blank') {
      return (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          {...commonProps}
        >
          {text}
        </a>
      );
    }
    // If it's an internal link
    return (
      <Link href={href} {...commonProps}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} {...commonProps}>
      {text}
    </button>
  );
}
