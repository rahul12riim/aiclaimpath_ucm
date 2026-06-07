#!/bin/bash
# AIClaimPath — Fix GitHub repo & push proper source files
# Run: bash push_to_github.sh

set -e

GITHUB_USER="rahul12riim"
REPO="aiclaimpath_ucm"
REMOTE="https://github.com/$GITHUB_USER/$REPO.git"

echo ""
echo "🛡️  AIClaimPath — Pushing source files to GitHub"
echo "================================================="
echo "  Repo: github.com/$GITHUB_USER/$REPO"
echo ""

# Install deps
echo "→ Installing dependencies..."
npm install --silent
echo "✅ node_modules ready"

# Git init
if [ ! -d ".git" ]; then git init; fi
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"

# Stage everything
git add .

# Commit
git commit -m "🚀 AIClaimPath v1.0 — Full source code

9 AI-powered unemployment recovery tools:
- Claim Filing Assistant (all 50 states)
- Eligibility Checker with WBA estimate
- Appeal Letter Writer
- Resume Optimizer (ATS-ready)
- Job Search Strategist
- Interview Coach (STAR method)
- Cover Letter Generator
- Skill Gap Analyzer
- Free Learning Path Builder

Stack: Next.js 15 + Claude Sonnet API
Deploy: Vercel | Domain: aiclaimpath.com
License: MIT | Open Source" 2>/dev/null || echo "✅ No new changes to commit"

git branch -M main

echo ""
echo "→ Pushing to GitHub..."
echo "   USERNAME: $GITHUB_USER"
echo "   When prompted for password: use your GitHub Personal Access Token"
echo "   (GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens classic → Generate new)"
echo ""

git push -f origin main

echo ""
echo "================================================="
echo "✅ SOURCE CODE IS LIVE ON GITHUB!"
echo "   👉 https://github.com/$GITHUB_USER/$REPO"
echo ""
echo "NEXT: Deploy to Vercel"
echo "  1. Go to https://vercel.com/new"
echo "  2. Import: $REPO"
echo "  3. Add env var: ANTHROPIC_API_KEY = sk-ant-YOUR_KEY"
echo "  4. Click Deploy"
echo ""
echo "THEN: Connect aiclaimpath.com"
echo "  Vercel → Domains → Add aiclaimpath.com"
echo "  Namecheap DNS:"
echo "    A record:     @ → 76.76.21.21"
echo "    CNAME record: www → cname.vercel-dns.com"
echo ""
echo "✅ aiclaimpath.com will be live in ~10 minutes!"
echo "================================================="
