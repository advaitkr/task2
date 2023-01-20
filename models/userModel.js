const mongoose = require("mongoose")
const validator = require("validator")
const userSchema = new mongoose.Schema({
   username:{type:String,required:true},
   password:{type:String,minlength:8,required:true},
   passwordConfirm:{
     type:String,
     required:[true,'Please confirm your password'],
     validate:{
        validator:function(el){
            return el === this.password
        },
        message:'Passwords are not the same!'
     }
   },
   email:{type:String,unique:true,lowercase:true,validate:[validator.isEmail,'Please ernter a valid email'],default:''},
   mobileNumber:{type:String,default:''},
   portfolio:{type:String,default:''},
   about:{type:String,default:''},
   address:{type:String,default:''},
   education:{type:[],default:['']},
   skills:{type:[],default:['']},
   projects:{type:[],default:['']},
   experience:{type:[],default:['']},
   appliedJobd:[]
   
},{timestamps:true});


const userModal = new mongoose.model('users',userSchema)

module.exports = userModal;