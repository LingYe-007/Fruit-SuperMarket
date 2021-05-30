// 数据库内容封装
const mysql = require('mysql')
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '892104576',
    database: 'fruitsupermaket',
    port: '3306'
});

conn.connect()
//执行SQL的函数
function exec(sql,params) {
	const promise = new Promise((resolve,reject)=>{
		conn.query(sql, params, (err,result) => {
			if(err){
				reject(err);
				return;
            }
			resolve(result);
		})
	});
	return promise;
}
module.exports = exec