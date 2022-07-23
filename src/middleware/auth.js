
const jwt = require("jsonwebtoken");



let auth = async function(req,res,next){
    try{
    let token = req.headers["authorization"]
    if(token){
        let decodedToken = jwt.verify(token ,"Vikgol" )      
        if(decodedToken){
       req.decodedToken = decodedToken
        next() 
      }
    }else{ return res.status(401).send({ERROR:"invalid  Token "})}   

}catch(err){
    return res.status(500).send({ERROR:err.message})}
}

module.exports.auth=auth