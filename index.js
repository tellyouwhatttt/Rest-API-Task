const express = require('express');
const app = express();
const post = require('./post.json');
const fs = require('fs')
app.use(express.json())
app.use(express.urlencoded())


app.get('/post', (req,res) => {
    //fetch all users
    //send the user array as response to the client
    return res.json({post})
})
  //create new user
app.post('/post', (req, res) => {
    console.log(req.body.newUser)
    //create a new user from client request
    //save new user to existing database

    post.push(req.body.newUser);
    //save updated data to post.json
    // stringify the json data
    let stringedData = JSON.stringify(post, null, 2);
    fs.writeFile('post.json', stringedData, function (err) {
        if (err) {
            return res.status(500).json({message: err})
        }
    })
    //send back response to client
    return res.status(200).json({message: "new user created"})
})

//fetch single user
app.get('/post/:id', (req, res) => {
    //fetch req params id
    let id = req.params.id;
    //find user with id
    let foundUser = post.find(user => {
        return String(user.id) === id
    })
    if (foundUser) {
    return res.status(200).json({user: foundUser})
    } else {
        return res.status(404).json({message: "user not found"})
    }
    //return user object as response
    //return a 404 error if user is not found
})


app.put('/post/:id', (req, res) =>{
    let id = req.params.id;

    let foundUsers = post.find(user=>{
        return String(user.id) === req.params.id
        })

    post.push(req.body.post)
    console.log({users:id})

    let userIndex = post.indexOf(foundUsers);

     post[userIndex].street = req.body.street
     post[userIndex].suite = req.body.suite
     fs.writeFile('post.json', userData, function(err) {
         if(err) {
             return res.status(500).json({message: err})
         }
     })   
         return res.status(200).json({message: "street and suite have been updated"})
     })
     let userData = JSON.stringify(users, null, 2)

app.listen(3000, function(){
    console.log('server is up and running')
})