import nodemailer from 'nodemailer';

// In-memory store for Vercel Serverless (resets on cold start, but useful for short-term viewing)
// For a production database, you would connect to a DB like Vercel KV or Postgres here.
global.leads = global.leads || [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Admin route to view leads
    return res.status(200).json(global.leads);
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { ticker, capital, contact, stockName, drawdown } = req.body;
  
  const lead = {
    id: Date.now(),
    ticker,
    stockName: stockName || '未知',
    capital,
    contact,
    drawdown: drawdown || '未知',
    timestamp: new Date().toISOString()
  };
  
  // Save to memory
  global.leads.push(lead);

  try {
    // Send email notification to boss
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: '121126652qq@gmail.com',
        pass: 'xvtvevdsvyrhuscf' // Use the provided app password (without spaces)
      }
    });

    const mailOptions = {
      from: '"盈指量AI自动获客系统" <121126652qq@gmail.com>',
      to: '121126652qq@gmail.com',
      subject: `🔥【新线索】高净值量化客户 (${capital}) - 股票: ${stockName || ticker}`,
      text: `盈指量科技 - 全自动获客系统收到新线索：

===================================
📱 联系方式 (微信/手机): ${contact}
💰 资金体量: ${capital}
📈 诊断股票: ${ticker} (${stockName || '未知'})
⚠️ 系统测算回撤风险: ${drawdown}%
🕒 提交时间: ${new Date(lead.timestamp).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
===================================

请尽快安排量化研究员进行跟进转化！使用高频量化战法降维打击！`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent & saved' });
  } catch (error) {
    console.error('Email error:', error);
    // Still return success to frontend so user funnel isn't broken
    res.status(200).json({ success: true, warning: 'Email failed but lead saved locally', error: error.message });
  }
}