# 部署指南

本指南介绍如何将 InsightSnap 部署到各种平台。

## 📋 部署前准备

在部署之前，确保你已经：

1. ✅ 获得了 [Gemini API Key](https://aistudio.google.com/apikey)
2. ✅ 代码已提交到 Git 仓库
3. ✅ 本地测试通过 (`npm run dev`)

## 🚀 Vercel 部署（推荐）

Vercel 是最简单的部署方式，完全免费且性能优异。

### 方法一：一键部署

1. 点击下面的按钮：
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dreamer431/insightsnap)

2. 登录 Vercel 账户（支持 GitHub 登录）

3. 配置环境变量：
   - `GEMINI_API_KEY`: 你的 Gemini API Key

4. 点击 "Deploy" - 完成！

### 方法二：通过 Vercel Dashboard

1. 访问 [Vercel Dashboard](https://vercel.com/new)

2. 导入 Git 仓库：
   - 选择 "Import Project"
   - 连接你的 GitHub 账户
   - 选择 InsightSnap 仓库

3. 配置项目：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. 添加环境变量：
   - 进入 "Environment Variables"
   - 添加：`GEMINI_API_KEY` = `你的API密钥`

5. 点击 "Deploy"

### 方法三：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目目录运行
vercel

# 添加环境变量
vercel env add GEMINI_API_KEY

# 部署到生产环境
vercel --prod
```

### 自定义域名（可选）

1. 在 Vercel Dashboard 中打开你的项目
2. 进入 "Settings" > "Domains"
3. 添加你的域名
4. 按照提示配置 DNS

---

## 🌐 Netlify 部署

### 通过 Netlify UI 部署

1. 访问 [Netlify](https://app.netlify.com/start)

2. 连接 Git 仓库：
   - 选择 "New site from Git"
   - 授权并选择仓库

3. 构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. 环境变量：
   - 进入 "Site settings" > "Environment variables"
   - 添加：`GEMINI_API_KEY`

5. 点击 "Deploy site"

### 使用 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

---

## 📦 静态托管平台

适用于 Cloudflare Pages、GitHub Pages 等。

### 1. 构建项目

```bash
npm run build
```

这将创建 `dist` 目录。

### 2. 上传到托管平台

将 `dist` 目录的内容上传到你选择的静态托管服务。

### 3. 配置环境变量

**重要**: 由于 Vite 的环境变量在构建时就被内联，你需要：

- 在本地构建前设置环境变量
- 或使用托管平台的构建功能并配置环境变量

---

## 🐳 Docker 部署

### 创建 Dockerfile

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 创建 nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

### 构建和运行

```bash
# 构建镜像
docker build -t insightsnap .

# 运行容器
docker run -p 8080:80 insightsnap
```

---

## ⚙️ 环境变量管理

### 开发环境

创建 `.env.local`:
```env
GEMINI_API_KEY=your_development_key
```

### 生产环境

在部署平台的控制台中配置：

| 平台 | 配置路径 |
|------|---------|
| **Vercel** | Settings > Environment Variables |
| **Netlify** | Site settings > Environment variables |
| **Cloudflare** | Workers & Pages > Settings > Environment variables |

### 安全提示

⚠️ **永远不要**将 API 密钥提交到代码库！

- ✅ 使用 `.env.local` (已在 `.gitignore` 中)
- ✅ 在部署平台配置环境变量
- ✅ 定期更换 API 密钥
- ❌ 不要在代码中硬编码密钥
- ❌ 不要将 `.env.local` 提交到 Git

---

## 🔍 验证部署

部署完成后，检查：

1. ✅ 网站可访问
2. ✅ 主题切换正常
3. ✅ 可以输入主题并生成课程
4. ✅ 卡片导航流畅
5. ✅ 移动端显示正常
6. ✅ 无控制台错误

---

## 🆘 常见问题

### API 密钥无效

**问题**: 部署后显示 API 错误

**解决**:
- 确认环境变量名称正确：`GEMINI_API_KEY`
- 在部署平台重新部署（有些平台需要）
- 检查 API 密钥是否有效

### 页面刷新 404

**问题**: 刷新页面显示 404

**解决**: 
- Vercel/Netlify 会自动处理
- 其他平台需要配置 URL 重写到 `index.html`

### 构建失败

**问题**: 部署时构建失败

**解决**:
```bash
# 本地测试构建
npm run build

# 检查 Node 版本（需要 18+）
node --version
```

---

## 📊 性能优化

### 启用缓存

在 `vercel.json` 或 `netlify.toml` 中配置缓存策略：

**Vercel** (`vercel.json`):
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Netlify** (`netlify.toml`):
```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

需要帮助？查看我们的 [GitHub Issues](https://github.com/Dreamer431/insightsnap/issues) 或提交新问题！
