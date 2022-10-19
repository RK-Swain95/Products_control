const mongoose =require('mongoose');


const productSchema = new mongoose.Schema({
    products: [{
        pro_id: {
            type: String
        },
        subcategory: {
            type: String
        },
        title: {
            type: String
        },
        price: {
            type: String
        },
        popularity: {
            type: String
        }

    }]
});

const  Products=mongoose.model('Products',productSchema);
module.exports=Products;