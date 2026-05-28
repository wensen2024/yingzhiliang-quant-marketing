import React, { useState } from 'react';
import { Bot, Globe, ChevronRight, Activity, ShieldCheck, Mail } from 'lucide-react';

type Language = 'zh' | 'en';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');

  const content = {
    zh: {
      nav_title: '盈指量科技',
      nav_lang: 'English',
      hero_title: 'AI全自动全球高净值量化引流与交易',
      hero_desc: '专注寻找全球500万以上资金体量的A股/港股投资者，提供机构级游资战法与顶级量化套利。让机器为您在全网自动搜索、互动并转化高净值客户。',
      hero_cta: '获取方案',
      feature1_title: '全网AI巡航抓取',
      feature1_desc: '实时扫描社交平台、财经社区，精确定位500万资金以上目标客户群。',
      feature2_title: '主动式智能互动',
      feature2_desc: '多模态AI实时与股民对话、解答策略，建立信任并引导转化。',
      feature3_title: '机构级量化战法',
      feature3_desc: '提供胜率68.5%的短线交易策略与无风险套利全家桶，震撼散户认知。',
      stats_title: '用底层数学基础设施降维打击',
      stat1: '3000+',
      stat1_lbl: '实时监控财经信源',
      stat2: '10亿',
      stat2_lbl: '目标资管规模',
      stat3: '78%',
      stat3_lbl: '量化游资小市值年化',
      footer_text: '© 2026 盈指量科技 (Yingzhiliang Tech). All rights reserved.'
    },
    en: {
      nav_title: 'Yingzhiliang Tech',
      nav_lang: '中文',
      hero_title: 'AI Automated Global High-Net-Worth Quant Marketing',
      hero_desc: 'Focused on discovering global A-share/HK-share investors with >5M capital. We provide institutional hot-money tactics and top-tier quant arbitrage. Let machines search, engage, and convert high-net-worth clients for you.',
      hero_cta: 'Get Started',
      feature1_title: 'AI Web Cruising',
      feature1_desc: 'Real-time scanning of social platforms to accurately target clients with 5M+ capital.',
      feature2_title: 'Proactive Smart Engagement',
      feature2_desc: 'Multimodal AI converses with investors in real-time, building trust and driving conversion.',
      feature3_title: 'Institutional Quant Tactics',
      feature3_desc: 'Providing 68.5% win-rate short-term strategies & arbitrage tools to shock retail investors.',
      stats_title: 'Dimensional Strike via Mathematical Infrastructure',
      stat1: '3000+',
      stat1_lbl: 'Financial Sources Monitored',
      stat2: '1 Billion',
      stat2_lbl: 'Target AUM',
      stat3: '78%',
      stat3_lbl: 'Small-Cap Quant Annualized',
      footer_text: '© 2026 Yingzhiliang Tech. All rights reserved.'
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-slate-900 text-white sticky top-0 z-50">
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
      <header className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm border border-blue-500/20">
            <Bot size={16} />
            <span>AI Powered Marketing Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            {t.hero_title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.hero_desc}
          </p>
          <div className="pt-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 mx-auto">
              {t.hero_cta}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Globe size={32} className="text-indigo-500" />}
            title={t.feature1_title}
            desc={t.feature1_desc}
          />
          <FeatureCard 
            icon={<Bot size={32} className="text-blue-500" />}
            title={t.feature2_title}
            desc={t.feature2_desc}
          />
          <FeatureCard 
            icon={<ShieldCheck size={32} className="text-emerald-500" />}
            title={t.feature3_title}
            desc={t.feature3_desc}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">{t.stats_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StatBox val={t.stat1} lbl={t.stat1_lbl} />
            <StatBox val={t.stat2} lbl={t.stat2_lbl} />
            <StatBox val={t.stat3} lbl={t.stat3_lbl} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-center">
        <p className="text-sm">{t.footer_text}</p>
        <p className="text-xs mt-2 flex items-center justify-center gap-1 opacity-50">
          <Mail size={12} /> 121126652@qq.com
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-start p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="p-3 bg-white rounded-xl shadow-sm mb-6 border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function StatBox({ val, lbl }: { val: string, lbl: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-5xl font-black text-blue-600">{val}</div>
      <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{lbl}</div>
    </div>
  );
}