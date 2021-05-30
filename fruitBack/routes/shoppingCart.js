var express = require('express');
var router = express.Router();
let shoppingCart=require("../controller/shoppingCart")
let  bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: true })

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('来到购物车界面');
});

// 加入商品信息
router.post('/add',urlencodedParser,function(req,res){
//   let result=shoppingreqCart.add(req.query)
    var shoppinglist=[]
    // console.log(req.body)
    var shop=req.body.goods
    // console.log(shop)
  for(var i=0;i<shop.length;i++){
      console.log(typeof(shop[i].number))
      if(typeof(shop[i].number)==typeof(1)){
          console.log(1)
          shoppinglist.push(shop[i])
      }
      }
console.log(shoppinglist.length)
  var ones=[]
  for(var i=0;i<shoppinglist.length;i++)
  {
  console.log(shoppinglist[i])
  let result=shoppingCart.add(shoppinglist[i])
  console.log(result)
  }//   console.log(req.body)
    if(ones){
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
})

//查询购物车内容
router.get("/query",function(req,res){
  let result=shoppingCart.query(req.params)
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

// 删除购物车信息
router.delete("/delete",function(req,res){
  let result=fruit.delete(req.query)
        result.then(
            data =>{
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
            }}
        )
})

module.exports = router;
