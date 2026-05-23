import React, { useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { SEOHead } from '@/components/SEOHead';
import { PenLine, Upload, BookOpen, ArrowUpRight, FileText, X, Check } from 'lucide-react';
import { toast } from 'sonner';

type Mode = 'choose' | 'write' | 'upload';

const CreateBook = () => {
  const [mode, setMode] = useState<Mode>('choose');

  // Write mode state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [ageGroup, setAgeGroup] = useState('6-9');
  const [synopsis, setSynopsis] = useState('');
  const [chapters, setChapters] = useState<{ title: string; body: string }[]>([
    { title: 'Chapter 1', body: '' },
  ]);

  // Upload mode state
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = (synopsis + ' ' + chapters.map((c) => c.body).join(' '))
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const addChapter = () =>
    setChapters((c) => [...c, { title: `Chapter ${c.length + 1}`, body: '' }]);

  const updateChapter = (i: number, key: 'title' | 'body', value: string) =>
    setChapters((c) => c.map((ch, idx) => (idx === i ? { ...ch, [key]: value } : ch)));

  const removeChapter = (i: number) =>
    setChapters((c) => (c.length === 1 ? c : c.filter((_, idx) => idx !== i)));

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (f.size > 20 * 1024 * 1024) {
      toast.error('File too large — max 20MB');
      return;
    }
    setFile(f);
  };

  const handleSubmitWrite = () => {
    if (!title.trim() || !author.trim()) {
      toast.error('Add a title and author to continue');
      return;
    }
    toast.success('Story saved as draft!');
  };

  const handleSubmitUpload = () => {
    if (!file) {
      toast.error('Pick a file to upload');
      return;
    }
    toast.success(`"${file.name}" ready for review`);
  };

  return (
    <div className="min-h-screen bg-white text-black font-[Figtree,sans-serif]">
      <SEOHead
        title="Create a Book | Book 2 Byte Africa"
        description="Write a storybook online or upload one you've already written. Share stories that reach classrooms across Africa."
        keywords="create book, write storybook, upload book, children's stories, Africa, Book 2 Byte"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 md:pt-40 lg:pt-48 pb-10 md:pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
            <span className="inline-block bg-[#ffeb3b] border border-black px-3 py-1 text-[11px] font-medium uppercase">
              Author hub
            </span>
            <span className="inline-block bg-[#ff5722] text-white border border-black px-3 py-1 text-[11px] font-medium uppercase">
              Phase 1 · Books
            </span>
          </div>
          <h1
            className="font-[Outfit,sans-serif] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight max-w-5xl animate-fade-in"
            style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
          >
            Write a{' '}
            <span className="inline-block bg-[#ffeb3b] px-3 md:px-5 border border-black rotate-[-1deg]">
              story.
            </span>
            <br />
            <span className="inline-block bg-[#ff5722] text-white px-3 md:px-5 border border-black rotate-[1deg]">
              Reach
            </span>{' '}
            a child.
          </h1>
          <p
            className="mt-8 text-base md:text-lg max-w-2xl animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            Draft a brand-new storybook in our editor, or upload a manuscript you&apos;ve already
            written. Approved stories land in classroom libraries across the continent.
          </p>
        </div>
      </section>

      {/* Mode picker */}
      {mode === 'choose' && (
        <section className="px-4 md:px-8 pb-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-0 border border-black">
            <button
              onClick={() => setMode('write')}
              className="group text-left bg-[#ff5722] text-white p-8 md:p-12 border-b md:border-b-0 md:border-r border-black flex flex-col justify-between min-h-[360px] hover:bg-black transition-colors"
            >
              <div className="flex items-start justify-between">
                <PenLine className="w-12 h-12" strokeWidth={1.5} />
                <span className="text-[11px] font-medium uppercase border border-white px-2 py-1">
                  Option A
                </span>
              </div>
              <div>
                <h2 className="font-[Outfit,sans-serif] text-4xl md:text-6xl font-black leading-[0.95] tracking-tight">
                  Write it<br />here.
                </h2>
                <p className="mt-4 max-w-md text-sm md:text-base opacity-95">
                  Use our chapter editor — title, synopsis, scenes. Save drafts and come back anytime.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase border border-white px-3 py-2 group-hover:bg-white group-hover:text-black transition-colors">
                  Open editor <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>

            <button
              onClick={() => setMode('upload')}
              className="group text-left bg-white p-8 md:p-12 flex flex-col justify-between min-h-[360px] hover:bg-[#ffeb3b] transition-colors"
            >
              <div className="flex items-start justify-between">
                <Upload className="w-12 h-12" strokeWidth={1.5} />
                <span className="text-[11px] font-medium uppercase border border-black px-2 py-1">
                  Option B
                </span>
              </div>
              <div>
                <h2 className="font-[Outfit,sans-serif] text-4xl md:text-6xl font-black leading-[0.95] tracking-tight">
                  Upload<br />a draft.
                </h2>
                <p className="mt-4 max-w-md text-sm md:text-base opacity-80">
                  Send us a manuscript you&apos;ve already written — PDF, DOCX or plain text. Up to 20MB.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase border border-black px-3 py-2 group-hover:bg-black group-hover:text-white transition-colors">
                  Upload file <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          </div>
        </section>
      )}

      {/* WRITE mode */}
      {mode === 'write' && (
        <section className="px-4 md:px-8 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setMode('choose')}
                className="text-[11px] font-medium uppercase border border-black px-3 py-2 hover:bg-black hover:text-white transition-colors"
              >
                ← Back
              </button>
              <span className="text-[11px] font-medium uppercase opacity-70">
                {wordCount} words
              </span>
            </div>

            <div className="border border-black">
              {/* Meta row */}
              <div className="grid md:grid-cols-3 border-b border-black">
                <label className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-black flex flex-col gap-2">
                  <span className="text-[11px] font-medium uppercase opacity-70">Book title</span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="The lion who learned to code"
                    className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-bold bg-transparent outline-none placeholder:opacity-30"
                  />
                </label>
                <label className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-black flex flex-col gap-2">
                  <span className="text-[11px] font-medium uppercase opacity-70">Author</span>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your name"
                    className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-bold bg-transparent outline-none placeholder:opacity-30"
                  />
                </label>
                <label className="p-5 md:p-6 flex flex-col gap-2">
                  <span className="text-[11px] font-medium uppercase opacity-70">Age group</span>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-bold bg-transparent outline-none cursor-pointer"
                  >
                    <option value="3-5">3 — 5 yrs</option>
                    <option value="6-9">6 — 9 yrs</option>
                    <option value="10-13">10 — 13 yrs</option>
                    <option value="14+">14+ yrs</option>
                  </select>
                </label>
              </div>

              {/* Synopsis */}
              <label className="block p-5 md:p-6 border-b border-black">
                <span className="text-[11px] font-medium uppercase opacity-70 block mb-2">
                  Synopsis
                </span>
                <textarea
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  placeholder="A short pitch — what's the story about?"
                  rows={3}
                  className="w-full text-base md:text-lg bg-transparent outline-none resize-none placeholder:opacity-30"
                />
              </label>

              {/* Chapters */}
              <div className="bg-[#fafafa]">
                {chapters.map((ch, i) => (
                  <div key={i} className="border-b border-black">
                    <div className="flex items-center justify-between px-5 md:px-6 pt-5 md:pt-6">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="font-[Outfit,sans-serif] text-3xl md:text-4xl font-black text-[#ff5722]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <input
                          type="text"
                          value={ch.title}
                          onChange={(e) => updateChapter(i, 'title', e.target.value)}
                          className="font-[Outfit,sans-serif] text-xl md:text-2xl font-bold bg-transparent outline-none flex-1 min-w-0"
                        />
                      </div>
                      {chapters.length > 1 && (
                        <button
                          onClick={() => removeChapter(i)}
                          className="text-[11px] font-medium uppercase border border-black px-2 py-1 hover:bg-black hover:text-white transition-colors flex items-center gap-1"
                        >
                          <X className="w-3 h-3" /> Remove
                        </button>
                      )}
                    </div>
                    <textarea
                      value={ch.body}
                      onChange={(e) => updateChapter(i, 'body', e.target.value)}
                      placeholder="Once upon a time…"
                      rows={6}
                      className="w-full px-5 md:px-6 pb-5 md:pb-6 pt-3 text-base md:text-lg bg-transparent outline-none resize-y placeholder:opacity-30 leading-relaxed"
                    />
                  </div>
                ))}

                <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <button
                    onClick={addChapter}
                    className="text-[11px] font-medium uppercase border border-black px-4 py-3 hover:bg-[#ffeb3b] transition-colors inline-flex items-center gap-2"
                  >
                    + Add chapter
                  </button>
                  <button
                    onClick={handleSubmitWrite}
                    className="bg-black text-white text-[11px] font-medium uppercase px-5 py-3 border border-black hover:bg-[#ff5722] transition-colors inline-flex items-center gap-2"
                  >
                    Save draft <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* UPLOAD mode */}
      {mode === 'upload' && (
        <section className="px-4 md:px-8 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setMode('choose')}
                className="text-[11px] font-medium uppercase border border-black px-3 py-2 hover:bg-black hover:text-white transition-colors"
              >
                ← Back
              </button>
              <span className="text-[11px] font-medium uppercase opacity-70">
                Max 20MB · PDF / DOCX / TXT
              </span>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFile(e.dataTransfer.files?.[0] ?? null);
              }}
              onClick={() => fileInputRef.current?.click()}
              className="border border-black border-dashed bg-[#ffeb3b] p-10 md:p-16 cursor-pointer hover:bg-[#ff5722] hover:text-white transition-colors text-center"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt,application/pdf"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
              {file ? (
                <div className="flex flex-col items-center gap-3">
                  <Check className="w-12 h-12" strokeWidth={1.5} />
                  <div className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-black">
                    {file.name}
                  </div>
                  <div className="text-xs opacity-80">
                    {(file.size / 1024 / 1024).toFixed(2)} MB · Click to replace
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <FileText className="w-12 h-12" strokeWidth={1.5} />
                  <div className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-[0.95]">
                    Drop your<br />manuscript here.
                  </div>
                  <div className="text-xs md:text-sm opacity-80 mt-2">
                    or click to browse your files
                  </div>
                </div>
              )}
            </div>

            {/* What happens next */}
            <div className="mt-8 grid sm:grid-cols-3 gap-0 border border-black">
              {[
                { n: 'A', t: 'You upload', d: 'Send us your manuscript in any common format.' },
                { n: 'B', t: 'We review', d: 'Our editors read it within 5 working days.' },
                { n: 'C', t: 'Kids read', d: 'Approved stories ship to classroom libraries.' },
              ].map((s, i) => (
                <div
                  key={s.n}
                  className={`p-5 md:p-6 ${
                    i < 2 ? 'border-b sm:border-b-0 sm:border-r border-black' : ''
                  }`}
                >
                  <div className="font-[Outfit,sans-serif] text-4xl font-black text-[#ff5722]">
                    {s.n}
                  </div>
                  <div className="font-[Outfit,sans-serif] text-lg font-bold mt-2">{s.t}</div>
                  <p className="text-sm mt-1 opacity-80">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSubmitUpload}
                className="bg-black text-white text-[11px] font-medium uppercase px-5 py-3 border border-black hover:bg-[#ff5722] transition-colors inline-flex items-center gap-2"
              >
                Submit manuscript <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer band */}
      <section className="bg-black text-white px-4 md:px-8 py-12 md:py-16 border-t border-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="font-[Outfit,sans-serif] text-3xl md:text-5xl font-black leading-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.5} />
            Every <span className="bg-[#ffeb3b] text-black px-2">story</span> counts.
          </div>
          <div className="text-[11px] font-medium uppercase tracking-wider opacity-70">
            authors@book2byte.africa
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateBook;
