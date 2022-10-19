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

//Find the top five record based on popularity of all subcategory.
module.exports.popularity=async function(req,res){
  try{
    const allproducts= await Products.findById(req.params.id);
    const productsArray=allproducts.products;
    //console.log(productsArray[0]);
    const topN = (productsArray, n) => {
      if(n > productsArray.length){
         return false;
      }
      return productsArray
      .slice()
      .sort((a, b) => {
         return parseInt(b.popularity) - parseInt(a.popularity)
      })
      .slice(0, n);
   };
   const data=topN(productsArray,5);
    return res.status(200).json({
      
      data:data
    });

    
  }catch(err){
    return res.status(500).json({
      messsage : "Error"
  });
  }
}

//find the product of all subcategory whose popularity is less than 500;
module.exports.lesspopularity=async function(req,res){
try{
  const allproducts= await Products.findById(req.params.id);
  const productsArray=allproducts.products;
  const data=productsArray.filter((element)=>parseInt(element.popularity)<500);
  return res.status(200).json({
      
    data:data
  });

}catch(err){
  return res.status(500).json({
    messsage : "Error"
});
}

}