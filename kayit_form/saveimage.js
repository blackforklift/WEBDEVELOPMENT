const fs = require('fs');
const path = require('path');
const db = require('./baglanti'); // assuming that "baglanti.js" exports a database connection object

if (req.method === 'POST') {
  const filename = Date.now() + '.jpg'; // set random name for the image, used Date.now() for uniqueness
  const filepath = 'resimler/';

  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath, { recursive: true });
  }

  const webcamFile = req.files && req.files.webcam;

  if (webcamFile) {
    const file = webcamFile.data;
    const filePath = path.join(filepath, filename);

    fs.writeFile(filePath, file, (err) => {
      if (err) {
        console.error('Dosya kaydedilemedi:', err);
        return res.status(500).send('Dosya kaydedilemedi');
      }
      console.log('Dosya başarıyla kaydedildi!');

      const insertQuery = `INSERT INTO cam (cam) VALUES ('${filename}')`;
      db.query(insertQuery, (error) => {
        if (error) {
          console.error('Veritabanına kaydedilemedi:', error);
          return res.status(500).send('Veritabanına kaydedilemedi');
        }
        console.log('Veritabanına başarıyla kaydedildi!');
        return res.status(200).send(filePath);
      });
    });
  } else {
    return res.status(400).send('Hatalı istek: dosya bulunamadı');
  }
}
