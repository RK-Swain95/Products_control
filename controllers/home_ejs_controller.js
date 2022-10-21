const Products=require('../models/products');
var express = require('express');


module.exports.show=function(req,res){
    return res.render('user_home',{title:'Home',
    mobileIds:"",
    topfive:"",
    popularityvalue:""});
  }

//Find the top five record based on popularity of all subcategory.
module.exports.toppopularity=async function(req,res){
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
     const popname=data.map((element)=>element.title);
     const popularityvalue=data.map((element)=>element.popularity);
     return res.render('user_home',
     {title:'Home',
      topfive:popname,
      mobileIds:"",
      popularityvalue:popularityvalue
  });
  
      
    }catch(err){
        return res.status(401).send('unauthorized');
    }
  }


  //
  module.exports.showid=async function(req,res){
    try{ 
      const allproducts= await Products.findById(req.params.id);
      const productsArray=allproducts.products;
      const mobile=productsArray.filter((element)=>element.subcategory=="mobile");
      const lgmobile=mobile.filter((element)=>{
        const brand=element.title.split(" ");
        return brand[0]=='LG';
      });
      const lgid=lgmobile.map((element)=>element.pro_id);
     
      return res.render('user_home',
      {title:'Home',
       mobileIds:lgid,
       topfive:"",
       popularityvalue:""
   });
  
    }catch(err){
      return res.status(401).send('unauthorized');
    }
  }