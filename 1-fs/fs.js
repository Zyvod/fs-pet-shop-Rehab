import fs from 'fs'

if (process.argv.length < 3) {
  console.error("Usage: node fs.js [read | create | update | destroy]");
  process.exit(1);
}

const subcommand = process.argv[2];

if(subcommand === "read") {
  read();
}

if(subcommand === "create") {
  create();
}

function read() {
  let index = parseInt(process.argv[3])
  fs.readFile('../pets.json', 'utf8', function(error, data){
        if(error){
            console.log(error)
        } else {
            if (index === undefined){
                console.log(JSON.parse(data))
                console.log("It thinks it's not here")
            } else if(typeof index === 'number' && index < JSON.parse(data).length ){
                console.log(JSON.parse(data)[index])
            } else {
                console.log("Usage: node fs.js read INDEX")
            }
    }
  })
}

function create() {
  fs.writeFile('../pets.json', `${process.argv[3]}`)
}

