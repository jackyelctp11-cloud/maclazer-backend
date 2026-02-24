const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// 1. 改这里：替换为你的前端域名（比如 https://jackycltcp11-cloud.github.io）
app.use(cors({
  origin: 'https://jackycltcp11-cloud.github.io', 
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10mb' })); // 支持大文件（图片Base64）

// 3. 订单转发接口
app.post('/api/forward-order', async (req, res) => {
  try {
    console.log('收到订单：', req.body);

    // 2. 改这里：替换为目标网站的真实订单接收接口
    const targetApiUrl = 'https://www.maclazer.com/api/order/receive';
    
    const response = await axios.post(targetApiUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        // 如有鉴权，取消注释并填写：
        // 'Authorization': 'Bearer abc123456789'
      }
    });

    res.json({
      success: true,
      message: '订单已转发到目标网站',
      data: response.data
    });
  } catch (error) {
    console.error('订单转发失败：', error.message);
    res.status(500).json({
      success: false,
      error: error.message || '订单转发失败，请联系管理员'
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`后端接口运行在端口：${port}`);
});
