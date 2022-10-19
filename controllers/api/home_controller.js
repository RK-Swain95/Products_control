// const fetch = require("node-fetch");
// import fetch from 'node-fetch';
const externalApi =
  "https://mindler-dashboard.s3.us-east-2.amazonaws.com/products.json";

const Products=require('../../models/products');
var express = require('express');
var router = express.Router();
var request = require('request');

module.exports.allData= function (req,res){
  request({
    uri: externalApi,
    query: "products",

  },
  function(err, response, body){
    if(!err ){
      // console.log(body);
      var result = JSON.parse(body);
      var products=result.products;
      var pro_push=new Products();
      console.log(products["12"].subcategory);
      for(let i in products){
      // var pro_obj={
      //   'pro_id':i,
      //   'subcategory': i.subcategory,
      //   'title':i.title,
      //   'price':i.price,
      //   'popularity':i.popularity

      // };
    
     pro_push.products.push(
      {
        'pro_id':i,
        'subcategory': products[i]["subcategory"],
        'title':products[i]["title"],
        'price':products[i]["price"],
        'popularity':products[i]['popularity']

      }
     );
     pro_push.save(function (err, user){
      console.log("save");
     });
      }
      return res.status(200).json({ data:products})
    }
  } 
  )
  return res.status(500);
}

