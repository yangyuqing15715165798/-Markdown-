import React, { useState, useCallback } from 'react';
import { marked } from 'marked';
import { Save, CheckCircle2, FileDown } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, Shading, convertInchesToTwip, ExternalHyperlink, AlignmentType, TabStopPosition, TabStopType } from 'docx';
import { saveAs } from 'file-saver';
import hljs from 'highlight.js';
import katex from 'katex';

// Configure marked with syntax highlighting and math support
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return code;
  },
});

// Custom renderer for math expressions
const renderer = new marked.Renderer();
renderer.text = (text) => {
  const mathRegex = /\$\$(.*?)\$\$|\$(.*?)\$/g;
  return text.replace(mathRegex, (match, block, inline) => {
    try {
      const tex = block || inline;
      const isBlock = !!block;
      return katex.renderToString(tex, {
        displayMode: isBlock,
        throwOnError: false
      });
    } catch (err) {
      console.error('Math parsing error:', err);
      return match;
    }
  });
};

marked.use({ renderer });

// Default content
const defaultContent = `# 在线Markdown格式转换工具

一款简单易用的在线Markdown格式转换工具，帮助你快速转换文本格式。

## 使用说明

1. 在左侧编辑框输入Markdown格式文本
2. 右侧实时预览转换后的效果
3. 点击"复制HTML"按钮获取转换后的HTML代码

## 微信公众号文章排版方法

1. 完成Markdown编辑后，点击"保存为HTML"按钮
2. 在新打开的网页中，按Ctrl+A全选内容
3. 按Ctrl+C复制所有内容
4. 直接粘贴到微信公众号编辑器中即可

开始使用吧！在左侧输入框写下你的第一篇Markdown文章。`;

// Enhanced document styles
const documentStyles = {
  default: {
    font: 'Arial',
    fontSize: 24,
    color: '000000',
  },
  code: {
    font: 'Consolas',
    fontSize: 20,
    background: 'F8F9FA',
    borderColor: 'E5E7EB',
    indentSize: 240, // 0.2 inches in twips
  },
  heading: {
    h1: { fontSize: 36, bold: true },
    h2: { fontSize: 32, bold: true },
    h3: { fontSize: 28, bold: true },
    h4: { fontSize: 26, bold: true },
    h5: { fontSize: 24, bold: true },
    h6: { fontSize: 22, bold: true },
  },
  languages: {
    python: { background: 'F5F7FF' },
    java: { background: 'FFF5F5' },
    cpp: { background: 'F5FFF5' },
    javascript: { background: 'FFFFF5' },
    sql: { background: 'FFF5FF' },
    bash: { background: 'F5F5F5' },
  }
};

