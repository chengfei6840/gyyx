#!/bin/bash
# 一键部署到 Vercel
# 方式1：先执行 npx vercel login（若设备码登录因网络失败，请用方式2）
# 方式2：在 Vercel 控制台创建 Token，然后执行：export VERCEL_TOKEN=你的Token && ./deploy.sh
set -e
cd "$(dirname "$0")"
echo "正在构建..."
npm run build
echo "正在部署到 Vercel..."
if [ -n "$VERCEL_TOKEN" ]; then
  npx vercel --prod --yes --token "$VERCEL_TOKEN"
else
  npx vercel --prod --yes
fi
echo "部署完成，请查看上方输出的预览链接。"
