//To fetch External Api
const externalApi =
  "https://mindler-dashboard.s3.us-east-2.amazonaws.com/products.json";

const Products=require('../../models/products');
var express = require('express');
var router = express.Router();
//module require to fetch api
var request = require('request');

//Storing the data in the database
module.exports.allData= function (req,res){
  //fetching external api
  request({
    uri: externalApi,
    query: "products",

  },
  function(err, response, body){
    if(!err ){
      // console.log(body);
      var result = JSON.parse(body);
      var products=result.products;
      //making the object of product
      var pro_push=new Products();
      console.log(products["12"].subcategory);
      for(let i in products){
     //pushing data to array of products of database 
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
    return res.status(200).json({
      
      products:lgmobile
    });
  }catch(err){
    return res.status(500).json({
      messsage : "Error"
  });
  }
}


//2.Find the ids of subcategory as mobile and title like LG or lg.
module.exports.idlg=async function(req,res){
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
    console.log(lgid);
    return res.status(200).json({
      
      data:lgid
    });

  }catch(err){
    return res.status(500).json({
      messsage : "Error"
  })
  }
}

//3.Find the top five record based on popularity of all subcategory.
module.exports.popularity=async function(req,res){
  try{
    //find the products from database
    const allproducts= await Products.findById(req.params.id);
    const productsArray=allproducts.products;
    //searching out  top five popular products using .sort and .slice function
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
      
      products:data
    });

    
  }catch(err){
    return res.status(500).json({
      messsage : "Error"
  });
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
    return res.status(200).json({
      
      products:pricerange
    });

  }catch(err){
    return res.status(500).json({
      messsage : "Error"
  });
  }
}


//5.find the product of all subcategory whose popularity is less than 500;
module.exports.lesspopularity=async function(req,res){
  try{
    //find the products from database
    const allproducts= await Products.findById(req.params.id);
    const productsArray=allproducts.products;
    //finding the products whose popularity less than 500 using filter function
    const data=productsArray.filter((element)=>parseInt(element.popularity)<500);
    return res.status(200).json({
        
      products:data
    });
  
  }catch(err){
    return res.status(500).json({
      messsage : "Error"
  });
  }
  
  }

//7.find the price of smart-watches subcategory whose price is greater than 10000 and sort by popularity high to low
module.exports.smartwatch=async function(req,res){
  try{
    //find the products from database
    const allproducts= await Products.findById(req.params.id);
    const productsArray=allproducts.products;
    //To find smartwatch from products
    const smartwatch=productsArray.filter((element)=>element.subcategory=="smart-watches");
    //finding smart watch whose price greater than 10000
    const rangesmartwatch=smartwatch.filter((element)=>parseInt(element.price)>10000);
    //storing it from high to low using sort function
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







//6.find the total record and all subcategory product record.
module.exports.subcount=async function(req,res){
  try{
    //find the products from database
    const allproducts= await Products.findById(req.params.id);
    const productsArray=allproducts.products;
    //filtering different type of subcategory like mobile,tablet ,etc..
    //to find it here i am using .include function 
    const uniqueIds = [];
    const unique = productsArray.filter(element => {
    const isDuplicate = uniqueIds.includes(element.subcategory);
    
      if (!isDuplicate) {
        uniqueIds.push(element.subcategory);
    
        return true;
      }
        return false;
    });
     const uniquesub=[];
    for(let i of unique){
      uniquesub.push(i.subcategory);
    }
  //here i am calculating different types of unique subcategory  
   var total=0;
   const subcount=[];
    for(let i of uniquesub){
    const countsub=productsArray.filter((element)=>element.subcategory==i);
    const sub_length=countsub.length;
      subcount.push({
        'subcategory':i,
        'count':sub_length
      });
      total=total+sub_length;
    }
  //to show i am using an object to show it in onject format 
    let mainobj={
      "total":total
    }
    let subobj={};
    for(let i of subcount){
      subobj[i.subcategory]=i.count;
    }
    mainobj["subcategory"]=subobj;
   
    return res.status(200).json({
      data:mainobj
    });

  }catch(err){
    return res.status(500).json({
      messsage :`${err}`
  })
  }
}




//to show


// module.exports.show=function(req,res){
//   return res.render('user_home',{title:'Home',
//   mobileIds:"",
//   topfive:""});
// }

