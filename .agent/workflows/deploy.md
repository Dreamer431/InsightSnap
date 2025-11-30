---
description: 如何部署课程生成器应用
---

# 课程生成器应用部署指南

本文档提供了部署 InsightSnap 微课程生成器应用的详细步骤。

## 📋 前置要求

- Node.js (推荐 v18 或更高版本)
- npm 或 yarn
- Gemini API 密钥

## 🚀 部署选项

### 选项 1: 本地开发环境运行

1. **克隆或进入项目目录**
```bash
cd d:\path\to\your\project\course-generator
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
在 `.env.local` 文件中设置您的 Gemini API 密钥：
```
GEMINI_API_KEY=your_api_key_here
```

// turbo
4. **启动开发服务器**
```bash
npm run dev
```

应用将在 http://localhost:3000 上运行。

---

### 选项 2: 生产环境构建

1. **构建生产版本**
```bash
npm run build
```

这将在 `dist/` 目录中生成优化后的静态文件。

// turbo
2. **预览生产构建**
```bash
npm run preview
```

---

### 选项 3: 部署到 Vercel (推荐)

Vercel 是部署 Vite 应用的最佳选择之一。

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署到 Vercel**
```bash
vercel
```

4. **配置环境变量**
在 Vercel 仪表板中设置以下环境变量：
- `GEMINI_API_KEY`: 您的 Gemini API 密钥

5. **生产部署**
```bash
vercel --prod
```

---

### 选项 4: 部署到 Netlify

1. **安装 Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **构建项目**
```bash
npm run build
```

3. **部署到 Netlify**
```bash
netlify deploy
```

4. **生产部署**
```bash
netlify deploy --prod
```

5. **配置环境变量**
在 Netlify 仪表板的 Site settings > Build & deploy > Environment 中添加：
- `GEMINI_API_KEY`: 您的 Gemini API 密钥

---

### 选项 5: 部署到自己的服务器

1. **构建项目**
```bash
npm run build
```

2. **使用 Nginx 或 Apache 部署**

**Nginx 配置示例** (`/etc/nginx/sites-available/course-generator`):
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/course-generator/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **复制构建文件到服务器**
```bash
scp -r dist/* user@your-server:/var/www/course-generator/
```

4. **重启 Nginx**
```bash
sudo systemctl restart nginx
```

---

### 选项 6: Docker 容器化部署

1. **创建 Dockerfile**
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **创建 nginx.conf**
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

3. **构建 Docker 镜像**
```bash
docker build -t course-generator .
```

4. **运行容器**
```bash
docker run -d -p 80:80 --name course-generator course-generator
```

---

## 🔑 环境变量配置

确保在部署环境中设置以下环境变量：

- `GEMINI_API_KEY`: 您的 Google Gemini API 密钥

## ⚠️ 注意事项

1. **API 密钥安全**: 永远不要将 API 密钥提交到版本控制系统中
2. **CORS 设置**: 如果遇到 CORS 问题，请检查您的 API 配置
3. **构建优化**: 生产构建会自动进行代码压缩和优化
4. **环境变量**: 不同的部署平台有不同的环境变量配置方式

## 📊 性能优化建议

1. 启用 Gzip/Brotli 压缩
2. 配置 CDN 加速静态资源
3. 设置适当的缓存策略
4. 监控应用性能和错误

## 🆘 故障排查

如果部署后遇到问题：

1. 检查浏览器控制台是否有错误
2. 验证环境变量是否正确配置
3. 确认 API 密钥有效且有足够的配额
4. 检查网络请求是否被阻止