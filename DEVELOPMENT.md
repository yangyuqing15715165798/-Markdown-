# 开发者文档

本文档面向希望参与项目开发或扩展功能的开发者。

## 项目架构

该项目是一个基于React和TypeScript的单页面应用程序，使用Vite作为构建工具。项目结构如下：

```
项目根目录
├── src/ - 源代码目录
│   ├── main.tsx - 应用入口点
│   ├── App.tsx - 主应用组件
│   └── index.css - 全局样式
├── public/ - 静态资源目录
├── dist/ - 构建输出目录
├── package.json - 项目依赖和脚本
└── vite.config.ts - Vite配置
```

### 核心功能模块

1. **Markdown编辑与渲染**：使用`marked`库进行Markdown解析和渲染
2. **数学公式支持**：使用`katex`进行数学公式渲染
3. **代码高亮**：使用`highlight.js`实现代码块语法高亮
4. **文档导出**：
   - HTML导出：使用`file-saver`保存完整HTML文件
   - Word导出：使用`docx`库生成Word文档

## 开发环境设置

1. 克隆仓库并安装依赖
```bash
git clone [仓库地址]
cd [项目目录]
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 运行代码检查
```bash
npm run lint
```

## 代码风格指南

本项目遵循以下代码风格规范：

- 使用TypeScript强类型定义
- 使用函数式组件和React Hooks
- 使用ESLint进行代码质量控制
- 使用Tailwind CSS进行样式设计

### 命名约定

- 组件使用PascalCase命名（如`MarkdownEditor.tsx`）
- 函数和变量使用camelCase命名（如`parseMarkdown`）
- 常量使用大写蛇形命名（如`DEFAULT_CONTENT`）
- CSS类名使用kebab-case命名（如`editor-container`）

## 扩展功能指南

### 添加新的导出格式

如果要添加新的导出格式，可以按照以下步骤进行：

1. 安装必要的库

```bash
npm install your-export-library
```

2. 在App.tsx中创建新的导出函数

```typescript
const exportToNewFormat = useCallback(async () => {
  // 实现新的导出逻辑
  try {
    // 使用安装的库处理Markdown内容
    const result = yourExportLibrary.convert(markdown);
    
    // 保存文件
    saveAs(new Blob([result]), 'document.new-format');
  } catch (err) {
    console.error('Export failed:', err);
  }
}, [markdown]);
```

3. 在UI中添加对应的按钮

```jsx
<button
  onClick={exportToNewFormat}
  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
>
  <Icon className="h-4 w-4 mr-2" />
  导出新格式
</button>
```

### 添加新的Markdown扩展语法

要支持新的Markdown语法扩展，需要配置marked渲染器：

```typescript
// 创建自定义渲染器
const customRenderer = new marked.Renderer();

// 重写需要扩展的方法
customRenderer.paragraph = (text) => {
  // 实现自定义段落渲染逻辑
  return `<p class="custom-paragraph">${text}</p>`;
};

// 应用自定义渲染器
marked.use({ renderer: customRenderer });
```

### 添加新的代码高亮主题

要添加新的代码高亮主题，需要导入highlight.js的主题CSS文件并应用：

1. 安装主题CSS
```bash
npm install highlight.js-theme-name
```

2. 在主入口文件中导入
```typescript
import 'highlight.js-theme-name/styles/theme-name.css';
```

## 性能优化建议

为提高应用性能，特别是处理大型Markdown文档时，建议：

1. **实现编辑器延迟渲染**
```typescript
const [debouncedMarkdown, setDebouncedMarkdown] = useState(markdown);

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedMarkdown(markdown);
  }, 300);
  
  return () => clearTimeout(timer);
}, [markdown]);

// 使用debouncedMarkdown而非markdown来渲染预览
const htmlContent = marked(debouncedMarkdown);
```

2. **大型文档的虚拟滚动**

对于预览区域，考虑使用虚拟滚动库（如react-virtualized）以提高渲染性能。

3. **Web Worker处理Markdown解析**

将Markdown解析移至Web Worker以避免阻塞主线程：

```typescript
// 创建worker.js
self.onmessage = function(e) {
  const { markdown } = e.data;
  // 导入marked和处理逻辑
  const result = marked(markdown);
  self.postMessage({ html: result });
};

// 在应用中使用
const worker = new Worker(new URL('./worker.js', import.meta.url));
worker.onmessage = function(e) {
  const { html } = e.data;
  setHtmlContent(html);
};

// 发送数据给worker
worker.postMessage({ markdown });
```

## 测试

### 单元测试

使用Jest和React Testing Library进行组件测试：

```bash
# 安装测试依赖
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# 运行测试
npm test
```

测试示例：

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders markdown editor', () => {
  render(<App />);
  const editorElement = screen.getByPlaceholderText(/在此输入Markdown文本/i);
  expect(editorElement).toBeInTheDocument();
});

test('updates preview when editing', async () => {
  render(<App />);
  const editorElement = screen.getByPlaceholderText(/在此输入Markdown文本/i);
  await userEvent.clear(editorElement);
  await userEvent.type(editorElement, '# Test Heading');
  
  const previewHeading = screen.getByText('Test Heading');
  expect(previewHeading.tagName).toBe('H1');
});
```

### 性能测试

使用Chrome DevTools的Performance面板记录和分析应用性能，特别关注：

- 渲染时间
- JavaScript执行时间
- 内存使用情况

## 部署与发布

### 发布新版本

1. 更新版本号
```bash
npm version patch|minor|major
```

2. 构建生产版本
```bash
npm run build
```

3. 测试生产构建
```bash
npm run preview
```

4. 提交变更并创建标签
```bash
git add .
git commit -m "Release vX.Y.Z"
git tag vX.Y.Z
git push && git push --tags
```

5. 发布到NPM（如果适用）
```bash
npm publish
```

## 问题排查

### 常见开发问题

1. **导出功能不工作**
   - 检查是否有浏览器控制台错误
   - 确认相关库（docx, file-saver）是否正确安装和导入
   - 验证传递给导出函数的数据格式是否正确

2. **Markdown渲染问题**
   - 检查marked配置是否正确
   - 验证自定义渲染器是否工作
   - 检查输入的Markdown语法是否有效

3. **样式问题**
   - 确认Tailwind类名是否正确
   - 检查CSS优先级和覆盖问题
   - 验证响应式设计断点是否正确配置

## 贡献指南

1. Fork仓库并克隆到本地
2. 创建新的特性分支
3. 实现功能或修复并编写测试
4. 确保代码通过lint检查和测试
5. 提交变更并创建Pull Request

请确保遵循现有的代码风格和提交消息格式。 