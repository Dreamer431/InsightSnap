// English translations
import type { Translations } from './zh-CN';

export const en: Translations = {
    // Header
    appName: 'InsightSnap',

    // Hero Section
    heroTitle1: 'Redefine Micro-learning',
    heroTitle2: 'with Minimalism',
    heroSubtitle: 'One minute, two clicks, three cards - Complex concepts at a glance',
    heroTagline: 'Your curiosity, knowledge delivered',

    // Input
    inputPlaceholder: 'What to explore? (e.g., Game Theory, Photography)',

    // Tags
    tags: ['Stoic Philosophy', 'Wine Tasting', 'Web3 Basics', 'Minimalist Living'],

    // Loading
    loadingStep1: 'Building knowledge structure...',
    loadingStep2: 'Extracting core concepts...',
    loadingStep3: 'Designing interactive experience...',

    // Error
    generateError: 'Failed to generate course. Please try again.',
    mindMapError: 'Mind map generation failed. Please check API Key permissions.',

    // History
    recentExplore: 'Recent Exploration',
    knowledgePoints: ' knowledge points',
    quiz: ' quiz',

    // Empty State
    emptyTitle: 'Ready for Inspiration',
    emptySubtitle1: 'Enter a keyword',
    emptySubtitle2: 'Start your micro-knowledge journey',

    // Card Preview
    chapter: 'Chapter {n}',
    loading: 'Loading...',

    // Quiz Preview
    quizHeader: 'Knowledge Check',
    correctAnswer: 'Correct!',
    explanation: 'Explanation',
    generateMindMap: 'Generate Mind Map',
    generatingMindMap: 'Creating mind map...',
    knowledgeCrystal: 'Knowledge Crystal',
    clickToClose: 'Click anywhere to close',
    clickToEnlarge: 'Click to enlarge',
    saveToLocal: 'Save to device',

    // API Error
    apiKeyNotSet: '❌ Gemini API Key not set!\n\nPlease follow these steps:\n1. Copy .env.example to .env.local\n2. Set in .env.local: GEMINI_API_KEY=your_key\n3. Restart the dev server\n\nGet API Key: https://aistudio.google.com/apikey',
};
