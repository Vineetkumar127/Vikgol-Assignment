const bookstoreModel = require('../models/bookstoreModel')
const bookinventoryModel = require('../models/bookinventoryModel')


const getallStore = async function (req, res) {

    try {
        const allStore = await bookstoreModel.find()
        if(!allStore){
            return res.status(400).send({ status: false, message: "Store will Be avaliable Soon" })
        }
        
        return res.status(200).send({
            status: true, message: "successful",totalStore:allStore.length, data: allStore
        })
    }catch(error) {
        return res.status(500).send({ status: false, message: err.message }) 
    }
}


const listtotalBooks= async function(req,res){
    try{
         
        let listBook = await bookinventoryModel.find({isDeleted:false})
        if(!listBook){
            return res.status(400).send({ status: false, message: "Book will Be avaliable Soon" })
        }
        return res.status(200).send({
            status: true, message: "successful",totalBooks:listBook.length, data: listBook
        })

    }catch(error) {
        return res.status(500).send({ status: false, message: err.message }) 
    }
}

module.exports.getallStore=getallStore
module.exports.listtotalBooks=listtotalBooks