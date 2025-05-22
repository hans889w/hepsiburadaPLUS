import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const users = []; // Bellekte kullanıcı listesi (DB yerine geçici)

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre zorunlu.' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email zaten kayıtlı' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  const accessToken = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
  const refreshToken = jwt.sign({ email }, 'refreshkey', { expiresIn: '7d' });

  res.json({ message: 'Kayıt başarılı', accessToken, refreshToken, user: { email } });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Şifre yanlış' });

  const accessToken = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
  const refreshToken = jwt.sign({ email }, 'refreshkey', { expiresIn: '7d' });

  res.json({ accessToken, refreshToken, user: { email } });
});

app.listen(PORT, () => console.log(`✅ Backend çalışıyor: http://localhost:${PORT}`));
