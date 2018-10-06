const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
//To create app
var app=express();


//It takes the argumnet as absolute directory where all your partials are
hbs.registerPartials(__dirname+'/views/partials');

//It tells expresswhat viewengine we would like to use
//View is the default directory that express uses for template
app.set('view engine','hbs');

//Middleware let's you configure how your express application works
//express.static takes the absolute path of the folder which you want to serve up
//__dirname is the variable which gets passed to our file by wrapper function which we explored

app.use(express.static(__dirname+'/public'));

//If your middleware does not have next handlers for each request is not going to fire up
//next exists so you can tellyour middleware function when you are done in thefunction by calling next()
app.use((req,res,next)=>{
  var log= new Date().toString()+`${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      Console.log('Unable to append file');
    }
  })
next();
});

//
// app.use((req,res,next)=>{
//   res.render('maintain.hbs');
// });

//first argument is the nameof the helper and the seconnd is the functionto be exexcuted when the helper is called
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})

//Register the handler to send back some data
app.get('/',(req,res)=>{
  // res.send('<h1>Hello express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home page'
  });
});

app.get('/about',(req,res)=>{
  // res.send('About page');
  res.render('about.hbs',{
    pageTitle: 'About page'
  })
});
//Binds the application to a port on our machine,untill we bind our app it won't start
app.listen(3000);
