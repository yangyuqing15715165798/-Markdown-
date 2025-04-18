# 在线Markdown格式转换工具

<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/729906/deploy-status)](https://enchanting-froyo-729906.netlify.app/)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

</div>

一款功能强大的Markdown编辑器，支持实时预览、HTML导出和Word文档导出功能。

## ✨ 在线体验

访问我们的线上演示: [在线Markdown编辑器](https://enchanting-froyo-729906.netlify.app/)

## 🚀 项目功能

- 💡 **Markdown实时预览**：左侧编辑，右侧即时查看效果
- 📑 **导出HTML**：一键导出为完整HTML文件，便于网页发布
- 📝 **导出Word文档**：支持将Markdown内容转换为格式完善的Word文档
- 🧮 **数学公式支持**：通过KaTeX支持LaTeX数学公式渲染
- 🎨 **代码高亮**：支持多种编程语言的代码高亮显示
- 📱 **响应式设计**：适配多种屏幕尺寸，移动端友好

## 🖼️ 界面预览

<img src="https://via.placeholder.com/800x450.png?text=Markdown+Editor+Preview" alt="编辑器界面预览" width="800" />

*注：实际使用时请替换为真实截图*

## 🔧 技术栈

- [React 18](https://reactjs.org/) - 用户界面库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript超集
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [marked.js](https://marked.js.org/) - Markdown解析与渲染
- [highlight.js](https://highlightjs.org/) - 代码语法高亮
- [KaTeX](https://katex.org/) - 数学公式渲染
- [docx.js](https://docx.js.org/) - Word文档生成
- [file-saver](https://github.com/eligrey/FileSaver.js/) - 客户端文件保存

## 📦 快速开始

### 环境要求

- Node.js 16+ 
- npm 7+ 或 yarn 1.22+

### 安装和运行

```bash
# 克隆仓库
git clone https://github.com/yangyuqing15715165798/-Markdown-.git
cd -Markdown-

# 安装依赖
npm install
# 或
yarn

# 启动开发服务器
npm run dev
# 或
yarn dev
```

开发服务器启动后，访问 http://localhost:5173 即可使用应用。

### 构建项目

```bash
# 构建生产版本
npm run build
# 或
yarn build
```

构建后的文件位于 `dist` 目录。

## 📖 使用指南

1. **编写Markdown**：在左侧编辑框中输入Markdown格式的文本
2. **实时预览**：右侧面板实时显示渲染后的效果
3. **保存为HTML**：点击"保存为HTML"按钮，将当前内容导出为完整的HTML文件
4. **导出Word**：点击"导出Word"按钮，将内容转换为Word文档并下载

更多详细使用说明，请参阅 [使用指南](./USAGE.md)。

## 📚 支持的Markdown功能

- 标题 (H1-H6)
- 文本格式化 (粗体、斜体、删除线等)
- 列表 (有序、无序和任务列表)
- 代码块 (支持超过40种编程语言的语法高亮)
- 表格 (支持文本对齐)
- 引用块 (支持嵌套)
- 链接和图片
- 数学公式 (使用 `$...$` 或 `$$...$$` 语法)
- HTML内联元素
- 脚注
- 定义列表
- 特殊符号

查看 [完整示例](./docs/examples/example.md) 了解所有支持的格式。

## 🔍 特别适用场景

本工具特别适合需要快速排版和导出文档的场景，如：

- 博客文章和技术文档编写
- 学术论文准备 (特别是包含数学公式的)
- 微信公众号文章排版
- 教学资料准备
- 会议记录和笔记整理

## 📋 相关文档

- [安装指南](./INSTALL.md) - 详细的安装和部署说明
- [使用指南](./USAGE.md) - 详细的使用方法和示例
- [开发者文档](./DEVELOPMENT.md) - 面向开发者的技术文档
- [文档目录](./docs/README.md) - 项目文档导航

## 🔄 更新日志

### v1.0.0 (2024-07-xx)
- 初始版本发布
- 支持Markdown编辑和实时预览
- 支持HTML和Word文档导出
- 支持数学公式和代码高亮

## 📄 许可证

MIT License © 2024 [YangYuqing](https://github.com/yangyuqing15715165798)

## 🤝 贡献指南

欢迎提交问题报告和功能请求！如果您想贡献代码，请遵循以下步骤：

1. Fork本仓库
2. 创建您的特性分支：`git checkout -b feature/amazing-feature`
3. 提交您的更改：`git commit -m 'Add some amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交Pull Request

## 📮 联系方式

如有问题或建议，请通过以下方式联系：

- 问题反馈：在GitHub仓库创建Issue
- 功能请求：在GitHub仓库创建Feature Request 