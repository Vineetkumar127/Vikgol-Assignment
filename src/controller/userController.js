const userModel = require("../models/userModel")
const validator = require('../controller/validator')
const jwt = require("jsonwebtoken")
const { model } = require('mongoose')
const bookstoreModel = require('../models/bookstoreModel')
const axios = require('axios')
//--------------------------------------------------------
const StoreRegistration = async function(req,res){
    try{
        let data = req.body
        let userId = req.params.userId

        if (!validator.isValidObjectId(userId)){
             return res.status(400).send({ Status: false, message: "Please enter valid userid" }) 
            }
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like firstname lastname" })
        }
        const { storeId,storeName,address} = data
        if (!validator.isValid(storeId)) {
            return res.status(400).send({ status: false, massage: "please enter storeId" })
        }

        if (!validator.isValid(storeName)) {
            return res.status(400).send({ status: false, massage: "please enter storeName" })
        }

        if (!validator.isValid(address.street)) {
            return res.status(400).send({ status: false, massage: "please enter street address" })
        }
        if (!validator.isValid(address.city)) {
            return res.status(400).send({ status: false, massage: "please enter city address" })
        }
        if (!validator.isValid(address.pincode)) {
            return res.status(400).send({ status: false, massage: "please enter pincode address" })
        }
       let userDetails = await userModel.findById(userId)
       if(!userDetails){
        return res.status(404).send({ Status: false, message: "The user is not found" }) 
       }
       if (userDetails.profile == "user"){
         return res.status(403).send({ Status: false, message: "Admin can crate store" }) 
        }
   
        if(userId==req.decodedToken.userId){
            let createStore = await bookstoreModel.create(data)
            return res.status(201).send({ status: true, message: "successful", data: createStore })
        }else{
            return res.status(403).send({ status: false, message: "authorization denied" })
        }
        

    }catch(error){
        return res.status(500).send({ status: false, message: error.message })  
    }
}

//---------------------------------------------------------------------------------


const createUser = async function (req, res) {

    try {

        const data = req.body


        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, ERROR: "please provide Data" })
        }

        if (!validator.isValid(data.title)) {
            return res.status(400).send({ status: false, ERROR: "title required" })
        }
        if (!validator.isvalidTitle(data.title)) {
            return res.status(400).send({ status: false, ERROR: "valid title required" })
        }


        if (!validator.isValid(data.name)) {
            return res.status(400).send({ status: false, ERROR: "Name required" })
        }


        if (!validator.isValid(data.phone)) {
            return res.status(400).send({ status: false, msg: "mobile is required" })
        }

        if (!validator.isValidPhone(data.phone)) {
            return res.status(400).send({ status: false, msg: "please provide a valid moblie Number" })
        }

        let duplicateMobile = await userModel.findOne({ phone: data.phone })
        if (duplicateMobile) {
            return res.status(400).send({ status: false, msg: "mobile number already exists" })
        }



        if (!validator.isValid(data.email)) {
            return res.status(400).send({ status: false, ERROR: "Email required" })
        }
        if (!validator.isValidEmail(data.email)) {
            return res.status(400).send({ status: false, msg: "Please provide a valid email" });
        }

        let duplicateEmail = await userModel.findOne({ email: data.email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, msg: "Email already exists" })
        }


        if (!validator.isValid(data.password)) {
            return res.status(400).send({ status: false, ERROR: "Password required" })
        }
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.password))) {
            return res.status(400).send({ status: false, msg: "please provide a valid password with one uppercase letter ,one lowercase, one character and one number " })
        }
        // if (!validator.isValid(data.address)) {
        //     return res.status(400).send({ status: false, massage: "please enter address" })
        // }
        if (!validator.isValid(data.address.street)) {
            return res.status(400).send({ status: false, massage: "please enter street address" })
        }
        if (!validator.isValid(data.address.city)) {
            return res.status(400).send({ status: false, massage: "please enter city address" })
        }
        if (!validator.isValid(data.address.pincode)) {
            return res.status(400).send({ status: false, massage: "please enter pincode address" })
        }

        const savedData = await userModel.create(data)
        return res.status(201).send({ status: true,message: "successful", userData: savedData })

    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })
    }
}

// .................................second Api user login..............................................................................

const userLogin = async function (req, res) {

    try {
        Data = req.body

        if (Object.keys(Data) == 0) {
            return res.status(400).send({ status: false, message: "Please provide email id or password" })
        }
        const { email, password } = Data;
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: `Email is required` })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: `Email is not correct ` })
        }

        if (!validator.isValid(password)) {
            res.status(400).send({ status: false, message: `password is required` })
            return
        }

        const findUser = await userModel.findOne({ email: email, password: password })
        if (!findUser) {
            return res.status(404).send({ status: false, message: "No user found" })
        }
        const token = jwt.sign({
            userId: findUser._id,
        }, "Vikgol",
        );
        res.setHeader('authorization', token);

        return res.status(200).send({ status: true, message: "Successful Login", Token: token })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getbookIdfromgoogleApi = async function (req, res) {
    let titl = req.query.title
    let data = []
    let googleBookApi = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${titl}`)
    let itemIngoogleApi = googleBookApi.data.items
    for (let i = 0; i < itemIngoogleApi.length; i++) {
        data[i] = {
            id: itemIngoogleApi[i].id,
            title: itemIngoogleApi[i].volumeInfo.title,
            subtitle: itemIngoogleApi[i].volumeInfo.subtitle,
            authors: itemIngoogleApi[i].volumeInfo.authors,
            discription: itemIngoogleApi[i].volumeInfo.description
        }
    }
    return res.status(200).send({ status: true, totalCount: data.length, data: data })
}



module.exports.StoreRegistration=StoreRegistration
module.exports.createUser = createUser
module.exports.userLogin = userLogin
module.exports.getbookIdfromgoogleApi = getbookIdfromgoogleApi

