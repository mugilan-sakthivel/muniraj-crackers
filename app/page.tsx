export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf0] text-gray-900">

      {/* Announcement Bar */}
      <div className="bg-[#6b1020] px-4 py-2 text-center text-sm text-white">
        Welcome to Muniraj Crackers — Enquiry & Catalogue
      </div>

      {/* Header */}
      <header className="border-b border-[#ead9b8] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          <div>
            <h1 className="text-2xl font-bold text-[#6b1020]">
              Muniraj Crackers
            </h1>
            <p className="text-xs text-gray-500">
              Sivakasi Fireworks & Crackers
            </p>
          </div>

          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="/" className="hover:text-[#b8860b]">
              Home
            </a>
            <a href="/catalogue" className="hover:text-[#b8860b]">
              Catalogue
            </a>
            <a href="/about" className="hover:text-[#b8860b]">
              About
            </a>
            <a href="/safety" className="hover:text-[#b8860b]">
              Safety
            </a>
            <a href="/contact" className="hover:text-[#b8860b]">
              Contact
            </a>
          </nav>

          <a
            href="/catalogue"
            className="rounded-full bg-[#b8860b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#96700a]"
          >
            View Catalogue
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#6b1020] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl text-center">
          
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#f5d58a]">
            Celebrate With Light & Joy
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Muniraj Crackers
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
            Explore our crackers catalogue, check product estimates,
            and send your enquiry directly to us through WhatsApp.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/catalogue"
              className="rounded-full bg-[#d4a72c] px-7 py-3 font-semibold text-white hover:bg-[#b8860b]"
            >
              Browse Catalogue
            </a>

            <a
              href="/safety"
              className="rounded-full border border-white/40 px-7 py-3 font-semibold hover:bg-white/10"
            >
              Safety Information
            </a>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-xs text-white/60">
            Prices shown are estimates for enquiry purposes.
            Seller confirmation and availability are required.
          </p>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-b border-[#ead9b8] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#ead9b8] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          
          <div className="p-6 text-center">
            <h3 className="font-semibold text-[#6b1020]">
              Wide Catalogue
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Explore different cracker categories
            </p>
          </div>

          <div className="p-6 text-center">
            <h3 className="font-semibold text-[#6b1020]">
              Clear Estimates
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              View product pricing before enquiry
            </p>
          </div>

          <div className="p-6 text-center">
            <h3 className="font-semibold text-[#6b1020]">
              Easy Enquiry
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Send your enquiry through WhatsApp
            </p>
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#b8860b]">
              Explore
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#6b1020]">
              Popular Categories
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Discover our range of fireworks and cracker products.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            
            {[
              "Sparklers",
              "Flower Pots",
              "Chakkars",
              "Rockets",
              "Atom Bombs",
              "Fancy Crackers",
              "Kids Special",
              "Gift Boxes",
            ].map((category) => (
              <a
                key={category}
                href="/catalogue"
                className="rounded-2xl border border-[#ead9b8] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1c9] text-2xl">
                  ✨
                </div>

                <h3 className="font-semibold text-[#6b1020]">
                  {category}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  View products
                </p>
              </a>
            ))}

          </div>
        </div>
      </section>

      {/* How Enquiry Works */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-[#6b1020]">
              How Enquiry Works
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            
            <div className="rounded-2xl border border-[#ead9b8] p-7 text-center">
              <div className="text-3xl font-bold text-[#b8860b]">01</div>
              <h3 className="mt-4 font-semibold">
                Browse
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Explore products and categories in our catalogue.
              </p>
            </div>

            <div className="rounded-2xl border border-[#ead9b8] p-7 text-center">
              <div className="text-3xl font-bold text-[#b8860b]">02</div>
              <h3 className="mt-4 font-semibold">
                Add Quantities
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Add the products and quantities you are interested in.
              </p>
            </div>

            <div className="rounded-2xl border border-[#ead9b8] p-7 text-center">
              <div className="text-3xl font-bold text-[#b8860b]">03</div>
              <h3 className="mt-4 font-semibold">
                Send Enquiry
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Review your estimate and send the enquiry through WhatsApp.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#ead9b8] bg-[#fff4d6] p-8 text-center">
          <h2 className="text-xl font-bold text-[#6b1020]">
            Safety First
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-700">
            Fireworks should always be handled responsibly and used according
            to applicable safety instructions and regulations.
          </p>

          <a
            href="/safety"
            className="mt-5 inline-block font-semibold text-[#6b1020] underline"
          >
            Read Safety Information
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3b1118] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          <div>
            <h2 className="text-xl font-bold">
              Muniraj Crackers
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Crackers Catalogue & Enquiry
            </p>
          </div>

          <div className="text-sm text-white/60">
            Seller confirmation and availability required.
          </div>

        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/40">
          © 2026 Muniraj Crackers. All rights reserved.
        </div>
      </footer>

    </main>
  );
}