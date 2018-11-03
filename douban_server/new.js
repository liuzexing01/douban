
const https=require('https');
var http=require('http');

var qs = require('querystring'); 
   
var data = { 
    start: 0, 
    count: 100
};//这是需要提交的数据 
      
var content = qs.stringify(data); 
var options = {
  hostname: 'api.douban.com',
  port: 443,
  path: '/v2/movie/in_theaters?'+content,
  method: 'GET',	
};

var str=''
var str2=''
var arr=[]
//发起请求
var req = https.request(options, (res) => {
 
	  res.on('data', (d) => {
		str+=d;	
	  });
	  
	  res.on('end',()=>{
	  	var list=JSON.parse(str).subjects
	  	list.map(function(item){
	  		arr.push(item) 
	  	})
	  	
	  })
});

http.createServer((req,res)=>{
	res.writeHead(200,{'content-type':'text/html;charset=utf-8','Access-Control-Allow-Origin':'*'})
	if(req.url!='/favicon.ico'){
			res.write(JSON.stringify(arr))
			res.end()
	}
}).listen(3002)

//请求失败
req.on('error', (e) => {
  console.error(e);
});
//结束请求
req.end();
