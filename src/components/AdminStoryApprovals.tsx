import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, XCircle, BookOpen } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  synopsis: string | null;
  age_group: string;
  mode: string;
  cover_url: string | null;
  file_path: string | null;
  status: 'pending' | 'approved' | 'rejected';
  review_notes: string | null;
  created_at: string;
  user_id: string;
}

type Filter = 'pending' | 'approved' | 'rejected';

export const AdminStoryApprovals = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('pending');
  const [notesById, setNotesById] = useState<Record<string, string>>({});
  const [actingId, setActingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBooks = async (status: Filter) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setBooks((data as Book[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks(filter);
  }, [filter]);

  const decide = async (book: Book, status: 'approved' | 'rejected') => {
    setActingId(book.id);
    const { error } = await supabase
      .from('books')
      .update({
        status,
        review_notes: notesById[book.id]?.trim() || book.review_notes || null,
      })
      .eq('id', book.id);

    setActingId(null);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    toast({
      title: status === 'approved' ? 'Story approved' : 'Story rejected',
      description: `"${book.title}" has been ${status}.`,
    });
    setBooks((prev) => prev.filter((b) => b.id !== book.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-[#1A1A1A]/10 pb-3">
        {(['pending', 'approved', 'rejected'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm uppercase tracking-wide rounded-md transition ${
              filter === f
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-[#1A1A1A]" size={24} />
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12 text-[#1A1A1A]/60">
          <BookOpen className="mx-auto mb-2" size={32} />
          <p>No {filter} stories.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="border border-[#1A1A1A]/15 rounded-lg p-4 bg-white flex flex-col md:flex-row gap-4"
            >
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-full md:w-32 h-40 object-cover rounded"
                />
              ) : (
                <div className="w-full md:w-32 h-40 bg-[#1A1A1A]/5 rounded flex items-center justify-center">
                  <BookOpen className="text-[#1A1A1A]/30" size={32} />
                </div>
              )}

              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="text-xl font-medium text-[#1A1A1A]">{book.title}</h3>
                  <p className="text-sm text-[#1A1A1A]/70">
                    by {book.author} · ages {book.age_group} · {book.mode}
                  </p>
                </div>
                {book.synopsis && (
                  <p className="text-sm text-[#1A1A1A]/80 line-clamp-3">{book.synopsis}</p>
                )}
                {book.review_notes && filter !== 'pending' && (
                  <p className="text-xs text-[#1A1A1A]/60 italic">
                    Review note: {book.review_notes}
                  </p>
                )}

                {filter === 'pending' && (
                  <>
                    <Textarea
                      placeholder="Optional review notes for the author..."
                      value={notesById[book.id] || ''}
                      onChange={(e) =>
                        setNotesById((p) => ({ ...p, [book.id]: e.target.value }))
                      }
                      className="border-[#1A1A1A]/20 min-h-[60px] text-sm"
                    />
                    <div className="flex gap-2 pt-1">
                      <Button
                        type="button"
                        onClick={() => decide(book, 'approved')}
                        disabled={actingId === book.id}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <CheckCircle2 size={16} /> Approve
                      </Button>
                      <Button
                        type="button"
                        onClick={() => decide(book, 'rejected')}
                        disabled={actingId === book.id}
                        variant="outline"
                        className="border-red-500 text-red-600 hover:bg-red-50"
                      >
                        <XCircle size={16} /> Reject
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
