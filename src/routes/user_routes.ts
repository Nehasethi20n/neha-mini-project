import {Router} from 'express';
import { createUser,getUser,updateUser,deleteUser } from '../controller/usercontroller';

const router=Router();

router.post('/',createUser);
router.get('/',getUser);
router.put('/',updateUser);
router.delete('/',deleteUser);

export default router;

