import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Quiz } from '../types';
import { useI18n } from '../i18n';

interface QuizPreviewProps {
    quiz: Quiz;
    isActive: boolean;
    onReset: () => void;
    onGenerateMindMap: () => void;
    isGeneratingImage: boolean;
    mindMapImage?: string;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({
    quiz,
    isActive,
    onGenerateMindMap,
    isGeneratingImage,
    mindMapImage
}) => {
    const { t } = useI18n();
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleSelect = (idx: number) => {
        if (showResult) return;
        setSelected(idx);
        setShowResult(true);
    };

    const isCorrect = selected === quiz.correctIndex;

    // Lightbox Modal - rendered via portal to escape container constraints
    const lightboxModal = isZoomed && mindMapImage && createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out animate-fade-in"
            onClick={() => setIsZoomed(false)}
        >
            <img
                src={mindMapImage}
                alt="Mind Map Fullscreen"
                className="max-w-full max-h-full rounded-lg shadow-2xl animate-slide-up object-contain"
            />
            <div className="absolute bottom-10 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm border border-white/20">
                {t.clickToClose}
            </div>
        </div>,
        document.body
    );

    return (
        <>
            {/* Lightbox Modal rendered via portal */}
            {lightboxModal}

            <div
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] 
          ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}
        `}
            >
                <div className="w-full h-full bg-zinc-50 dark:bg-[#0c0c0e] flex flex-col relative overflow-hidden">

                    {/* Subtle decorative gradient background */}
                    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />

                    <div className="flex-1 p-10 flex flex-col pt-24 pb-32 relative z-10 overflow-y-auto custom-scrollbar">

                        <div className="mb-10 relative">
                            <span className="inline-block px-2 py-1 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-900/50 rounded bg-primary-50 dark:bg-primary-900/10">
                                {t.quizHeader}
                            </span>
                            {/* Serif Font for Question */}
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                                {quiz.question}
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {quiz.options.map((option, idx) => {
                                let stateClass = "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/60";
                                let icon = <span className="text-xs font-bold text-zinc-400 dark:text-zinc-200 font-sans opacity-70">0{idx + 1}</span>;

                                if (showResult) {
                                    if (idx === quiz.correctIndex) {
                                        stateClass = "border-green-500/50 bg-green-50/50 dark:bg-green-500/10 text-green-800 dark:text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.15)]";
                                        icon = <span className="text-green-600 dark:text-green-400 text-lg">✓</span>;
                                    } else if (idx === selected) {
                                        stateClass = "border-red-500/50 bg-red-50/50 dark:bg-red-500/10 text-red-800 dark:text-red-300";
                                        icon = <span className="text-red-600 dark:text-red-400 text-lg">✕</span>;
                                    } else {
                                        stateClass = "opacity-40 grayscale border-transparent";
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(idx)}
                                        disabled={showResult}
                                        className={`w-full p-5 text-left rounded-2xl border backdrop-blur-sm transition-all duration-300 flex items-center group active:scale-[0.98] ${stateClass}`}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 flex items-center justify-center mr-4 shrink-0 transition-colors">
                                            {icon}
                                        </div>
                                        <span className="font-sans font-medium text-sm md:text-base tracking-wide">{option}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation Card */}
                        <div className={`mt-8 transition-all duration-700 transform ${showResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                            <div className={`p-6 rounded-2xl backdrop-blur-md border ${isCorrect
                                ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30'
                                : 'bg-zinc-100/50 dark:bg-zinc-800/30 border-zinc-200 dark:border-zinc-700'
                                }`}>
                                <h4 className={`font-serif font-bold text-lg mb-2 flex items-center gap-2 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                    {isCorrect ? t.correctAnswer : t.explanation}
                                </h4>
                                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-200 leading-relaxed font-sans">
                                    {quiz.explanation}
                                </p>
                            </div>

                            {/* Mind Map Generator Section */}
                            <div className="mt-8 border-t border-dashed border-zinc-200 dark:border-zinc-800/50 pt-8 pb-4">
                                {!mindMapImage && !isGeneratingImage && (
                                    <div className="relative group">
                                        {/* Glow effect underneath */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-purple-500 to-primary-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                                        <button
                                            onClick={onGenerateMindMap}
                                            className="relative w-full py-5 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-primary-200/50 dark:border-primary-500/30 text-primary-600 dark:text-primary-200 font-bold shadow-[0_8px_32px_rgba(99,102,241,0.15)] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                                        >
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary-50/80 via-transparent to-primary-50/80 dark:from-primary-900/40 dark:via-transparent dark:to-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            <span className="text-2xl drop-shadow-sm group-hover:rotate-12 transition-transform duration-300">✨</span>
                                            <span className="tracking-widest text-base drop-shadow-sm z-10">{t.generateMindMap}</span>
                                        </button>
                                    </div>
                                )}

                                {isGeneratingImage && (
                                    <div className="w-full py-8 flex flex-col items-center justify-center gap-4 bg-zinc-50/50 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/5 backdrop-blur-sm">
                                        <div className="relative">
                                            <div className="w-12 h-12 border-4 border-zinc-200 dark:border-zinc-700 rounded-full"></div>
                                            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                            <div className="absolute inset-0 flex items-center justify-center text-[10px]">AI</div>
                                        </div>
                                        <span className="text-xs font-medium tracking-widest text-zinc-500 dark:text-zinc-300 animate-pulse">{t.generatingMindMap}</span>
                                    </div>
                                )}

                                {mindMapImage && (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-300 text-center flex items-center justify-center gap-2">
                                            <span className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800"></span>
                                            {t.knowledgeCrystal}
                                            <span className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800"></span>
                                        </h4>
                                        <div
                                            className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl bg-white relative group cursor-zoom-in"
                                            onClick={() => setIsZoomed(true)}
                                        >
                                            <img
                                                src={mindMapImage}
                                                alt="Generated Mind Map"
                                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs">{t.clickToEnlarge}</span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <a
                                                href={mindMapImage}
                                                download="mind-map.png"
                                                className="inline-flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-300 hover:text-primary-500 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                {t.saveToLocal}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizPreview;