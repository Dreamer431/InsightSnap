// 中文翻译
export const zhCN = {
    // Header
    appName: 'InsightSnap',

    // Hero Section
    heroTitle1: '以极简主义',
    heroTitle2: '重塑微学习',
    heroSubtitle: '一分钟，两次点击，三张卡 - 让复杂概念一目了然',
    heroTagline: '你的好奇，知识即现',

    // Input
    inputPlaceholder: '探索什么？(例如：博弈论、摄影构图)',

    // Tags
    tags: ['斯多葛哲学', '红酒品鉴', 'Web3 入门', '极简生活'],

    // Loading
    loadingStep1: '构建知识架构...',
    loadingStep2: '萃取核心概念...',
    loadingStep3: '设计交互体验...',

    // Error
    generateError: '生成课程失败，请重试。',
    mindMapError: '思维导图生成失败，请检查 API Key 权限。',

    // History
    recentExplore: '最近探索',
    knowledgePoints: '个知识点',
    quiz: '个测验',

    // Empty State
    emptyTitle: '灵感待命',
    emptySubtitle1: '输入关键词',
    emptySubtitle2: '开启你的微型知识之旅',

    // Card Preview
    chapter: '第 {n} 章',
    loading: '加载中...',

    // Quiz Preview
    quizHeader: '知识验收',
    correctAnswer: '回答正确',
    explanation: '解析',
    generateMindMap: '生成思维导图卡片',
    generatingMindMap: '正在绘制思维导图...',
    knowledgeCrystal: '知识结晶',
    clickToClose: '点击任意处关闭',
    clickToEnlarge: '点击放大',
    saveToLocal: '保存到本地',

    // API Error
    apiKeyNotSet: '❌ Gemini API Key 未设置！\n\n请按照以下步骤配置：\n1. 复制 .env.example 为 .env.local\n2. 在 .env.local 中设置: GEMINI_API_KEY=你的密钥\n3. 重启开发服务器\n\n获取 API Key: https://aistudio.google.com/apikey',
};

export type Translations = typeof zhCN;
