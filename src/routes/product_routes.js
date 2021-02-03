const router = require('express').Router();
const schema = require('../schema/schema.json');

const products = schema;

router.route('/').get((req, res) => {
    if (products) {
        console.log('products:', products)
        res.json(products)
    } else {
        res.status(400)
    }
});

// router.route('/:id').get((req, res) => {
//     console.log(req.params.id);
//     let product = products.filter(product => product.sys.id)
// })

module.exports = router;