var express = require('express');                                // express
var router = express.Router();                                   // router object to route
var multer = require('multer');                                  // to store images

var appController = require('../appController/appController');

router.post('/addproduct', appController.addProductData);                       //Add a new product

router.put('/updateProduct', appController.updateProductData);                  //Update an existing product

router.delete('/deleteProduct/:productId', appController.deleteProductData);    //Delete an existing product based on given productId

router.get('/getProduct/:productId', appController.getProductData);             //Get details of a product based on givrn productId

router.get('/getAllProducts', appController.getAllProductsData);                //Get all products

var storage1 = multer.diskStorage({                             //to specify image where to store and its name

    destination: function (req, file, cb) {
        cb(null, '../images/')
    },
    filename: function (req, file, cb) {
        fileName = file.originalname.split(".");
        cb(null, fileName[0] + Date.now() + "." + fileName[1]);
    }
});

var upload1 = multer({ storage: storage1 });
router.post("/productImage", upload1.single('pic'), appController.imageUploadData);  //to upload a single image


module.exports = router;