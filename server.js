const express = require('express');
const multer = require('multer');
const path = require('path');
const http = require('http');
const app = express();
const fs = require('fs');

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

app.get('/nativeads', (req, res) => {
  fs.readFile('nativeads.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error', details: err.message });
          return;
      }
      res.json(JSON.parse(data));
  });
});

app.post('/nativeads', async (req, res) => {
  try {
      const newData = req.body;
      await fs.writeFile('nativeads.json', JSON.stringify(newData, null, 2));
      res.send('Data updated successfully');
  } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.get("/nativeadssite", (req, res) => {
const filePath = path.join(__dirname, "nativeads.html");
res.sendFile(filePath);
});

app.get("/native_ads_load.php", (req, res) => {
// Читаем содержимое файла nativeads.json
fs.readFile("nativeads.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error loading data:", err);
    res.status(500).send("Error loading data");
  } else {
    // Отправляем содержимое как JSON
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  }
});
});

app.post("/native_ads_save.php", (req, res) => {
const newData = req.body;
// Записываем новые данные в файл nativeads.json
fs.writeFile("nativeads.json", JSON.stringify(newData, null, 2), err => {
  if (err) {
    console.error("Error saving data:", err);
    res.status(500).send("Error saving data");
  } else {
    res.send("Data saved successfully");
  }
});
});