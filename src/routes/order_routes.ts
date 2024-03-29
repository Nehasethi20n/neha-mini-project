import express from 'express';
import { createOrder,getOrder,updateOrder,deleteOrder} from '../controller/ordercontroller';

const router=express.Router();

router.post('/',createOrder);
router.get('/',getOrder);
router.put('/',updateOrder);
router.delete('/',deleteOrder);

export default router;