# 安装指南

本文档详细说明了如何在不同环境下安装、配置和部署在线Markdown格式转换工具。

## 本地开发环境

### 系统要求

- 操作系统：Windows 10+、macOS 10.15+、Linux (任何现代发行版)
- Node.js：16.0.0 或更高版本
- npm：7.0.0 或更高版本（或 yarn 1.22.0+）
- 浏览器：Chrome, Firefox, Safari, Edge 最新版本

### 安装步骤

1. **克隆代码库**

```bash
git clone [仓库地址]
cd [项目目录]
```

2. **安装依赖**

使用npm：

```bash
npm install
```

或使用yarn：

```bash
yarn install
```

3. **启动开发服务器**

```bash
npm run dev
# 或
yarn dev
```

4. **访问应用**

打开浏览器访问：http://localhost:5173

## 生产环境部署

### 构建生产版本

1. **构建应用**

```bash
npm run build
# 或
yarn build
```

构建后的文件将生成在 `dist` 目录中。

2. **测试生产构建**

```bash
npm run preview
# 或
yarn preview
```

### 部署选项

#### 静态托管服务

由于本应用是纯前端应用，可以部署到任何静态网站托管服务：

- **Netlify**：
  - 将GitHub仓库连接到Netlify
  - 设置构建命令为 `npm run build` 或 `yarn build`
  - 设置发布目录为 `dist`

- **Vercel**：
  - 将GitHub仓库连接到Vercel
  - Vercel会自动检测Vite项目并设置正确的构建配置

- **GitHub Pages**：
  - 安装gh-pages包: `npm install --save-dev gh-pages`
  - 在package.json中添加部署脚本:
    ```json
    "scripts": {
      "deploy": "gh-pages -d dist"
    }
    ```
  - 构建并部署: `npm run build && npm run deploy`

#### 使用Docker部署

1. **创建Dockerfile**

在项目根目录创建Dockerfile：

```dockerfile
# 构建阶段
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **构建Docker镜像**

```bash
docker build -t markdown-editor .
```

3. **运行Docker容器**

```bash
docker run -p 8080:80 markdown-editor
```

应用将在 http://localhost:8080 可访问。

## 常见问题

### 依赖安装失败

如果npm安装过程中遇到错误，请尝试：

```bash
# 清除npm缓存
npm cache clean --force

# 使用--legacy-peer-deps标志
npm install --legacy-peer-deps
```

### CORS问题

如果在开发过程中遇到CORS问题，可以配置Vite开发服务器代理：

在`vite.config.ts`中添加：

```typescript
export default defineConfig({
  // ...其他配置
  server: {
    proxy: {
      '/api': {
        target: 'http://your-api-server.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

## 环境配置

如果需要配置不同的环境变量，可以在项目根目录创建以下文件：

- `.env` - 所有环境均加载
- `.env.development` - 开发环境加载
- `.env.production` - 生产环境加载

例如：

```
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=Markdown编辑器
```

## 进阶配置

### 自定义主题

本项目使用Tailwind CSS进行样式设计。要自定义主题，请修改`tailwind.config.js`文件：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ...其他色调
          900: '#0c4a6e',
        },
        // 添加更多自定义颜色
      },
      // 添加其他自定义主题设置
    },
  },
  // 其他配置
};
```

### 性能优化

对于大型Markdown文件处理，可以考虑：

1. 实现延迟渲染或虚拟滚动
2. 拆分大型Markdown文件的处理为Web Worker 