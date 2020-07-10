var appService = {
    addProductData: addProduct,
    updateProductData: updateProduct,
    deleteProductData: deleteProduct,
    getProductData: getProduct,
    getAllProductsData: getAllProducts,
    imageUploadData: imageUpload
};
var appDao = require('../appDao/appDao');     //requiring functions in dao layer

function addProduct(req) {                         //Add a new product
    return new Promise((resolve, reject) => {
        appDao.addProductData(req)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err);
            })
    });
}

function updateProduct(req) {                      //Update an existing product
    return new Promise((resolve, reject) => {
        appDao.updateProductData(req)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err);
            })
    });
}

function deleteProduct(req) {                       //Delete an existing product based on given productId  
    return new Promise((resolve, reject) => {
        appDao.deleteProductData(req)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err);
            })
    });
}

function getProduct(req) {                           //Get details of a product based on givrn productId
    return new Promise((resolve, reject) => {
        appDao.getProductData(req)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err);
            })
    });
}

function getAllProducts(req) {                     //Get all products
    return new Promise((resolve, reject) => {
        appDao.getAllProductsData(req)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err);
            })
    });
}

function imageUpload(req) {                          //to upload a single image
    return new Promise((resolve, reject) => {
        appDao.imageUploadData(req)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err);
            })
    });
}



module.exports = appService;                 //exporting functions to available for other layer