const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({

    productId:{ type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
    invSku:{type:String,required:true,trim:true,unique:true},
    invStockLevel:{ type:Number,required:true},
    price:{type:Number, required:true },
    location:{type:String,},
    createdAt:{ type:Date, default:Date.now()},
    updatedAt:{ type:Date}
})


const sellerProductSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the seller
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the shared product
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required:true, unique:true}, // Unique SKU for tracking seller-specific inventory
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date}
  });
  

inventorySchema.pre('save',function(next){
    this.updatedAt = Date.now()
    next()
})
sellerProductSchema.pre('save',function(next){
    this.updatedAt = Date.now()
    next()
})
const Inventory = mongoose.model('Inventory',inventorySchema)
const SellerProduct = mongoose.model('SellerProduct', sellerProductSchema);

module.exports = { Inventory,SellerProduct }