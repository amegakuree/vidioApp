const {
    where
} = require("sequelize")
const {
    User
} = require("../models")
const {
    compareSync,
    hashSync
} = require("bcryptjs")
const {
    signToken
} = require("../helpers/jwt")


class userController {

    static async register(req, res, next) {
        try {
            const {
                name,
                email,
                password,
            } = req.body
            const data = await User.create({
                name,
                email,
                password: hashSync(password),                
            })
            res.status(201).json({
                id: data.id,
                name: data.name,
                email: data.email,              
            })
        } catch (error) {
            next(error)
        }
    }
    
    static async login(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body
            if (!email) throw {
                name: "email required"
            }
            if (!password) throw {
                name: "password required"
            }

            const newUser = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (!newUser) throw {
                name: "Not Found"
            }

            const compare = compareSync(password, newUser.password)
            if (!compare) throw {
                name: "Not Found"
            }

            const dataName = newUser.name

            console.log(newUser.name);

            const paylod = {
                id: newUser.id
            }
            const access_token = signToken(paylod)

            res.status(200).json({
                access_token,dataName
            })

        } catch (error) {
            next(error)

        }
    }

}

module.exports = userController