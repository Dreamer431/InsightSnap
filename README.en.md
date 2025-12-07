<div align="center">

# 🎯 InsightSnap

### Minimalist Micro-Course Generator

*One minute, two clicks, three cards - Complex concepts at a glance*

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-8E75B2?style=flat&logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

[中文](./README.md) | English

[Live Demo](https://course-generator-rust.vercel.app/) · [Features](#-features) · [Quick Start](#-quick-start) · [Deployment](#-deployment)

<div align="center">
  
### 📹 Product Demo


https://github.com/user-attachments/assets/3700ca84-8206-42c5-82a2-16a4c64cd94d


*Watch how InsightSnap transforms topics into beautiful learning cards in one minute*

</div>

</div>

---

## ✨ Features

🤖 **AI-Powered Learning**  
Powered by Google Gemini AI, intelligently generates structured micro-course content

🎨 **Beautiful Design**  
Minimalist design philosophy with elegant gradient colors and smooth animations

📱 **Responsive Interface**  
Perfectly adapts to desktop and mobile devices for an immersive learning experience

🌓 **Dark/Light Theme**  
Theme switching support to adapt to different environments

🌐 **Multilingual Support**  
Full support for English and Chinese with one-click language switching

🧠 **Mind Maps**  
Auto-generates knowledge mind maps to help build knowledge systems

📝 **Interactive Quizzes**  
Each course includes interactive quizzes to reinforce learning

📚 **Learning History**  
Automatically saves learning records for easy review

⌨️ **Keyboard Navigation**  
Arrow key support for quick card browsing

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **Gemini API Key** - [Get a free API Key](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dreamer431/insightsnap.git
   cd insightsnap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   > [!IMPORTANT]
   > **About Mind Map Generation**: The free API Key does not support the `gemini-3-pro-image` model. To use mind map generation, please:
   > - Upgrade to a paid API Key, or
   > - Modify the model in `generateMindMapImage` function in `services/gemini.ts` to a free model (e.g., `gemini-2.5-flash`), but image generation quality may be affected

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to start using!

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | User interface |
| **TypeScript** | Type safety |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Styling framework |
| **Google Gemini AI** | AI content generation |
| **Vercel** | Deployment platform |

---

## 📦 Deployment

### Vercel Deployment (Recommended)

1. Click to deploy with one click:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dreamer431/insightsnap)

2. Add environment variables in Vercel project settings:
   - `GEMINI_API_KEY`: Your Gemini API Key

3. Deployment complete!

### Manual Deployment

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

Build output is in the `dist` directory and can be deployed to any static hosting service.

---

## 📖 Usage Guide

1. **Enter a Topic**  
   Type any topic you want to learn in the input field (e.g., Quantum Physics, Coffee Culture)

2. **Generate Course**  
   Click the generate button, AI will create 3 beautiful learning cards in ~30 seconds

3. **Browse & Learn**  
   Use navigation buttons or keyboard arrow keys to browse card content

4. **Complete Quiz**  
   Complete the interactive quiz on the last card to test your learning

5. **Generate Mind Map**  
   Click "Generate Mind Map" button to get a visual representation of the knowledge structure

---

## 🎯 Project Structure

```
insightsnap/
├── components/          # React components
│   ├── CardPreview.tsx  # Card preview component
│   └── QuizPreview.tsx  # Quiz component
├── i18n/                # Internationalization
│   ├── index.ts         # i18n context and hooks
│   ├── en.ts            # English translations
│   └── zh-CN.ts         # Chinese translations
├── services/            # Service layer
│   └── gemini.ts        # Gemini API integration
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
├── index.tsx            # Application entry
├── index.html           # HTML template
├── index.css            # Global styles
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

---

## 🤝 Contributing

Contributions are welcome! If you have ideas or find issues:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) - Powerful AI capabilities
- [React](https://reactjs.org/) - Excellent UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Fast build tool

---

<div align="center">

**Built with ❤️ for Knowledge Explorers**

[⬆ Back to Top](#-insightsnap)

</div>
