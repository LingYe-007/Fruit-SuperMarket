const exec = require('../config/mysql')

// 添加水果清单数据
const add = (fruit) => {
    const sql="insert into address(openid,name,phone,address,add_inf) values(?,?,?,?,?)"
    const params=[fruit.openid,fruit.name,fruit.phone,fruit.address,fruit.add_inf]
    return exec(sql,params).then(
        data=>{
            return{
                data
            }
        }
    )
}
const query=()=>{
    const sql="select * from address"
    return exec(sql).then(
        data=>{
            return data
        }
    )
}

const del=(name)=>{
    const sql="delete from address where id=?"
    const params=[name.id]
    return exec(sql,params).then(
        data=>{
            return data
        }
    )
}
module.exports={
    add,query,del
}