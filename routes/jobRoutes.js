const express = require('express')
const router = express.Router();
const Job = require("../models/jobs")
const ApplyJob = require("../models/applyJob")
const User = require("../models/userModel")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === 'pdf') {
        cb(null, true)
    }
    else {
        cb(new Error('Only markdown files are accepted'), false);
    }

}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100000 * 1000000
    },
    fileFilter: fileFilter
})






router.get("/getalljobs", async (req, res) => {
    try {
        const jobs = await Job.find()
        res.send({ "msg": "all jobs", "jobs": jobs })
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

router.post("/postjob", async (req, res) => {
    try {
        req.body.postedBy = req.user._id
        const newjob = new Job(req.body)
        await newjob.save()
        res.send("Job posted Successfully")
    }
    catch (error) {
        return res.status(400).json({ error: error })
    }
})

router.get("/search/:key", async (req, res) => {
    console.log(req.params.key)
    let data = await Job.find({

        "$or": [
            { "skillsRequired": { $regex: req.params.key, $options: 'i' } },
            { "experience": { $regex: req.params.key } }
        ]

    })

    res.send({ "data": data })

})

router.patch("/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const id = req.params.id;
        const updates = {
            title: req.body.title,
            department: req.body.department,
            salaryFrom: req.body.salaryFrom,
            salaryTo: req.body.salaryTo,
            experience: req.body.experience,
            minimumQualification: req.body.experience,
            skillsRequired: req.body.skillsRequired,
            company: req.body.company,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        }

        const options = { new: true }
        const result = await Job.findByIdAndUpdate(_id, updates, options)
        res.status(200).send(result)

    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

router.delete("/deletejobs/:id",async(req,res)=>{
    
    const id = req.params.id
    const job = await Job.findByIdAndRemove({
        _id:id,
        postedBy:req.user._id
    })
   res.status(200).send({"job":job,"msg":"job deleted successfully"})

})

router.get('/jobpagination', async (req, res, next) => {
    try {
        let { page, size } = req.query
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 2
        }

        const limit = parseInt(size)
        const skip = (page - 1) * size
        const jobs = await Job.find().limit(limit).skip(skip)

    } catch (error) {
        res.sendStatus(500).send(error.message)
    }

})

router.post("/applyJob/:id",async(req,res)=>{

    try{
        //res.send({"user":req.user._id})
        console.log(req.body)
        const job = await Job.findOne({_id:req.params.id})
        job.appliedCandidates.push(req.user._id)
        const newapplyjob = new ApplyJob(req.body)
        await newapplyjob.save()
        res.send({"newApplyJob":newapplyjob})
       }catch(error){
         res.send({"error":error.message})
    }
   
})

module.exports = router