import express from 'express';
import Order from '../models/OrderModel';
import {
    orderService,
    availableProductService
} from '../services';
import { catchExceptions } from '../middleware/exceptions';

const router = express.Router();
router.get(
    '/',
    catchExceptions(async (req , res) => {
        const orders = await orderService.getOrders();
        res.status(200).json(orders);
    })
);

router.get(
    '/:id',
    catchExceptions(async (req, res) => {
        const order = await orderService.getOrderById(req.parms.id);
        await Order.populate(order, { path: 'payment', select: 'url' });
        if(req.query.hash) {
            if(req.query.hash === order.hash)
                res.status(200).json(order);
            else
                res.status(401).json({ error: 'You have no permissions to access this route'});
        } else {
            res.status(400).json({ error: 'Hash param must be specified'});
        }
    })
);

router.post(
    '/',
    catchExceptions(async (req, res) => {
        const availability = await availableProductService.checkAvailability(req.body.products);
        if(availability.some(product => product.available < product.amount)) {
            res.status(400).json(availability)
        } else {
            const order = new Order({ ...req.body });
            const savedOrder = await orderService.saveOrder(order);
            await Order.populate(savedOrder, { path: 'payment', select: 'url'});
            await availableProductService.reduceAvailableProducts(savedOrder.products);
            res.status(200).json(savedOrder);
        }
    })
);

export default router;