// Helper function to calculate indentation
function calculateIndentation(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function App() {
  const [markdown, setMarkdown] = useState(defaultContent);
  const [saved, setSaved] = useState(false);

  const htmlContent = marked(markdown, { breaks: true });

  const saveHtml = useCallback(async () => {
    try {
      // Create a complete HTML document with proper styling
      const fullHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Preview</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        pre {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 0.375rem;
            overflow-x: auto;
        }
        code {
            font-family: ui-monospace, monospace;
        }
        blockquote {
            border-left: 4px solid #e5e7eb;
            margin-left: 0;
            padding-left: 1rem;
            color: #4b5563;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }
        th, td {
            border: 1px solid #e5e7eb;
            padding: 0.5rem;
            text-align: left;
        }
        th {
            background: #f8f9fa;
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

      // Create a Blob with the HTML content
      const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
      
      // Save the file
      saveAs(blob, 'markdown-preview.html');
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save:', err);
    }
  }, [htmlContent]);

  const convertToWord = useCallback(async () => {
    const tokens = marked.lexer(markdown);
    
    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              font: documentStyles.default.font,
              size: documentStyles.default.fontSize,
            },
          },
        },
        paragraphStyles: [
          {
            id: 'Code',
            name: 'Code',
            basedOn: 'Normal',
            run: {
              font: documentStyles.code.font,
              size: documentStyles.code.fontSize,
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 240,
              },
            },
          },
        ],
      },
      sections: [{
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        children: tokens.map(token => {
          switch (token.type) {
            case 'heading':
              const headingStyle = documentStyles.heading[`h${token.depth}`];
              return new Paragraph({
                children: [
                  new TextRun({
                    text: token.text,
                    bold: headingStyle.bold,
                    size: headingStyle.fontSize,
                  }),
                ],
                heading: `Heading${token.depth}` as HeadingLevel,
                spacing: {
                  before: 240,
                  after: 120,
                },
              });

            case 'paragraph':
              const mathRegex = /\$\$(.*?)\$\$|\$(.*?)\$/g;
              const text = token.text;
              const parts = [];
              let lastIndex = 0;
              let match;

              while ((match = mathRegex.exec(text)) !== null) {
                if (match.index > lastIndex) {
                  parts.push(
                    new TextRun({
                      text: text.slice(lastIndex, match.index),
                    })
                  );
                }

                const tex = match[1] || match[2];
                parts.push(
                  new TextRun({
                    text: tex,
                    italics: true,
                    font: 'Cambria Math',
                  })
                );

                lastIndex = match.index + match[0].length;
              }

              if (lastIndex < text.length) {
                parts.push(
                  new TextRun({
                    text: text.slice(lastIndex),
                  })
                );
              }

              return new Paragraph({
                children: parts,
                spacing: {
                  before: 120,
                  after: 120,
                },
              });

            case 'code':
              const lang = (token.lang || 'text').toLowerCase();
              const langStyle = documentStyles.languages[lang] || {};
              const codeLines = token.text.split('\n');
              
              const tabStops = Array.from({ length: 10 }, (_, i) => ({
                type: TabStopType.LEFT,
                position: TabStopPosition.MAX_INDENT * (i + 1),
              }));

              return new Paragraph({
                style: 'Code',
                children: [
                  new TextRun({
                    text: `${lang.toUpperCase()}\n`,
                    bold: true,
                    font: documentStyles.code.font,
                    size: documentStyles.code.fontSize,
                  }),
                  ...codeLines.flatMap((line, index) => {
                    const indentLevel = calculateIndentation(line);
                    const indentSpaces = ' '.repeat(indentLevel);
                    const cleanLine = line.trimLeft();
                    
                    return [
                      new TextRun({
                        text: indentSpaces,
                        font: documentStyles.code.font,
                        size: documentStyles.code.fontSize,
                        preserveSpace: true,
                      }),
                      new TextRun({
                        text: `${cleanLine}${index < codeLines.length - 1 ? '\n' : ''}`,
                        font: documentStyles.code.font,
                        size: documentStyles.code.fontSize,
                      }),
                    ];
                  }),
                ],
                tabStops,
                shading: {
                  type: 'clear',
                  fill: langStyle.background || documentStyles.code.background,
                },
                border: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: documentStyles.code.borderColor },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: documentStyles.code.borderColor },
                  left: { style: BorderStyle.SINGLE, size: 4, color: documentStyles.code.borderColor },
                  right: { style: BorderStyle.SINGLE, size: 1, color: documentStyles.code.borderColor },
                },
                indent: {
                  left: convertInchesToTwip(0.25),
                },
              });

            case 'list':
              return new Paragraph({
                children: token.items.map((item: any, index: number) => 
                  new TextRun({
                    text: `${index + 1}. ${item.text}\n`,
                    size: documentStyles.default.fontSize,
                  })
                ),
                bullet: {
                  level: 0,
                },
                indent: {
                  left: convertInchesToTwip(0.5),
                },
              });

            case 'blockquote':
              return new Paragraph({
                children: [
                  new TextRun({
                    text: token.text,
                    italics: true,
                    size: documentStyles.default.fontSize,
                  }),
                ],
                indent: {
                  left: convertInchesToTwip(0.5),
                },
                border: {
                  left: {
                    style: BorderStyle.SINGLE,
                    size: 4,
                    color: documentStyles.code.borderColor,
                  },
                },
              });

            case 'table':
              return new Table({
                rows: token.header
                  ? [
                      new TableRow({
                        children: token.header.map((cell: string) =>
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: cell,
                                    bold: true,
                                    size: documentStyles.default.fontSize,
                                  }),
                                ],
                                alignment: AlignmentType.CENTER,
                              }),
                            ],
                            shading: {
                              type: 'clear',
                              fill: documentStyles.code.background,
                            },
                          }),
                        ),
                      }),
                      ...token.rows.map((row: string[]) =>
                        new TableRow({
                          children: row.map(cell =>
                            new TableCell({
                              children: [
                                new Paragraph({
                                  children: [
                                    new TextRun({
                                      text: cell,
                                      size: documentStyles.default.fontSize,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ),
                        }),
                      ),
                    ]
                  : token.rows.map((row: string[]) =>
                      new TableRow({
                        children: row.map(cell =>
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: cell,
                                    size: documentStyles.default.fontSize,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ),
                      }),
                    ),
                width: {
                  size: 100,
                  type: 'pct',
                },
              });

            case 'link':
              return new Paragraph({
                children: [
                  new ExternalHyperlink({
                    children: [
                      new TextRun({
                        text: token.text,
                        style: 'Hyperlink',
                        size: documentStyles.default.fontSize,
                      }),
                    ],
                    link: token.href,
                  }),
                ],
              });

            default:
              return new Paragraph({
                children: [
                  new TextRun({
                    text: token.raw || '',
                    size: documentStyles.default.fontSize,
                  }),
                ],
              });
          }
        }),
      }],
    });

    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, 'document.docx');
  }, [markdown]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Markdown 编辑器</h1>
            <div className="flex gap-4">
              <button
                onClick={saveHtml}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    已保存！
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    保存为HTML
                  </>
                )}
              </button>
              <button
                onClick={convertToWord}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FileDown className="h-4 w-4 mr-2" />
                导出Word
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[calc(100vh-12rem)]">
            <div className="h-full rounded-lg border border-gray-300 bg-white shadow-sm">
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-full p-4 resize-none focus:outline-none rounded-lg font-mono text-sm"
                placeholder="在此输入Markdown文本..."
              />
            </div>
          </div>

          <div className="h-[calc(100vh-12rem)]">
            <div 
              className="h-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-sm p-4 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;