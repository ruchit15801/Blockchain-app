const express = require('express')
const router = express.Router()

const blockController = require("./controller/blockcontroller")

router.post("/addBlock", blockController.postBlock)


module.exports = router