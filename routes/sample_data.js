let express = require('express')
let router = express.Router()
let database = require('../database')
router.get('/', (request, response, next)=>{
    let query = 'SELECT * FROM db_example.pet'
    database.query(query, (error, data)=>{
        if (error) throw error
        else{
            response.render('sample_data', {title: 'Node.js MySQL CRUD Application', action:'list', sampleData:data})
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
    let death = request.body.death
    let query = `INSERT INTO db_example.pet (name, owner, email, password, species, sex, birth, death) VALUES("${pet_name}","${owner_name}","${email}","","${species}","${sex}","${birth}","${death}")`
    database.query(query, (error, data)=>{
        if(error) throw error
        else{
            response.redirect('/sample_data')
        }
    })
})
module.exports = router