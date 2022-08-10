const blockChain = require("../blockchain")
const blockChainModel = require("../database/model")
const validator = require("../validator")
const hash = require("object-hash")
const TARGET_HASH = hash(1560)

exports.postBlock = async(req, res) => {
  try{
    const chain = []
    const curr_transactions = []
    
    let block = {
        index: chain.length + 1,
        timestamp: Date.now(),
        transactions: curr_transactions,
        prevHash: req.prevHash
    }
    if(validator.proofOfWork() == TARGET_HASH) {
        block.hash = hash(block)
        }
        getLastBlock((lastBlock) => {
            if(lastBlock) {
                block.prevHash = lastBlock.hash
            }
            let newBlock = new blockChainModel(req.body)
            newBlock.save()
            res.send(newBlock)
        }) 

    }catch(e){
    }
    console.log(e);
     res.status(400).send()
  }
