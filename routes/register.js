const express = require('express')
const router = express.Router()
let database = require('../database')
const bcrypt = require('bcrypt')
router.get('/register',(request, response, next)=>{
    response.render('register', {title: 'Pet System Registration Page', session: request.session})
})

router.post('/register', async (request, response)=>{
    try {
        database.query('SELECT * FROM Users WHERE username = ?', [username], async (error, data)=>{
            if(error) throw error
            if(data[0]) return response.json({status: "error", error: "The username has already existed"})
            else{
                const passwordHashed = await bcrypt.hash(request.body.user_password, 10)
                let username = request.body.user_name
                let password = passwordHashed
                let query = `INSERT INTO Users (username, password) VALUES("${username}", "${password}")`
                database.query(query, (error, data)=>{
                    if (error) throw error
                    else{
                        //TODO: add flash message feature
                        //request.flash('success', 'A pet record is added')
                        response.redirect('/login')
                    }
                })
            }
        })
        

    } catch (error) {
        response.redirect('/register')
    }
})

module.exports = router;