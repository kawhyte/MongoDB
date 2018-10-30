const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('Connected to mongo-exercises DB'))
.catch(err => console.error('Could not connect to mongo-exercises Db',err.message));

const courseSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true, 
        minlength:5, 
        maxlength:255,},

    category: {
        type: String,
        required:true,
        enum: ['web', 'mobile','network']
    },

    author: String,
    tags:{type:String,
    validate: {
        validator: function (v) {

            return v && v.length > 0
        }, 
        message: 'A course should at least one tag'
    }
    },
    date:{type:Date, default: Date.now},
    isPublished: Boolean,
    price:{type: Number, 
        required: function(){
        return this.isPublished;  
    }, 
    min:10,
    max:500}
    });
    
const Course =  mongoose.model('Course', courseSchema);

async function createCourse(){

    const course = new Course({
        name: 'Math class',
        category:'web',
        author: 'Rene',
        tags:['',''],
        isPublished: true,
        price:15
    });
    try {
        const result = await course.save();
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
}


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
    .find({isPublished:true })
    .or([{name: /.*by.*/i},{price:{$gte:15}}])
    .limit(10)
    .sort({price: -1})
    .select({name:1, author:1, price:1})
    //.count()
    console.log(courses);
    }
    

/* async function updateCourse(id){
    const course = await Course.findById(id);
    
    if (!course){
    console.log("nothing here")
        return;
    } 
    
    course.isPublished= true;
    course.author= 'Another Author';
    const result  = course.save();
    console.log(result);
    } */


/* async function updateCourse(id){
    const result= await Course.update({ _id: id}, { 
        $set:{
        author:'Kenny',
        isPublished:false
    }
    });

    console.log(result);
    } */
async function updateCourse(id){
    const course= await Course.findByIdAndUpdate( id, { 
        $set:{
        author:'Kenny',
        isPublished:false
    }
    },{new:true});

    console.log(course);
    }
async function removeCourse(id){
//const result = await Course.deleteOne({_id: id});
const course = await Course.findByIdAndRemove(id);

    console.log(course);
}
createCourse(); 
//removeCourse('5ba63649ce14420168d289d9');
//updateCourse('5ba635e1b69b7a32a86b5392');
//getCourses2();


