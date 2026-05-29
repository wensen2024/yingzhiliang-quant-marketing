import React, { useState } from 'react';
import { Bot, Globe, ChevronRight, Activity, ShieldCheck, Mail, Database, BrainCircuit, MessageSquare, Target, Users, Zap } from 'lucide-react';

type Language = 'zh' | 'en';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');

  const content = {
    zh: {
      nav_title: '盈指量科技',
      nav_lang: 'English',
      hero_title: 'AI智能营销系统',
      hero_subtitle: '全球股民精准获客与自动化转化方案',
      hero_desc: '专注寻找全球500万以上资金体量的A股/港股投资者。AI自动搜索 → 精准识别 → 主动互动 → 引流转化。',
      hero_cta: '系统演示',
      
      section1_title: '一、项目概述',
      s1_company: '公司',
      s1_company_val: '盈指量科技（股票量化交易服务商）',
      s1_target: '目标用户',
      s1_target_val: '持有500万人民币以上资金的A股/港股股民',
      s1_tasks: '核心任务',
      s1_tasks_val: 'AI自动搜索 → 精准识别 → 主动互动 → 引流转化',
      s1_goal: '最终目标',
      s1_goal_val: '将高净值股民转化为量化交易付费客户',

      section2_title: '二、系统架构总览',
      s2_layer1: '数据采集层',
      s2_layer1_desc: 'Spider 全网爬虫引擎',
      s2_layer2: 'AI识别层',
      s2_layer2_desc: '高净值用户画像生成',
      s2_layer3: '互动转化层',
      s2_layer3_desc: '7步转化自动营销',

      section3_title: '三、数据采集层 —— 全平台爬虫系统',
      s3_desc: '分布式爬虫矩阵，日均采集过滤数百万条股民动态。',
      s3_p1: '股票社交 (雪球、东方财富)',
      s3_p2: '财经媒体 (财联社、同花顺)',
      s3_p3: '港股平台 (富途牛牛、老虎证券)',
      s3_p4: '社交/境外 (微博、抖音、Twitter、YouTube)',

      section4_title: '四、AI用户画像层 —— 精准识别引擎',
      s4_desc: '多维度评分模型与NLP语义分析，精准锁定“A类用户”（≥70分）。',
      s4_w1: '资金规模 (35%)',
      s4_w2: '投资活跃度 (25%)',
      s4_w3: '专业程度 (20%)',
      s4_w4: '平台影响力 (15%)',
      s4_w5: '地理位置 (5%)',

      section5_title: '五、AI自动互动层 —— 智能触达系统',
      s5_desc: '基于GPT-4级别模型与金融知识库的智能对话引擎。',
      s5_f1: 'Day 1: 破冰信息',
      s5_f2: 'Day 3: 价值输出 (量化报告)',
      s5_f3: 'Day 7: 案例触发 (直击痛点)',
      s5_f4: 'Day 14: 邀约体验 (免费试用)',
      s5_f5: 'Day 21: 稀缺性关闭 (策略诊断)',
      
      footer_text: '© 2026 盈指量科技 (Yingzhiliang Tech). All rights reserved.'
    },
    en: {
      nav_title: 'Yingzhiliang Tech',
      nav_lang: '中文',
      hero_title: 'AI Smart Marketing System',
      hero_subtitle: 'Precision Acquisition & Automated Conversion for Global Investors',
      hero_desc: 'Targeting A-share/HK-share investors with >5M RMB capital. AI Auto-Search → Precise ID → Proactive Engagement → Conversion.',
      hero_cta: 'System Demo',
      
      section1_title: 'I. Project Overview',
      s1_company: 'Company',
      s1_company_val: 'Yingzhiliang Tech (Quant Trading Provider)',
      s1_target: 'Target Users',
      s1_target_val: 'A-share/HK-share investors with >5M RMB capital',
      s1_tasks: 'Core Tasks',
      s1_tasks_val: 'Auto-Search → Precise ID → Proactive Engage → Convert',
      s1_goal: 'Ultimate Goal',
      s1_goal_val: 'Convert high-net-worth investors into paid quant clients',

      section2_title: 'II. System Architecture Overview',
      s2_layer1: 'Data Collection Layer',
      s2_layer1_desc: 'Spider Web-Crawling Engine',
      s2_layer2: 'AI Profiling Layer',
      s2_layer2_desc: 'HNWI User Profile Generation',
      s2_layer3: 'Interaction Layer',
      s2_layer3_desc: '7-Step Automated Marketing',

      section3_title: 'III. Data Collection - Cross-Platform Spider',
      s3_desc: 'Distributed spider matrix filtering millions of investor updates daily.',
      s3_p1: 'Stock Social (Xueqiu, EastMoney)',
      s3_p2: 'Financial Media (Cailianshe, 10jqka)',
      s3_p3: 'HK Stock Platforms (Futu, Tiger Brokers)',
      s3_p4: 'Social/Global (Weibo, TikTok, Twitter, YouTube)',

      section4_title: 'IV. AI Profiling Layer - Precision ID Engine',
      s4_desc: 'Multi-dimensional scoring & NLP analysis to lock onto "Class-A Users" (≥70 pts).',
      s4_w1: 'Capital Size (35%)',
      s4_w2: 'Investment Activity (25%)',
      s4_w3: 'Professionalism (20%)',
      s4_w4: 'Platform Influence (15%)',
      s4_w5: 'Geographic Location (5%)',

      section5_title: 'V. AI Interaction - Smart Outreach System',
      s5_desc: 'Intelligent dialogue engine based on GPT-4 level models and financial knowledge base.',
      s5_f1: 'Day 1: Ice-breaking Message',
      s5_f2: 'Day 3: Value Output (Quant Report)',
      s5_f3: 'Day 7: Case Study (Pain Points)',
      s5_f4: 'Day 14: Invitation (Free Trial)',
      s5_f5: 'Day 21: Scarcity Close (Strategy Diagnosis)',
      
      footer_text: '© 2026 Yingzhiliang Tech. All rights reserved.'
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-slate-900 text-white sticky top-0 z-50 shadow-xl">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-500" size={28} />
          <span className="font-bold text-xl tracking-tight">{t.nav_title}</span>
        </div>
        <button 
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="flex items-center gap-1 text-sm font-medium hover:text-blue-400 transition-colors bg-slate-800 px-4 py-2 rounded-full"
        >
          <Globe size={16} />
          {t.nav_lang}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm border border-blue-500/20">
            <Bot size={16} />
            <span>AI Powered Marketing Engine</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            {t.hero_title}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-blue-400">
            {t.hero_subtitle}
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.hero_desc}
          </p>
          <div className="pt-6">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 mx-auto">
              {t.hero_cta}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Content Container */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        
        {/* Section 1: Overview */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Target className="text-blue-500" /> {t.section1_title}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <InfoItem label={t.s1_company} value={t.s1_company_val} />
            <InfoItem label={t.s1_target} value={t.s1_target_val} />
            <InfoItem label={t.s1_tasks} value={t.s1_tasks_val} />
            <InfoItem label={t.s1_goal} value={t.s1_goal_val} />
          </div>
        </section>

        {/* Section 2: Architecture */}
        <section>
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t.section2_title}</h3>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-100 via-blue-500 to-indigo-100 -z-10"></div>
            
            <ArchCard icon={<Database size={32} />} title={t.s2_layer1} desc={t.s2_layer1_desc} color="blue" />
            <ArchCard icon={<BrainCircuit size={32} />} title={t.s2_layer2} desc={t.s2_layer2_desc} color="indigo" />
            <ArchCard icon={<MessageSquare size={32} />} title={t.s2_layer3} desc={t.s2_layer3_desc} color="emerald" />
          </div>
        </section>

        {/* Section 3 & 4 Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Section 3: Data Collection */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t.section3_title}</h3>
            <p className="text-slate-500 text-sm mb-6">{t.s3_desc}</p>
            <ul className="space-y-4">
              <ListItem text={t.s3_p1} />
              <ListItem text={t.s3_p2} />
              <ListItem text={t.s3_p3} />
              <ListItem text={t.s3_p4} />
            </ul>
          </section>

          {/* Section 4: AI Profiling */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t.section4_title}</h3>
            <p className="text-slate-500 text-sm mb-6">{t.s4_desc}</p>
            <div className="space-y-3">
              <ProgressBar label={t.s4_w1} pct="35%" />
              <ProgressBar label={t.s4_w2} pct="25%" />
              <ProgressBar label={t.s4_w3} pct="20%" />
              <ProgressBar label={t.s4_w4} pct="15%" />
              <ProgressBar label={t.s4_w5} pct="5%" />
            </div>
          </section>
        </div>

        {/* Section 5: Interaction */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <Zap className="text-amber-500" /> {t.section5_title}
          </h3>
          <p className="text-slate-500 mb-8">{t.s5_desc}</p>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between items-center relative">
            <div className="hidden md:block absolute top-1/2 left-4 right-4 h-1 bg-slate-100 -z-10 rounded-full"></div>
            <FunnelStep day="1" text={t.s5_f1} active />
            <FunnelStep day="3" text={t.s5_f2} />
            <FunnelStep day="7" text={t.s5_f3} />
            <FunnelStep day="14" text={t.s5_f4} />
            <FunnelStep day="21" text={t.s5_f5} />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-center mt-auto">
        <p className="text-sm">{t.footer_text}</p>
        <p className="text-xs mt-2 flex items-center justify-center gap-1 opacity-50">
          <Mail size={12} /> 121126652@qq.com
        </p>
      </footer>
    </div>
  );
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-slate-800 font-medium">{value}</div>
    </div>
  );
}

function ArchCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: 'blue'|'indigo'|'emerald' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  };
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-slate-200 shadow-sm z-10">
      <div className={`p-4 rounded-2xl mb-4 border ${colorMap[color]}`}>
        {icon}
      </div>
      <h4 className="font-bold text-lg text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-slate-700">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
      <span className="font-medium text-sm">{text}</span>
    </li>
  );
}

function ProgressBar({ label, pct }: { label: string, pct: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
        <span>{label}</span>
        <span className="text-blue-600">{pct}</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: pct }}></div>
      </div>
    </div>
  );
}

function FunnelStep({ day, text, active=false }: { day: string, text: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:w-1/5 m-2 md:m-0 z-10 w-full relative">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-3 ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-slate-100 text-slate-500'}`}>
        {day}
      </div>
      <div className="text-xs font-bold text-slate-700">{text}</div>
    </div>
  );
}
