/**
 * Monero daemon interface and default implementations.
 */
class MoneroDaemon {
  
  /**
   * Get the number of blocks in the longest chain known to the node.
   * 
   * @returns the number of blocks
   */
  async getHeight() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a block's hash by its height.
   * 
   * @param height is the height of the block hash to get
   * @returns the block's hash at the given height
   */
  async getBlockHash(height) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a block template for mining a new block.
   * 
   * @param walletAddress is the address of the wallet to receive coinbase transactions if block is successfully mined
   * @param reserveSize is the reserve size
   * @return MoneroBlockTemplate is a block template for mining a new block
   */
  async getBlockTemplate(walletAddress, reserveSize) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the last block's header.
   * 
   * @returns MoneroBlockHeader is the last block's header
   */
  async getLastBlockHeader() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a block header by its hash.
   * 
   * @param hash is the hash of the block to get the header of
   * @return MoneroBlockHeader is the block's header
   */
  async getBlockHeaderByHash(hash) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a block header by its height.
   * 
   * @param height is the height of the block to get the header of
   * @return MoneroBlockHeader is the block's header
   */
  async getBlockHeaderByHeight(height) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get block headers for the given range.
   * 
   * @param startHeight is the start height lower bound inclusive (optional)
   * @param endHeight is the end height upper bound inclusive (optional)
   * @returns List<MoneroBlockHeader> for the given range
   */
  async getBlockHeadersByRange(startHeight, endHeight) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a block by hash.
   * 
   * @param hash is the hash of the block to get
   * @returns MoneroBlock with the given hash
   */
  async getBlockByHash(hash) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a block by height.
   * 
   * @param height is the height of the block to get
   * @returns MoneroBlock with the given height
   */
  async getBlockByHeight(height) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get blocks at the given heights.
   * 
   * @param heights are the heights of the blocks to get
   * @returns List<MoneroBlock> are blocks at the given heights
   */
  async getBlocksByHeight(heights) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get blocks in the given height range.
   * 
   * @param startHeight is the start height lower bound inclusive (optional)
   * @param endHeight is the end height upper bound inclusive (optional)
   * @returns MoneroBlock[] are blocks in the given height range
   */
  async getBlocksByRange(startHeight, endHeight) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get transactions with the given hashes.
   * 
   * @param txHashes specifies the transaction hashes to get  // TODO: standardize on hashs vs ids
   * @param decodeAsJson decodes the returned transactions as JSON rather than binary if true
   * @param prune (documentation missing) // TODO: documentation missing
   * @returns MoneroTx[] are the transactions with the given hashes
   */
  async getTxs(txHashes, decodeAsJson, prune) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get general information about the state of the node and the network.
   * 
   * @returns MoneroDaemonInfo is general information about the node and network
   */
  async getInfo() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get synchronization information.
   */
  async getSyncInfo() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get information about incoming and outgoing connections to the node.
   */
  async getConnections() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * TODO.
   */
  async getHardForkInfo() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * TODO.
   */
  async setBan(ban) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * TODO.
   */
  async setBans(bans) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * TODO.
   */
  async getBans() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Flush transactions from the memory pool.
   * 
   * @param {string or string[]} ids are specific transactions to flush (defaults to all)
   * @returns {MoneroDaemonModel} contains response information
   */
  async flushTxPool(ids) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Parses a network string to an enumerated type.
   * 
   * @param network is the network string to parse
   * @returns MoneroDaemon.NetworkType is the enumerated network type
   */
  static parseNetworkType(network) {
    if (network === "mainnet") return MoneroDaemon.MAINNET;
    if (network === "testnet") return MoneroDaemon.TESTNET;
    if (network === "stagenet") return MoneroDaemon.STAGENET;
    throw new Error("Invalid network type to parse: " + network);
  }
}

/**
 * Enumerate network types.
 */
MoneroDaemon.NetworkType = {
    MAINNET: 0,
    TESTNET: 1,
    STAGENET: 2
}

module.exports = MoneroDaemon;