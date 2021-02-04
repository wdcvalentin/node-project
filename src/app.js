const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/product_routes');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const startServer = () => {
  try {
    app.use('/product', productsRouter);
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (e) { console.error(e) }
}

startServer()