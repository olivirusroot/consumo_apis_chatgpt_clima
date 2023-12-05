import { userModel } from "../models/users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (request, response) => {
    try {
        let body = request.body

        body.password = bcrypt.hashSync(body.password, parseInt(process.env.MASTER_KEY))

        let newUser = await userModel.create(body)

        let token = await jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.JWT_KEY)

        const userData = {
            token,
            newUser
        }
        response.send(userData)

    } catch (e) {
        console.log(e)
        response.json(e)
    }

}

export const getUser = async (request, response) => {

    try {
        let user = await userModel.find()
        response.json(user)

    } catch (e) {
        console.log(e)
        response.json(e)
    }

}