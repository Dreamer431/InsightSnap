import React, { useState, useRef, useEffect } from 'react';
import { generateMicroCourse, generateMindMapImage } from './services/gemini';
import { MicroCourse, LoadingState } from './types';
import CardPreview from './components/CardPreview';
import QuizPreview from './components/QuizPreview';
import { useI18n, type Language } from './i18n';

// --- Icons ---
const SparklesIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z" /></svg>
);
const ArrowRightIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
const RefreshIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>
);
const MoonIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
);
const SunIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
);
const HistoryIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>
);
const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
const LanguageIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);

// --- Components ---

const LoadingStep = ({ text, active, completed }: { text: string; active: boolean; completed: boolean }) => (
  <div className={`flex items-center space-x-3 transition-opacity duration-500 ${active || completed ? 'opacity-100' : 'opacity-30 blur-[1px]'}`}>
    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300
      ${completed ? 'bg-zinc-900 border-zinc-900 dark:bg-white dark:border-white' : active ? 'border-primary-500 scale-110' : 'border-zinc-300 dark:border-zinc-700'}
    `}>
      {completed && <div className="w-1.5 h-2.5 border-b-[1.5px] border-r-[1.5px] border-white dark:border-black rotate-45 mb-0.5" />}
      {!completed && active && <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />}
    </div>
    <span className={`text-sm tracking-wide ${active ? 'text-zinc-900 dark:text-zinc-100 font-medium' : 'text-zinc-500'}`}>{text}</span>
  </div>
);

export default function App() {
  const { language, t, toggleLanguage } = useI18n();

  const [topic, setTopic] = useState('');
  const [course, setCourse] = useState<MicroCourse | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDark, setIsDark] = useState(true);
  const [history, setHistory] = useState<MicroCourse[]>([]);

  // Mobile View State
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Image Generation State
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Loading Steps State
  const [loadingStep, setLoadingStep] = useState(0);

  const totalSlides = course ? course.cards.length + 1 : 0;

  const nextCard = () => {
    if (course && currentIndex < totalSlides - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!course) return;
      // Only enable arrow keys if not focusing on input
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.key === 'ArrowRight') {
        if (currentIndex < totalSlides - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [course, currentIndex, totalSlides]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setLoadingState(LoadingState.LOADING);
    setErrorMsg('');
    setCourse(null);
    setCurrentIndex(0);
    setLoadingStep(1);
    setIsGeneratingImage(false);

    const stepTimer = setInterval(() => {
      setLoadingStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 1200);

    try {
      const data = await generateMicroCourse(topic, language);
      clearInterval(stepTimer);
      setLoadingStep(4);

      setTimeout(() => {
        setCourse(data);
        setLoadingState(LoadingState.SUCCESS);
        setHistory(prev => [data, ...prev.filter(h => h.topic !== data.topic)].slice(0, 8));
        // Automatically switch to preview on mobile
        setShowMobilePreview(true);
      }, 500);

    } catch (err) {
      clearInterval(stepTimer);
      console.error(err);
      setLoadingState(LoadingState.ERROR);
      setErrorMsg(t.generateError);
    }
  };

  const handleGenerateMindMap = async () => {
    if (!course) return;

    try {
      setIsGeneratingImage(true);
      const imageUrl = await generateMindMapImage(course.topic, language);

      setCourse(prev => prev ? { ...prev, mindMapImage: imageUrl } : null);
    } catch (err) {
      console.error("Image generation failed", err);
      alert(t.mindMapError);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const loadFromHistory = (item: MicroCourse) => {
    setCourse(item);
    setTopic(item.topic);
    setCurrentIndex(0);
    setLoadingState(LoadingState.SUCCESS);
    setIsGeneratingImage(false);
    setShowMobilePreview(true);
  };

  const resetAll = () => {
    setCourse(null);
    setTopic('');
    setLoadingState(LoadingState.IDLE);
    setShowMobilePreview(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-foreground transition-colors duration-500 font-sans">

      {/* --- Left Panel: Control Center --- */}
      <div className={`
        w-full md:w-1/2 lg:w-[45%] xl:w-[40%] flex flex-col relative z-10 border-r border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-xl transition-[width] duration-300
        ${showMobilePreview ? 'hidden md:flex' : 'flex'}
      `}>

        {/* Header */}
        <header className="px-6 md:px-10 lg:px-12 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg shadow-blue-500/20">
              <SparklesIcon />
            </div>
            <span className="font-serif font-bold tracking-tight text-xl text-foreground">{t.appName}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-500 dark:text-zinc-300 flex items-center gap-1.5"
              title={language === 'zh-CN' ? 'Switch to English' : '切换到中文'}
            >
              <LanguageIcon />
              <span className="text-xs font-medium">{language === 'zh-CN' ? 'EN' : '中'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-500 dark:text-zinc-300"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 lg:px-12 pb-8 custom-scrollbar">
          <div className="w-full max-w-2xl mx-auto space-y-12 mt-4 md:mt-8">

            {/* Hero Section */}
            <div className="space-y-6 animate-slide-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-[1.15]">
                {t.heroTitle1}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-400">
                  {t.heroTitle2}
                </span>
              </h1>
              <p className="text-zinc-600/80 dark:text-zinc-400/90 text-[17px] font-normal leading-[1.8] tracking-wide max-w-md">
                {t.heroSubtitle}
                <span className="block mt-3 text-[15px] font-light text-zinc-500/70 dark:text-zinc-500/80 tracking-wider">
                  {t.heroTagline}
                </span>
              </p>
            </div>

            {/* Input Section */}
            <div className="space-y-6 animate-slide-up">
              <form onSubmit={handleGenerate} className="relative group">
                <input
                  ref={inputRef}
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t.inputPlaceholder}
                  className="block w-full bg-white/50 dark:bg-black/20 text-foreground border border-black/5 dark:border-white/10 rounded-2xl px-6 py-5 text-lg shadow-sm backdrop-blur-sm placeholder:text-zinc-400 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  disabled={loadingState === LoadingState.LOADING}
                />
                <button
                  type="submit"
                  disabled={loadingState === LoadingState.LOADING || !topic.trim()}
                  className={`
                                absolute right-3 top-3 h-11 w-11 rounded-xl flex items-center justify-center transition-all duration-300
                                ${loadingState === LoadingState.LOADING
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-300 cursor-not-allowed'
                      : 'bg-blue-600 dark:bg-blue-500 text-white hover:scale-105 shadow-lg shadow-blue-500/30'
                    }
                            `}
                >
                  <ArrowRightIcon />
                </button>
              </form>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5">
                {t.tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setTopic(tag)}
                    className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full hover:border-blue-400 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-all backdrop-blur-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Loading Status */}
              {loadingState === LoadingState.LOADING && (
                <div className="py-8 space-y-4 border-t border-black/5 dark:border-white/5">
                  <LoadingStep text={t.loadingStep1} active={loadingStep >= 1} completed={loadingStep > 1} />
                  <LoadingStep text={t.loadingStep2} active={loadingStep >= 2} completed={loadingStep > 2} />
                  <LoadingStep text={t.loadingStep3} active={loadingStep >= 3} completed={loadingStep > 3} />
                </div>
              )}

              {loadingState === LoadingState.ERROR && (
                <div className="p-4 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium animate-fade-in flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {errorMsg}
                </div>
              )}
            </div>

            {/* History Section */}
            {history.length > 0 && (
              <div className="animate-fade-in space-y-5 pt-8 border-t border-black/5 dark:border-white/5">
                <h3 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <HistoryIcon />
                  {t.recentExplore}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {history.map((h, i) => (
                    <div
                      key={i}
                      onClick={() => loadFromHistory(h)}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-black/5 dark:hover:border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/5 flex items-center justify-center text-lg shadow-sm backdrop-blur-sm">
                          {h.cards[0].emoji}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-serif font-medium text-foreground">{h.topic}</span>
                          <span className="text-xs text-zinc-400 dark:text-zinc-500">3{t.knowledgePoints} • 1{t.quiz}</span>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 text-zinc-400 dark:text-zinc-300 -translate-x-2 group-hover:translate-x-0 transition-all">
                        <ArrowRightIcon />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* --- Right Panel: Preview --- */}
      <div className={`
        flex-1 bg-white/30 dark:bg-black/20 backdrop-blur-2xl items-center justify-center relative overflow-hidden transition-colors duration-500
        ${showMobilePreview ? 'flex fixed inset-0 z-50' : 'hidden md:flex'}
        md:static md:p-4 lg:p-6
      `}>

        {/* Background Atmosphere (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Mobile Back Button */}
        {showMobilePreview && (
          <button
            onClick={() => setShowMobilePreview(false)}
            className="md:hidden absolute top-4 left-4 z-[60] p-3 bg-black/20 dark:bg-white/10 text-white rounded-full backdrop-blur-md shadow-lg active:scale-95 transition-transform"
          >
            <XIcon />
          </button>
        )}

        {/* Phone Device Mockup - Responsive */}
        <div className={`
          relative w-full h-full 
          md:w-auto md:h-[95vh] md:max-h-[1100px] md:aspect-[9/19]
          md:rounded-[3rem] 
          bg-zinc-900/5 dark:bg-white/5 backdrop-blur-md
          md:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_50px_100px_-20px_rgba(0,0,0,0.5)]
          transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${course ? 'opacity-100 scale-100' : 'opacity-100 md:opacity-90 md:scale-[0.98]'}
        `}>

          {/* Physical Bezel (Desktop Only) */}
          <div className="absolute inset-0 md:inset-1 md:rounded-[2.8rem] bg-zinc-950 md:border-[6px] border-zinc-900 dark:border-zinc-800 overflow-hidden shadow-inner">

            {/* Notch Area (Desktop Only) */}
            <div className="hidden md:flex absolute top-0 w-full h-12 z-50 justify-between px-7 items-end pb-2.5 text-[10px] font-bold text-white mix-blend-difference pointer-events-none select-none">
              <span>9:41</span>
              <div className="flex gap-1.5 items-center">
                <div className="w-3.5 h-2.5 bg-current rounded-[1px] opacity-80"></div>
              </div>
            </div>

            {/* Screen Content */}
            <div className="w-full h-full bg-black relative">
              {course ? (
                <>
                  {/* Cards Wrapper */}
                  <div className="w-full h-full relative font-sans">
                    {course.cards.map((card, idx) => (
                      <CardPreview
                        key={idx}
                        card={card}
                        index={idx}
                        total={totalSlides}
                        isActive={idx === currentIndex}
                      />
                    ))}
                    <QuizPreview
                      quiz={course.quiz}
                      isActive={currentIndex === course.cards.length}
                      onReset={resetAll}
                      onGenerateMindMap={handleGenerateMindMap}
                      isGeneratingImage={isGeneratingImage}
                      mindMapImage={course.mindMapImage}
                    />
                  </div>

                  {/* Glass Control Bar - Floating at bottom */}
                  <div className="absolute bottom-10 left-6 right-6 h-16 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl z-40 flex items-center justify-between px-2">
                    <button
                      onClick={prevCard}
                      disabled={currentIndex === 0}
                      className={`w-14 h-full flex items-center justify-center text-zinc-900 dark:text-white transition-opacity ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                    >
                      <svg className="w-6 h-6 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </button>

                    {/* Page Indicators */}
                    <div className="flex gap-2">
                      {Array.from({ length: totalSlides }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full transition-all duration-500 ease-out ${i === currentIndex
                            ? 'w-6 bg-zinc-900 dark:bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                            : 'w-1 bg-zinc-900/20 dark:bg-white/20'
                            }`}
                        />
                      ))}
                    </div>

                    {currentIndex < totalSlides - 1 ? (
                      <button
                        onClick={nextCard}
                        className="w-14 h-full flex items-center justify-center text-zinc-900 dark:text-white transition-transform active:scale-95"
                      >
                        <ArrowRightIcon />
                      </button>
                    ) : (
                      <button
                        onClick={resetAll}
                        className="w-14 h-full flex items-center justify-center text-primary-500 dark:text-primary-400 hover:text-primary-600 transition-transform active:scale-95"
                      >
                        <RefreshIcon />
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="w-full h-full flex flex-col items-center justify-center p-10 bg-zinc-50 dark:bg-zinc-950 text-center relative overflow-hidden transition-colors duration-500">

                  <div className="w-24 h-24 bg-gradient-to-br from-white to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-[2rem] shadow-2xl flex items-center justify-center mb-8 text-5xl animate-float border border-white/50 dark:border-white/5 relative z-10">
                    💡
                  </div>
                  <h3 className="font-serif font-bold text-zinc-900 dark:text-white text-2xl mb-3 relative z-10">{t.emptyTitle}</h3>
                  <p className="text-zinc-500 dark:text-zinc-300 text-sm font-light leading-relaxed max-w-[200px] relative z-10">
                    {t.emptySubtitle1}<br />{t.emptySubtitle2}
                  </p>
                </div>
              )}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-900/20 dark:bg-white/20 rounded-full z-50 mix-blend-difference"></div>
          </div>
        </div>

      </div>
    </div>
  );
}