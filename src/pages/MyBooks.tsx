import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { SEOHead } from '@/components/SEOHead';
import { AuthSheet } from '@/components/AuthSheet';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { Heart, Trophy, Clock, Check, X as XIcon, Sparkles, BookOpen, Plus, Flame, Star } from 'lucide-react';
import { toast } from 'sonner';

type Book = {
  id: string;
  title: string;
  author: string;
  age_group: string;
  synopsis: string | null;
  status: 'pending' | 'approved' | 'rejected';
  loves_count: number;
  mode: string;
  review_notes: string | null;
  created_at: string;
};

const statusStyles: Record<Book['status'], { bg: string; label: string; icon: React.ReactNode }> = {
  pending:  { bg: 'bg-[#ffeb3b] text-black', label: 'Awaiting review', icon: <Clock className="w-3 h-3" /> },
  approved: { bg: 'bg-[#22c55e] text-black',  label: 'Approved · Live', icon: <Check className="w-3 h-3" /> },
  rejected: { bg: 'bg-[#ff5722] text-white',  label: 'Needs changes',  icon: <XIcon className="w-3 h-3" /> },
};

// Gamification thresholds
const tierFor = (loves: number) => {
  if (loves >= 100) return { name: 'Legend',   color: '#ffeb3b' };
  if (loves >= 50)  return { name: 'Hero',     color: '#ff5722' };
  if (loves >= 20)  return { name: 'Rising',   color: '#FA76FF' };
  if (loves >= 5)   return { name: 'Sprout',   color: '#22c55e' };
  return { name: 'Seed', color: '#e5e5e5' };
};

