let database = require("./database")
database.onConnect(() => {
    let BlockChain = require('./blockchain')
    let blockChain = new BlockChain()
    let hash = require('object-hash')
    let PROOF = 1560 
 
    // blockChain.addNewTransaction("david", "alex", 200)
    // blockChain.addNewBlock(null)
    // blockChain.getData()

    // console.log("Chain:  ", blockChain.chain)
})

const express = require("express")
const router = require("./route.js")
const app = express()

const port = process.env.PORT || 5000
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
})