const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('Connected to mongo-exercises DB'))
.catch(err => console.error('Could not connect to mongo-exercises Db',err.message));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags:[String],
    date:{type:Date, default: Date.now},
    isPublished: Boolean
    });
    
const Course =  mongoose.model('Course', courseSchema);


async function getCourses(){
    const courses = await Course
    //.find({author: 'Rene Whyte' , isPublished: true })
    //.find({author:/^ren/i})
    .find({isPublished:true, tags:'backend'})
    .limit(10)
    .sort({name: 1})
    .select({name:1, author:1})
    //.count()
    console.log(courses);
    }
    
async function getCourses2(){
    const courses = await Course
    //.find({author: 'Rene Whyte' , isPublished: true })
    //.find({author:/^ren/i})
    .find({isPublished:true, tags:{ $in: ['backend','frontend'] } })
    .limit(10)
    .sort({price: -1})
    .select({name:1, author:1, price:1})
    //.count()
    console.log(courses);
    }
async function getCourses3(){
    const courses = await Course
    //.find({author: 'Rene Whyte' , isPublished: true })
    //.find({author:/^ren/i})
    .find({isPublished:true, gt:{price:15} })
    .limit(10)
    .sort({price: -1})
    .select({name:1, author:1, price:1})
    //.count()
    console.log(courses);
    }
    
    getCourses2();