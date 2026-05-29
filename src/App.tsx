import { useState, useEffect } from 'react';
import { Search, Shield, ArrowRight, CheckCircle, Activity, Globe, Lock, Smartphone, Users, Terminal, FileText, TrendingUp } from 'lucide-react';

type Language = 'zh' | 'en';
type Step = 'input' | 'analyzing' | 'capture' | 'success';

interface StockData {
  name: string;
  price: string | number;
  drawdown: string;
  sourcesScanned: number;
  volatilityIndex: number;
  analysisZh: string;
  analysisEn: string;
  scores: string[];
}

const GLOBAL_SOURCES = [
  'Bloomberg Terminal', 'Reuters Eikon', 'Wall Street Journal', 'Financial Times', 
  'Yahoo Finance Global', 'CNBC', 'MarketWatch', '雪球 (Xueqiu)', '东方财富 (EastMoney)', 
  'Wind资讯', '同花顺 (10jqka)', '富途牛牛 (Futu)', 'Seeking Alpha', 'Zacks Investment', 
  'Morningstar', 'Barron\'s', 'Investing.com', 'TradingEconomics', 'Nikkei 225 Data', 
  'South China Morning Post', 'FactSet', 'S&P Global Market Intelligence', 'Dow Jones Newswires'
];

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [step, setStep] = useState<Step>('input');
  const [progress, setProgress] = useState(0);
  const [ticker, setTicker] = useState('');
  const [capital, setCapital] = useState('500w+');
  const [contact, setContact] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [activeSource, setActiveSource] = useState(GLOBAL_SOURCES[0]);
  const [logLines, setLogLines] = useState<string[]>([]);
  
  // Admin panel state
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  // Get color styling based on dynamic score
  const getScoreColor = (valStr: string) => {
    const val = parseFloat(valStr);
    if (val > 80) return { color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    if (val > 50) return { color: 'text-blue-400', bg: 'bg-blue-500/10' };
    return { color: 'text-red-400', bg: 'bg-red-500/10' };
  };

  const t = {
    zh: {
      nav_title: '盈指量科技',
      nav_lang: 'English',
      hero_title: '全球百大金融数据 · 实时诊断引擎',
      hero_desc: '接入彭博、路透、Wind等全球Top100权威财经源，结合盈指量实时盘口资金流，为您秒级生成【优化收益与抗回撤方案】。',
      step_input_title: '开启全球数据节点网',
      ticker_placeholder: '输入股票代码/缩写 (如: 600519, AAPL)',
      capital_label: '当前可用于量化的资金规模：',
      cap_1: '100万 以下',
      cap_2: '100万 - 500万',
      cap_3: '500万 以上 (VIP通道)',
      btn_start: '启动全球全网实时深度诊断',
      capture_title: '⚠️ 跨网对冲预警：发现巨大的优化空间',
      capture_desc1: '根据系统并发扫描全球 ',
      capture_desc2: ' 个核心财经节点对【',
      capture_desc3: '】的实时多维测算，您当前持仓存在 ',
      capture_desc4: ' 的隐含回撤风险（波动率指数：',
      capture_desc5: '）。如果采用我们的【机构级高频套利与脉冲共振策略】，预计可将年化收益率提升 12% - 18%。',
      capture_action: '获取【百大信源聚合分析报告】& 申请30天VIP',
      contact_placeholder: '请输入您的微信或手机号接收研报',
      btn_unlock: '立即解锁全球版研报与VIP名额',
      success_title: 'VIP 申请已提交！',
      success_desc: '我们的高级量化研究员将在 15 分钟内与您联系，为您一对一解读这份聚合了全球百大信源的诊断报告，请留意微信或来电。',
      report_title: '【机密】高频量化持仓诊断书',
      report_metrics_title: '核心量化指标测算',
      report_sharpe_before: '当前持仓夏普比率',
      report_sharpe_after: '优化后夏普 (盈指量模型)',
      report_alpha: '模型预测 Alpha',
      report_winrate: '高频信号胜率',
      report_20d_title: '盈指量 · 20维全息深度剖析引擎',
      report_20d_desc: '提取全球100+节点数据，运用非线性流形学习与量价动力学，对该标的进行独家深度穿透。',
      dim_names: [
        '机构控盘度', '游资接力情绪', '散户跟风指数', '暗盘大单流入',
        '多维脉冲共振', '量价时空背离', '波动率微笑扭曲', '趋势动量衰竭',
        '宏观Beta暴露', '盈利动量异象', '供应链风险折价', '政策敏感度',
        '多空舆情指数', '内部人交易异动', '产业链景气度', '研报一致性偏离',
        'T+0胜率截面', '黑天鹅尾部风险', '动态网格空间', '机器踩踏预警'
      ],
      deep_analysis_title: '🧠 独家超额收益思维导读',
      success_notice_title: '🎯 恭喜，完整报告已获取！',
      success_notice_desc: '我们的量化研究员已收到您的信息，将在15分钟内加您微信/致电，并邀请您进入【盈指量·量化超额收益VIP群】，跟单机构级实盘策略。',
      footer: '© 2026 盈指量科技 (Yingzhiliang Tech). All rights reserved.'
    },
    en: {
      nav_title: 'Yingzhiliang Tech',
      nav_lang: '中文',
      hero_title: 'Global Top 100 Data · Real-time Engine',
      hero_desc: 'Connected to Bloomberg, Reuters, Wind & 100+ global sources. We combine this with L2 money flow to generate your optimization plan in seconds.',
      step_input_title: 'Initialize Global Data Grid',
      ticker_placeholder: 'Enter Stock Ticker (e.g., AAPL, 00700)',
      capital_label: 'Available Quant Capital:',
      cap_1: 'Under 1M',
      cap_2: '1M - 5M',
      cap_3: 'Above 5M (VIP)',
      btn_start: 'Run Global Network Diagnosis',
      capture_title: '⚠️ Cross-Network Alert: High Optimization Potential',
      capture_desc1: 'Based on concurrent scanning of ',
      capture_desc2: ' global financial nodes for [',
      capture_desc3: '], your portfolio has an implied drawdown risk of ',
      capture_desc4: ' (Volatility Index: ',
      capture_desc5: '). Applying our Institutional Arbitrage Strategy can boost returns by 12% - 18%.',
      capture_action: 'Get [Aggregated Top-100 Report] & 30-Day VIP',
      contact_placeholder: 'Enter WhatsApp / Phone / WeChat',
      btn_unlock: 'Unlock Global Report & VIP Access',
      success_title: 'VIP Request Submitted!',
      success_desc: 'Our senior quant researcher will contact you within 15 minutes to interpret this top-100 aggregated report.',
      report_title: '[CONFIDENTIAL] Quant Portfolio Diagnosis',
      report_metrics_title: 'Core Quant Metrics',
      report_sharpe_before: 'Current Sharpe Ratio',
      report_sharpe_after: 'Optimized Sharpe (Yingzhiliang)',
      report_alpha: 'Predicted Alpha',
      report_winrate: 'High-Freq Signal Win Rate',
      report_20d_title: 'Yingzhiliang · 20-Dim Holographic Engine',
      report_20d_desc: 'Extracting data from 100+ global nodes using non-linear manifold learning & price dynamics for exclusive deep penetration.',
      dim_names: [
        'Inst. Control', 'Hot Money Vibe', 'Retail FOMO', 'Dark Pool Flow',
        'Pulse Resonance', 'Vol-Price Divergence', 'Vol Smile Distort', 'Momentum Decay',
        'Macro Beta Exp', 'Earnings Anomaly', 'Supply Chain Risk', 'Policy Sens',
        'Long/Short Sent', 'Insider Anomalies', 'Industry Cycle', 'Analyst Deviat',
        'T+0 Win-rate', 'Black Swan Tail Risk', 'Grid Arb Space', 'Algo Stampede'
      ],
      deep_analysis_title: '🧠 Exclusive Excess Return Thesis',
      success_notice_title: '🎯 Full Report Unlocked!',
      success_notice_desc: 'Our quant researcher has received your info and will contact you within 15 mins to invite you to our [Quant Excess Return VIP Group] for institutional live signals.',
      footer: '© 2026 Yingzhiliang Tech. All rights reserved.'
    }
  }[lang];

  useEffect(() => {
    const checkAdmin = () => setIsAdmin(window.location.hash === '#admin');
    checkAdmin();
    window.addEventListener('hashchange', checkAdmin);
    return () => window.removeEventListener('hashchange', checkAdmin);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetch('/api/submit')
        .then(res => res.json())
        .then(data => setLeads(data))
        .catch(console.error);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (step === 'analyzing') {
      fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker })
      })
      .then(res => res.json())
      .then(data => setStockData(data))
      .catch(err => console.error("Analyze error:", err));

      const logInterval = setInterval(() => {
        const randomSource = GLOBAL_SOURCES[Math.floor(Math.random() * GLOBAL_SOURCES.length)];
        setActiveSource(randomSource);
        setLogLines(prev => {
          const newLines = [...prev, `[${new Date().toISOString().split('T')[1].slice(0,8)}] Fetching L2 order book from ${randomSource}... OK`];
          return newLines.slice(-4);
        });
      }, 300);

      const progressInterval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(progressInterval);
            clearInterval(logInterval);
            setStep('capture');
            return 100;
          }
          return p + 0.8; 
        });
      }, 50);

      return () => {
        clearInterval(progressInterval);
        clearInterval(logInterval);
      };
    }
  }, [step, ticker]);

  const handleStart = () => {
    if (!ticker) return alert(lang === 'zh' ? '请输入股票代码' : 'Please enter a ticker');
    setStep('analyzing');
    setProgress(0);
    setLogLines([`[SYS] Initializing connection to 100+ global financial nodes...`]);
  };

  const handleUnlock = async () => {
    if (!contact) return alert(lang === 'zh' ? '请输入联系方式' : 'Please enter contact info');
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker,
          capital,
          contact,
          stockName: stockData?.name,
          drawdown: stockData?.drawdown
        })
      });
    } catch (e) {
      console.error(e);
    }
    setStep('success');
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-slate-100 p-8 font-sans">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="text-blue-600" /> Admin Leads Dashboard
            </h1>
            <button onClick={() => window.location.hash = ''} className="text-sm text-slate-500 hover:text-blue-600">
              Exit Admin
            </button>
          </div>
          {leads.length === 0 ? (
            <div className="text-slate-500 text-center py-10">No leads captured yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-sm font-semibold text-slate-600">Time</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">Contact</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">Capital</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">Stock</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">Drawdown</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l: any) => (
                    <tr key={l.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 text-sm text-slate-600">{new Date(l.timestamp).toLocaleString()}</td>
                      <td className="p-4 text-sm font-bold text-slate-800">{l.contact}</td>
                      <td className="p-4 text-sm text-blue-600 font-semibold">{l.capital}</td>
                      <td className="p-4 text-sm text-slate-600">{l.stockName} ({l.ticker})</td>
                      <td className="p-4 text-sm text-red-500 font-medium">{l.drawdown}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-900 text-slate-50">
      <nav className="flex items-center justify-between px-8 py-5 bg-slate-950 sticky top-0 z-50 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-500" size={28} />
          <span className="font-bold text-xl tracking-tight" onDoubleClick={() => window.location.hash = '#admin'}>{t.nav_title}</span>
        </div>
        <button 
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="flex items-center gap-1 text-sm font-medium hover:text-blue-400 transition-colors bg-slate-900 px-4 py-2 rounded-full border border-slate-800"
        >
          <Globe size={16} />
          {t.nav_lang}
        </button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="max-w-2xl w-full space-y-10 z-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm border border-blue-500/20">
              <Globe size={16} />
              <span>Global Top 100 Financial Nodes Connected</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {t.hero_title}
            </h1>
            <p className="text-slate-400 text-lg">
              {t.hero_desc}
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>

            {step === 'input' && (
              <div className="space-y-6 animate-in fade-in duration-500 relative z-10">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                  <Search className="text-blue-400" /> {t.step_input_title}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      value={ticker}
                      onChange={e => setTicker(e.target.value)}
                      placeholder={t.ticker_placeholder}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 block">{t.capital_label}</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['<1m', '1m-5m', '500w+'].map((val, idx) => (
                        <button
                          key={val}
                          onClick={() => setCapital(val)}
                          className={`py-3 px-2 text-sm font-medium rounded-xl border transition-all ${
                            capital === val 
                              ? 'bg-blue-600/20 border-blue-500 text-blue-400' 
                              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                          }`}
                        >
                          {idx === 0 ? t.cap_1 : idx === 1 ? t.cap_2 : t.cap_3}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleStart}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 mt-4"
                  >
                    <Globe size={20} className="animate-pulse" />
                    {t.btn_start}
                  </button>
                </div>
              </div>
            )}

            {step === 'analyzing' && (
              <div className="py-8 space-y-8 animate-in fade-in duration-300 relative z-10">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="animate-spin w-full h-full text-blue-500/20" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"></circle>
                    <path className="opacity-75 text-blue-500" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center font-bold">
                    <span className="text-3xl text-white">{Math.floor(progress)}%</span>
                  </div>
                </div>
                
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-green-400/80 h-32 overflow-hidden relative">
                  <div className="absolute top-2 right-2 text-slate-500 flex items-center gap-1">
                    <Terminal size={12} /> Live Scan
                  </div>
                  <div className="space-y-1 mt-4">
                    {logLines.map((line, i) => (
                      <div key={i} className="truncate">{line}</div>
                    ))}
                  </div>
                  <div className="mt-2 text-blue-400 font-bold animate-pulse truncate">
                    &gt; Scanning Node: {activeSource}...
                  </div>
                </div>
              </div>
            )}

            {step === 'capture' && (
              <div className="space-y-6 animate-in zoom-in-95 duration-500 relative z-10">
                <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-4">
                  <Shield className="text-amber-500 shrink-0 mt-1" size={28} />
                  <div>
                    <h3 className="font-bold text-amber-500 mb-2 text-lg">{t.capture_title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t.capture_desc1}
                      <span className="text-blue-400 font-bold">{stockData?.sourcesScanned || 102}</span>
                      {t.capture_desc2}
                      <span className="text-white font-bold">{stockData?.name || ticker}</span>
                      {t.capture_desc3}
                      <span className="text-red-400 font-bold text-base bg-red-400/10 px-1 rounded">{stockData?.drawdown || '23.5'}%</span>
                      {t.capture_desc4}
                      <span className="text-orange-400 font-mono">{stockData?.volatilityIndex || '18.5'}</span>
                      {t.capture_desc5}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 border border-blue-500/50 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  <div className="absolute -top-4 -right-4 p-4 opacity-10">
                    <Globe size={120} />
                  </div>
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-lg">
                    <Lock size={20} className="text-blue-400" />
                    {t.capture_action}
                  </h4>
                  <div className="space-y-4 relative z-10">
                    <div className="relative group">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                      <input 
                        type="text" 
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        placeholder={t.contact_placeholder}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <button 
                      onClick={handleUnlock}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 text-lg group"
                    >
                      {t.btn_unlock} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="space-y-8 animate-in fade-in zoom-in duration-500 relative z-10 w-full max-w-3xl mx-auto">
                
                {/* Notice Banner */}
                <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                  <CheckCircle size={48} className="text-emerald-400 shrink-0" />
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-emerald-400 mb-2">{t.success_notice_title}</h3>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                      {t.success_notice_desc}
                    </p>
                  </div>
                </div>

                {/* The Report */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="text-blue-400" />
                      <span className="font-bold text-white">{t.report_title}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">ID: YZL-{Date.now().toString().slice(-6)}</span>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                      <div>
                        <div className="text-3xl font-black text-white">{stockData?.name || ticker}</div>
                        <div className="text-slate-400 font-mono mt-1">{ticker} | Data from {stockData?.sourcesScanned || 102} Nodes</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-500">Vol Index</div>
                        <div className="text-xl font-bold text-orange-400">{stockData?.volatilityIndex || '18.5'}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase">{t.report_metrics_title}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <div className="text-slate-500 text-xs mb-1">{t.report_sharpe_before}</div>
                          <div className="text-lg font-bold text-white">0.65</div>
                        </div>
                        <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
                          <div className="text-blue-400 text-xs mb-1">{t.report_sharpe_after}</div>
                          <div className="text-xl font-bold text-blue-400 flex items-center gap-2">
                            2.84 <TrendingUp size={16} />
                          </div>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <div className="text-slate-500 text-xs mb-1">{t.report_alpha}</div>
                          <div className="text-lg font-bold text-emerald-400">+14.2%</div>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <div className="text-slate-500 text-xs mb-1">{t.report_winrate}</div>
                          <div className="text-lg font-bold text-white">68.5%</div>
                        </div>
                      </div>
                    </div>

                    {/* 20 Dimensions Section */}
                    <div className="mt-8 border-t border-slate-800 pt-6">
                      <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                        <Activity size={18} className="text-blue-400" /> {t.report_20d_title}
                      </h4>
                      <p className="text-slate-400 text-xs mb-4">{t.report_20d_desc}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {t.dim_names.map((name, i) => {
                          const valStr = stockData?.scores?.[i] || '75.0';
                          const score = getScoreColor(valStr);
                          return (
                            <div key={i} className={`p-2 rounded-lg border border-slate-800 flex justify-between items-center ${score.bg}`}>
                              <span className="text-xs text-slate-300 truncate mr-2" title={name}>{name}</span>
                              <span className={`text-sm font-mono font-bold ${score.color}`}>{valStr}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Deep Analysis Text */}
                    <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 p-5 rounded-xl border border-blue-500/20 shadow-inner">
                      <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Terminal size={16} className="text-blue-400" /> {t.deep_analysis_title}
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed text-justify">
                        {lang === 'zh' ? stockData?.analysisZh : stockData?.analysisEn}
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800">
        {t.footer}
      </footer>
    </div>
  );
}