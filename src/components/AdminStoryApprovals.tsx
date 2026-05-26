import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, XCircle, BookOpen, Clock, User, Eye, FileText, ArrowUpRight } from 'lucide-react';

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
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
      {/* Header with stats */}
      <div>
        <h2 className="font-[Outfit,sans-serif] text-4xl font-black leading-tight mb-6">
          Story <span className="bg-[#ff6bff] px-3">Approvals</span>
        </h2>
        <p className="text-sm text-black/60 mb-8">Review and approve storybooks submitted by community authors</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 border border-black rounded-lg p-1 bg-white overflow-x-auto">
        {(['pending', 'approved', 'rejected'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 text-xs font-medium uppercase tracking-wider whitespace-nowrap rounded transition ${
              filter === f
                ? 'bg-black text-white'
                : 'bg-transparent text-black hover:bg-black/5'
            }`}
          >
            {f === 'pending' && '⏳ Pending'}
            {f === 'approved' && '✓ Approved'}
            {f === 'rejected' && '✗ Rejected'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20 border border-dashed border-black rounded-lg">
          <div className="text-center">
            <Loader2 className="animate-spin mx-auto mb-3 text-[#ff6bff]" size={32} />
            <p className="text-sm font-medium text-black/70">Loading stories...</p>
          </div>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-black rounded-lg bg-[#fafafa]">
          <BookOpen className="mx-auto mb-3 text-black/30" size={40} />
          <p className="text-base font-medium text-black/60">No {filter} stories</p>
          <p className="text-xs text-black/40 mt-1">Check back soon for new submissions</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="border border-black rounded-lg bg-white overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              {/* Card header with cover and meta */}
              <div className="flex flex-col md:flex-row gap-0">
                {/* Book Cover */}
                <div className="md:w-48 flex-shrink-0 bg-gradient-to-br from-[#ff6bff]/20 to-[#ffeb3b]/20 flex items-center justify-center min-h-56 md:border-r border-black">
                  {book.cover_url ? (
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <BookOpen className="mx-auto text-[#ff6bff] mb-2" size={32} />
                      <p className="text-xs text-black/40 font-medium">No cover</p>
                    </div>
                  )}
                </div>

                {/* Card content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  {/* Top section: Title and badges */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3 gap-4">
                      <div className="flex-1">
                        <h3 className="font-[Outfit,sans-serif] text-2xl font-black leading-tight text-black mb-2">
                          {book.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 items-center text-xs font-medium text-black/70">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            {book.author}
                          </div>
                          <span>·</span>
                          <span className="bg-[#ffeb3b] border border-black px-2 py-0.5">
                            Ages {book.age_group}
                          </span>
                          <span>·</span>
                          <span className="border border-black px-2 py-0.5">
                            {book.mode === 'write' ? '✏️ Written' : '📤 Uploaded'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-black/60 font-medium flex items-center gap-1 justify-end">
                          <Clock size={12} />
                          {new Date(book.created_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Synopsis */}
                    {book.synopsis && (
                      <p className="text-sm text-black/75 line-clamp-2 leading-relaxed">
                        {book.synopsis}
                      </p>
                    )}

                    {/* Existing review notes (for approved/rejected) */}
                    {book.review_notes && filter !== 'pending' && (
                      <div className="mt-4 p-3 bg-black/5 border-l-2 border-[#ff5722] rounded">
                        <p className="text-xs font-medium text-black/70 mb-1">Admin Notes:</p>
                        <p className="text-sm text-black/80">{book.review_notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Action section for pending */}
                  {filter === 'pending' && (
                    <div className="space-y-3 border-t border-black/10 pt-4">
                      <Textarea
                        placeholder="Add optional review notes for the author (e.g., suggestions or reasons for decision)..."
                        value={notesById[book.id] || ''}
                        onChange={(e) =>
                          setNotesById((p) => ({ ...p, [book.id]: e.target.value }))
                        }
                        className="border-black text-sm min-h-[80px] bg-[#fafafa]"
                      />
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          onClick={() => decide(book, 'approved')}
                          disabled={actingId === book.id}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 font-medium uppercase text-xs tracking-wide"
                        >
                          <CheckCircle2 size={16} className="mr-2" />
                          {actingId === book.id ? 'Processing...' : 'Approve'}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => decide(book, 'rejected')}
                          disabled={actingId === book.id}
                          variant="outline"
                          className="flex-1 border-red-500 text-red-600 hover:bg-red-50 font-medium uppercase text-xs tracking-wide"
                        >
                          <XCircle size={16} className="mr-2" />
                          {actingId === book.id ? 'Processing...' : 'Reject'}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Approved/Rejected info */}
                  {filter !== 'pending' && (
                    <div className={`border-t pt-4 flex items-center gap-2 ${
                      filter === 'approved' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {filter === 'approved' ? (
                        <>
                          <CheckCircle2 size={18} />
                          <span className="font-medium text-sm">Story approved and published to library</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={18} />
                          <span className="font-medium text-sm">Story rejected</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
