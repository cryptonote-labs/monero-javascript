/**
 * Monero daemon info.
 */
class MoneroDaemonInfo {
  
  getVersion() {
    return this.version;
  }
  
  setVersion(version) {
    this.version = version;
    return this;
  }
  
  getAltBlocksCount() {
    return this.altBlocksCount;
  }
  
  setAltBlocksCount(altBlocksCount) {
    this.altBlocksCount = altBlocksCount;
    return this;
  }
  
  getBlockSizeLimit() {
    return this.blockSizeLimit;
  }
  
  setBlockSizeLimit(blockSizeLimit) {
    this.blockSizeLimit = blockSizeLimit;
    return this;
  }
  
  getBlockSizeMedian() {
    return this.blockSizeMedian;
  }
  
  setBlockSizeMedian(blockSizeMedian) {
    this.blockSizeMedian = blockSizeMedian;
    return this;
  }
  
  getBlockWeightLimit() {
    return this.blockWeightLimit;
  }
  
  setBlockWeightLimit(blockWeightLimit) {
    this.blockWeightLimit = blockWeightLimit;
    return this;
  }
  
  getBlockWeightMedian() {
    return this.blockWeightMedian;
  }
  
  setBlockWeightMedian(blockWeightMedian) {
    this.blockWeightMedian = blockWeightMedian;
    return this;
  }
  
  getBootstrapDaemonAddress() {
    return this.bootstrapDaemonAddress;
  }
  
  setBootstrapDaemonAddress(bootstrapDaemonAddress) {
    this.bootstrapDaemonAddress = bootstrapDaemonAddress;
    return this;
  }
  
  getCumulativeDifficulty() {
    return this.cumulativeDifficulty;
  }
  
  setCumulativeDifficulty(cumulativeDifficulty) {
    this.cumulativeDifficulty = cumulativeDifficulty;
    return this;
  }
  
  getDifficulty() {
    return this.difficulty;
  }
  
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    return this;
  }
  
  getFreeSpace() {
    return this.freeSpace;
  }
  
  setFreeSpace(freeSpace) {
    this.freeSpace = freeSpace;
    return this;
  }
  
  getGreyPeerlistSize() { // TODO: rename to getOfflinePeerCount()
    return this.greyPeerlistSize;
  }
  
  setGreyPeerlistSize(greyPeerlistSize) {
    this.greyPeerlistSize = greyPeerlistSize;
    return this;
  }
  
  getWhitePeerlistSize() {  // TODO: rename to getOnlinePeerCount()
    return this.whitePeerlistSize;
  }
  
  setWhitePeerlistSize(whitePeerlistSize) {
    this.whitePeerlistSize = whitePeerlistSize;
    return this;
  }
  
  getHeight() {
    return this.height;
  }
  
  setHeight(height) {
    this.height = height;
    return this;
  }
  
  getHeightWithoutBootstrap() {
    return this.heightWithoutBootstrap;
  }
  
  setHeightWithoutBootstrap(heightWithoutBootstrap) {
    this.heightWithoutBootstrap = heightWithoutBootstrap;
    return this;
  }
  
  getNetworkType() {
    return this.networkType;
  }

  setNetworkType(networkType) {
    this.networkType = networkType;
    return this;
  }

  getIsOffline() {
    return this.isOffline;
  }
  
  setIsOffline(isOffline) {
    this.isOffline = isOffline;
    return this;
  }
  
  getIncomingConnectionsCount() {
    return this.incomingConnectionsCount;
  }
  
  setIncomingConnectionsCount(incomingConnectionsCount) {
    this.incomingConnectionsCount = incomingConnectionsCount;
    return this;
  }
  
  getOutgoingConnectionsCount() {
    return this.outgoingConnectionsCount;
  }
  
  setOutgoingConnectionsCount(outgoingConnectionsCount) {
    this.outgoingConnectionsCount = outgoingConnectionsCount;
    return this;
  }
  
  getRpcConnectionsCount() {
    return this.rpcConnectionsCount;
  }
  
  setRpcConnectionsCount(rpcConnectionsCount) {
    this.rpcConnectionsCount = rpcConnectionsCount;
    return this;
  }
  
  getStartTime() {
    return this.startTime;
  }
  
  setStartTime(startTime) {
    this.startTime = startTime;
    return this;
  }
  
  getTarget() {
    return this.target;
  }
  
  setTarget(target) {
    this.target = target;
    return this;
  }
  
  getTargetHeight() {
    return this.targetHeight;
  }
  
  setTargetHeight(targetHeight) {
    this.targetHeight = targetHeight;
    return this;
  }
  
  getTopBlockId() {
    return this.topBlockId;
  }
  
  setTopBlockId(topBlockId) {
    this.topBlockId = topBlockId;
    return this;
  }
  
  getTxCount() {
    return this.txCount;
  }
  
  setTxCount(txCount) {
    this.txCount = txCount;
    return this;
  }
  
  getMempoolSize() {
    return this.mempoolSize;
  }
  
  setMempoolSize(mempoolSize) {
    this.mempoolSize = mempoolSize;
    return this;
  }
  
  getWasBootstrapEverUsed() {
    return this.wasBootstrapEverUsed;
  }
  
  setWasBootstrapEverUsed(wasBootstrapEverUsed) {
    this.wasBootstrapEverUsed = wasBootstrapEverUsed;
    return this;
  }
  
  getDatabaseSize() {
    return this.databaseSize;
  }
  
  setDatabaseSize(databaseSize) {
    this.databaseSize = databaseSize;
    return this;
  }
  
  getUpdateAvailable() {
    return this.updateAvailable;
  }
  
  setUpdateAvailable(updateAvailable) {
    this.updateAvailable = updateAvailable;
    return this;
  }
}

module.exports = MoneroDaemonInfo;