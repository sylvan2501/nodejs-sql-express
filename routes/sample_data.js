const express = require('express')
const router = express.Router()
let database = require('../database')
const moment = require('moment')


// router.use((request, response, next)=>{
//     if(!request.session.userId){
//         response.redirect('/login')
//     }else{
//         next()
//     }
// })


router.get('/sample_data', (request, response, next)=>{
    let query = 'SELECT * FROM db_example.Pets'
    database.query(query, (error, data)=>{
        if (error) throw error
        else{
            response.locals.moment = moment
            response.render('sample_data', {title: 'Pet Management System', action:'list', sampleData:data, message: request.flash('success'), session: request.session})
        }
    })
    //response.send('List all Sample Data')
})

router.get('/add', (request, response, next)=>{

    response.render('sample_data',{title: 'Insert Data into MySQL', action: 'add'})

    //response.send('Add Sample Data')
})

router.post('/add_sample_data', (request, response, next)=>{
    let pet_name = request.body.pet_name
    let owner_name = request.body.owner_name
    let email = request.body.email
    let species = request.body.species
    let sex = request.body.sex
    let birth = request.body.birth
    let query = `INSERT INTO db_example.Pets (name, owner, email, species, sex, birth) VALUES("${pet_name}","${owner_name}","${email}","${species}","${sex}","${birth}")`
    database.query(query, (error, data)=>{
        if(error) throw error
        else{
            request.flash('success', 'A pet record is added')
            response.redirect('/sample_data')
        }
    })
})

router.get('/sample_data/edit/:id', (request, response, next) =>{
    let id = request.params.id
    let query = `SELECT * FROM db_example.Pets WHERE pet_id = "${id}"`
    database.query(query,(error, data) =>{
        response.locals.moment = moment
        response.render('sample_data', {title: 'Edit MySQL Table Data', action: 'edit', sampleData: data[0]})
    })

})
router.post('/sample_data/edit/:id', (request, response, next) =>{
    let id = request.params.id
    let pet_name = request.body.pet_name
    let owner_name = request.body.owner_name
    let email = request.body.email
    let species = request.body.species
    let sex = request.body.sex
    // let birth = request.body.birth
    let query = `
    UPDATE Pets SET name = "${pet_name}", 
    owner = "${owner_name}",
    email = "${email}",
    species = "${species}",
    sex = "${sex}"
    WHERE pet_id = "${id}"
    `
    database.query(query, (error, data)=>{
        if(error) throw error
        else{
            request.flash('success', 'The pet record is updated')
            response.redirect('/sample_data')
        }
    })
    //console.log('Put API is working...')
})

router.get('/delete/:id',(request, response, next)=>{
    let id = request.params.id
    let query = `DELETE FROM Pets WHERE pet_id = "${id}"`
    database.query(query, (error, data)=>{
        if(error) throw error
        else{
            request.flash('success', 'The record is deleted')
            response.redirect('/sample_data')
        }
    })
})
module.exports = router