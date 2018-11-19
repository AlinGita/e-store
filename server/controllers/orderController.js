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
        res.status(200).json(order);
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
            res.status(200).json(savedOrder);
        }
    })
);

export default router;
