import React, { useState, useEffect, useRef } from 'react';
import { CourseCard } from '../types';

interface CardPreviewProps {
  card: CourseCard;
  index: number;
  total: number;
  isActive: boolean;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card, index, isActive }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // 使用稳定的 Picsum 图片源，添加更多随机性
  const seed = `${card.keyword}_${index}_${card.title.length}`;
  const bgImage = `https://picsum.photos/seed/${encodeURIComponent(seed)}/600/900`;

  // 预加载图片
  useEffect(() => {
    if (!isActive) return; // 只在卡片激活时预加载

    setImageLoaded(false);
    setImageError(false);

    const img = new Image();
    img.src = bgImage;

    const loadTimeout = setTimeout(() => {
      if (!imageLoaded) {
        setImageError(true);
      }
    }, 8000); // 8秒超时

    img.onload = () => {
      clearTimeout(loadTimeout);
      setImageLoaded(true);
    };

    img.onerror = () => {
      clearTimeout(loadTimeout);
      setImageError(true);
    };

    return () => clearTimeout(loadTimeout);
  }, [bgImage, isActive, imageLoaded]);

  return (
    <div
      className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] 
        ${isActive ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-8 scale-95 z-0 pointer-events-none'}
      `}
    >
      <div className="relative w-full h-full flex flex-col bg-zinc-50 dark:bg-zinc-900 overflow-hidden transition-colors duration-500">

        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 select-none">
          {/* 优化的骨架屏 - 带有渐变动画 */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800">
              {/* 闪烁动画 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-[shimmer_2s_infinite]"
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite linear'
                }}
              />
            </div>
            {/* 加载指示器 */}
            {!imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-zinc-400 dark:text-zinc-500">
                  <div className="w-8 h-8 border-2 border-zinc-300 dark:border-zinc-700 border-t-primary-500 rounded-full animate-spin" />
                  <span className="text-xs font-medium tracking-wider">加载中...</span>
                </div>
              </div>
            )}
          </div>

          {/* 主图片 */}
          <img
            ref={imgRef}
            src={bgImage}
            alt={card.title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
            className={`w-full h-3/5 object-cover transition-all duration-1000 ease-out
              ${isActive ? 'scale-110' : 'scale-100'}
              ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}
            `}
            style={{
              // 添加原生的解码优化
              imageRendering: 'crisp-edges',
            }}
          />

          {/* Dual Theme Gradient Overlays */}
          {/* Light Mode: Fade to zinc-50 at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-50/60 to-zinc-50 dark:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent dark:hidden" />

          {/* Dark Mode: Fade to black at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black hidden dark:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent hidden dark:block" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex-1 p-10 flex flex-col justify-between pb-36">

          {/* Top Bar: Chapter Indicator */}
          <div className="flex justify-between items-start pt-4">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full 
                bg-white/40 dark:bg-white/5 
                backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-sm">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-800 dark:text-white/80">
                第 0{index + 1} 章
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Floating Glass Icon */}
            <div className="w-16 h-16 rounded-2xl 
                bg-white/60 dark:bg-white/5 
                backdrop-blur-md border border-white/40 dark:border-white/10 
                flex items-center justify-center text-4xl 
                shadow-xl shadow-zinc-200/50 dark:shadow-black/20 
                ring-1 ring-white/20 dark:ring-white/5">
              {card.emoji}
            </div>

            <div className="space-y-5">
              {/* Serif Title */}
              <h2 className="text-4xl md:text-5xl font-serif font-bold 
                  text-zinc-900 dark:text-white 
                  leading-[1.1] tracking-tight drop-shadow-sm dark:drop-shadow-lg transition-colors duration-500">
                {card.title}
              </h2>

              {/* Divider */}
              <div className="w-14 h-1 bg-primary-500 rounded-full opacity-80" />

              {/* Sans-serif Body */}
              <p className="text-base md:text-lg font-sans font-light leading-relaxed tracking-wide 
                  text-zinc-600 dark:text-zinc-200 
                  drop-shadow-sm dark:drop-shadow-md opacity-90 transition-colors duration-500">
                {card.content}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CardPreview;