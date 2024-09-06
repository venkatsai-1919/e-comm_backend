import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import cors from 'cors';
import e from 'express';

const app= express()

const port = 4000;
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const db = new pg.Client({
  user : 'postgres',
  host : 'localhost',
  database : 'user',
  password : '1919',
  port : 5432
});

db.connect()

app.get('/', (req, res )=>{
   res.send("<h1>Hello</h1>")
});

app.post('/register',async (req, res)=>{
  console.log(req.body);
  const {fullName, phoneNumber, email, password} = req.body;
  try {
  await db.query('INSERT INTO users VALUES ($1, $2, $3, $4)', [fullName, phoneNumber, email, password]);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Email already there');
  }
  res.send('successfull');
});

app.listen(port, ()=>{
    console.log('Server started : ' + port);
})