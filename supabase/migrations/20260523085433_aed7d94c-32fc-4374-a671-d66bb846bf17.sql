
-- Enum for approval status
CREATE TYPE public.book_status AS ENUM ('pending', 'approved', 'rejected');

-- Books table
CREATE TABLE public.books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  author text NOT NULL,
  age_group text NOT NULL DEFAULT '6-9',
  synopsis text,
  chapters jsonb NOT NULL DEFAULT '[]'::jsonb,
  file_path text,
  cover_url text,
  mode text NOT NULL DEFAULT 'write',
  status public.book_status NOT NULL DEFAULT 'pending',
  review_notes text,
  loves_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved books viewable by everyone"
  ON public.books FOR SELECT
  USING (status = 'approved' OR auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authors can insert their own books"
  ON public.books FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authors can update their own books (not status)"
  ON public.books FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update any book"
  ON public.books FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authors can delete their own books"
  ON public.books FOR DELETE
  USING (auth.uid() = user_id);

CREATE TRIGGER books_updated_at
  BEFORE UPDATE ON public.books
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_books_user ON public.books(user_id);
CREATE INDEX idx_books_status ON public.books(status);
CREATE INDEX idx_books_loves ON public.books(loves_count DESC);

-- Likes table
CREATE TABLE public.book_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (book_id, user_id)
);

ALTER TABLE public.book_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Likes viewable by everyone"
  ON public.book_likes FOR SELECT USING (true);

CREATE POLICY "Users can love books"
  ON public.book_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlove their own likes"
  ON public.book_likes FOR DELETE
  USING (auth.uid() = user_id);

-- Maintain loves_count
CREATE OR REPLACE FUNCTION public.book_likes_count_trigger()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.books SET loves_count = loves_count + 1 WHERE id = NEW.book_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.books SET loves_count = GREATEST(loves_count - 1, 0) WHERE id = OLD.book_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER book_likes_ins AFTER INSERT ON public.book_likes
  FOR EACH ROW EXECUTE FUNCTION public.book_likes_count_trigger();
CREATE TRIGGER book_likes_del AFTER DELETE ON public.book_likes
  FOR EACH ROW EXECUTE FUNCTION public.book_likes_count_trigger();

-- Storage bucket for manuscripts (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('manuscripts', 'manuscripts', false)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authors can upload their manuscripts"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'manuscripts'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Authors can read their manuscripts"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'manuscripts'
    AND (auth.uid()::text = (storage.foldername(name))[1] OR public.has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Authors can delete their manuscripts"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'manuscripts'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
