import { Router } from "express";
import { getCart, postCart, putCart } from "../controllers/cartCtrl";
import { validationBodyMidCreateFunc, validationIdMid } from "../middlewares/validationsMid";

const router = Router()

router.get('/:id', validationIdMid, getCart)
router.post('/', validationBodyMidCreateFunc('cart'), postCart)
router.put('/', validationIdMid,validationBodyMidCreateFunc('cart'), putCart)

export default router