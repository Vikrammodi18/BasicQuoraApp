const express = require('express')
const path = require("path")
const { v4: uuidv4 } = require('uuid');


const app = express()
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))


let posts=[
    {
        id:uuidv4(),
        username:"Vikram kumar Modi",
        content:"I am studying Backend"
    },
    {
        id:uuidv4(),
        username:"Pratham kumar Modi",
        content:"Mai to berozgar hu"
    },
    {
        id:uuidv4(),
        username:"Manisha Kumari Badatya",
        content:"I am studying Frontend"
    }
]
app.get('/post',(req,res)=>{
    res.render("index",{posts})
})
app.get("/post/new",(req,res)=>{
    res.render('form')
})
app.get("/post/:id",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p) => id === p.id)
    res.render('view',{post})
})
app.post('/post',(req,res)=>{
    const {username,content} = req.body;
    const newpost= {
        id:uuidv4(),
        username,
        content
    }
    posts.push(newpost)
    res.redirect('/post')
})
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`app getting stated at ${PORT}`)
})