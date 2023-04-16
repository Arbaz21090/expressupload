const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const app = express()

const port = process.env.PORT || 5000

app.use(express.static(__dirname+'/public'))
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(fileUpload())

app.get('/' , (req , res)=>{

  res.render('index')

})
app.post('/upload', (req,res)=>{
    // console.log(req.body);
    // console.log(req.files);
    // res.send('ok')
    let imageFile=req.files.image;
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`, (err,data)=>{
       if(err) throw err;
       res.render('display',{title:req.body.uname, image:`${imageFile.name}`})
    })
    
})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))