var express = require('express');
var router = express.Router();
var dbb = 'mongodb+srv://admin:k95rio6dQLn3pOd5sd@cluster0.7tjbc.mongodb.net/mydata?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(dbb).catch(error => {
  console.log("co loi xay ra" + error)
});
var MongoClient = require('mongodb').MongoClient;
var da={};
var url="mongodb+srv://admin:k95rio6dQLn3pOd5sd@cluster0.7tjbc.mongodb.net/mydata?retryWrites=true&w=majority"
var mogo = new MongoClient(url,{ useNewUrlParser:true});
mogo.connect((err,db)=>{
  if (err) throw err;
  console.log("ket noi thanh cong")
  var dbo= db.db("mydata")

  dbo.collection("asms").find().toArray((err,objs)=>{
    if (err) throw err;
    if (objs.length != 0) console.log("lay duu lieu ok ");
    da=objs
    db.close();
  })
})
/* GET home page. */
router.get('/', function(req, res, next) {
  var da2=da;
  res.render('index', { title: '',Da2:da2 });
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Express' });
});
var carSchema = new mongoose.Schema({
  linkanh: 'string',
  ngaythang: 'string',
  noidung:'String'

})
// buoc 2 : lien ket Schema vs mongoDB qua mongoose
var ASM = mongoose.model('asms', carSchema);

router.post('/btnxoa',function (req,res){
  var ida =req.body.idAnh
  console.log(ida)
  ASM.deleteOne({_id: ida}, function (error) {
    var mess;
    if (error == null) {
      mess = 'Xoa thanh cong'
    } else {
      mess = error
    }  })
  res.render('xoa')
})
router.post('/btnsua',function (req,res){
  var ida =req.body.idAnh2
  console.log(ida)
  res.render('sua',{idsua:ida})
})

router.post('/suaTT',function (req,res){
  var linkanh = req.body.linkanh2
  var ngay= req.body.ngaythang2
  var nd=req.body.noidung2
  var id=req.body.idsua2
  ASM.updateOne({_id: id}, {linkanh:linkanh, ngaythang:ngay, noidung:nd}, function (error) {
    var mess;
    if (error == null) {
      mess = 'sua thanh cong'
    } else {
      mess = "loi !"
    }
    res.send(mess)
  })

});

router.post('/addAnh',function (req,res){
  var linkanh = req.body.linkanh
  var ngay= req.body.ngaythang
  var nd=req.body.noidung
  const asm= new ASM({
    linkanh:linkanh,
    ngaythanhg:ngay,
    noidung:nd
  })
  var mess;
  asm.save( function (error){
    if (error == null) {
      mess = 'Them thanh cong'
    } else {
      mess = ''
    }
  })
  res.render('add',{mes:mess})
});

module.exports = router;
