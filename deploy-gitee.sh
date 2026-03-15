#!/bin/bash
# 构建并准备推送到 Gitee Pages（国内免费、普通网络可访问）
# 使用前请先在 Gitee 创建仓库并添加 remote，见下方说明。
set -e
cd "$(dirname "$0")"

echo "正在构建..."
npm run build

echo ""
echo "构建完成，输出目录: dist/"
echo ""
echo "下一步（若尚未配置 Gitee 仓库）："
echo "  1. 打开 https://gitee.com 登录，新建仓库，仓库名建议: gyyx（公开）"
echo "  2. 在本地执行："
echo "     git init"
echo "     git add ."
echo "     git commit -m \"deploy: 光曜智慧运营平台\""
echo "     git remote add origin https://gitee.com/你的用户名/gyyx.git"
echo "     git branch -M main"
echo "     git push -u origin main -f"
echo "  3. 仓库页 → 服务 → Gitee Pages → 选择分支 main、发布目录填 dist → 启动"
echo "  4. 几分钟后访问: https://你的用户名.gitee.io/gyyx/"
echo ""
echo "若已配置 remote，直接推送并刷新 Pages："
echo "  git add . && git commit -m \"deploy: 更新\" && git push -f origin main"
echo ""
