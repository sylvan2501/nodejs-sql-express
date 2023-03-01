const express = require('express')
const router = express.Router()
let database = require('../database')
const bcrypt = require('bcrypt')
const passport = require('passport')


//middleware
// router.use((request, response, next)=>{
//     if(request.session.userId){
//         response.redirect('/sample_data')
//     }else{
//         next()
//     }
// })

router.get('/login', (request, response, next)=>{
    response.render('login', {title: 'Pet System Login Page', session: request.session})
})
router.post('/login', (request, response)=>{
    let user_name = request.body.user_name
    let password = request.body.user_password
    console.log(password)
    database.query('SELECT * FROM Users WHERE username = ?', [user_name], (error, data, fields)=>{
        if (error) throw error
        else{
            try {
                if(data[0] && bcrypt.compareSync(password, data[0].password)){
                    request.session.userId = data[0].user_id
                    console.log(request.session)
                    response.redirect('/sample_data')
                }else{
                    response.redirect('/login')
                }
            } catch (error) {
                
            }
        }
    })    
})

router.get('/logout', (request, response) =>{
    request.session.destroy();
    response.redirect('/login')
})

module.exports = router