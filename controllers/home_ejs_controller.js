const Products=require('../models/products');
var express = require('express');

//Home page of the app 
module.exports.show=function(req,res){
    return res.render('user_home',{title:'Home',
    mobileIds:"",
    topfive:"",
    popularityvalue:""});
  }

//Find the top five record based on popularity of all subcategory.
module.exports.toppopularity=async function(req,res){
    try{
      //find the products from database
      const allproducts= await Products.findById(req.params.id);
      const productsArray=allproducts.products;
      //searching out  top five popular products using .sort and .slice function
      //we need high to low thats why i am doing (b.popularity -a.popularity) here
      //and by slice just showing top 5
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
     //storing top 5 products title in a array and send it to home.ejs for view 
     const popname=data.map((element)=>element.title);

     //storing top 5 products popularity in a array and send it to home.ejs for view
     const popularityvalue=data.map((element)=>element.popularity);
     //here for ejs i am rendering it on home page
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


  //Find the ids of subcategory as mobile and title like LG or lg.
  module.exports.showid=async function(req,res){
    try{ 
      //find the products from database
      const allproducts= await Products.findById(req.params.id);
      const productsArray=allproducts.products;
      const mobile=productsArray.filter((element)=>element.subcategory=="mobile");
      //filtering the LG mobile only
      const lgmobile=mobile.filter((element)=>{
        const brand=element.title.split(" ");
        return brand[0]=='LG';
      });
      //storing the Ids of LG mobile in a array
      const lgid=lgmobile.map((element)=>element.pro_id);
     //and showing it on homepage by sending lgId
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

  //1.Find the list of subcategory as mobile and title like LG or lg.
module.exports.sublg=async function(req,res){
  try{
    //find the products from database
    const allproducts= await Products.findById(req.params.id);
    const productsArray=allproducts.products;
    //filtering out only mobile from products
    const mobile=productsArray.filter((element)=>element.subcategory=="mobile");
    //filtering the LG mobile only
    const lgmobile=mobile.filter((element)=>{
      const brand=element.title.split(" ");
      return brand[0]=='LG';
    });
    return res.render('user_id',
    {title:'Data',
     mobileIds:lgmobile,
     pricerange:""
 });
  }catch(err){
    return res.status(401).send('unauthorized');
  }
}


//4.find the mobile and no of record whose price range is between 2000 to 9500 and mobile will be like Nokia and Zen and Xolo
module.exports.mobileRange=async function(req,res){
  try{
    //find the products from database
    const allproducts= await Products.findById(req.params.id);
    const productsArray=allproducts.products;
    const mobile=productsArray.filter((element)=>element.subcategory=="mobile");
    //storing only Nokia ,xolo and Zen mobile phone in a array
    const nokia_xolo=mobile.filter((element)=>{
      const brand=element.title.split(" ");
      return brand[0]=='Nokia' || brand[0]=='Xolo' || brand[0]=='Zen';
    });
    //storing nokia,xolo,zen whose price greater than 2000 and less than 9500
    const pricerange=nokia_xolo.filter((element)=>parseInt(element.price)>=2000 && parseInt(element.price)<=9500);
    return res.render('user_id',
    {title:'Data',
     mobileIds:"",
     pricerange:pricerange
 });

  }catch(err){
    return res.status(401).send('unauthorized');
  }
}