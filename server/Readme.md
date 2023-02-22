GET http://localhost:3000/ - Svi proizvodi

GET http://localhost:3000/:id - jedan prouizvod sa id = :id

POST http://localhost:3000/add - dodavanje novog proizvoda

proizvod = {
        id: ,
        name: ,
        price: ,
        img: ,
        desc: ,
        category: ,
        qty: 
    }


PUT http://localhost:3000/edit/:id - izmena postojeceg proizvoda

proizvod = {
        id: ,
        name: ,
        price: ,
        desc: ,
        category: ,
        qty: 
    }


DELETE http://localhost:3000/delete/:id