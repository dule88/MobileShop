const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


let storage = multer.diskStorage({
    destination: 'public/img/',
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

let upload = multer({
    storage: storage
});


const app = express();


// const proizvodi = [];

const proizvodi = [{
        id: 0,
        name: 'S23',
        price: 800,
        img: '/img/Samsung S23.jpg',
        desc: 'S23 smart phone',
        category: 'smartphone, expensive',
        qty: 3
    },
    {
        id: 1,
        name: 'S23+',
        price: 900,
        img: '/img/Samsung S23+.jpg',
        desc: 'S23+ smart phone',
        category: 'smartphone, expensive',
        qty: 8
    },
    {
        id: 2,
        name: 'S23 Ultra',
        price: 1000,
        img: '/img/Samsung S23 Ultra.jpg',
        desc: 'S23 Ultra smart phone',
        category: 'smartphone, expensive',
        qty: 8
    },
    {
        id: 3,
        name: '14',
        price: 900,
        img: '/img/Iphone 14.jpg',
        desc: 'Iphone 14 smart phone',
        category: 'smartphone, expensive',
        qty: 6
    },
    {
        id: 4,
        name: '14 Pro',
        price: 1000,
        img: 'img/Iphone 14 Pro.jpg',
        desc: 'Iphone 14 Pro smart phone',
        category: 'smartphone, expensive',
        qty: 4
    },
    {
        id: 5,
        name: '14 Pro Max',
        price: 1100,
        img: 'img/Iphone 14 Pro Max.jpg',
        desc: 'Iphone 14 Pro Max smart phone',
        category: 'smartphone, expensive',
        qty: 7
    }
];


app.use(cors());

// Parsing and decoding middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());



app.get('/', (req, res) => {
    // res.send('proba 123');
    res.json(proizvodi);
});


app.get('/:id', (req, res) => {
    let id = req.params.id;
    // console.log(`Serviraj proizvod sa id = ${id}`);

    let proizvod = proizvodi.filter((p) => {
        if (p.id === Number(id)) {
            console.log(p);
            return p;
        } else {
            return null;
        };
    });

    res.json(proizvod);

});


app.post('/add', upload.single('img'), (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    newId = proizvodi.length != 0 ? proizvodi[proizvodi.length - 1].id + 1 : 0;

    // let proizvod = req.file;
    let proizvod = {
        id: newId,
        name: req.body.name,
        price: Number(req.body.price),
        img: `/img/${req.file.originalname}`,
        desc: req.body.desc,
        category: req.body.category,
        qty: Number(req.body.qty)
    };

    // console.log(proizvod);

    proizvodi.push(proizvod);

    // res.json(proizvod);
    res.redirect('http://localhost:5500/client/manage.html');

});


app.put('/edit/:id', (req, res) => {
    let id = req.params.id;
console.log('****************');
    console.log(req.body);
    console.log('****************');
    
    let proizvod = {};

    proizvodi.forEach((p, idx) => {
        if (p.id === Number(id)) {
            proizvod.name = req.body.name;
            proizvod.price = Number(req.price);
            proizvod.desc = req.body.desc;
            proizvod.category = req.body.category;
            proizvod.qty = Number(req.body.qty);

            proizvodi[idx].name = req.body.name;
            proizvodi[idx].price = Number(req.body.price);
            proizvodi[idx].desc = req.body.desc;
            proizvodi[idx].category = req.body.category;
            proizvodi[idx].qty = Number(req.body.qty);


        }
    });

    res.json({
        id,
        name: req.body.name,
        price: Number(req.body.price),
        desc: req.body.desc,
        category: req.body.category,
        qty: Number(req.body.qty),
    });
})


app.delete('/delete/:id', (req, res) => {

    // let pro = proizvodi.find(element => {
    //     element.id == req.params.id;
    // });
    try{
    fs.unlink(`public/${proizvodi[req.params.id].img}`, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        // console.log('File deleted!');
        res.json(proizvodi.splice(req.params.id, 1));
    });
    }catch(err){
        console.log(err);
    }
})





app.listen(3000, () => {
    console.log('Sever is listening on port 3000...');
});