const express=require("express");
const app=express();
const port = 8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require('method-override');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));
// app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        //id: uuidv4();
        id:"1a",
        username:"Manoj Tiwari",
        content:"baby beer peeke nachreli cham cham cham"
    },
    {
        // id:uuidv4();
        id:"2a",
        username:"Punnet Superstar",
        content:"aaj kal ke nalle berozgaar chappri saale khassi colony ke ladhke ladhkiya"
    },
    {
        // id:uuidv4();
        username:"Ravi kishan",
        content:"lahega utha de remote se"
    },
    {
        // id:uuidv4();
        username:"arpit bala",
        content:"hum pe to hai hi 9 😛"
    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username , content} = req.body;
    let id=uuidv4();
    posts.push({id, username , content})
    res.redirect("/posts");
});

app.get("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post= posts.find((p)=> id === p.id);
    // console.log(post);
    res.render("show",{post});
});

app.get('/posts/:id/edit',(req,res)=>{
    let {id}=req.params;
    let post= posts.find((p)=> id === p.id);
    res.render('edit.ejs',{post});
});

app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post= posts.find((p)=> id === p.id);
    post.content=newContent;
    console.log(post);
    res.send('patch working');
})


app.listen(port,()=>{
    console.log("Port connected at: 8080");
})