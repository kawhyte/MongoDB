const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB'))
.catch(err => console.error('could not connect to MongoDb',err.message));


const courseSchema = new mongoose.Schema({
name: String,
author: String,
tags:[String],
date:{type:Date, default: Date.now},
isPublished: Boolean
});

const Course =  mongoose.model('Course', courseSchema);

async function createCourse(){

    const course = new Course({
        name: 'Angular Course',
        author: 'Kenny Whyte',
        tags:['angular', 'Frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);

}

async function getCourses(){
const courses = await Course
//.find({author: 'Rene Whyte' , isPublished: true })
.find({author:/^ren/i})
.limit(10)
.sort({name: 1})
//.select({name:1,tags:1 , author:1})
.count()
console.log(courses);
}

getCourses();
//createCourse();

