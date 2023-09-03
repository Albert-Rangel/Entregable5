import express, { Router } from "express"
import ProductManager from '../ProductManager.js'

const productManager = new ProductManager('./src/models/productos.json');
const router = express.Router()

router.get("/realTimeProducts", async (req, res) => {
    res.render("realTimeProducts", {
        title: "Real Time Products",
        style: "home.css"
    })
})

router.get("/home", async (req, res) => {
    const allProducts =  await productManager.readProducts()
    res.render("home", {
        title: "Cards Products",
        style: "home.css",
        Products : allProducts
    })
})

export default router