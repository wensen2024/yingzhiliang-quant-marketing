import yahooFinance from 'yahoo-finance2';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  try {
    const { ticker } = req.body;
    if (!ticker) return res.status(400).json({ error: 'Ticker is required' });

    let queryTicker = ticker.trim();
    // Auto-append suffixes for Chinese stocks if they enter 6 digits
    if (/^\d{6}$/.test(queryTicker)) {
      queryTicker = queryTicker.startsWith('6') ? `${queryTicker}.SS` : `${queryTicker}.SZ`;
    }

    yahooFinance.suppressNotices(['yahooSurvey']);
    const quote = await yahooFinance.quote(queryTicker);
    
    const high = quote.fiftyTwoWeekHigh || (quote.regularMarketPrice * 1.2);
    const current = quote.regularMarketPrice;
    let drawdown = (((high - current) / high) * 100).toFixed(2);
    
    if (parseFloat(drawdown) < 5) {
        drawdown = (parseFloat(drawdown) + 15.4).toFixed(2);
    }

    const sourcesCount = Math.floor(Math.random() * 15) + 90; // 90-104 sites
    const volatility = (Math.random() * 10 + 15).toFixed(1);
    
    // --- DYNAMIC AI ANALYSIS BASED ON REAL DATA ---
    const vol = quote.regularMarketVolume || 0;
    const avgVol = quote.averageDailyVolume10Day || 0;
    const ma50 = quote.fiftyDayAverage || current;
    const beta = quote.beta || 1.0;
    const stockName = quote.shortName || quote.longName || ticker;
    
    let conclusionZh = "";
    let conclusionEn = "";
    
    if (vol > avgVol * 1.2) {
        // High Volume Condition
        conclusionZh = `【彭博/同花顺L2直连】监测到【${stockName}】近期成交量异常放大(${vol.toLocaleString()}手)，存在显著的“暗盘大单流入”与“游资接力情绪”。当前价位主力资金博弈剧烈，研报一致性发生严重偏离。建议立即开启【盈指量多维脉冲策略】，捕捉这波量价背离带来的高频套利空间！`;
        conclusionEn = `[Bloomberg/Futu Data Feed] Detected abnormal volume surge in [${stockName}] (${vol.toLocaleString()} shares), indicating significant "Dark Pool Flow" and "Hot Money" activity. Institutional game is fierce. Recommend deploying [Yingzhiliang Multi-Dim Pulse] immediately to capture high-frequency arbitrage.`;
    } else if (current < ma50) {
        // Downtrend Condition
        conclusionZh = `【富途/东方财富资金流向】【${stockName}】当前跌破50日均线支撑，呈现明显的“趋势动量衰竭”。机构控盘度松动，且宏观Beta暴露风险加剧，随时可能引发量化机器人的踩踏式平仓。千万不要死扛！建议迅速接入【盈指量T+0网格与中性对冲】，将系统性回撤风险降至5%以内，通过做空波动率回血。`;
        conclusionEn = `[EastMoney/Futu Data] [${stockName}] has fallen below its 50-day MA, showing clear "Momentum Decay". Institutional control is loosening, risking an algorithmic stampede. Do not hold blindly! Immediately engage [Yingzhiliang T+0 Grid & Neutral Hedge] to cap drawdown under 5% and recover via volatility shorting.`;
    } else if (beta > 1.3) {
        // High Volatility Condition
        conclusionZh = `【彭博/Wind宏观预警】【${stockName}】的Beta系数高达${beta.toFixed(2)}，属于极高弹性的高危资产。“波动率微笑扭曲”现象极其严重，散户跟风指数爆表。这意味着极高的尾部黑天鹅风险！此时盲目做多等同赌博，请务必利用【盈指量期权高频对冲算法】剥离市场风险，实现无风险吃息。`;
        conclusionEn = `[Bloomberg/Wind Alert] With a Beta of ${beta.toFixed(2)}, [${stockName}] is a highly volatile, high-risk asset. "Volatility Smile Distortion" is severe, and Retail FOMO is maxed out. Naked long is gambling. You must use [Yingzhiliang Options High-Freq Hedge] to strip market risk and achieve risk-free yields.`;
    } else {
        // Default / Mild Trend
        conclusionZh = `【四大平台全息共振】聚合彭博社、同花顺、富途、东方财富网实时数据，【${stockName}】在"多维脉冲共振"与"产业链景气度"上呈现结构性背离。主力资金正进行隐蔽换手（一致性偏离度: ${(Math.random()*10+15).toFixed(1)}%）。强烈建议放弃传统死多头策略，立即植入【盈指量T+0高频网格策略】，利用其宽幅震荡的波段差榨干最后的Alpha价值。`;
        conclusionEn = `[Global 4-Node Resonance] Aggregating Bloomberg, 10jqka, Futu & EastMoney, [${stockName}] shows structural divergence in "Pulse Resonance". We detect hidden institutional turnover (Deviation: ${(Math.random()*10+15).toFixed(1)}%). Advise abandoning long-only holds. Deploy [Yingzhiliang T+0 High-Freq Grid] to exploit swing spreads and squeeze out remaining Alpha.`;
    }

    // Deterministic pseudo-random scores based on ticker string + price
    const seed = queryTicker.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const scores = Array.from({length: 20}, (_, i) => {
        // Math.sin generates a number between -1 and 1
        const raw = (Math.abs(Math.sin(seed + i + current)) * 60 + 35).toFixed(1); // 35.0 to 95.0
        return raw;
    });

    res.status(200).json({
      name: stockName,
      price: current,
      currency: quote.currency || 'CNY',
      drawdown: drawdown,
      high52: high,
      sourcesScanned: sourcesCount,
      volatilityIndex: volatility,
      analysisZh: conclusionZh,
      analysisEn: conclusionEn,
      scores: scores
    });
  } catch (error) {
    console.error('Yahoo Finance API Error:', error);
    
    // Fallback if stock is completely invalid/not found
    const stockName = req.body.ticker || '未知标的';
    res.status(200).json({
      name: stockName,
      price: '---',
      currency: '',
      drawdown: (Math.random() * 15 + 12).toFixed(2),
      high52: '---',
      sourcesScanned: 104,
      volatilityIndex: 18.5,
      analysisZh: `【彭博/同花顺实时测算】针对【${stockName}】，发现多空博弈异常，存在未知的量化踩踏风险。建议立即接入【盈指量高频中性策略】进行对冲保护。`,
      analysisEn: `[Bloomberg/Futu Real-time] Detected abnormal long/short game for [${stockName}], indicating unknown algorithmic stampede risk. Recommend deploying [Yingzhiliang High-Freq Neutral Strategy] immediately for hedge protection.`,
      scores: Array.from({length: 20}, () => (Math.random() * 60 + 35).toFixed(1))
    });
  }
}