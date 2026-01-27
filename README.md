# Simon Su 個人網站

這是一個使用純 HTML、CSS 和 JavaScript 建立的現代化個人網站，專為部署到 Cloudflare Pages 設計。

## ✨ 功能特色

- 🎨 **現代化設計** - 精美的漸變色彩與動畫效果
- 🌓 **深色/淺色模式** - 自動偵測系統偏好，可手動切換
- 📱 **響應式設計** - 完美支援手機、平板與桌面裝置
- ⚡ **高效能** - 純靜態網站，載入速度極快
- ♿ **無障礙設計** - 符合 WCAG 標準
- 🔍 **SEO 優化** - 完整的 meta 標籤設定

## 📁 檔案結構

```
├── index.html      # 主頁面
├── style.css       # 樣式表
├── script.js       # JavaScript 功能
└── README.md       # 說明文件
```

## 🚀 部署到 Cloudflare Pages

### 方法一：透過 GitHub 連接

1. **建立 GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **連接 Cloudflare Pages**
   - 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 進入 `Pages` 頁面
   - 點擊 `Create a project` > `Connect to Git`
   - 選擇你的 GitHub repository
   - 設定專案：
     - **專案名稱**: 自訂（例如：`bochengsu-website`）
     - **Production branch**: `main`
     - **Build command**: 留空（純靜態網站不需要）
     - **Build output directory**: `/` 或留空
   - 點擊 `Save and Deploy`

3. **設定自訂網域**
   - 部署完成後，進入專案設定
   - 點擊 `Custom domains` > `Set up a custom domain`
   - 輸入 `bochengsu.com`
   - 按照指示在 DNS 設定中新增 CNAME 記錄

### 方法二：直接上傳

1. 登入 Cloudflare Dashboard
2. 進入 Pages
3. 點擊 `Create a project` > `Direct Upload`
4. 拖曳專案資料夾上傳
5. 設定自訂網域

## 🔧 自訂內容

### 修改個人資訊

編輯 `index.html` 中的以下區塊：

- **名字與頭銜**: 搜尋 `Simon Su` 和 `蘇柏丞`
- **自我介紹**: 在 `#about` 區塊
- **技能列表**: 在 `#skills` 區塊
- **作品集**: 在 `#projects` 區塊
- **工作經歷**: 在 `#experience` 區塊
- **聯繫資訊**: 在 `#contact` 區塊

### 修改社群連結

搜尋並替換以下連結：
- `https://github.com/` → 你的 GitHub
- `https://linkedin.com/` → 你的 LinkedIn
- `https://twitter.com/` → 你的 Twitter

### 修改顏色主題

編輯 `style.css` 中的 CSS 變數：

```css
:root {
    --color-primary: #6366f1;      /* 主色調 */
    --color-primary-light: #818cf8;
    --color-primary-dark: #4f46e5;
    --color-accent: #06b6d4;       /* 強調色 */
}
```

### 修改打字動畫文字

編輯 `script.js` 中的 `typingTexts` 陣列：

```javascript
const typingTexts = [
    '軟體工程師 💻',
    '全端開發者 🚀',
    // 新增更多...
];
```

## 📧 聯繫表單

目前表單僅為前端展示。要啟用實際的郵件發送功能，你可以：

1. **使用 Cloudflare Workers** - 建立 serverless 函數處理表單
2. **使用第三方服務** - 例如 Formspree、Netlify Forms
3. **使用 EmailJS** - 純前端郵件發送方案

### 使用 Formspree 範例

1. 註冊 [Formspree](https://formspree.io/)
2. 建立新表單並取得 endpoint
3. 修改 `index.html` 中的表單：

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## 📝 授權

此專案採用 MIT 授權。歡迎自由使用與修改。

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request！

---

Made with ❤️ by Simon Su
