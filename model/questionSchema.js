const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    optionA:{
        type:String,
        required:true
    },
    optionB:{
        type:String,
        required:true
    },
    optionC:{
        type:String,
        required:true
    },
    optionD:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum: [
            "HTML", "CSS", "JavaScript", "React.js", "Node.js", "Angular",
            "Vue.js", "Express.js", "MongoDB"
        ]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true})

const questions = mongoose.model('questions',questionSchema)

module.exports = questions