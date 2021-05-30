let express = require('express')
let router = express.Router();
let address =require("../controller/address")
let  bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: true })

router.get("/",function(req,res){
    res.send("欢迎进入管理地址页面")
})

router.get("/add",function(req,res){
    let result =address.add(req.query)
    result.then(
        data=>{
            console.log(data)
            if(data.data.insertId>1){
                res.json({
                    code:200,
                    msg:"添加成功"
                })
            }else{
                res.json({
                    code:500,
                    msg:"添加失败"
                })
            }
        }
    )
})
router.get("/query",function(req,res){
    let result =address.query
    result.then(
        data=>{
            if(data){
                res.send(data)
            }
            else{
                res.send({
                    code:500,
                    msg:"查询失败"
                })
            }
        }
    )
})

router.get("/delete",function(req,res){
    let result=address.del
    result.then(
        data=>{
            if(data){
                res.json({
                    code:200,
                    msg:"删除成功"
                })
            }
            else{
                res.json({
                    code:500,
                    msg:"删除成功"
                })
        }
        }
    )
})
module.exports = router;