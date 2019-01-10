const Filter = require("../../utils/Filter");

/**
 * Filters based on account and subaddress indices.
 */
class MoneroSubaddressFilter extends Filter {
  
  getAccountIndex() {
    return this.accountIndex;
  }

  setAccountIndex(accountIndex) {
    this.accountIndex = accountIndex;
  }

  getSubaddressIndices() {
    return this.subaddressIndices;
  }

  setSubaddressIndices(subaddressIndices) {
    this.subaddressIndices = subaddressIndices;
  }
  
  meetsCriteria(param) {
    
    // match account
    if (this.getAccountIndex() !== undefined && this.getAccountIndex() !== param.getAccountIndex()) return false;
    
    // match any subaddress index
    if (this.getSubaddressIndices() !== undefined) {
      let matchFound = false;
      for (let subaddressIdx of this.getSubaddressIndices()) {
        if (subaddressIdx !== param.getSubaddressIndex()) {
          matchFound = true;
          break;
        }
      }
      if (!matchFound) return false;
    }
    
    // meets filter's criteria
    return true;
  }
}

module.exports = MoneroSubaddressFilter;