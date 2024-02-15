require('dotenv').config()
const express = require("express");
const https = require('node:https');
const app = express();
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
const db = require('./baglanti');

// app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get("/", function name(req, res) {  
    console.log(req.body);
    res.render("index");
});

app.post("/sub", function name(req, res) {
     console.log(req.body);
     res.render("index");
});

app.listen(3000, function name() {
    console.log("server is running on port 3000");
});

// first attempts

// app.post("/", function name(req, res) {
//     // response = {
//     //     photo: req.body.photo,
//     //     numara: req.body.numara,
//     //     ad: req.body.ad,
//     //     soyad: req.body.soyad
//     // };
//      console.log(req.body);
     
    
// });

// app.listen(3000, function name() {

//     console.log("server is running on port 3000");

// });

    // const fileName = `${Date.now()}.jpg`;
    // const filePath = path.join('C:', 'Users', 'Dilan', 'PycharmProjects', 'face_recognition', 'students', fileName);
    // console.log(img)
    // const base64Data = img.replace(/^data:image\/jpeg;base64,/, '');
    // require('fs').writeFile(filePath, base64Data, 'base64', (err) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send('Resim kaydedilemedi');
    //     }
    //     const insertQuery = 'INSERT INTO ogrenci (ogrNo, ogrAd, ogrSoyad, resim) VALUES (?, ?, ?, ?)';
    //     db.query(insertQuery, [numara, ad, soyad, filePath], (error) => {
    //         if (error) {
    //             console.error('Kayıt başarısız:', error);
    //             return res.status(500).send('Kayıt başarısız');
    //         }
    //         console.log('Kayıt başarılı!');
    //         return res.status(200).send('Kayıt başarılı');
    //     });
    // });