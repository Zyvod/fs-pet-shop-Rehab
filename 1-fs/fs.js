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
            if (!index){
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
 let jsData;
   if (process.argv.length == 6) {
     fs.readFile('../pets.json', 'utf8', function(error,data){
       if (error) {
         throw error
          } else {
            jsData = JSON.parse(data)
            let age = parseInt(process.argv[3]);
            let kind = process.argv[4];
            let name = process.argv[5];
              if (age.isInteger && kind && name) {
                let newRecord = { age, kind, name};
                jsData.push(newRecord)
                fs.writeFile('../pets.json', `${JSON.stringify(jsData)}`, function(error) {
                  if(error) {
                   throw error
                  } else {
                    console.log('check JSON File')
                  }
                })

              } else {
                console.error("Usage: node fs.js create <age> <kind> <name>");
                process.exit(1);
              }
          }
       })

    }
}