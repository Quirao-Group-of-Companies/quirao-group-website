import Image from "next/image";
import Link from "next/link";

export default function ManokanPage() {
  return (
    <main className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[90vh] w-full">
        <Image
          src="/images/manokan-hero.jpg" 
          alt="Sari-Sari Manokan Inasal"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sari-Sari Manokan
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
            Authentic Inasal. Smoky, juicy, and grilled to perfection.
            Experience the taste that keeps you coming back.
          </p>

          <Link
            href="#showcase"
            className="bg-yellow-500 hover:bg-yellow-600 transition px-8 py-3 text-black font-semibold rounded-full"
          >
            View Our Specials
          </Link>
        </div>
      </section>


      {/* ================= SHOWCASE SECTION ================= */}
      <section
        id="showcase"
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Best Sellers
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            
            {/* Card 1 */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
              <Image
                src="/images/inasal-chicken.jpg"
                alt="Chicken Inasal"
                width={500}
                height={400}
                className="object-cover w-full h-60"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Chicken Inasal
                </h3>
                <p className="text-gray-600">
                  Marinated in our signature blend and grilled over open flame.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
              <Image
                src="/images/paa-combo.jpg"
                alt="Paa Combo"
                width={500}
                height={400}
                className="object-cover w-full h-60"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Paa Combo
                </h3>
                <p className="text-gray-600">
                  Juicy leg quarter served with rice and special dipping sauce.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
              <Image
                src="/images/halo-halo.jpg"
                alt="Halo-Halo"
                width={500}
                height={400}
                className="object-cover w-full h-60"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Halo-Halo
                </h3>
                <p className="text-gray-600">
                  The perfect sweet ending to your smoky feast.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}