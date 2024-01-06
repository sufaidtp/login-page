const express=require('express')

 const nocache=require('nocache')
const session=require('express-session')

const app=express()
app.use(express.urlencoded({extended:true}))


app.set('view engine','hbs')

app.use(nocache())

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true
}))

app.get('/logout',(req,res)=>{
    req.session.auth=false;
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

app.get('/',(req,res)=>{
    if(req.session.auth){
        res.redirect('/home')
    }else{
    res.render('login')
    }
})

app.post('/login',(req,res)=>{

    if(req.body.username=='sufaid' &&req.body.password==123){
        req.session.auth=true;
        res.redirect('/home')

    }else{
        res.render('login',{notuser:true})
    }
})

function checkUser (req,res,next){
    if(req.session.auth){
        next()
    } else {
        res.redirect('/')
    }

}

app.get('/home', checkUser,(req,res)=>{
    res.render('home',{product,username:"sufaid"})


   
})

const product=[
    {
        name:"574 core",
        category:"men's",
        price:"$89.99",
        image:"https://nb.scene7.com/is/image/NB/ml574evw_nb_02_i?$pdpflexf2$&wid=464&hei=464"

    },
    {
        name:"550",
        category:"Unisex Lifestyle",
        price:"$119.99",
        image:"https://nb.scene7.com/is/image/NB/bb550phd_nb_02_i?$pdpflexf2$&qlt=80&wid=440&hei=440"

        
    },
    {
        name:"2002R",
        category:"Unisex Lifestyle",
        price:"$139.99",
        image:"https://nb.scene7.com/is/image/NB/m2002rbk_nb_02_i?$pdpflexf2$&qlt=80&wid=440&hei=440"
    },
    {
        name:"NB Numeric Tom Knox 600",
        category:"Unisex Skateboarding",
        price:"$94.99",
        image:"https://nb.scene7.com/is/image/NB/nm600ogs_nb_02_i?$pdpflexf2$&qlt=80&wid=440&hei=440"
    }
]

app.listen(4000,()=>console.log("server started!!!"))

