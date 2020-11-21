const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const md5=require('md5');
const bodyParser =require('body-parser');
const { query } = require('express');
const pool=mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'xzqa',
    charset:'utf8',
    connectionLimit:20
});
const server=express();
server.use(cors({
    origin:['http://localhost:8080','http://127.0.0.1:8080']
}));
server.use(bodyParser.urlencoded({
    extended:false
}));



// 获取所有文章分类信息的接口
server.get('/category',(req,res)=>{
   let sql='select id,category_name from xzqa_category';
   pool.query(sql,(error,results)=>{
    if(error) throw error;
    res.send({message:"查询成功",code:1,
results:results
})
   });
});

// 获取指定分类下包含的文章数据
server.get('/articles',(req,res)=>{
    let cid=req.query.cid;
    let page=parseInt(req.query.page);
    let pagesize=10;
    let pagecount;
    ///////////////////////////////////////
    let sql = "SELECT COUNT(id) AS count FROM xzqa_article WHERE category_id=?";
    pool.query(sql, [cid], (error, results) => {
      if (error) throw error;
      //获取总记录数
      let rowcount = results[0].count;
      //计算总页数,标准的公式 Math.ceil(总记录数/每页显示的条数)
      pagecount = Math.ceil(rowcount / pagesize);
      //******************************************************** */
      ///////////////////////////////////////
      // 根据page参数值并结合SELECT...LIMIT子句的标准计算公式来计算offset参数值
      let offset = (page - 1) * pagesize;
      // 以当前的cid为条件进行文章的查找操作
      sql = 'SELECT id,subject,description,image FROM xzqa_article  WHERE category_id=? LIMIT ?,?';
      // 执行SQL查询
      pool.query(sql, [cid, offset, pagesize], (error, results) => {
        if (error) throw error;
        res.send({ message: '查询成功', code: 1, results: results, pagecount: pagecount });
      });
      //******************************************************** */
      //console.log('总记录数有:' + results[0].count + '条' );
      //console.log('总页数有' + pagecount + '页');
    });
  
});

// 获取文章详细信息（包括正文，标题）
server.get('/details',(req,res)=>{
    let id=req.query.id;
    let sql='SELECT r.id,subject,content,created_at,nickname,avatar,stars,article_number FROM xzqa_article AS r INNER JOIN xzqa_author AS u ON author_id = u.id WHERE r.id=?';
    pool.query(sql,[id],(error,results)=>{
        if(error) throw error;
        res.send({
            message:"查询成功",
            code:1,
            articleInfo:results[0]
        });
    });
    ;

});



// 作者的全部信息,包括所写的文章信息
server.get('/author',(req,res)=>{
    // cid是文章的id
    let cid=req.query.cid;
    let author={};
    let discussList=[];
    // 获取文章的评论信息
    let sql='select id,discuss,num from xzqa_reader';
    pool.query(sql,(error,results)=>{
        if(error) throw error;
        discussList=results;
    });
    sql='select r.id as article_id,subject,content,created_at,nickname,avatar,article_number,author_id,username,image from xzqa_article as r inner join xzqa_author as u on author_id=u.id where author_id=(select author_id from xzqa_article where id=?) order by created_at';
    pool.query(sql,[cid],(error,results)=>{
        if(error) throw error;
        author=results[0];
        res.send({
            message:"查询成功",
            code:1,
            articleInfo:results,
            author:author,
            discussList:discussList

        });
        // console.log(image);
    });
    

});


// 把用户评论插入数据库中
server.post('/indiscuss',(req,res)=>{
    let id=req.body.id;
    let author_id=req.body.author_id;
    let discuss=req.body.discuss;
    let nickname=req.body.nickname;
    let it=req.body.it;
    let sql='insert into xzqa_reader values(?,?,?,?,?)';
    pool.query(sql,[id,nickname,author_id,discuss,it],(error,results)=>{
        if(error) throw error;
        res.send({
            message:"插入成功",
            code:1    
        })
    })
})

// 删除某条评论
server.delete('/deletelist',(req,res)=>{
    let cid=req.query.cid;
    console.log(req.query);
    let it=req.query.it;

    //找出文章id为？的所有评论
    let sql='delete from xzqa_reader where num=?';
    // 删除文章的第i条评论

    pool.query(sql,[it],(error,results)=>{
        if(error) throw error;
        list=results;
        // yao删除的数据是list[i]的数据
      
        res.send({code:1});
        
    })

})



// 用户注册的接口
server.post('/register',(req,res)=>{
    let username=req.bpdy.username;
    let password=req.body.password;
    let sql='select  count(id) as count from xzqa_author where username=?';
    pool.query(sql,[username],(error,results)=>{
        if(error) throw error;
        if(results[0].count==0){
            sql='insert into xzqa_author(username,password) values(?,md5(?))';
            pool.query(sql,[username,password],(error,results)=>{
                if(error) throw error;
                res.send({message:'注册成功',code:1});
            })
        }else {
            res.send({message:'用户已存在',
        code:0});
        }
    })
});

// 用户登录的接口
server.post('/login',(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    let sql='select id,username,avatar,article_number,nickname from xzqa_author where username=? and password=md5(?)';
    pool.query(sql,[username,password],(error,results)=>{
        if(error) throw error;
        if(results.length==0){
            res.send({message:'登录失败',code:0});
        }else {
            res.send({message:'登录成功',code:1,userInfo:results[0]}
            );
        }
    })
});


server.get('/data',(req,res)=>{
    let object={
        productName:"SHARP夏普超大屏商用电视广告机4K显示器120英PN-H120",
        salePrice:9222222
    };
    res.send({
        message:"查询成功",
        code:1,
        results:object
    })
})





server.listen(3000);