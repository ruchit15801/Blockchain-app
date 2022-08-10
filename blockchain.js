let hash = require('object-hash')

const TARGET_HASH = hash(1560)

let validator = require('./validator')

let mongoose = require("mongoose")

let blockChainModel = mongoose.model("BlockChain")


class BlockChain {
    constructor(){

        this.chain = []
        this.curr_transactions = []

    }
    getLastBlock(callback) {
        return blockChainModel.findOne({}, null, { sort: { _id: -1}, limit: 1}, (err, block) => {
            if(err) return console.error("Cannot find last block")
            return callback(block)
        }) 
    }
    addNewBlock(prevHash){
        let block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.curr_transactions,
            prevHash: prevHash
        }
        if(validator.proofOfWork() == TARGET_HASH) {
            block.hash = hash(block)

            this.getLastBlock((lastBlock) => {
                if(lastBlock) {
                    block.prevHash = lastBlock.hash
                }
                let newBlock = new blockChainModel(block)
                newBlock.save((err) => {
                    if(err) return console.log("Cannot save block to DB!", err.message)
                    console.log("Block saved in the DB")
                })
                // this.hash = hash(block)
                this.chain.push(block)
                this.curr_transactions = []
                return block
            }) 

        }
    }
    async getData(){
        let data = await blockChainModel.find()
        if (data.length === 0) {
            console.log("No data found.")
        }
        console.log("Data : " + data)
    }
    addNewTransaction(sender, recipient, amount) {
        this.curr_transactions.push({ sender, recipient, amount })
    }
    lastBlock( ) { 
        return this.chain.slice(-1)[0]
    }
    isEmpty(){
         return this.chain.length == 0
    }

}
module.exports = BlockChain