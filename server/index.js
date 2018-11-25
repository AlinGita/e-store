import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev.js';

const app = express();

import {
    productController,
    categoryController,
    sizeController,
    availableProductController,
    paymentController,
    deliveryController,
    orderController,
    authenticationController
} from './controllers';

mongoose.connect('mongodb://127.0.0.1:27017/store', {useNewUrlParser: true});

app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);


app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/auth', authenticationController);
app.use('/api/products', productController);
app.use('/api/categories', categoryController);
app.use('/api/sizes', sizeController);
app.use('/api/available', availableProductController);
app.use('/api/payments', paymentController);
app.use('/api/deliveries', deliveryController);
app.use('/api/orders', orderController);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((err, req, res, next) => {
    const result = { error: err.message }
    if(app.get('env') === 'production')
        result.error = 'Unable to handle the request';
    res.status(500).json(result);
});

app.listen(
    app.get('port'),
    () => console.log(`Running on localhost:${app.get('port')}`)
);
