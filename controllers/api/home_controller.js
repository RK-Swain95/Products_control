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

//find the mobile and no of record whose price range is between 2000 to 9500 and mobile will be like Nokia and Zen and Xolo
module.exports.mobileRange=async function(req,res){
  try{
    const allproducts= await Products.findById(req.params.id);
    const productsArray=allproducts.products;
    const mobile=productsArray.filter((element)=>element.subcategory=="mobile");
    const nokia_xolo=mobile.filter((element)=>{
      const brand=element.title.split(" ");
      return brand[0]=='Nokia' || brand[0]=='Xolo' || brand[0]=='Zen';
    });
    const pricerange=nokia_xolo.filter((element)=>parseInt(element.price)>=2000 && parseInt(element.price)<=9500);
    return res.status(200).json({
      
      data:pricerange
    });

  }catch(err){
    return res.status(500).json({
      messsage : "Error"
  });
  }
}


//find the price of smart-watches subcategory whose price is greater than 10000 and sort by popularity high to low
module.exports.smartwatch=async function(req,res){
  try{
    const allproducts= await Products.findById(req.params.id);
    const productsArray=allproducts.products;
    const smartwatch=productsArray.filter((element)=>element.subcategory=="smart-watches");
    const rangesmartwatch=smartwatch.filter((element)=>parseInt(element.price)>10000);
   function sort(rangesmartwatch){
      return  rangesmartwatch.sort((a,b)=>{
      
            parseInt(b.price) - parseInt(a.price)
    
          })
       }
    const hightolow=sort(rangesmartwatch);
    return res.status(200).json({
      
      data:hightolow
    });

  }catch(err){
    return res.status(500).json({
      messsage : "Error"
  });
  }
}


module.exports.sublg=async function(req,res){
  try{
    const allproducts= await Products.findById(req.params.id);
    const productsArray=allproducts.products;
    const mobile=productsArray.filter((element)=>element.subcategory=="mobile");
    const lgmobile=mobile.filter((element)=>{
      const brand=element.title.split(" ");
      return brand[0]=='LG';
    });
    return res.status(200).json({
      
      data:lgmobile
    });
  }catch(err){
    return res.status(500).json({
      messsage : "Error"
  });
  }
}