import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Users, Handshake, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Animated counter — counts up when scrolled into view
const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setValue(Math.floor(end * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
            else setValue(end);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
};

const fieldCls =
  'w-full bg-white border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5722]';

const GetInvolved = () => {
  const [donateForm, setDonateForm] = useState({
    name: '', email: '', phone: '', city: '', address: '',
    bookCount: '', bookTypes: '', pickup: 'pickup', notes: '',
  });
  const [volForm, setVolForm] = useState({
    name: '', email: '', phone: '', city: '', skills: '', availability: '',
  });
  const [partnerForm, setPartnerForm] = useState({
    name: '', org: '', email: '', type: 'School', message: '',
  });

  const submit = (label: string) => (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: `${label} request received`,
      description: 'Thanks! We will reach out within 48 hours.',
    });
  };

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
          <a
            href="#donate-books"
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
                New or gently used — story books, textbooks, novels. We distribute to schools, libraries, hospitals, shelters and community centres.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase border border-white px-3 py-2 group-hover:bg-white group-hover:text-[#ff5722] transition-colors">
                Fill the donation form <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* Animated stat tile */}
          <div className="md:col-span-2 bg-[#ffeb3b] p-6 md:p-8 border-b md:border-b border-black flex flex-col justify-between min-h-[180px]">
            <span className="text-[11px] font-medium uppercase">Books delivered & counting</span>
            <div>
              <div className="font-[Outfit,sans-serif] text-5xl md:text-6xl font-black leading-none">
                <CountUp end={500} />+
              </div>
              <div className="text-xs mt-2 opacity-80">to schools, libraries & shelters</div>
            </div>
          </div>

          {/* Volunteer tile */}
          <a
            href="#volunteer"
            className="group md:col-span-2 bg-white p-6 md:p-8 border-black flex flex-col justify-between min-h-[180px] hover:bg-black hover:text-white transition-colors"
          >
            <div className="flex items-start justify-between">
              <Users className="w-8 h-8" strokeWidth={1.5} />
              <span className="text-[11px] font-medium uppercase border border-current px-2 py-1">02</span>
            </div>
            <div>
              <h3 className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-bold leading-tight">Volunteer</h3>
              <p className="text-xs md:text-sm mt-2 opacity-80">Sign up for upcoming reading days & book drives.</p>
            </div>
          </a>

          {/* Partner tile */}
          <a
            href="#partner"
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
          </a>

          {/* Quote tile */}
          <div className="md:col-span-6 bg-white p-6 md:p-10 border-t border-black">
            <p className="font-[Outfit,sans-serif] text-2xl md:text-4xl lg:text-5xl font-medium leading-tight max-w-4xl">
              &ldquo;A book in a child&apos;s hand today is a <span className="bg-[#ffeb3b] px-2">byte</span> of opportunity tomorrow.&rdquo;
            </p>
            <div className="mt-4 text-[11px] font-medium uppercase tracking-wider opacity-70">— Book 2 Byte Africa</div>
          </div>
        </div>
      </section>

      {/* DONATE FORM */}
      <section id="donate-books" className="px-4 md:px-8 pb-16 md:pb-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-4">
            <span className="text-[11px] font-medium uppercase border border-black px-2 py-1">01 — Donate books</span>
            <h2 className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-tight tracking-tight mt-4">
              Tell us where the books are.
            </h2>
            <p className="mt-3 text-sm md:text-base opacity-80">
              Fill out the form and we&apos;ll arrange pickup or share the nearest drop-off. Call <a className="underline" href="tel:+254708096462">+254 708 096 462</a> for urgent pickups.
            </p>
            <div className="mt-6 border border-black overflow-hidden">
              <iframe
                title="Collection map"
                className="w-full h-64"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=36.6,-1.45,37.05,-1.15&layer=mapnik&marker=-1.2921,36.8219"
              />
              <div className="bg-black text-white px-3 py-2 text-[11px] uppercase flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Active collection hubs: Nairobi · Lagos · Accra
              </div>
            </div>
          </div>

          <form onSubmit={submit('Donation')} className="md:col-span-8 border border-black p-5 md:p-8 bg-[#ffeb3b]/40 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase font-medium">Full name</label>
                <input required maxLength={100} value={donateForm.name} onChange={(e) => setDonateForm({ ...donateForm, name: e.target.value })} className={fieldCls} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">Email</label>
                <input required type="email" maxLength={255} value={donateForm.email} onChange={(e) => setDonateForm({ ...donateForm, email: e.target.value })} className={fieldCls} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">Phone</label>
                <input required maxLength={30} value={donateForm.phone} onChange={(e) => setDonateForm({ ...donateForm, phone: e.target.value })} className={fieldCls} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">City / Town</label>
                <input required maxLength={80} value={donateForm.city} onChange={(e) => setDonateForm({ ...donateForm, city: e.target.value })} className={fieldCls} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase font-medium">Street address / landmark</label>
                <input required maxLength={200} value={donateForm.address} onChange={(e) => setDonateForm({ ...donateForm, address: e.target.value })} className={fieldCls} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">How many books?</label>
                <input required type="number" min={1} max={10000} value={donateForm.bookCount} onChange={(e) => setDonateForm({ ...donateForm, bookCount: e.target.value })} className={fieldCls} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">Pickup or drop-off?</label>
                <select value={donateForm.pickup} onChange={(e) => setDonateForm({ ...donateForm, pickup: e.target.value })} className={fieldCls}>
                  <option value="pickup">We pick up</option>
                  <option value="dropoff">I&apos;ll drop off</option>
                  <option value="ship">I&apos;ll ship</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase font-medium">Types of books (story, textbook, novel, age range…)</label>
                <input required maxLength={200} value={donateForm.bookTypes} onChange={(e) => setDonateForm({ ...donateForm, bookTypes: e.target.value })} className={fieldCls} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase font-medium">Anything else we should know?</label>
                <textarea maxLength={500} rows={3} value={donateForm.notes} onChange={(e) => setDonateForm({ ...donateForm, notes: e.target.value })} className={fieldCls} />
              </div>
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 text-[11px] font-medium uppercase border border-black hover:bg-[#ff5722] transition-colors">
              Submit donation <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      {/* VOLUNTEER FORM */}
      <section id="volunteer" className="px-4 md:px-8 pb-16 md:pb-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-4">
            <span className="text-[11px] font-medium uppercase border border-black px-2 py-1">02 — Volunteer</span>
            <h2 className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-tight tracking-tight mt-4">
              Sign up for <span className="bg-[#ffeb3b] px-2">upcoming events.</span>
            </h2>
            <p className="mt-4 text-sm md:text-base max-w-md">
              Reading days, sorting weekends, school visits and digital-literacy pilots. Drop your details — we&apos;ll add you to the next volunteer call.
            </p>
          </div>
          <form onSubmit={submit('Volunteer')} className="md:col-span-8 border border-black p-5 md:p-8 bg-white space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase font-medium">Full name</label>
                <input required maxLength={100} value={volForm.name} onChange={(e) => setVolForm({ ...volForm, name: e.target.value })} className={fieldCls} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">Email</label>
                <input required type="email" maxLength={255} value={volForm.email} onChange={(e) => setVolForm({ ...volForm, email: e.target.value })} className={fieldCls} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">Phone (WhatsApp)</label>
                <input required maxLength={30} value={volForm.phone} onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })} className={fieldCls} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">City / Country</label>
                <input required maxLength={80} value={volForm.city} onChange={(e) => setVolForm({ ...volForm, city: e.target.value })} className={fieldCls} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase font-medium">Skills / interests (reading aloud, logistics, design…)</label>
                <input required maxLength={200} value={volForm.skills} onChange={(e) => setVolForm({ ...volForm, skills: e.target.value })} className={fieldCls} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase font-medium">When are you available?</label>
                <input required maxLength={200} placeholder="Weekends, school holidays, evenings…" value={volForm.availability} onChange={(e) => setVolForm({ ...volForm, availability: e.target.value })} className={fieldCls} />
              </div>
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-[#ff5722] text-white px-5 py-3 text-[11px] font-medium uppercase border border-black hover:bg-black transition-colors">
              Sign me up <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      {/* PARTNER FORM */}
      <section id="partner" className="px-4 md:px-8 pb-24 scroll-mt-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-4">
            <span className="text-[11px] font-medium uppercase border border-black px-2 py-1">03 — Partner</span>
            <h2 className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-tight tracking-tight mt-4">
              Let&apos;s build phase 2 together.
            </h2>
            <p className="mt-4 text-sm md:text-base max-w-md">
              Send us a message or reach out directly at{' '}
              <a className="underline font-medium" href="mailto:info@book2byte.app">info@book2byte.app</a>.
            </p>
          </div>
          <form onSubmit={submit('Partnership')} className="md:col-span-8 border border-black p-5 md:p-8 bg-black text-white space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase font-medium">Your name</label>
                <input required maxLength={100} value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} className={fieldCls + ' text-black'} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">Organization</label>
                <input required maxLength={100} value={partnerForm.org} onChange={(e) => setPartnerForm({ ...partnerForm, org: e.target.value })} className={fieldCls + ' text-black'} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">Email</label>
                <input required type="email" maxLength={255} value={partnerForm.email} onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })} className={fieldCls + ' text-black'} />
              </div>
              <div>
                <label className="text-[11px] uppercase font-medium">Partner type</label>
                <select value={partnerForm.type} onChange={(e) => setPartnerForm({ ...partnerForm, type: e.target.value })} className={fieldCls + ' text-black'}>
                  <option>School</option>
                  <option>Publisher</option>
                  <option>NGO</option>
                  <option>Corporate sponsor</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase font-medium">Message</label>
                <textarea required maxLength={1000} rows={5} value={partnerForm.message} onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })} className={fieldCls + ' text-black'} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="submit" className="inline-flex items-center gap-2 bg-[#ffeb3b] text-black px-5 py-3 text-[11px] font-medium uppercase border border-white hover:bg-white transition-colors">
                Send message <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a href="mailto:info@book2byte.app" className="inline-flex items-center gap-2 bg-transparent text-white px-5 py-3 text-[11px] font-medium uppercase border border-white hover:bg-white hover:text-black transition-colors">
                Email info@book2byte.app
              </a>
            </div>
          </form>
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
            info@book2byte.app
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
