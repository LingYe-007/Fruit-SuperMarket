var express = require('express');
var router = express.Router();
let notice = require('../controller/notice.js');
let ord=require("../controller/ord")
let login=require('../controller/login.js')
let bodyParser = require('body-parser')
let address=require('../controller/address')

let urlencodedParser = bodyParser.urlencoded({ extended: true })

/* GET home page. */

router.get('/', function (req, res) {
  res.send('用户首页');
});
// 添加数据
router.get('/add',function(req,res){
  let result =notice.add(req.query)
  result.then(
    data=>{
        if(data.data.insertId>1){
            res.json({
                code:200,
                msg:"添加成功"
            })
        }else{
          res.json({
            code:200,
            msg:"添加失败"
          })
        }
    }
)
})
// 按种类查询
router.get("/query",function(req,res){
  let result=notice.query()
  result.then(
      data =>{
          if(data){
              res.send(data)
          }
          else{
              res.send( {
                  code:500,
                  msg:"查询失败"
          })
      }}
  )
})
// 更新公告信息
router.get("/update",function(req,res){
  let result=notice.update(req.query)
  result.then(
      data =>{
          if(data){
              res.send(data)
          }
          else{
              res.send( {
                  code:500,
                  msg:"修改失败"
          })
      }}
  )
})
// 删除公告
router.get("/delete",function(req,res){
console.log(req.query)
  let result=notice.del(req.query)
  console.log(result)
  result.then(
      data =>{
          if(data.affectedRows!=0){
            res.json({
                code:200,
                msg:"删除成功"
            })
          }
          else{
              res.send ({
                  code:500,
                  msg:"修改失败"
          })
      }}
  )
})
router.get("/login",function(req,res){
    console.log("you get it")
    let params=req.query;
    var code=params.code;
    var encryptedData=params.encryptedData;
    var iv=params.iv;
    let appid="wx485285504034f7a6";
    let secret='93db769ade693327e6bbcf99a0dcd1a1';
    let grant_type="authorization_code";
    // 请求获取openid
    let url = "https://api.weixin.qq.com/sns/jscode2session?grant_type="+grant_type+"&appid="+appid+"&secret="+secret+"&js_code="+code;
  let https = require("https");
  https.get(url, (e) => {
    e.on('data', (d) => {
        // console.log('返回的信息: ', JSON.parse(d));
        openid = JSON.parse(d).openid;//得到openid
        sessionKey = JSON.parse(d).session_key;
        res.send(openid)
    }).on('error', (e) => {
      
        // console.error(e);
        // console.log(openid)
    });
  
});})
router.get("/address",function(req,res){
    let params =req.query;
    let result =address.add(params)
    result.then(
        data =>{
            if(data){
                res.send(data)
            }
            else{
                res.send( {
                    code:500,
                    msg:"修改失败"
            })
        }}
    )
}
)
router.get("/address/query",function(req,res){
    console.log("you get it")
    let resust =address.query()
    console.log(resust)
    resust.then(
        data=>{
            res.send(data)
        }
    )
})
router.post("/ord/add",urlencodedParser,function(req,res){
    let result=ord.add(req.body)
    result.then(
        data=>{
            res.send(data)
        }
    )
})

module.exports = router;
