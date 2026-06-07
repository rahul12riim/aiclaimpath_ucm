# 🛡️ AIClaimPath — Free AI Unemployment Recovery Toolkit

> **Live at [aiclaimpath.com](https://aiclaimpath.com)**

9 AI-powered tools to help unemployed workers across all 50 US states:
- 📋 **File Your Claim** — Eligibility checker, step-by-step guidance, appeal letters
- 💼 **Find Work** — Resume optimizer, job search strategy, interview coach, cover letters  
- 🎓 **Reskill Free** — Skill gap analysis, 100% free learning paths

Built with **Next.js 15 + Claude AI**. MIT licensed. Free forever.

---

## ⚡ Deploy in 10 Minutes

### 1. Clone & install
```bash
git clone https://github.com/rahul12riim/aiclaimpath_ucm.git
cd aiclaimpath_ucm
npm install
```

### 2. Add API key
```bash
cp .env.example .env.local
# Edit .env.local — add your Anthropic API key from console.anthropic.com
```

### 3. Run locally
```bash
npm run dev   # → http://localhost:3000
```

### 4. Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `rahul12riim/aiclaimpath_ucm`
3. Add env var: `ANTHROPIC_API_KEY = sk-ant-...`
4. Click **Deploy** ✅

### 5. Connect aiclaimpath.com (Namecheap DNS)
In Vercel → Domains → Add `aiclaimpath.com`

In Namecheap:
| Type | Host | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

---

## Tech Stack
- **Frontend**: Next.js 15, React 18
- **AI**: Claude Sonnet (Anthropic API, server-side)
- **Deploy**: Vercel
- **Domain**: aiclaimpath.com

## License
MIT — free to use, fork, and contribute.

## Creator
Rahul Raj · Senior Principal TPM, Walmart Global Tech  
USPTO Patent #63/802574 · White House Appreciation 2025
