import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getWishes, addWish, addRsvp } from './lib/googleSheets.js';
import { validateWish, sanitizeInput } from './lib/validation.js';
import { checkRateLimit } from './lib/rateLimit.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Wedding API is running' });
});

// GET wishes
app.get('/api/wishes', async (req, res) => {
  try {
    const wishes = await getWishes();
    res.json(wishes);
  } catch (error) {
    console.error('GET wishes error:', error);
    res.status(500).json({ error: 'Failed to fetch wishes' });
  }
});

// POST new wish
app.post('/api/wishes', async (req, res) => {
  try {
    // Rate limiting
    const ip = req.ip || req.connection.remoteAddress;
    const rateLimitCheck = checkRateLimit(ip);
    
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({ 
        error: 'Bạn đã gửi quá nhiều lời chúc. Vui lòng thử lại sau.' 
      });
    }

    const { name, content, isHighlight } = req.body;

    // Validate
    const validation = validateWish(name, content);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Sanitize
    const sanitizedName = sanitizeInput(name);
    const sanitizedContent = sanitizeInput(content);

    // Save
    await addWish({
      name: sanitizedName,
      content: sanitizedContent,
      isHighlight: isHighlight || false,
    });

    res.status(201).json({ 
      success: true,
      message: 'Lời chúc đã được gửi thành công!' 
    });
  } catch (error) {
    console.error('POST wish error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/rsvp', async (req, res) => {
    try {
      // Rate limiting (Tùy chọn: dùng chung logic với wishes)
      const ip = req.ip || req.connection.remoteAddress;
      const rateLimitCheck = checkRateLimit(ip);
      if (!rateLimitCheck.allowed) {
        return res.status(429).json({ error: 'Vui lòng thử lại sau ít phút.' });
      }
  
      const { name, guests, guestOf, attendance } = req.body;
  
      // Validate cơ bản
      if (!name) {
        return res.status(400).json({ error: 'Vui lòng nhập tên' });
      }
  
      // Lưu vào Google Sheets
      await addRsvp({
        name,
        guests,
        guestOf,
        attendance
      });
  
      res.status(201).json({ 
        success: true,
        message: 'Xác nhận tham dự thành công!' 
      });
  
    } catch (error) {
      console.error('POST RSVP error:', error);
      res.status(500).json({ error: 'Lỗi server, vui lòng thử lại sau.' });
    }
  });

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});