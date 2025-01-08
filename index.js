const express = require('express')
const path = require("path")
const methodOverride = require("method-override")
const { v4: uuidv4 } = require('uuid');


const app = express()
app.set("view engine","ejs")


app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

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
    // console.log(post)
    res.render('view',{post})
})

app.get("/post/:id/edit",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p) => id === p.id)
    // console.log(post)
    res.render('edit',{post})
})

app.patch("/post/:id",(req,res)=>{
    let {id} = req.params
    newContent = req.body.content
   let post = posts.find((p)=> id === p.id)
    post.content = newContent

    res.redirect('/post')
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

app.delete('/post/:id',(req,res)=>{
    let {id} = req.params
    posts = posts.filter((s)=> s.id != id)
    res.redirect('/post')
    
})
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`app getting stated at ${PORT}`)
})