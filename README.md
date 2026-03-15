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

### 方式二：Vercel CLI（含 Token 方式，解决登录网络错误）

若执行 `npx vercel login` 时出现 **"Client network socket disconnected before secure TLS connection"** 或 **"The specified token is not valid"**，说明设备码登录受网络/代理影响，可用 **Token 登录** 代替：

1. 用浏览器打开 [vercel.com](https://vercel.com) 并登录（不受 CLI 网络影响）。
2. 进入 [Account → Tokens](https://vercel.com/account/tokens)，点击 **Create** 创建一个新 Token（如名称填 `gyyx-deploy`），复制生成的 Token（只显示一次）。
3. 在项目目录执行（将 `你的Token` 替换为刚复制的 Token）：
   ```bash
   export VERCEL_TOKEN=你的Token
   ./deploy.sh
   ```
4. 若首次部署还未关联项目，先执行一次（按提示选 No、项目名、目录 `.` 等）：
   ```bash
   export VERCEL_TOKEN=你的Token
   npx vercel
   ```
   完成关联后再执行 `./deploy.sh` 即可。

**常规 CLI 部署（网络正常时）：**
```bash
npx vercel login   # 按提示在浏览器完成登录
./deploy.sh        # 构建并部署到生产
```

部署后可在 Vercel 控制台绑定自定义域名、配置环境变量（如 `GEMINI_API_KEY`）等。

---

## 发布到 GitHub 与 GitHub Pages

项目已包含 GitHub Actions 工作流，推送到 `main` 后会自动构建并部署到 GitHub Pages，访问地址：`https://你的用户名.github.io/gyyx/`（仓库名需为 `gyyx`，与 `vite.config.ts` 中 `base: '/gyyx/'` 一致）。

### 步骤一：在 GitHub 创建仓库

1. 打开 [github.com](https://github.com) 并登录。
2. 右上角 **「+」→「New repository」**。
3. **Repository name** 填 **`gyyx`**（若用其他名字，需同步改 `vite.config.ts` 里的 `base`）。
4. 选 **Public**，**不要**勾选 "Add a README file"，点击 **Create repository**。

### 步骤二：推送代码到 GitHub

在项目根目录执行（把 `你的用户名` 换成你的 GitHub 用户名）：

```bash
cd /Users/chengfei/Desktop/cursor/代码/gyyx

# 若当前远程是 Gitee，可保留为 origin 并添加 GitHub 为 github；若只打算用 GitHub，可改为：
git remote set-url origin https://github.com/你的用户名/gyyx.git
# 若还没有 remote，则：
# git remote add origin https://github.com/你的用户名/gyyx.git

git push -u origin main
```

若提示登录，按提示用 GitHub 账号或 Personal Access Token 完成认证。

### 步骤三：开启 GitHub Pages

1. 打开仓库页 → **Settings** → 左侧 **Pages**。
2. 在 **Build and deployment** 中，**Source** 选 **GitHub Actions**。
3. 保存后，每次推送到 `main` 会自动运行工作流并发布。首次推送后等 1～2 分钟，访问：**https://你的用户名.github.io/gyyx/**。

之后只需 `git push origin main` 即可自动更新线上页面。

---

## 国内普通网络可访问的免费部署（推荐演示用）

Vercel 在国内直连常不稳定。**Gitee Pages 已对免费用户停止服务**（约 2023 年起仅对企业版开放），因此仓库的「服务」里看不到 Gitee Pages 属于正常情况。可改用下面免费方式。

### 一键构建

```bash
./deploy-gitee.sh
```

或手动：`npm run build`，产物在 `dist/`。

### 国内可用的免费静态托管（替代 Gitee Pages）

| 方式 | 说明 |
|------|------|
| **GitHub Pages** | 免费、稳定。国内部分网络可直连，部分需稍等或换网络。仓库 → Settings → Pages → 选分支和 `/ (root)` 或 `docs`，把 `dist` 内容推上去即可。若用项目页，需在 `vite.config.ts` 里设 `base: '/仓库名/'`。 |
| **腾讯云静态网站托管 / 云开发** | 新用户有免费额度，在腾讯云控制台开通「静态网站托管」，上传 `dist` 目录内容即可，国内访问较快。 |
| **腾讯云 Pages Drop** | 完全免费、拖拽上传静态文件，带 CDN 与 SSL，适合演示。可搜索「腾讯云 Pages Drop」或从腾讯云开发者社区进入。 |
| **Coding.net（腾讯云 DevOps）** | 有静态网站/Pages 类服务，免费额度，国内访问。 |
| **Cloudflare Pages** | 免费，节点在海外，国内直连可能较慢，可作为备选。 |

**部署前**：若托管在**子路径**（如 `https://用户名.github.io/gyyx/`），请在 `vite.config.ts` 中保留 `base: '/gyyx/'`（与仓库名一致）；若部署在**根路径**，改为 `base: '/'` 再执行 `npm run build`。

---

## VERCEL_TOKEN 是什么 / 在哪里获取

**VERCEL_TOKEN** 是 Vercel 账号的访问令牌，用来在终端里用 `vercel` CLI 部署时免登录（避免设备码登录受网络影响）。

**获取方式：**
1. 浏览器打开：**[https://vercel.com/account/tokens](https://vercel.com/account/tokens)**（需先登录 Vercel）
2. 点击 **Create**，输入名称（如 `gyyx-deploy`），创建后页面上会显示一串 Token
3. **立即复制保存**（只显示一次，关闭后无法再查看）

**使用方式：** 在终端执行 `export VERCEL_TOKEN=你复制的Token` 后再运行 `./deploy.sh`。  
**注意：** 不要将 Token 写在 README 或提交到 Git，仅在本机环境变量或本地未提交的配置中使用。

---

## 更新代码后部署到线上

每次改完代码并希望发布到外网演示时，在项目目录执行：

**使用 Token 时（推荐，避免登录网络问题）：**
```bash
cd /Users/chengfei/Desktop/cursor/代码/gyyx
export VERCEL_TOKEN=你的Token
./deploy.sh
```
（请将 `你的Token` 替换为在 Vercel 控制台生成的 Token，勿写入 README 或提交到 Git）

**已用 `vercel login` 登录过时：**
```bash
cd /Users/chengfei/Desktop/cursor/代码/gyyx
./deploy.sh
```

脚本会自动执行 `npm run build` 并执行 `vercel --prod`，终端最后会输出本次的预览链接。
