<div align="center">

# 🎯 InsightSnap

### 极简主义微课程生成器

*一分钟，两次点击，三张卡 - 让复杂概念一目了然*

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-8E75B2?style=flat&logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

[在线演示](https://your-demo-url.vercel.app) · [功能特性](#✨-功能特性) · [快速开始](#🚀-快速开始) · [部署](#📦-部署)

<div align="center">
  
### 📹 产品演示


https://github.com/user-attachments/assets/3700ca84-8206-42c5-82a2-16a4c64cd94d


*观看 InsightSnap 如何在一分钟内将主题转化为精美的学习卡片*

</div>

</div>

---

## ✨ 功能特性

🤖 **AI 驱动学习**  
基于 Google Gemini AI，智能生成结构化的微课程内容

🎨 **精美设计**  
极简主义设计理念，优雅的渐变配色和流畅的动画效果

📱 **响应式界面**  
完美适配桌面端和移动设备，提供沉浸式学习体验

🌓 **深色/浅色主题**  
支持主题切换，适应不同环境的使用需求

🧠 **思维导图**  
自动生成知识点思维导图，帮助建立知识体系

📝 **互动测验**  
每个课程配备互动式测验，巩固学习效果

📚 **学习历史**  
自动保存学习记录，随时回顾已学内容

⌨️ **键盘导航**  
支持方向键快速浏览卡片，提升学习效率

---

## 🚀 快速开始

### 前置要求

- **Node.js** 18.0 或更高版本
- **Gemini API Key** - [获取免费 API Key](https://aistudio.google.com/apikey)

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/Dreamer431/insightsnap.git
   cd insightsnap
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   复制 `.env.example` 为 `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   编辑 `.env.local` 并添加你的 Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   > [!IMPORTANT]
   > **关于思维导图生成功能**: 免费版 API Key 不支持 `gemini-3-pro-image` 模型。如需使用思维导图生成功能，请：
   > - 升级到付费 API Key，或
   > - 修改 `services/gemini.ts` 中 `generateMindMapImage` 函数的模型为免费支持的模型（如 `gemini-2.5-flash`），但图像生成质量可能受影响

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **打开浏览器**
   
   访问 [http://localhost:3000](http://localhost:3000) 开始使用！

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| **React 19** | 用户界面构建 |
| **TypeScript** | 类型安全 |
| **Vite** | 构建工具和开发服务器 |
| **Tailwind CSS** | 样式框架 |
| **Google Gemini AI** | AI 内容生成 |
| **Vercel** | 部署平台 |

---

## 📦 部署

### Vercel 部署（推荐）

1. 点击按钮一键部署：

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dreamer431/insightsnap)

2. 在 Vercel 项目设置中添加环境变量：
   - `GEMINI_API_KEY`: 你的 Gemini API Key

3. 部署完成！

### 手动部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

构建产物位于 `dist` 目录，可以部署到任何静态托管服务。

---

## 📖 使用指南

1. **输入主题**  
   在输入框中输入你想学习的任何主题（如：量子物理、咖啡文化）

2. **生成课程**  
   点击生成按钮，AI 将在约30秒内创建3张精美的学习卡片

3. **浏览学习**  
   使用导航按钮或键盘方向键浏览卡片内容

4. **完成测验**  
   在最后一张卡片完成互动测验，检验学习成果

5. **生成思维导图**  
   点击"生成思维导图"按钮，获得知识结构的可视化展示

---

## 🎯 项目结构

```
insightsnap/
├── components/          # React 组件
│   ├── CardPreview.tsx  # 卡片预览组件
│   └── QuizPreview.tsx  # 测验组件
├── services/            # 服务层
│   └── gemini.ts        # Gemini API 集成
├── types.ts             # TypeScript 类型定义
├── App.tsx              # 主应用组件
├── index.tsx            # 应用入口
├── index.html           # HTML 模板
├── index.css            # 全局样式
├── vite.config.ts       # Vite 配置
└── tsconfig.json        # TypeScript 配置
```

---

## 🤝 贡献

欢迎贡献！如果你有好的想法或发现了问题：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解更多细节。

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

---

## 🙏 致谢

- [Google Gemini](https://ai.google.dev/) - 提供强大的 AI 能力
- [React](https://reactjs.org/) - 优秀的 UI 框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用的 CSS 框架
- [Vite](https://vitejs.dev/) - 快速的构建工具

---

<div align="center">

**用 ❤️ 构建，为知识探索者服务**

[⬆ 回到顶部](#-insightsnap)

</div>
