const mongoose = require('mongoose');
const JobApplySchema = new mongoose.Schema({
    usrename: {
        type: String,
      },
      filedocument: {
        type: String,
      },
      email:{
          type: String,
       }
    
},{
       timestamps:true
    })
const ApplyJob = mongoose.model("ApplyJob",JobApplySchema);
module.exports = ApplyJob