/**
 * Models transactions and spent key images known to the daemon's mempool.
 */
class MoneroMempool {
  
  getTxs() {
    return this.txs;
  }
  
  setTxs(txs) {
    this.txs = txs;
    return this;
  }
  
  getSpentKeyImages() {
    return this.spentKeyImages;
  }
  
  setSpentKeyImages(spentKeyImages) {
    this.spentKeyImages = spentKeyImages;
    return this;
  }
}

module.exports = MoneroMempool;