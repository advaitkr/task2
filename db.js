const mongoose = require("mongoose")
dbConnect()
async function dbConnect(){
   try{
    mongoose.set('strictQuery', false);

    await mongoose.connect('mongodb://localhost:27017/Jobdbase',{
          useNewUrlParser:true
      })
     console.log('Mongo DB Connection success')
   }
   catch(error){
    console.log('Mongo DB Connection failed')

   }

}

module.exports = mongoose

//MONGO_URI = "mongodb://localhost:27017/Jobdb"