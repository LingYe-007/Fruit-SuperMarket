const exec = require('../config/mysql')

// 添加水果清单数据
const add = (fruit) => {
    const sql="insert into goodlisthot(type,name,price,image,allowance) values(?,?,?,?,?)"
    const params=[fruit.type,fruit.name,fruit.price,fruit.image,fruit.allowance]
    return exec(sql,params).then(
        data=>{
            return{
                data
            }
        }
    )
}

// 查询商品query
const query= ()=>{
    const sql ="select * from goodlisthot"
    
    // const params=[type.type]
    // const result=exec(sql)
    // const result1=exec(sql1)
    // console.log(result);
    // console.log(result1);
    return exec(sql).then(
        data=>{
            return data
        },
    )
}
// 修改商品信息
const update=(fruit)=>{
    const sql="update goodlisthot set type=?,name=?,price=?,image=?,allowance=?"
    const inf=[fruit.type,fruit.name,fruit.price,fruit.image,fruit.allowance]
    return exec(sql,inf).then(
        data=>{
            return data
        }
    )
}

// 删除商品
const del=(name)=>{
    const sql="delete from fruit where id=?"
    const params=[name.id]
    return exec(sql,params).then(
        data=>{
            return data
        }
    )
}

module.exports = {
    add,query,update,del
}