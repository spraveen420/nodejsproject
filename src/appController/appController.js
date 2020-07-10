var appController = {
    addProductData: addProduct,
    updateProductData: updateProduct,
    deleteProductData: deleteProduct,
    getProductData: getProduct,
    getAllProductsData: getAllProducts,
    imageUploadData: imageUpload
};
var appServ = require('../appService/appService');  //requiring functions in service layer


function addProduct(req, res) {                         //Add a new product
    appServ.addProductData(req)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

function updateProduct(req, res) {                      //Update an existing product
    appServ.updateProductData(req)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

function deleteProduct(req) {                       //Delete an existing product based on given productId  
    appServ.deleteProductData(req)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

function getProduct(req) {                           //Get details of a product based on givrn productId
    appserv.getProductData(req)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

function getAllProducts(req) {                     //Get all products
    appServ.getAllProductsData(req)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

function imageUpload(req) {                          //to upload a single image
    appServ.imageUploadData(req)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}


module.exports = appController;               //exporting functions to available for other layer