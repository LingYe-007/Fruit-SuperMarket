var express = require('express');
var router = express.Router();
let ord = require("../controller/ord")
let  bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: true })

router("/",function(req,res){
    res.send("欢迎进入管理订单页面")
})

router.post("/add",urlencodedParser,function(req,res){
    let result=ord.add(req.body)
    result.then(
        data=>{
            res.send(data)
        }
    )
})
module.exports = router;