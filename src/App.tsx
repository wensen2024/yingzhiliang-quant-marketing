import { useState, useEffect } from 'react';
import { Bot, Search, Shield, ArrowRight, CheckCircle, Activity, Globe, Lock, Smartphone, Zap, TrendingUp } from 'lucide-react';

type Language = 'zh' | 'en';
type Step = 'input' | 'analyzing' | 'capture' | 'success';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [step, setStep] = useState<Step>('input');
  const [progress, setProgress] = useState(0);
  const [ticker, setTicker] = useState('');
  const [capital, setCapital] = useState('500w+');
  const [contact, setContact] = useState('');

  const t = {
    zh: {
      nav_title: '盈指量科技',
      nav_lang: 'English',
      hero_title: 'AI 量化持仓诊断引擎',
      hero_desc: '输入您的核心重仓股，盈指量AI将结合实时盘口资金流与机构级因子，为您免费生成【优化收益与抗回撤方案】。',
      step_input_title: '立即开始免费诊断',
      ticker_placeholder: '输入股票代码/缩写 (如: 600519)',
      capital_label: '当前可用于量化的资金规模：',
      cap_1: '100万 以下',
      cap_2: '100万 - 500万',
      cap_3: '500万 以上 (VIP通道)',
      btn_start: '启动 AI 深度诊断',
      analyzing: ['连接全网舆情与L2行情数据...', '测算持仓夏普比率...', '匹配盈指量高频多维脉冲策略...', '生成风险对冲模型...'],
      capture_title: '⚠️ 诊断完成：发现巨大的优化空间',
      capture_desc1: '根据盈指量量化模型回测，您当前的持仓结构存在',
      capture_desc2: ' 23.5% 的额外回撤风险',
      capture_desc3: '。如果采用我们的【机构级高频套利与脉冲共振策略】，预计可将年化收益率提升 ',
      capture_desc4: '12% - 18%',
      capture_desc5: '。',
      capture_action: '获取完整诊断报告 & 申请30天免费跟单',
      contact_placeholder: '请输入您的微信或手机号接收报告',
      btn_unlock: '立即解锁报告与VIP名额',
      success_title: '申请已提交！',
      success_desc: '我们的高级量化研究员将在 15 分钟内与您联系，为您一对一解读诊断报告，请留意微信或来电。',
      footer: '© 2026 盈指量科技 (Yingzhiliang Tech). All rights reserved.'
    },
    en: {
      nav_title: 'Yingzhiliang Tech',
      nav_lang: '中文',
      hero_title: 'AI Quant Portfolio Diagnosis',
      hero_desc: 'Enter your core holding. Our AI will combine real-time L2 data & institutional factors to generate an optimization & drawdown-reduction plan.',
      step_input_title: 'Start Free Diagnosis',
      ticker_placeholder: 'Enter Stock Ticker (e.g., AAPL, 00700)',
      capital_label: 'Available Quant Capital:',
      cap_1: 'Under 1M',
      cap_2: '1M - 5M',
      cap_3: 'Above 5M (VIP)',
      btn_start: 'Run AI Diagnosis',
      analyzing: ['Connecting to global sentiment & L2 data...', 'Calculating Sharpe ratio...', 'Matching high-frequency pulse strategy...', 'Generating risk-hedge model...'],
      capture_title: '⚠️ Diagnosis Complete: High Optimization Potential',
      capture_desc1: 'Based on our quant backtesting, your current portfolio has an ',
      capture_desc2: 'additional 23.5% drawdown risk',
      capture_desc3: '. By applying our Institutional Arbitrage Strategy, you could increase annualized returns by ',
      capture_desc4: '12% - 18%',
      capture_desc5: '.',
      capture_action: 'Get Full Report & 30-Day VIP Trial',
      contact_placeholder: 'Enter WhatsApp / Phone / WeChat',
      btn_unlock: 'Unlock Report & VIP Access',
      success_title: 'Request Submitted!',
      success_desc: 'Our senior quant researcher will contact you within 15 minutes to review your personalized report.',
      footer: '© 2026 Yingzhiliang Tech. All rights reserved.'
    }
  }[lang];

  useEffect(() => {
    if (step === 'analyzing') {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setStep('capture');
            return 100;
          }
          return p + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleStart = () => {
    if (!ticker) return alert(lang === 'zh' ? '请输入股票代码' : 'Please enter a ticker');
    setStep('analyzing');
    setProgress(0);
  };

  const handleUnlock = () => {
    if (!contact) return alert(lang === 'zh' ? '请输入联系方式' : 'Please enter contact info');
    setStep('success');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-900 text-slate-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-slate-950 sticky top-0 z-50 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-500" size={28} />
          <span className="font-bold text-xl tracking-tight">{t.nav_title}</span>
        </div>
        <button 
          onClick={() => {
            setLang(lang === 'zh' ? 'en' : 'zh');
          }}
          className="flex items-center gap-1 text-sm font-medium hover:text-blue-400 transition-colors bg-slate-900 px-4 py-2 rounded-full border border-slate-800"
        >
          <Globe size={16} />
          {t.nav_lang}
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="max-w-2xl w-full space-y-10 z-10">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm border border-blue-500/20">
              <Bot size={16} />
              <span>Lead Generation Engine v2.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {t.hero_title}
            </h1>
            <p className="text-slate-400 text-lg">
              {t.hero_desc}
            </p>
          </div>

          {/* Interactive Card */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
            
            {step === 'input' && (
              <div className="space-y-6 animate-in fade-in duration-500">
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
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                    <Zap size={20} />
                    {t.btn_start}
                  </button>
                </div>
              </div>
            )}

            {step === 'analyzing' && (
              <div className="py-12 space-y-8 text-center animate-in fade-in duration-300">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="animate-spin w-full h-full text-blue-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
                    {progress}%
                  </div>
                </div>
                
                <div className="text-lg font-medium text-blue-400 animate-pulse">
                  {progress < 25 ? t.analyzing[0] : progress < 50 ? t.analyzing[1] : progress < 75 ? t.analyzing[2] : t.analyzing[3]}
                </div>
              </div>
            )}

            {step === 'capture' && (
              <div className="space-y-6 animate-in zoom-in-95 duration-500">
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                  <Shield className="text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-amber-500 mb-1">{t.capture_title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t.capture_desc1}
                      <span className="text-red-400 font-bold">{t.capture_desc2}</span>
                      {t.capture_desc3}
                      <span className="text-emerald-400 font-bold">{t.capture_desc4}</span>
                      {t.capture_desc5}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 border border-blue-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp size={100} />
                  </div>
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Lock size={18} className="text-blue-400" />
                    {t.capture_action}
                  </h4>
                  <div className="space-y-4 relative z-10">
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                      <input 
                        type="text" 
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        placeholder={t.contact_placeholder}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <button 
                      onClick={handleUnlock}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
                    >
                      {t.btn_unlock} <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t.success_title}</h3>
                <p className="text-slate-400 max-w-sm mx-auto">
                  {t.success_desc}
                </p>
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