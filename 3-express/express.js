import express from 'express';
import fs from 'fs';

const petDatabase = "../pets.json"
const petData = fs.readFileSync(petDatabase, 'utf8');
let pets = JSON.parse(petData);

const app = express();
const PORT = 3000;

app.get('/pets', (req, res) => {
    res.status(200).json(pets);
});

app.get('/pets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id>= 0 && id < pets.length) {
        res.status(200).json(pets[id]);
      } else {
        res.status(404).send('Not Found');
}});

app.use(express.json());

app.post('/pets', (req,res) => {
  const newPet = req.body;
    if(!isValidPet(newPet)) {
      res.status(400).send('Bad Request');
    } else if (isValidPet(newPet)) {
      pets.push(newPet);
      writePet(pets);
      res.status(200).send('Data Received');
    }
});

app.use((req,res) => {
  res.status(404).send('Not Found')
})

app.listen(PORT, () => {
    console.log('server is running');
});

function isValidPet(newPet) {
    return (
      newPet &&
      typeof newPet.age === 'number' &&
      typeof newPet.kind === 'string' &&
      typeof newPet.name === 'string'
    );
};

function writePet(petList) {
    fs.writeFile('../pets.json', `${JSON.stringify(petList)}` , (error) => {
        if(error) {
        throw error
       } else {
         console.log('check JSON File')
       }
     })
}