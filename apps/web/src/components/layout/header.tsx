import Link from 'next/link';

export default function Header() {
  return (
    <header className="link link-primary">
      <Link href="/contact-us">
        <p>Contact Us</p>
      </Link>
      {/* TODO: ADD MORE WEBPAGES */}
    </header>
  );
}
