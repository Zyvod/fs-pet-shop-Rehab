import express from 'express'
import pg from 'pg'
const { Pool } = pg;
import fs from 'fs'

// install express, pg and nodemon
const APIPORT = 3000;
const app = express();


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database:"petshop",
  password: process.env.DB_PASSWORD,
  port: process.env.PORT || 9934
})


// let petData;
// const dbPath = '../pets.json'


app.use(express.json())

// app.use('/', (req,res next) =>) {
//   console.log('validation check goes here')
//   next();
// }

//GET ALL
// app.get('/pets', async (req, res,) => {
//   petData = await getPets()
//   console.log('get all pets path')
//   res.send(petData)
// })

app.get('/pets', async (req,res) => {
  try {
    const result = await pool.query(
    `SELECT * FROM pets;`)
    res.status(200).send(result.rows)
  } catch(error) {
      console.error(error)
      res.status(400).send('Bad Request')
   }
})


// //GET ONE
// app.get('/pets/:id', async(req,res)=> {
//   petData = await getPets()
//   const index = req.params.id
//   checkIndexRange(index,res)
//   res.send(petData[idnex])
// })

app.get('/pets/:id', async(req,res) => {
  try {
    const index = req.params.id
    const result = await pool.query(
      `SELECT * FROM pets WHERE id = $1;`, [index])
    console.log(result.rows)
    res.send(result.rows)
  } catch(error) {
      console.error(error)
      res.status(400).send('Bad Request')
   }
})

// //POST
// app.post('/pets', async(req, res) =>{
//   petData = await getPets()
//   let petDataNew = await writePets(req.body)
//   res.send(petDataNew)
// })

app.post('/pets', async(req,res) => {
  try {
    let petData = await checkData(req)
    if ( petData === false ) {
      throw new Error('Invalid pet data')
    } else {
      const result =  await pool.query(`INSERT INTO pets (age,kind,name) VALUES ($1,$2,$3) ;`, [petData.age, petData.kind, petData.name])
      res.status(201).send('Successfully Added New Pet')
    }
  } catch(error) {
      console.error(error)
      res.status(400).send('Bad Request')
    }
})

// //PUT /PATCH
// app.put('/pets/:id', async(req,res)=> {
//   petData = await getPets();
//   const index = req.params.id
//   let adjustedPetData = await adjustPets(index, req.body)
//   res.send(adjustedPetData)
// })

app.put('/pets/:id', async(req,res) => {
  try {
    const id = req.params.id
    const petData = await checkData(req)
    if (petData === false) {
      throw new Error('Invalid pet data')
    } else {
      const result = await pool.query(`UPDATE pets SET age = $1, kind = $2, name = $3 WHERE id = $4`, [petData.age,petData.kind,petData.name,id])
      res.status(200).send(`Successfully Updated Pet at ID:${id}`)
    }

  } catch(error) {
      console.error(error)
      res.status(400).send('Bad Request')
   }
})

// //DELETE
// app.delete('/pets/:id', async (req,res) => {
//   petData = await getPets();
//   const index = req.params.id
//   let adjustedPetData = await deletePets(index)
//   res.send(adjustedPetData)
// })

app.delete('/pets/:id', async(req,res) =>{
  try{
    const id = req.params.id
    if ( id > 0 ) {
      await pool.query(`DELETE FROM pets WHERE id = $1`, [id])
      res.status(200).send(`Successfully Deleted Pet ID:${id}`)
    } else {
     throw new Error('Invalid ID')
    }
  } catch(error) {
      console.error(error)
      res.status(400).send('Bad Request')
   }
})


app.use((req, res, next) => {
  next({message: 'The path you are looking for does not exist', status:404})
})

app.use((err, req, res, next) => {
  console.log('unknown route hit')
  res.status(err.status).json({ error:err})
})

app.listen(APIPORT, (req, res) => {
  console.log('serverlistening on PORT 3000')
})

// function checkIndexRange(index, res){
//   if(index > petData.length){
//     res.send(404, 'Not Found')
//   } else if (index < 0){
//     res.send(404,'Not Found')
//   }
//   console.log("inside check range" , petData[index])
//   }


// async function getPets(){
//   try{
//     let data = await fs.promises.readFile(dbPath, 'utf8')
//     petData = JSON.parse(data)
//     return petData
//   } catch(error) {
//     res.send(error)
//   }
// }

// async function writePets(obj){
//   if(Object.keys(obj).length > 0 ){
//     console.log(petData)
//     petData.push(obj)
//     fs.writeFile(dbPath, JSON.stringify(petData) , (error) => {
//       if(error){
//         return {message: 'Error writing to the file'}
//       }
//     })
//     return newPetData
//   } else {
//     console.log("Request body cannot be empty")
//   }
// }

// async function adjustPets(index, obj){
//   if(Object.keys(obj).length > 0 ){

//     const newPetData = [
//       ...petData.slice(0,index),
//       obj,
//       ...petData.slice(index+1)
//     ]

//     fs.writeFile(dbPath, JSON.stringify(newPetData) , (error) => {
//       if(error){
//         return {message: 'Error writing to the file'}
//       }
//     })
//     return petData
//   } else {
//     console.log("Request body cannot be empty")
//   }
// }

// async function deletePets(index, obj){
//     const newPetData = [
//       ...petData.slice(0,index),
//       ...petData.slice(index+1)
//     ]

//     fs.writeFile(dbPath, JSON.stringify(newPetData) , (error) => {
//       if(error){
//         return {message: 'Error writing to the file'}
//       }
//     })
//     return petData

//     console.log("Request body cannot be empty")
// }

function checkData(req) {
  const data = req.body;
  if( Object.keys(data).length !== 3 || typeof data.age !== 'number') {
    return false;
  } else {
    return data;
  }
}