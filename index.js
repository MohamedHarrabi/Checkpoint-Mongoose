const mongoose=require('mongoose')
const personModel=require('./src/models/person')
require('dotenv').config({ path: './config/.env' })
// conncetion to DB 
mongoose.connect(process.env.MONGO_URI,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('connected success')
})
.catch(err=>{
    console.log(err)
})

//Create and Save a Record of a Model:
const firstp = new personModel({
    name:"lami",
    age:20,
    favoriteFood:["tacos","pizza","burrito"]
})

firstp.save()
.then((data)=>{
    // console.log(data)
})
.catch(err=>{
    console.log(err)
})

// Create Many Records with model.create()
personModel.create([
    {
        name:"jane",
        age:22,
        favoriteFood:['lablebi','kafteji',"burrito"]
    },
    {
        name:"mike",
        age:45,
        favoriteFood:['couscous','lasagne',"burrito"]
    },
    {
        name:"ronney",
        age:18,
        favoriteFood:['lablebi','kafteji','couscous','pizza',"burrito"]
    },
    {
        name:"walid",
        age:32,
        favoriteFood:['sandwich','tacos']
    }
])
.then((data)=>{
    // console.log(data)
    console.log('data added with success')
})
.catch(err=>{
    console.log(err)
})

// Use model.find() to Search Your Database
personModel.find({
        name:'walid'
    })
.then(doc => {
    console.log('search by name :',doc)
})
.catch(err=>{
    console.error(err)
})

//Use model.findOne() to Return a Single Matching Document from Your Database
personModel.findOne({
    favoriteFood:{$in:"pizza"}
})
.then(doc => {
    console.log('search one who like pizza :',doc)
})
.catch(err=>{
    console.error(err)
})

// Use model.findById() to Search Your Database By _id 
personModel.findById('60000b5f5a37a02a88ae5da6')
.then(doc => {
    console.log('found by Id :',doc)
})
.catch(err=>{
    console.error(err)
})

//Perform New Updates on a Document Using model.findOneAndUpdate()
personModel.findOneAndUpdate({name:"jane"},{age:20},{new:true})
.then((data)=>{
    console.log('modification done :',data)
})
.catch(err=>{
    console.error(err)
})

//Delete One Document Using model.findByIdAndRemove

personModel.findByIdAndRemove("60000b5f5a37a02a88ae5da7")
.then((data)=>{
    console.log('removed with success :',data)

})
.catch(err=>{
    console.error(err)
})

// MongoDB and Mongoose - Delete Many Documents with model.remove()
personModel.remove({name:"mike"})
.then(data=>{
    console.log('removed data :',data)
})
.catch(err=>{
    console.error(err)
})

// Chain Search Query Helpers to Narrow Search Results
personModel.find({favoriteFood:{$in:"burrito"}})
.sort({ name: 1 })
.limit(2)
.select('-age')
.then(data=>{
    console.log('found and soreted :',data)
})
.catch(err=>{
    console.error(err)
})
    
  