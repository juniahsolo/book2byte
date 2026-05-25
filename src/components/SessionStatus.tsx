import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { CheckCircle2, X } from 'lucide-react';

export const SessionStatus = () => {
  const [user, setUser] = useState<User | null>(null);
  const [visible, setVisible] = useState(true);
  const [justSignedIn, setJustSignedIn] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_IN') {
        setJustSignedIn(true);
        setVisible(true);
        setTimeout(() => setJustSignedIn(false), 4000);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!user || !visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[2500] bg-[#1A1A1A] text-white border border-black shadow-lg max-w-xs animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3 p-4">
        <CheckCircle2 size={18} className="text-[#FA76FF] mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">
            {justSignedIn ? 'Signed in' : 'Session active'}
          </div>
          <div className="text-sm font-medium truncate">{user.email}</div>
          <div className="text-[10px] uppercase tracking-wider opacity-40 mt-1 font-mono truncate">
            id: {user.id.slice(0, 8)}…
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-white/50 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
