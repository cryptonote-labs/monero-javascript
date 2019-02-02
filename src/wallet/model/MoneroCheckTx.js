const MoneroCheck = require("./MoneroCheck");

/**
 * Results from checking a transaction key.
 */
class MoneroCheckTx extends MoneroCheck {

  getInMempool() {
    return this.inMempool;
  }
  
  setInMempool(inMempool) {
    this.inMempool = inMempool;
    return this;
  }
  
  getConfirmationCount() {
    return this.confirmationCount;
  }
  
  setConfirmationCount(confirmationCount) {
    this.confirmationCount = confirmationCount;
    return this;
  }
  
  getAmountReceived() {
    return this.amountReceived;
  }
  
  setAmountReceived(amountReceived) {
    this.amountReceived = amountReceived;
    return this;
  }
}

module.exports = MoneroCheckTx;