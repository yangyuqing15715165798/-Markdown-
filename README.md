# 在线Markdown格式转换工具

一款功能强大的Markdown编辑器，支持实时预览、HTML导出和Word文档导出功能。

## 项目功能

- 💡 **Markdown实时预览**：左侧编辑，右侧即时查看效果
- 📑 **导出HTML**：一键导出为完整HTML文件，便于网页发布
- 📝 **导出Word文档**：支持将Markdown内容转换为格式完善的Word文档
- 🧮 **数学公式支持**：通过KaTeX支持LaTeX数学公式渲染
- 🎨 **代码高亮**：支持多种编程语言的代码高亮显示
- 📱 **响应式设计**：适配多种屏幕尺寸，移动端友好

## 界面预览

![编辑器界面预览](docs/screenshots/editor-preview.png)
image.png
*注：实际使用时请替换为真实截图*

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- marked.js (Markdown解析)
- highlight.js (代码高亮)
- KaTeX (数学公式渲染)
- docx.js (Word文档生成)
- file-saver (文件下载)

## 开发指南

### 环境要求

- Node.js 16+ 
- npm 7+ 或 yarn 1.22+

### 安装和运行

```bash
# 克隆仓库
git clone [仓库地址]
cd [项目目录]

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

# 预览生产构建
npm run preview
# 或
yarn preview
```

构建后的文件位于 `dist` 目录。

## 使用指南

1. **编写Markdown**：在左侧编辑框中输入Markdown格式的文本
2. **实时预览**：右侧面板实时显示渲染后的效果
3. **保存为HTML**：点击"保存为HTML"按钮，将当前内容导出为完整的HTML文件
4. **导出Word**：点击"导出Word"按钮，将内容转换为Word文档并下载

### 支持的Markdown功能

- 标题 (H1-H6)
- 文本格式化 (粗体、斜体、删除线等)
- 列表 (有序和无序)
- 代码块 (支持语法高亮)
- 表格
- 引用块
- 链接和图片
- 数学公式 (使用 `$...$` 或 `$$...$$` 语法)

### Markdown示例

```markdown
# 标题一
## 标题二
### 标题三

**粗体文字** *斜体文字* ~~删除线~~

> 这是一段引用内容

- 无序列表项1
- 无序列表项2
  - 嵌套列表项

1. 有序列表项1
2. 有序列表项2

[链接文本](https://example.com)

![图片说明](图片地址.jpg)

表格示例：
| 表头1 | 表头2 |
| ----- | ----- |
| 单元格1 | 单元格2 |
| 单元格3 | 单元格4 |

代码示例：
```javascript
function hello() {
  console.log("Hello, world!");
}
```

数学公式：
$E = mc^2$

$$
\frac{d}{dx}(x^n) = nx^{n-1}
$$
```

## 特别说明

本工具特别适合需要快速排版和导出文档的场景，如：

- 博客文章和技术文档编写
- 学术论文准备 (特别是包含数学公式的)
- 微信公众号文章排版
- 教学资料准备

## 功能展示

### HTML导出效果

导出的HTML文件包含完整的样式和脚本，可以直接在浏览器中查看或发布到网站。

![HTML导出效果](docs/screenshots/html-export.png)

### Word导出效果

导出的Word文档保留了原始格式，包括标题层级、代码高亮和数学公式。

![Word导出效果](docs/screenshots/word-export.png)

*注：实际使用时请替换为真实截图*

## 更新日志

### v1.0.0 (2024-07-xx)
- 初始版本发布
- 支持Markdown编辑和实时预览
- 支持HTML和Word文档导出
- 支持数学公式和代码高亮

## 许可证

MIT License

## 贡献指南

欢迎提交问题报告和功能请求！如果您想贡献代码，请遵循以下步骤：

1. Fork本仓库
2. 创建您的特性分支：`git checkout -b feature/amazing-feature`
3. 提交您的更改：`git commit -m 'Add some amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交Pull Request 