const MyBooks = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) setAuthOpen(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    supabase.from('books').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        else setBooks((data ?? []) as Book[]);
        setLoading(false);
      });
  }, [user]);

  const totalLoves = books.reduce((s, b) => s + b.loves_count, 0);
  const approvedCount = books.filter((b) => b.status === 'approved').length;
  const pendingCount = books.filter((b) => b.status === 'pending').length;
  const bestBook = [...books].filter(b => b.status === 'approved').sort((a, b) => b.loves_count - a.loves_count)[0];
  const tier = tierFor(totalLoves);

  // XP toward next tier
  const nextThreshold = totalLoves >= 100 ? 100 : totalLoves >= 50 ? 100 : totalLoves >= 20 ? 50 : totalLoves >= 5 ? 20 : 5;
  const xpPct = Math.min(100, Math.round((totalLoves / nextThreshold) * 100));

  return (
    <div className="min-h-screen bg-white text-black font-[Figtree,sans-serif]">
      <SEOHead title="My Library | Book 2 Byte Africa" description="Track your submitted storybooks, see loves received, and unlock author tiers." keywords="my books, author profile, library" />
      <Navbar />

      <section className="pt-32 md:pt-40 pb-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-block bg-[#FA76FF] border border-black px-3 py-1 text-[11px] font-medium uppercase">Author profile</span>
            <span className="inline-block bg-black text-white border border-black px-3 py-1 text-[11px] font-medium uppercase inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Tier · {tier.name}
            </span>
          </div>
          <h1 className="font-[Outfit,sans-serif] text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight max-w-4xl">
            My <span className="inline-block bg-[#ffeb3b] px-3 md:px-5 border border-black rotate-[-1deg]">library.</span>
          </h1>
        </div>
      </section>

      {/* Stats bar - gamified */}
      <section className="px-4 md:px-8 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 border border-black">
          <Stat icon={<BookOpen className="w-5 h-5" />} label="Books" value={books.length} bg="bg-white" />
          <Stat icon={<Check className="w-5 h-5" />} label="Approved" value={approvedCount} bg="bg-[#22c55e]" />
          <Stat icon={<Clock className="w-5 h-5" />} label="In review" value={pendingCount} bg="bg-[#ffeb3b]" />
          <Stat icon={<Heart className="w-5 h-5" />} label="Total loves" value={totalLoves} bg="bg-[#ff5722] text-white" />
        </div>

        {/* XP bar */}
        <div className="max-w-6xl mx-auto mt-6 border border-black bg-white p-5">
          <div className="flex items-center justify-between text-[11px] font-medium uppercase mb-2">
            <span className="flex items-center gap-2"><Flame className="w-3.5 h-3.5" /> {tier.name}</span>
            <span className="opacity-70">{totalLoves} / {nextThreshold} loves</span>
          </div>
          <div className="h-3 border border-black bg-white overflow-hidden">
            <div className="h-full transition-all duration-700" style={{ width: `${xpPct}%`, backgroundColor: tier.color }} />
          </div>
          <div className="mt-3 text-xs opacity-70">Earn loves on approved books to climb tiers: Seed → Sprout → Rising → Hero → Legend.</div>
        </div>

        {bestBook && (
          <div className="max-w-6xl mx-auto mt-6 border border-black bg-black text-white p-5 md:p-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-[#ffeb3b]" />
              <div>
                <div className="text-[11px] font-medium uppercase opacity-70">Your best book</div>
                <div className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-black">{bestBook.title}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black flex items-center gap-1"><Heart className="w-5 h-5 fill-[#ff5722] text-[#ff5722]" /> {bestBook.loves_count}</div>
            </div>
          </div>
        )}
      </section>

      {/* Books list */}
      <section className="px-4 md:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-black">Your submissions</h2>
            <Link to="/create-book" className="inline-flex items-center gap-1 bg-black text-white px-3 py-2 text-[11px] font-medium uppercase border border-black hover:bg-[#ff5722]">
              <Plus className="w-3 h-3" /> New book
            </Link>
          </div>

          {loading ? (
            <div className="border border-black p-8 text-center text-sm">Loading…</div>
          ) : !user ? (
            <div className="border border-black bg-[#ffeb3b] p-8 text-center">
              <p className="mb-4">Sign in to see your library.</p>
              <button onClick={() => setAuthOpen(true)} className="bg-black text-white px-4 py-2 text-[11px] font-medium uppercase border border-black">Sign in</button>
            </div>
          ) : books.length === 0 ? (
            <div className="border border-black bg-[#fafafa] p-10 text-center">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="mb-4">No books yet. Write your first story.</p>
              <button onClick={() => navigate('/create-book')} className="bg-[#ff5722] text-white px-4 py-2 text-[11px] font-medium uppercase border border-black">Start writing</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-black">
              {books.map((b, i) => {
                const s = statusStyles[b.status];
                return (
                  <div key={b.id} className={`p-5 md:p-6 border-black ${i % 3 !== 2 ? 'lg:border-r' : ''} ${i % 2 !== 1 ? 'sm:border-r lg:border-r-0' : ''} ${i % 3 !== 2 ? 'lg:border-r' : ''} border-b last:border-b-0 bg-white hover:bg-[#fafafa] transition-colors`}>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-medium uppercase px-2 py-1 border border-black inline-flex items-center gap-1 ${s.bg}`}>
                        {s.icon} {s.label}
                      </span>
                      <span className="text-[10px] uppercase opacity-60">{b.mode}</span>
                    </div>
                    <h3 className="font-[Outfit,sans-serif] text-2xl font-black leading-tight">{b.title}</h3>
                    <div className="text-xs opacity-70 mt-1">by {b.author} · {b.age_group} yrs</div>
                    {b.synopsis && <p className="text-sm mt-3 line-clamp-3 opacity-80">{b.synopsis}</p>}
                    {b.review_notes && b.status === 'rejected' && (
                      <div className="mt-3 text-xs border-l-2 border-[#ff5722] pl-2 opacity-80"><b>Reviewer:</b> {b.review_notes}</div>
                    )}
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-1 font-bold"><Heart className="w-4 h-4 fill-[#ff5722] text-[#ff5722]" /> {b.loves_count}</span>
                      {b.status === 'approved' && (
                        <Link to="/library" className="text-[10px] uppercase font-medium border border-black px-2 py-1 hover:bg-black hover:text-white">View in library →</Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <AuthSheet isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

const Stat: React.FC<{ icon: React.ReactNode; label: string; value: number; bg: string }> = ({ icon, label, value, bg }) => (
  <div className={`p-5 md:p-6 border-r last:border-r-0 border-b md:border-b-0 border-black ${bg}`}>
    <div className="flex items-center gap-2 text-[11px] font-medium uppercase opacity-80">{icon} {label}</div>
    <div className="font-[Outfit,sans-serif] text-4xl md:text-5xl font-black mt-1">{value}</div>
  </div>
);

export default MyBooks;
