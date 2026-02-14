# 图片相似度对比应用

一个简单的前端应用，用于比较两张图片的相似度并生成差异热力图。

## 功能特性

- 上传两张图片进行对比
- 计算并显示相似度百分比
- 生成差异热力图，直观展示两张图片的不同之处
- 响应式设计，适配不同屏幕尺寸

## 技术栈

- HTML5
- CSS3
- JavaScript (原生)
- Canvas API

## 部署到 Vercel

### 前提条件

1. 安装 Node.js (推荐 v16+)
2. 安装 Vercel CLI (可选，但推荐)
   ```bash
   npm install -g vercel
   ```
3. 拥有 Vercel 账号

### 部署步骤

#### 方法 1: 使用 Vercel CLI

1. 进入项目目录
   ```bash
   cd image-similarity-app
   ```

2. 登录 Vercel
   ```bash
   vercel login
   ```

3. 部署项目
   ```bash
   vercel
   ```

4. 按照提示完成部署配置
   - 选择默认设置即可，这是一个静态网站项目

#### 方法 2: 使用 Vercel 网站

1. 访问 [Vercel 官网](https://vercel.com)
2. 登录您的账号
3. 点击 "New Project"
4. 选择 "Import Git Repository" 或 "Upload"
   - 如果选择上传，直接拖拽整个 `image-similarity-app` 文件夹
   - 如果选择 Git 仓库，先将项目推送到 GitHub/GitLab/Bitbucket
5. 配置部署设置
   - Framework Preset: 选择 "Static Site"
   - Build Command: 留空
   - Output Directory: 留空
6. 点击 "Deploy"

### 部署配置

项目已包含 `vercel.json` 配置文件，确保正确的部署设置：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"
    },
    {
      "src": "*.js",
      "use": "@vercel/static"
    },
    {
      "src": "*.css",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## 本地运行

1. 进入项目目录
   ```bash
   cd image-similarity-app
   ```

2. 使用本地服务器运行
   - 使用 Python 3:
     ```bash
     python -m http.server 8000
     ```
   - 使用 Node.js (需要安装 `http-server`):
     ```bash
     npx http-server -p 8000
     ```
   - 直接在浏览器中打开 `index.html` 文件

3. 访问 `http://localhost:8000` 查看应用

## 使用说明

1. 点击 "选择文件" 按钮上传第一张图片
2. 点击 "选择文件" 按钮上传第二张图片
3. 点击 "对比相似度" 按钮
4. 查看相似度结果和差异热力图

## 项目结构

```
image-similarity-app/
├── index.html          # 主页面
├── script.js           # 核心功能逻辑
├── styles.css          # 样式文件
├── vercel.json         # Vercel 部署配置
└── README.md           # 项目说明文档
```

## 注意事项

- 图片上传大小限制取决于浏览器和设备性能
- 相似度计算基于像素级比较，可能会受到图片大小和分辨率的影响
- 热力图显示的是像素差异，颜色越红表示差异越大，越绿表示差异越小

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+