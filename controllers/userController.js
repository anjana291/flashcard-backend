const users = require("../model/userSchema")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await users({
            email,
            password: hashedPassword
        })
        newUser.save()
        return res.status(200).json({ message: 'Registration successful', newUser })
    } catch (error) {
        return res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await users.findOne({email})

        if(!existingUser){
            return res.status(400).json('Invalid username or password')
        }

        const isPassword = await bcrypt.compare(password,existingUser.password)

        if(!isPassword){
            return res.status(400).json('Invalid username or password')
        }

        const sanitizedUser = {
            _id:existingUser._id,
            email:existingUser.email
        }
        const token = jwt.sign({userId:existingUser._id},'secretkey')
        return res.status(200).json({user:sanitizedUser,token})
    } catch (error) {
        return res.status(401).json(`Request failed due to ${error}`)
    }
}