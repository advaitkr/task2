const mongoose = require('mongoose')
const JobSchema = new mongoose.Schema({
title:{type:String,required:true},
department:{type:String,required:true},
salaryFrom:{type:String,required:true},
salaryTo:{type:String,required:true},
experience:{type:String,required:true},
minimumQualification:{type:String,required:true},
skillsRequired:{type:String,required:true},
company:{type:String,required:true},
email:{type:String,required:true},
phoneNumber:{type:String,required:true},
companyDescription:{type:String},
appliedCandidates:{type:[]},
postedBy:{type:mongoose.Types.ObjectId,ref:'User',required:[true,"Please provide user"]}
},{
    timestamps:true
})

const jobModel = new mongoose.model('jobs',JobSchema)
module.exports = jobModel