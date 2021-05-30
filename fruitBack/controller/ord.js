
const exec = require('../config/mysql')

const add = (fruit) => {
    const sql="insert into ord(openid,status,time,name,phone,address,good,total) values(?,?,?,?,?,?,?,?)"
    const params=[fruit.openid,fruit.status,fruit.time,fruit.name,fruit.phone,fruit.address,fruit.good,fruit.total]
    return exec(sql,params).then(
        data=>{
            return{
                data
            }
        }
    )
}

const update=(fruit)=>{
    const sql="update ord set type"
}


module.exports={
    add,update
}