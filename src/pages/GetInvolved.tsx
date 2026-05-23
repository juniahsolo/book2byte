import React from 'react';
import { Navbar } from '@/components/Navbar';
import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Users, Handshake } from 'lucide-react';

const GetInvolved = () => {
  return (
    <div className="min-h-screen bg-white text-black font-[Figtree,sans-serif]">
      <SEOHead
        title="Get Involved | Book 2 Byte Africa"
        description="Donate books, volunteer your time, or partner with us to close the literacy gap across Africa."
        keywords="donate books, volunteer, partner, literacy, Africa, Book 2 Byte"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 md:pt-40 lg:pt-48 pb-10 md:pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
            <span className="inline-block bg-[#ffeb3b] border border-black px-3 py-1 text-[11px] font-medium uppercase">Join the mission</span>
            <span className="inline-block bg-[#ff5722] text-white border border-black px-3 py-1 text-[11px] font-medium uppercase">Phase 1 · Books</span>
          </div>
          <h1
            className="font-[Outfit,sans-serif] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight max-w-5xl animate-fade-in"
            style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
          >
            Turn a page.<br />
            <span className="inline-block bg-[#ff5722] text-white px-3 md:px-5 border border-black rotate-[-1deg]">Change</span>{' '}
            <span className="inline-block bg-[#ffeb3b] px-3 md:px-5 border border-black rotate-[1deg]">a future.</span>
          </h1>
          <p
            className="mt-8 text-base md:text-lg max-w-2xl animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            We tackle the literacy gap with a two-phase approach — starting with the timeless power of books and building towards a future of digital empowerment. Here&apos;s how you can help.
          </p>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-0 border border-black">
          {/* Donate books — large tile */}
          <Link
            to="#donate-books"
            className="group relative md:col-span-4 md:row-span-2 bg-[#ff5722] text-white p-6 md:p-10 border-b md:border-b-0 md:border-r border-black overflow-hidden flex flex-col justify-between min-h-[320px]"
          >
            <div className="flex items-start justify-between">
              <BookOpen className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />
              <span className="text-[11px] font-medium uppercase border border-white px-2 py-1">01 / Donate</span>
            </div>
            <div>
              <h2 className="font-[Outfit,sans-serif] text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                Donate<br />books.
              </h2>
              <p className="mt-4 max-w-md text-sm md:text-base opacity-95">
                New or gently used — children&apos;s books, textbooks, novels. Every box becomes a classroom library.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase border border-white px-3 py-2 group-hover:bg-white group-hover:text-[#ff5722] transition-colors">
                Start a drive <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Stat tile */}
          <div className="md:col-span-2 bg-[#ffeb3b] p-6 md:p-8 border-b md:border-b border-black flex flex-col justify-between min-h-[180px]">
            <span className="text-[11px] font-medium uppercase">Books delivered</span>
            <div>
              <div className="font-[Outfit,sans-serif] text-5xl md:text-6xl font-black leading-none">12,480</div>
              <div className="text-xs mt-2 opacity-80">across 38 schools</div>
            </div>
          </div>

          {/* Volunteer tile */}
          <Link
            to="#volunteer"
            className="group md:col-span-2 bg-white p-6 md:p-8 border-black flex flex-col justify-between min-h-[180px] hover:bg-black hover:text-white transition-colors"
          >
            <div className="flex items-start justify-between">
              <Users className="w-8 h-8" strokeWidth={1.5} />
              <span className="text-[11px] font-medium uppercase border border-current px-2 py-1">02</span>
            </div>
            <div>
              <h3 className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-bold leading-tight">Volunteer</h3>
              <p className="text-xs md:text-sm mt-2 opacity-80">Sort, pack, read aloud, run sessions on the ground.</p>
            </div>
          </Link>

          {/* Partner tile */}
          <Link
            to="#partner"
            className="group md:col-span-2 bg-black text-white p-6 md:p-8 border-t md:border-t-0 md:border-l border-black flex flex-col justify-between min-h-[180px] hover:bg-[#ff5722] transition-colors"
          >
            <div className="flex items-start justify-between">
              <Handshake className="w-8 h-8" strokeWidth={1.5} />
              <span className="text-[11px] font-medium uppercase border border-white px-2 py-1">03</span>
            </div>
            <div>
              <h3 className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-bold leading-tight">Partner with us</h3>
              <p className="text-xs md:text-sm mt-2 opacity-80">Schools, publishers, NGOs, corporate sponsors.</p>
            </div>
          </Link>

          {/* Quote tile */}
          <div className="md:col-span-6 bg-white p-6 md:p-10 border-t border-black">
            <p className="font-[Outfit,sans-serif] text-2xl md:text-4xl lg:text-5xl font-medium leading-tight max-w-4xl">
              &ldquo;A book in a child&apos;s hand today is a <span className="bg-[#ffeb3b] px-2">byte</span> of opportunity tomorrow.&rdquo;
            </p>
            <div className="mt-4 text-[11px] font-medium uppercase tracking-wider opacity-70">— Book 2 Byte Africa</div>
          </div>
        </div>
      </section>

      {/* Detail sections */}
      <section id="donate-books" className="px-4 md:px-8 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-4">
            <span className="text-[11px] font-medium uppercase border border-black px-2 py-1">01 — Donate books</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-tight tracking-tight">
              Three ways to send books our way.
            </h2>
            <div className="mt-8 grid sm:grid-cols-3 gap-0 border border-black">
              {[
                { n: 'A', t: 'Drop off', d: 'Reach out at +254708096462 for shipment arrangement .' },
                { n: 'B', t: 'Ship to us', d: 'Use our prepaid label for boxes of 20+ books. We cover the rest.' },
                { n: 'C', t: 'Host a drive', d: 'Run a one-week book drive at your school, office or community.' },
              ].map((s, i) => (
                <div key={s.n} className={`p-5 md:p-6 ${i < 2 ? 'border-b sm:border-b-0 sm:border-r border-black' : ''}`}>
                  <div className="font-[Outfit,sans-serif] text-4xl font-black text-[#ff5722]">{s.n}</div>
                  <div className="font-[Outfit,sans-serif] text-lg font-bold mt-2">{s.t}</div>
                  <p className="text-sm mt-1 opacity-80">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="volunteer" className="px-4 md:px-8 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-4">
            <span className="text-[11px] font-medium uppercase border border-black px-2 py-1">02 — Volunteer</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-tight tracking-tight">
              Show up. <span className="bg-[#ffeb3b] px-2">Read aloud.</span> Build a library.
            </h2>
            <p className="mt-4 text-base md:text-lg max-w-2xl">
              Weekend sorting sessions, reading days in schools, and digital-literacy workshops for our Phase 2 pilot. No experience needed — just time and care.
            </p>
            <a
              href="mailto:volunteer@book2byte.africa"
              className="mt-6 inline-flex items-center gap-2 bg-black text-white px-5 py-3 text-[11px] font-medium uppercase border border-black hover:bg-[#ff5722] transition-colors"
            >
              Sign up to volunteer <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section id="partner" className="px-4 md:px-8 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-4">
            <span className="text-[11px] font-medium uppercase border border-black px-2 py-1">03 — Partner</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-tight tracking-tight">
              Build phase 2 with us.
            </h2>
            <p className="mt-4 text-base md:text-lg max-w-2xl">
              Publishers, schools, telcos and corporates — partner on book supply, device sponsorship, or curriculum design as we move from books to bytes.
            </p>
            <a
              href="mailto:partners@book2byte.africa"
              className="mt-6 inline-flex items-center gap-2 bg-[#ff5722] text-white px-5 py-3 text-[11px] font-medium uppercase border border-black hover:bg-black transition-colors"
            >
              Start a conversation <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer band */}
      <section className="bg-black text-white px-4 md:px-8 py-12 md:py-16 border-t border-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-tight">
              From <span className="bg-[#ffeb3b] text-black px-2">Book</span> to <span className="bg-[#ff5722] px-2">Byte.</span>
            </div>
            <p className="mt-3 text-sm opacity-80 max-w-md">Africa-wide literacy, one chapter at a time.</p>
          </div>
          <div className="text-[11px] font-medium uppercase tracking-wider opacity-70">
            hello@book2byte.africa
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
