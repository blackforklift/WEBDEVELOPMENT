const mysql = require('mysql');


// mysql baglanti
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'face_recognition_db'
});

connection.connect((error) => {
  if (error) {
    console.error('Bağlantı başarısız:', error);
    return;
  }
  console.log('Bağlantı başarılı!');
});