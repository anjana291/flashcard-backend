const questions = require("../model/questionSchema")

exports.addQuestion = async (req, res) => {
    try {
        const userId = req.payload
        const { question, optionA, optionB, optionC, optionD, answer, category } = req.body

        const existingQuestion = await questions.findOne({ question })

        if (existingQuestion) {
            return res.status(406).json('This question already exists')
        }

        const newQuestion = await questions({
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            answer,
            category,
            userId
        })
        await newQuestion.save()
        return res.status(200).json({ message: 'Question added successfully', question: newQuestion })

    } catch (error) {
        return res.status(401).json(`Request failed due to ${error}`)
    }
}

//get questions of particular category
exports.getQuestionsOfCategory = async (req, res) => {
    try {
        const { selectedCategory } = req.body
        console.log(selectedCategory);
        

        const existingQuestions = await questions.find({category:selectedCategory})

        if(!existingQuestions || existingQuestions.length == 0){
            return res.status(404).json({ message: "No questions found for this category." })
        }

        res.status(200).json(existingQuestions)

    } catch (error) {
        return res.status(401).json(`Request failed due to ${error}`)
    }
}