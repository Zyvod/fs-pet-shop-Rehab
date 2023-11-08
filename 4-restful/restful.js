import express from 'express'
import pg from 'pg'
// const { Pool } = pg;
import fs from 'fs'

// install express, pg and nodemon
const PORT = 3000;
const app = express();


// const pool = new Pool({
//   user: process.env.DB_USER,//postgres
//   host: process.env.DB_HOST, //localhost
//   database:"",
//   password: process.env.DB_PASSWORD, //postgres pw
//   port: process.env.PORT || 3000,
// })


let petData;
const dbPath = '../pets.json'


app.use(express.json())

// app.use('/', (req,res next) =>) {
//   console.log('validation check goes here')
//   next();
// }

//GET ALL
app.get('/pets', async (req, res,) => {
  petData = await getPets()
  console.log('get all pets path')
  res.send(petData)
})

//GET ONE
app.get('/pets/:id', async(req,res)=> {
  petData = await getPets()
  const index = req.params.id
  checkIndexRange(index,res)
  res.send(petData[idnex])
})


//POST
app.post('/pets', async(req, res) =>{
  petData = await getPets()
  let petDataNew = await writePets(req.body)
  res.send(petDataNew)
})


//PUT /PATCH

//DELETE

app.use((req, res, next) => {
  next({message: 'The path you are looking for does not exist', status:404})
})

app.use((err, req, res, next) => {
  console.log('unknown route hit')
  res.status(err.status).json({ error:err})
})

app.listen(PORT, (req, res) => {
  console.log('serverlistening on PORT 3000')
})

function checkIndexRange(index, res){
  if(index > petData.length){
    res.send(404, 'Not Found')
  } else if (index < 0){
    res.send(404,'Not Found')
  }
  console.log("inside check range" , petData[index])
  }


async function getPets(){
  try{
    let data = await fs.promises.readFile(dbPath, 'utf8')
    petData = JSON.parse(data)
    return petData
  } catch(error) {
    res.send(error)
  }
}

async function writePets(obj){
  if(Object.keys(obj).length > 0 ){
    console.log(petData)
    petData.push(obj)
    fs.writeFile(dbPath, JSON.stringify(petData) , (error) => {
      if(error){
        return {message: 'Error writing to the file'}
      }
    })
    return petData
  } else {
    console.log("Request body cannot be empty")
  }
}