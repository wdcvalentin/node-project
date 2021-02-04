const router = require('express').Router();
const schema = require('../schema/schema.json');

const products = schema.items;

router.route('/').get((req, res) => {
    if (products) {
        res.json(products)
    } else {
        res.status(400)
    }
});

router.route('/:id').get((req, res) => {
    let product = products.filter(product => product.sys.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(400);
    }
})

router.route('/').post((req, res) => {
    const { title, price } = req.body;
    if (title && price) {
        newId = products.length + 1;
        const newObject = {
            sys: { id: newId.toString() },
            fields: { title, price, image: { fields: { file: { url: `./images/product-${newId}.jpeg` } } } }
        };
        products.push(newObject);
        res.json(products);
    } else {
        res.status(400);
    }
})

router.route('/:id').patch((req, res) => {
    const { id } = req.params;
    const { field, newValue } = req.body;

    if (id && field && newValue) {
        let product = products.filter(product => product.sys.id === id);
        if (field === ('title' || 'price')) {
            product[0].fields[`${field}`] = newValue;
            product[0].fields[`${field}`] === newValue ? res.send(product) : res.send(false)
        }
    } else {
        res.status(400);
    }
})

router.route('/:id').put((req, res) => {
    const { id } = req.params;
    const { fields } = req.body[0];

    if (id && fields) {
        let product = products.filter(product => product.sys.id === id);
        product[0].fields = fields;
        product[0].fields === fields ? res.send(product) : res.send(false)
    } else {
        res.status(400);
    }
})

router.route('/:id').delete((req, res) => {
    const { id } = req.params;
    if (id) {
        const newProducts = products.filter(product => product.sys.id !== id);
        newProducts.some(product => product.sys.id === id) ? res.send(false) : res.send(true);
    } else {
        res.status(400);
    }
})

module.exports = router;