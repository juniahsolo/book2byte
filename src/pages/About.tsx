import React from 'react';
import { Navbar } from '@/components/Navbar';
import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { BookOpen, Cpu, ArrowUpRight, Quote } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-black font-[Figtree,sans-serif]">
      <SEOHead
        title="About | Book 2 Byte Africa"
        description="Our story — from a single storybook to a vision of digital empowerment for every child across Africa."
        keywords="about, Book 2 Byte, mission, vision, literacy, Africa"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 md:pt-40 lg:pt-48 pb-10 md:pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
            <span className="inline-block bg-[#ffeb3b] border border-black px-3 py-1 text-[11px] font-medium uppercase">
              Our story
            </span>
            <span className="inline-block bg-[#ff5722] text-white border border-black px-3 py-1 text-[11px] font-medium uppercase">
              Est. with one book
            </span>
          </div>
          <h1
            className="font-[Outfit,sans-serif] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight max-w-5xl animate-fade-in"
            style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
          >
            A book can{' '}
            <span className="inline-block bg-[#ffeb3b] px-3 md:px-5 border border-black rotate-[-1deg]">
              change
            </span>{' '}
            <br />
            a{' '}
            <span className="inline-block bg-[#ff5722] text-white px-3 md:px-5 border border-black rotate-[1deg]">
              life.
            </span>
          </h1>
          <p
            className="mt-8 text-base md:text-lg max-w-2xl animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            It started with a simple idea — but we knew the story couldn&apos;t end there.
          </p>
        </div>
      </section>

      {/* The First Chapter */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-6 md:gap-8 border border-black">
          <div className="md:col-span-4 bg-[#ffeb3b] p-6 md:p-10 border-b md:border-b-0 md:border-r border-black flex flex-col justify-between min-h-[220px]">
            <span className="text-[11px] font-medium uppercase">Chapter 01</span>
            <h2 className="font-[Outfit,sans-serif] text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight">
              The first<br />chapter.
            </h2>
          </div>
          <div className="md:col-span-8 p-6 md:p-10 space-y-5 text-base md:text-lg leading-relaxed">
            <p>
              Book2Byte was born from a conversation about privilege and potential. Our founder, a
              lifelong reader and technologist, saw a stark divide: children in some communities
              were surrounded by books and devices, while others grew up without ever holding a
              storybook.
            </p>
            <p>
              This wasn&apos;t just an absence of entertainment — it was an absence of{' '}
              <span className="bg-[#ff5722] text-white px-2">opportunity</span>. The chance to
              explore, to imagine, and to see the world beyond their immediate surroundings.
            </p>
            <p>
              The mission began with a single focus: get storybooks into the hands of children in
              marginalized areas. We believe that literacy is the foundation upon which all other
              learning is built. A child who loves to read is a child who is empowered to learn
              anything.
            </p>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto bg-black text-white p-6 md:p-12 border border-black relative">
          <Quote className="w-10 h-10 md:w-14 md:h-14 text-[#ff5722] mb-4" strokeWidth={1.5} />
          <p className="font-[Outfit,sans-serif] text-2xl md:text-4xl lg:text-5xl font-medium leading-tight max-w-4xl">
            A child who loves to read is a child who is{' '}
            <span className="bg-[#ffeb3b] text-black px-2">empowered</span> to learn anything.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
            <h2 className="font-[Outfit,sans-serif] text-3xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight">
              Mission & Vision.
            </h2>
            <span className="text-[11px] font-medium uppercase border border-black px-2 py-1">
              Two phases · One promise
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border border-black">
            {/* Mission */}
            <div className="bg-[#ff5722] text-white p-6 md:p-10 border-b md:border-b-0 md:border-r border-black flex flex-col justify-between min-h-[340px]">
              <div className="flex items-start justify-between">
                <BookOpen className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />
                <span className="text-[11px] font-medium uppercase border border-white px-2 py-1">
                  Phase 1 · Today
                </span>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase mb-2 opacity-90">Our mission</div>
                <h3 className="font-[Outfit,sans-serif] text-4xl md:text-5xl font-black leading-[0.95] tracking-tight">
                  Books<br />today.
                </h3>
                <p className="mt-4 text-sm md:text-base opacity-95 max-w-md">
                  To spark imagination and build foundational literacy by providing children in
                  underserved communities with access to engaging storybooks and literacy programs —
                  cultivating a lifelong love of reading.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-black text-white p-6 md:p-10 flex flex-col justify-between min-h-[340px]">
              <div className="flex items-start justify-between">
                <Cpu className="w-10 h-10 md:w-14 md:h-14 text-[#ffeb3b]" strokeWidth={1.5} />
                <span className="text-[11px] font-medium uppercase border border-white px-2 py-1">
                  Phase 2 · Tomorrow
                </span>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase mb-2 opacity-90">Our vision</div>
                <h3 className="font-[Outfit,sans-serif] text-4xl md:text-5xl font-black leading-[0.95] tracking-tight">
                  Bytes<br />
                  <span className="bg-[#ffeb3b] text-black px-2">tomorrow.</span>
                </h3>
                <p className="mt-4 text-sm md:text-base opacity-90 max-w-md">
                  To bridge the digital divide by recycling technology and creating access to
                  digital tools and education — so every child can not just consume, but create,
                  innovate, and participate in the digital world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto bg-[#ffeb3b] border border-black p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-tight">
              Want to be part<br className="hidden md:block" /> of the next chapter?
            </div>
            <p className="mt-2 text-sm md:text-base opacity-80 max-w-md">
              Donate books, volunteer your time, or partner with us across Africa.
            </p>
          </div>
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 text-[11px] font-medium uppercase border border-black hover:bg-[#ff5722] transition-colors self-start"
          >
            Get involved <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Footer band */}
      <section className="bg-black text-white px-4 md:px-8 py-12 md:py-16 border-t border-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-tight">
            From <span className="bg-[#ffeb3b] text-black px-2">Book</span> to{' '}
            <span className="bg-[#ff5722] px-2">Byte.</span>
          </div>
          <div className="text-[11px] font-medium uppercase tracking-wider opacity-70">
            hello@book2byte.africa
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
