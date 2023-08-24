const express = require('express');
const multer = require('multer');
const path = require('path');
const http = require('http');
const app = express();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(express.static('public')); // Папка со статическими файлами

app.post('/upload', upload.array('files'), (req, res) => {
  console.log('Uploaded files:', req.files);
  res.send('Files uploaded successfully');
});

// Добавляем маршрут для отображения странички
app.get('/games', (req, res) => {
  // Отправляем файл games.html из папки public
  res.sendFile(path.join(__dirname, 'public', 'games.html'));
});

const server = http.createServer((req, res) => {
  // Redirect to the specified URL
  res.writeHead(302, { 'Location': 'https://swkgstudio.github.io/' });
  res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
