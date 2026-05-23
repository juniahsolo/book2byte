import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/SEOHead';
import { Navbar } from '@/components/Navbar';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/');
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate('/');
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: 'Welcome back', description: 'Signed in successfully.' });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        toast({ title: 'Account created', description: 'Check your inbox to confirm your email.' });
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#1A1A1A] relative overflow-hidden">
      <SEOHead
        title={isLogin ? 'Sign In | Book2Byte' : 'Create Account | Book2Byte'}
        description={isLogin ? 'Sign in to Book2Byte to write, upload, and share storybooks.' : 'Join Book2Byte — a community of writers building literacy in underserved communities.'}
      />
      <Navbar />

      {/* Decorative side panel — desktop only */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-1/2 bg-[#1A1A1A] text-white flex-col justify-between p-12 z-0">
        <div />
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] opacity-60 mb-6">Book2Byte</div>
          <h1 className="text-6xl xl:text-7xl font-medium leading-[0.95] tracking-[-0.03em]">
            A book can<br />change a life.
          </h1>
          <p className="mt-8 text-base opacity-70 max-w-md leading-relaxed">
            Sign in to write storybooks, submit them for review, and watch readers
            fall in love with your stories — one heart at a time.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] opacity-60">
          <span className="w-8 h-px bg-white/40" />
          Lagos · Nairobi · Accra
        </div>
      </div>

      {/* Form panel */}
      <div className="relative z-10 lg:ml-[50%] min-h-screen flex items-center justify-center px-4 lg:px-12 py-32">
        <div className="w-full max-w-md">
          {/* Tab switcher */}
          <div className="flex border border-black mb-10">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 h-11 text-[11px] uppercase font-medium tracking-wider transition-colors ${
                isLogin ? 'bg-[#1A1A1A] text-white' : 'bg-white text-black hover:bg-[#FA76FF]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 h-11 text-[11px] uppercase font-medium tracking-wider border-l border-black transition-colors ${
                !isLogin ? 'bg-[#1A1A1A] text-white' : 'bg-white text-black hover:bg-[#FA76FF]'
              }`}
            >
              Create Account
            </button>
          </div>

          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.03em] leading-[1] mb-2">
            {isLogin ? 'Welcome back.' : 'Start writing.'}
          </h2>
          <p className="text-sm text-[#1A1A1A]/60 mb-10">
            {isLogin
              ? 'Pick up where you left off.'
              : 'Join the writers building the next generation of readers.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[11px] uppercase tracking-wider font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full h-12 px-4 bg-white border border-black text-[#1A1A1A] placeholder:text-black/30 focus:outline-none focus:bg-[#FA76FF]/10 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] uppercase tracking-wider font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={isLogin ? undefined : 6}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 pr-12 bg-white border border-black text-[#1A1A1A] placeholder:text-black/30 focus:outline-none focus:bg-[#FA76FF]/10 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-2 text-[11px] text-black/50">Minimum 6 characters.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-12 bg-[#1A1A1A] text-white text-[11px] uppercase font-medium tracking-wider border border-black flex items-center justify-center gap-2 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-[#FA76FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="absolute inset-0 z-[5] hidden group-hover:block text-black items-center justify-center" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-black/10 text-[11px] uppercase tracking-wider text-black/60 flex items-center justify-between">
            <Link to="/" className="hover:text-black transition-colors">← Back home</Link>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="hover:text-black transition-colors"
            >
              {isLogin ? 'Need an account?' : 'Have an account?'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
