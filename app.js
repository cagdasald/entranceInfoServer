const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

function connectDb() {
  const connection = mysql.createConnection({
    host: 'company-entrance.cmx8hjl5dfbg.eu-north-1.rds.amazonaws.com',
    user: 'cagdasadmin',
    password: 'cagdas24ald',
    database: 'entrance_project'
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL veritabanına bağlandı.');
  });

  return connection;
}

app.get('/gecis', (req, res) => {
  const connection = connectDb();

  connection.query('SELECT * FROM gecis', (err, rows) => {
    if (err) throw err;

    console.log('Gecis tablosu kayitlari:');
    rows.forEach((row) => {
      console.log(row);
    });

    res.send(rows);

    connection.end((err) => {
      if (err) throw err;
      console.log('MySQL veritabanı bağlantısı kapatıldı.');
    });
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu başlatıldı: http://localhost:${PORT}`);
});