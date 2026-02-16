export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0">
        <img
          src="/images/home-page/hero-section/hero-section-background.png"
          alt="Company background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering Growth Across Industries
        </h1>

        <p className="text-lg md:text-xl mb-8">
          A diversified group of companies driving innovation,
          sustainability, and long-term value.
        </p>

        <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}
