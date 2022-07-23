const express = require('express');

const router = express.Router();
const authorization = require('../middleware/auth')
const userController = require("../controller/userController")
const getbookController = require('../controller/getbookController')
const bookinventoryController = require('../controller/bookinventoryController')
// ...................User Api..................

router.post("/register", userController.createUser)

router.post("/login",userController.userLogin )

router.post('/createStore/:userId', authorization.auth, userController.StoreRegistration)

router.get('/getbookidfromgoogleApi', userController.getbookIdfromgoogleApi)

router.get('/getStore',getbookController.getallStore)

router.get('/getList', getbookController.listtotalBooks)

router.post('/addnewBook/:userId/:storeId',authorization.auth, bookinventoryController.addnewBook )

router.put('/updateBook/:userId/:inventryId' , authorization.auth,bookinventoryController.updateinventoryBook)

router.delete('/deleteBook/:userId/:inventryId', authorization.auth,bookinventoryController.removeBookfromInventory)



module.exports = router;