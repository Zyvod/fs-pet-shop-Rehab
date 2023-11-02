import http from 'http';
import fs from 'fs';
import { URL } from 'url';
import express from 'express';

const app = express();

app.get('/pets',function(req,res) {
  // plainHeader;
  // setCode 200
  res.send('It Worked!')
})

app.listen(7000, function(error) {
  if (error) {
      console.error('Error starting the server:', error);
  } else {
      console.log('Server is running on port 7000');
  }
});


















// const petDatabase = "../pets.json";
// const petData = fs.readFileSync(petDatabase, 'utf8');
// const pets = JSON.parse(petData);

// const parsedURL = url.parse(req.url, true);
// const parsedURL = new URL(req.url, `http://${req.headers.host}`);

// const jsonHeader = res.setHeader('Content-Type', 'application/json');
// const plainHeader = res.setHeader('Content-Type', 'text/plain');

// const setCode = res.statusCode;
// const methType = req.method
// mmm drugs! - I am kidding, I do not endorse the use of illegal drugs




// const server = http.createServer(function (req, res) {
//   res.setHeader('Content-Type', 'application/json');


//   if (req.method === 'GET' && parsedURL.pathname === '/pets') {
//     res.statusCode = 200;
//     res.end(JSON.stringify(pets));
//   } else if (req.method === 'GET' && parsedURL.pathname.match(/^\/pets\/\d+$/)) {
//     const index = parseInt(parsedURL.pathname.match(/^\/pets\/(\d+)$/)[1]);

//     if (index >= 0 && index < pets.length) {
//       res.statusCode = 200;
//       res.end(JSON.stringify(pets[index]));
//     } else {
//       res.statusCode = 404;
//       res.end('Not Found');
//     }

//   } else if (req.method === 'POST' && parsedURL.pathname === '/pets') {
//     let body = []

//         req.on('data', chunk => {
//           body.push(chunk)
//       });

//       req.on('end', () => {

//         const completeBody = Buffer.concat(body).toString();
//         const newPet = JSON.parse(completeBody)

//         if(!isValidPet(newPet)) {

//           res.statusCode = 400;
//           res.end('Bad Request');

//         } else if (isValidPet(newPet))

//          pets.push(newPet);
//          fs.writeFile('../pets.json', `${JSON.stringify(pets)}` , function(error) {
//            if(error) {
//            throw error
//           } else {
//             console.log('check JSON File')
//           }
//         })

//         console.log('Received data:',JSON.parse(body[0]));

//         res.writeHead(200, { 'Content-Type': 'text/plain'});
//         res.end('Received the data');
//       });

//      } else {
//       res.statusCode = 404;
//       res.end('Not Found');
//   }
// });

// function isValidPet(newPet) {
//   return (
//     newPet && typeof newPet.age === 'number'
//     && typeof newPet.kind === 'string'
//     && typeof newPet.name === 'string'
//   );
// }

// server.listen(port, function () {
//   console.log('Listening on port', port);
// });
// const port = process.env.PORT || 8001;
