const exec = require('../config/mysql')

// 添加购物车信息
const add = (fruit) => {
    const sql="insert into shoopingcart(id,type,name,price,image,allowance,openid,number) values(?,?,?,?,?,?,?,?)"
    const params=[fruit.id,fruit.type,fruit.name,fruit.price,fruit.image,fruit.allowance,fruit.openid,fruit.number]
    return exec(sql,params).then(
        data=>{
            return{
                data
            }
        }
    )
}

// 查询购物车信息
const query= ()=>{
    const sql ="select * from shoopingcart"
    return exec(sql).then(
        data=>{
            return data
        }
    )
}

// 删除购物车信息
const del=(name)=>{
    const sql="delete from shoopingcart where name=?"
    const params=[name.name]
    return exec(sql,params).then(
        data=>{
            return data
        }
    )
}

module.exports = {
    add,query,del
}