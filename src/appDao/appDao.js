var appDao = {
    addProductData: addProduct,
    updateProductData: updateProduct,
    deleteProductData: deleteProduct,
    getProductData: getProduct,
    getAllProductsData: getAllProducts,
    imageUploadData: imageUpload
};

function addProduct(req) {                             //Add a new product
    return new Promise((resolve, reject) => {

    });
}

function updateProduct(req) {                         //Update an existing product
    return new Promise((resolve, reject) => {

    });
}

function deleteProduct(req) {                         //Delete an existing product based on given productId
    return new Promise((resolve, reject) => {

    });
}

function getProduct(req) {                            //Get details of a product based on givrn productId
    return new Promise((resolve, reject) => {

    });
}

function getAllProducts(req) {                        //Get all products
    return new Promise((resolve, reject) => {

    });
}

function imageUpload(req) {                         //to upload a single image
    var image;
    return new Promise((resolve, reject) => {
        if (req.file.filename) {
            image = req.protocol + "://" + req.get('host') + "/image/" + req.file.filename;
            resolve(image);
        } else {
            reject('Unable to upload the image');
        }
    });
}



module.exports = appDao;            //exporting functions to available for other layer