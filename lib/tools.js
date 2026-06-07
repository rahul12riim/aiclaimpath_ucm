export const TOOLS = [
  {
    id: 'claim-guide', pillar: 1, pillarLabel: 'APPLY', emoji: '📋',
    title: 'Claim Filing Assistant', subtitle: 'Step-by-step guidance for your state',
    desc: 'Get a personalized, state-specific guide to file your unemployment claim correctly the first time.',
    color: '#0D7A5F', lightBg: '#E6F5EF',
    fields: [
      { key: 'state', label: 'Your State', placeholder: 'e.g. California, Texas, New York...' },
      { key: 'situation', label: 'Your Situation', placeholder: 'e.g. Laid off after 3 years, company downsizing. Last day was June 1st...' },
      { key: 'concerns', label: 'Any concerns or questions?', placeholder: 'e.g. I worked part-time — am I eligible?' },
    ],
    systemPrompt: `You are an expert unemployment insurance specialist. Given the user's state and situation provide:
1. **Eligibility Quick Check** — Likely eligible or flag concerns
2. **Step-by-Step Filing Guide** — Exact steps for their specific state's UI system
3. **Documents to Gather** — Specific checklist
4. **Key Deadlines** — Critical timing
5. **Common Mistakes to Avoid** — Top 3 pitfalls for their state
6. **Weekly Certification Tips** — How to keep benefits flowing
Be warm, clear, practical. Use plain English with bold headers and bullet points.`,
  },
  {
    id: 'eligibility', pillar: 1, pillarLabel: 'APPLY', emoji: '✅',
    title: 'Eligibility Checker', subtitle: 'Know your rights before you apply',
    desc: 'Get an instant eligibility assessment with your estimated weekly benefit amount and maximum duration.',
    color: '#0D7A5F', lightBg: '#E6F5EF',
    fields: [
      { key: 'state', label: 'State', placeholder: 'e.g. Florida' },
      { key: 'employment', label: 'Employment Details', placeholder: 'e.g. Full-time for 2 years, $65,000/year. Laid off April 15th.' },
      { key: 'reason', label: 'Reason for Unemployment', placeholder: 'e.g. Company layoff / Quit due to unsafe conditions / Contract ended' },
    ],
    systemPrompt: `You are an unemployment insurance eligibility expert. Provide:
1. **Eligibility Verdict** — Likely Eligible / Possibly Eligible / May Have Challenges with reasoning
2. **Estimated Weekly Benefit Amount** — Calculate based on their state's formula, show the math
3. **Maximum Duration** — How many weeks they can collect
4. **Qualifying Criteria Met** — What works in their favor
5. **Potential Disqualifiers** — Any risks
6. **Special Programs** — PEUC, Extended Benefits, Trade Act, etc.
7. **Next Step** — Exactly what to do first`,
  },
  {
    id: 'appeals', pillar: 1, pillarLabel: 'APPLY', emoji: '⚖️',
    title: 'Appeal Letter Writer', subtitle: 'Fight a wrongful denial',
    desc: 'Generate a strong, professional appeal letter tailored to your specific denial reason — ready to submit.',
    color: '#0D7A5F', lightBg: '#E6F5EF',
    fields: [
      { key: 'state', label: 'State', placeholder: 'e.g. Ohio' },
      { key: 'denial_reason', label: 'Denial Reason', placeholder: 'e.g. Denied claiming I was fired for misconduct. I was actually laid off.' },
      { key: 'your_side', label: 'Your Side of the Story', placeholder: 'What actually happened? What evidence do you have?' },
    ],
    systemPrompt: `You are an experienced unemployment appeals attorney assistant. Write a compelling appeal letter:
1. **Formal Letter Header** — Proper format with [PLACEHOLDERS] for dates/case numbers
2. **Clear Opening Statement** — State you are appealing and the denial reason
3. **Factual Counter-Argument** — Methodically address each denial point with facts
4. **Evidence to Attach** — List specific documents to include
5. **Professional Closing** — Confident request for hearing
Keep it formal, persuasive, under 600 words. Use [YOUR NAME] and [DATE] placeholders.`,
  },
  {
    id: 'resume', pillar: 2, pillarLabel: 'FIND WORK', emoji: '📄',
    title: 'Resume Optimizer', subtitle: 'Beat ATS, get the interview',
    desc: 'Paste your resume and target job. Get an ATS-optimized rewrite with missing keywords and impact improvements.',
    color: '#1558A8', lightBg: '#E6EEF8',
    fields: [
      { key: 'resume', label: 'Your Current Resume (paste text)', placeholder: 'Paste your resume here...' },
      { key: 'job_posting', label: 'Target Job Posting', placeholder: 'Paste the job description you are applying for...' },
    ],
    systemPrompt: `You are a professional resume writer and ATS optimization expert. Provide:
1. **ATS Score** — Estimated match % with reasoning
2. **Missing Keywords** — Critical terms from the job not in the resume
3. **Optimized Summary** — Rewrite their professional summary for this role
4. **Top 3 Bullets to Rewrite** — Show before/after with stronger verbs and quantified impact
5. **Skills Section** — Recommended additions/reorganization
6. **Red Flags** — Anything that could filter them out
7. **Quick Wins** — 5 changes they can make in 10 minutes`,
  },
  {
    id: 'job-search', pillar: 2, pillarLabel: 'FIND WORK', emoji: '🔍',
    title: 'Job Search Strategist', subtitle: 'Find your next role faster',
    desc: 'Get a personalized job search strategy with the best platforms, search keywords, and a 30-day action plan.',
    color: '#1558A8', lightBg: '#E6EEF8',
    fields: [
      { key: 'background', label: 'Your Background', placeholder: 'e.g. 5 years retail management, supervised 20 people, $2M inventory...' },
      { key: 'target', label: 'Target Role / Industry', placeholder: 'e.g. Operations manager in logistics. Open to remote.' },
      { key: 'location', label: 'Location & Flexibility', placeholder: 'e.g. Chicago, IL — open to 50 mile radius or remote' },
    ],
    systemPrompt: `You are a career strategist. Create a personalized job search plan:
1. **Role Recommendations** — 5 specific job titles matching their background
2. **Best Platforms** — Where to focus with specific niche boards for their field
3. **Search Keywords** — Exact search strings to use on each platform
4. **Hidden Job Market** — How to tap the 70% of jobs never posted publicly
5. **30-Day Action Plan** — Weekly activity targets
6. **Salary Range** — Realistic market data for their target role and location
7. **Transferable Skills** — How to position their background`,
  },
  {
    id: 'interview', pillar: 2, pillarLabel: 'FIND WORK', emoji: '🎤',
    title: 'Interview Coach', subtitle: 'Practice until you are confident',
    desc: 'Get the 10 most likely interview questions with expert STAR-method coaching tailored to your specific role.',
    color: '#1558A8', lightBg: '#E6EEF8',
    fields: [
      { key: 'role', label: 'Role You Are Interviewing For', placeholder: 'e.g. Customer Service Manager at Target' },
      { key: 'background', label: 'Your Background (brief)', placeholder: 'e.g. 4 years retail, team lead, handled escalations...' },
      { key: 'concern', label: 'What makes you most nervous?', placeholder: 'e.g. Employment gap / fired from last job / switching industries...' },
    ],
    systemPrompt: `You are an executive interview coach. Prepare this candidate:
1. **Top 10 Interview Questions** — Most likely for this specific role (behavioral, situational, technical)
2. **STAR Coaching** — For each question, guide what to cover
3. **Sample Strong Answer** — One complete model answer for the most critical question using their background
4. **Questions to Ask** — 5 impressive questions for the interviewer
5. **Addressing Their Concern** — Specific coaching on their stated nervousness
6. **Opening and Closing** — How to start strong and end memorably`,
  },
  {
    id: 'cover-letter', pillar: 2, pillarLabel: 'FIND WORK', emoji: '✉️',
    title: 'Cover Letter Generator', subtitle: 'Letters that get responses',
    desc: 'Generate a compelling, personalized cover letter in 60 seconds that stands out from the pile.',
    color: '#1558A8', lightBg: '#E6EEF8',
    fields: [
      { key: 'job', label: 'Job & Company', placeholder: 'e.g. Customer Experience Lead at Zappos — culture-first company...' },
      { key: 'background', label: 'Your Relevant Background', placeholder: 'e.g. 6 years customer service, reduced complaints by 30%, led team of 8...' },
      { key: 'story', label: 'Why THIS company?', placeholder: 'e.g. I have been a customer for 10 years and their mission resonates...' },
    ],
    systemPrompt: `You are a professional cover letter writer. Write a compelling cover letter:
1. **Opening Hook** — A memorable first sentence NOT starting with "I am writing to apply..."
2. **Story Arc** — Connect their background to this specific company's mission and values
3. **Proof Points** — 2-3 specific achievements with numbers directly relevant to the role
4. **Company Signal** — Shows they know something specific about the company
5. **Strong Closing** — Confident ask for next steps
Exactly 3 paragraphs, under 350 words. Use [YOUR NAME] and [DATE] as placeholders. Sound human, not corporate.`,
  },
  {
    id: 'skill-gap', pillar: 3, pillarLabel: 'RESKILL', emoji: '🎯',
    title: 'Skill Gap Analyzer', subtitle: 'Know exactly what to learn',
    desc: 'Get a precise skill gap analysis with a prioritized, week-by-week learning roadmap to your target role.',
    color: '#7A4500', lightBg: '#F5EDDF',
    fields: [
      { key: 'current_skills', label: 'Your Current Skills and Experience', placeholder: 'e.g. Excel, customer service, 3 years retail, basic data entry...' },
      { key: 'target_role', label: 'Target Role in 6-12 Months', placeholder: 'e.g. Data Analyst, Salesforce Admin, IT Support, UX Designer...' },
      { key: 'time_weekly', label: 'Hours per week for learning', placeholder: 'e.g. 10 hours / 20 hours / full-time learner' },
    ],
    systemPrompt: `You are a workforce development expert. Provide a precise reskilling roadmap:
1. **Skills You Already Have** — What transfers to the target role
2. **Critical Skill Gaps** — The 5 most important gaps, ranked by hiring frequency
3. **Learning Roadmap** — Phase 1: Foundation / Phase 2: Core Skills / Phase 3: Portfolio
4. **Free Resources for Each Skill** — Specific courses (Coursera, edX, YouTube, freeCodeCamp, etc.)
5. **Timeline** — Realistic weeks/months given their available hours
6. **First Week Action Plan** — Exactly what to start Monday morning
7. **Credentials That Pay Off** — Which certifications employers actually care about`,
  },
  {
    id: 'free-learning', pillar: 3, pillarLabel: 'RESKILL', emoji: '📚',
    title: 'Free Learning Path Builder', subtitle: '100% free resources only',
    desc: 'A curated learning path using only free resources — government programs, free certifications, open courses.',
    color: '#7A4500', lightBg: '#F5EDDF',
    fields: [
      { key: 'goal', label: 'Career Goal', placeholder: 'e.g. Become a medical coder, get into IT help desk, start a business...' },
      { key: 'background', label: 'Education and Background', placeholder: 'e.g. High school diploma, 5 years warehouse work, some college...' },
      { key: 'constraints', label: 'Any constraints?', placeholder: 'e.g. Limited internet, caring for kids, no computer at home...' },
    ],
    systemPrompt: `You are a workforce development specialist focused on 100% free upskilling. Provide a path using ONLY free resources:
1. **Best Free Certifications** — Google Career Certs, AWS, CompTIA, Coursera audit, etc.
2. **Government Programs** — WIOA funding, Trade Adjustment Assistance, community college grants, apprenticeships
3. **Free Platforms** — Khan Academy, Coursera audit, edX audit, YouTube channels, freeCodeCamp mapped to their goal
4. **Week 1 Starting Point** — The single best free resource to start RIGHT NOW
5. **Financial Support** — Pell Grants, SNAP E&T, UI work-search approved training
6. **Community Support** — Free Discord servers, subreddits, meetup groups for their field
Address their specific constraints with practical workarounds.`,
  },
  {
    id: 'benefit-calc', pillar: 1, pillarLabel: 'APPLY', emoji: '💰',
    title: 'Benefit Calculator', subtitle: 'How much will I get?',
    desc: 'Estimate your weekly benefit amount and total payout based on your state and recent wages — the #1 question answered instantly.',
    color: '#0D7A5F', lightBg: '#E6F5EF',
    fields: [
      { key: 'state', label: 'Your State', placeholder: 'e.g. California, Texas, New York...' },
      { key: 'wages', label: 'Recent Earnings', placeholder: 'e.g. I earned about $52,000 over the last year, roughly $13,000 each quarter' },
      { key: 'work_status', label: 'Work Status', placeholder: 'e.g. Full-time, laid off / Part-time / Was earning hourly $22/hr at 40 hrs/week' },
    ],
    systemPrompt: `You are an unemployment benefits calculator expert. Estimate the user's benefits clearly:
1. **Estimated Weekly Benefit Amount (WBA)** — Calculate using their state's actual formula. SHOW THE MATH step by step so they understand it.
2. **State Maximum Check** — Note their state's maximum WBA and whether they hit the cap
3. **Maximum Weeks** — How many weeks their state allows
4. **Total Potential Payout** — Weekly amount × max weeks
5. **What Could Change This** — Factors that raise/lower the estimate (dependents allowance, partial work, etc.)
6. **Important Caveat** — Clearly state this is an estimate and the state agency makes the final determination
Be encouraging and clear. Use plain English. Format the key numbers prominently with bold.`,
  },
  {
    id: 'still-eligible', pillar: 1, pillarLabel: 'APPLY', emoji: '🔄',
    title: 'Am I Still Eligible?', subtitle: 'Weekly check for current claimants',
    desc: 'Already receiving benefits? Worried a missed work search or some income could cost you? Get a quick check on whether you are still eligible this week.',
    color: '#0D7A5F', lightBg: '#E6F5EF',
    fields: [
      { key: 'state', label: 'Your State', placeholder: 'e.g. Ohio' },
      { key: 'situation', label: 'What changed this week?', placeholder: 'e.g. I did some gig work and earned $180 / I missed one of my required job searches / I turned down a job offer / I was sick and unavailable' },
      { key: 'details', label: 'Any other details', placeholder: 'e.g. I usually get $400/week. I have been doing all my work searches until now.' },
    ],
    systemPrompt: `You are an unemployment benefits compliance expert helping someone who is ALREADY receiving benefits and is worried about losing eligibility. Provide:
1. **Quick Verdict** — Likely still eligible / At risk / Need to report this (with clear reasoning)
2. **What You Must Report** — Be specific about what they legally need to disclose on their weekly claim (income, refused work, availability)
3. **How Income Affects This Week** — If they earned money, explain partial benefit rules and roughly how it affects their payment (show the general calculation for their state)
4. **What To Do Right Now** — Concrete next steps to stay compliant
5. **What NOT To Do** — Warn clearly against under-reporting (overpayment penalties, fraud risk)
6. **When To Call Your State Agency** — If their situation needs official guidance
Be supportive but emphasize honesty and accurate reporting protects them. Plain English, bold key points.`,
  },
];

export const PILLARS = [
  { id: 1, label: 'APPLY', title: 'File Your Claim', emoji: '📋', color: '#0D7A5F', lightBg: '#E6F5EF', desc: 'All 50 states · Appeals · Eligibility' },
  { id: 2, label: 'FIND WORK', title: 'Land a Job', emoji: '💼', color: '#1558A8', lightBg: '#E6EEF8', desc: 'Resume · Interview · Job Search' },
  { id: 3, label: 'RESKILL', title: 'Level Up Free', emoji: '🎓', color: '#7A4500', lightBg: '#F5EDDF', desc: '100% free resources · Roadmaps' },
];
