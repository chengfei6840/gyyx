<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/576bdad9-67c7-4b37-8aa3-f7875816a23a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel（外网演示）

### 方式一：Vercel 网页（推荐）

1. 将本项目推送到 **GitHub**（若尚未推送）：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # 在 GitHub 新建仓库后：
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```
2. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录。
3. 点击 **Add New → Project**，选择刚推送的仓库，**Import**。
4. 保持默认（Framework: Vite，Build Command: `npm run build`，Output: `dist`），点击 **Deploy**。
5. 部署完成后会得到一条外网链接（如 `https://xxx.vercel.app`），可分享给他人演示。

### 方式二：Vercel CLI

```bash
npm i -g vercel   # 首次安装 CLI
cd 项目目录
vercel            # 按提示登录并部署，生产环境用 vercel --prod
```

部署后可在 Vercel 控制台绑定自定义域名、配置环境变量（如 `GEMINI_API_KEY`）等。
