const exec = require('../config/mysql')

//添加公告内容
const add = (notice) => {
    const sql="insert into notice(type,content) values(?,?)"
    const params=[notice.type,notice.content]
    return exec(sql,params).then(
        data=>{
            return{
                data
            }
        }
    )
}

// 查询公告内容
const query= ()=>{
    const sql ="select * from notice"
    // const params=[type.type]
    return exec(sql).then(
        data=>{
            return data
        }
    )
}

// 修改公告信息
const update=(fruit)=>{
    const sql="update notice set type=? content=? where id=?"
    const inf=[fruit.type,fruit.content,fruit.id]
    return exec(sql,inf).then(
        data=>{
            return data
        }
    )
}
//删除公告
const del= (dele)=>{
    const sql="delete from notice where id=?"
    console.log(dele)
    const params=[dele.id]
    console.log(params)
    return exec(sql,params).then(
        data=>{
            return data
        }
    )
}
module.exports = {
    add,query,update,del
}