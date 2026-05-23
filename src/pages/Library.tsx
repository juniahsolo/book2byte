import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { SEOHead } from '@/components/SEOHead';
import { AuthSheet } from '@/components/AuthSheet';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { Heart, Trophy, BookOpen, Crown, Medal, Award } from 'lucide-react';
import { toast } from 'sonner';

type Book = {
  id: string;
  user_id: string;
  title: string;
  author: string;
  age_group: string;
  synopsis: string | null;
  loves_count: number;
  created_at: string;
};

const Library = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [myLikes, setMyLikes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | '3-5' | '6-9' | '10-13' | '14+'>('all');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('books').select('id,user_id,title,author,age_group,synopsis,loves_count,created_at')
      .eq('status', 'approved').order('loves_count', { ascending: false });
    if (error) toast.error(error.message);
    else setBooks((data ?? []) as Book[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (!user) { setMyLikes(new Set()); return; }
    supabase.from('book_likes').select('book_id').eq('user_id', user.id).then(({ data }) => {
      setMyLikes(new Set((data ?? []).map((r: any) => r.book_id)));
    });
  }, [user]);

  const toggleLove = async (book: Book) => {
    if (!user) { setAuthOpen(true); return; }
    const liked = myLikes.has(book.id);
    // optimistic
    setMyLikes((prev) => {
      const n = new Set(prev);
      liked ? n.delete(book.id) : n.add(book.id);
      return n;
    });
    setBooks((prev) => prev.map((b) => b.id === book.id ? { ...b, loves_count: b.loves_count + (liked ? -1 : 1) } : b));

    if (liked) {
      const { error } = await supabase.from('book_likes').delete().eq('book_id', book.id).eq('user_id', user.id);
      if (error) toast.error(error.message);
    } else {
      const { error } = await supabase.from('book_likes').insert({ book_id: book.id, user_id: user.id });
      if (error) toast.error(error.message);
    }
  };

  const filtered = useMemo(() => filter === 'all' ? books : books.filter((b) => b.age_group === filter), [books, filter]);
  const top3 = books.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-black font-[Figtree,sans-serif]">
      <SEOHead title="Library | Book 2 Byte Africa" description="Read approved storybooks. Love your favourites and crown the month's best." keywords="library, storybooks, Africa, read, love" />
      <Navbar />

      <section className="pt-32 md:pt-40 pb-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-block bg-[#ffeb3b] border border-black px-3 py-1 text-[11px] font-medium uppercase">Public library</span>
            <span className="inline-block bg-[#ff5722] text-white border border-black px-3 py-1 text-[11px] font-medium uppercase">{books.length} stories</span>
          </div>
          <h1 className="font-[Outfit,sans-serif] text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight max-w-4xl">
            Loved by <span className="inline-block bg-[#FA76FF] px-3 md:px-5 border border-black rotate-[-1deg]">readers.</span>
          </h1>
        </div>
      </section>

      {/* Leaderboard */}
      {top3.length > 0 && (
        <section className="px-4 md:px-8 pb-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5" />
              <h2 className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-black">Best books</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-0 border border-black">
              {top3.map((b, i) => {
                const meta = [
                  { bg: 'bg-[#ffeb3b]', icon: <Crown className="w-6 h-6" />, label: '#1' },
                  { bg: 'bg-[#e5e5e5]', icon: <Medal className="w-6 h-6" />, label: '#2' },
                  { bg: 'bg-[#ff8a65]', icon: <Award className="w-6 h-6" />, label: '#3' },
                ][i];
                return (
                  <div key={b.id} className={`p-6 ${meta.bg} ${i < 2 ? 'border-b md:border-b-0 md:border-r border-black' : ''}`}>
                    <div className="flex items-center justify-between">
                      {meta.icon}
                      <span className="text-[11px] font-medium uppercase">{meta.label}</span>
                    </div>
                    <h3 className="font-[Outfit,sans-serif] text-3xl font-black leading-tight mt-3">{b.title}</h3>
                    <div className="text-xs mt-1 opacity-80">by {b.author}</div>
                    <div className="mt-3 inline-flex items-center gap-1 font-bold"><Heart className="w-4 h-4 fill-black" /> {b.loves_count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filters + grid */}
      <section className="px-4 md:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-0 border border-black mb-6 w-fit">
            {(['all', '3-5', '6-9', '10-13', '14+'] as const).map((f, i) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 text-[11px] font-medium uppercase ${i > 0 ? 'border-l border-black' : ''} ${filter === f ? 'bg-black text-white' : 'bg-white hover:bg-[#ffeb3b]'}`}>
                {f === 'all' ? 'All ages' : `${f} yrs`}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="border border-black p-8 text-center text-sm">Loading library…</div>
          ) : filtered.length === 0 ? (
            <div className="border border-black bg-[#fafafa] p-10 text-center">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No approved books in this category yet.</p>
              <Link to="/create-book" className="inline-block mt-4 bg-black text-white px-4 py-2 text-[11px] font-medium uppercase border border-black">Submit a story</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-black">
              {filtered.map((b, i) => {
                const liked = myLikes.has(b.id);
                return (
                  <div key={b.id} className={`p-5 md:p-6 bg-white hover:bg-[#fafafa] transition-colors border-black border-b last:border-b-0 ${i % 3 !== 2 ? 'lg:border-r' : ''} ${i % 2 !== 1 ? 'sm:border-r lg:border-r-0' : ''} ${i % 3 !== 2 ? 'lg:border-r' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-medium uppercase border border-black px-2 py-1 bg-[#ffeb3b]">{b.age_group} yrs</span>
                    </div>
                    <h3 className="font-[Outfit,sans-serif] text-2xl font-black leading-tight">{b.title}</h3>
                    <div className="text-xs opacity-70 mt-1">by {b.author}</div>
                    {b.synopsis && <p className="text-sm mt-3 line-clamp-3 opacity-80">{b.synopsis}</p>}
                    <button onClick={() => toggleLove(b)} className={`mt-4 inline-flex items-center gap-2 px-3 py-2 border border-black text-[11px] font-medium uppercase transition-colors ${liked ? 'bg-[#ff5722] text-white' : 'bg-white hover:bg-[#ff5722] hover:text-white'}`}>
                      <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} /> {liked ? 'Loved' : 'Love'} · {b.loves_count}
                    </button>
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

export default Library;
