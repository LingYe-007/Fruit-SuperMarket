let express = require('express')
let router = express.Router();
let fruit = require('../controller/goodList');
let  bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: true })
// 添加水果
router.get('/', function (req, res) {
    res.send('欢迎来到水果菜单');
  });
router.get("/add", function (req, res) {
    let result=fruit.add(req.query)
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
  });
//   按种类查询
router.get("/query",function(req,res){
  let result=fruit.query()
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
}
)
// 更新商品信息
router.post("/update",urlencodedParser,function(req,res){
    let result=fruit.update(req.body)
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

router.get("/delete",function(req,res){
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

// router.post('/add',urlencodedParser,(req,res,next)=>{
//     let result = fruit.add(req.body)
//     result.then(data=>{
//         if(data.id > 1){
//             res.json({
//                 code: 200,
//                 msg: "添加成功",
//                 data
//             })
//         }else{
//             res.json({
//                 code: 500,
//                 msg: "添加失败",
//                 data
//             })
//         }
//     })
   
// })
module.exports = router;