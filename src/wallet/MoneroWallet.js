/**
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const MoneroTxFilter = require("./filters/MoneroTxFilter");
const MoneroSendConfig = require("./model/MoneroSendConfig");

/**
 * Monero wallet interface and default implementations.
 */
class MoneroWallet {
  
  /**
   * Get the wallet's seed.
   * 
   * @return {string} is the wallet's seed
   */
  async getSeed() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the wallet's mnemonic phrase derived from the seed.
   * 
   * @return {string} is the wallet's mnemonic phrase
   */
  async getMnemonic() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the wallet's public view key.
   * 
   * @return {string} is the wallet's public view key
   */
  async getPublicViewKey() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the wallet's private view key.
   * 
   * @return {string} is the wallet's private view key
   */
  async getPrivateViewKey() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a list of available languages for the wallet's seed.
   * 
   * @return {string[]} are the available languages for the wallet's seed
   */
  async getLanguages() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the height of the last block processed by the wallet (its index + 1).
   * 
   * @return {int} is the height of the last block processed by the wallet
   */
  async getHeight() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the blockchain's height.
   * 
   * @return {int} is the block chain's height
   */
  async getChainHeight() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the wallet's primary address.
   * 
   * @return {string} is the wallet's primary address
   */
  async getPrimaryAddress() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get an integrated address based on this wallet's primary address and the
   * given payment ID.  Generates a random payment ID if none is given.
   * 
   * @param {string} paymentId is the payment ID to generate an integrated address from (randomly generated if null)
   * @return {MoneroIntegratedAddress} is the integrated address
   */
  async getIntegratedAddress(paymentId) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Decode an integrated address to get its standard address and payment id.
   * 
   * @param {string} integratedAddress is an integrated address to decode
   * @return {MoneroIntegratedAddress} contains the standard address and payment id
   */
  async decodeIntegratedAddress(integratedAddress) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Synchronizes the wallet with the block chain.
   * 
   * @param {int} startHeight is the start height to sync from, syncs from the last synced block by default
   * @param {int} endHeight is the end height to sync to, syncs to the current chain height by default
   * @param {function} onProgress({percent: , message: , totalBlocks: , doneBlocks: }) is invoked as progress is made
   */
  async sync(startHeight, endHeight, onProgress) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Indicates if importing multisig data is needed for returning a correct balance.
   * 
   * @return {boolean} true if importing multisig data is needed for returning a correct balance, false otherwise
   */
  async isMultisigImportNeeded() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get accounts.
   * 
   * @param {boolean} includeSubaddresses specifies if subaddresses should be included (optional)
   * @return {MoneroAccount[]} are the retrieved accounts
   */
  async getAccounts(includeSubaddresses) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get an account.
   * 
   * @param {int} accountIdx specifies the account
   * @param {boolean} includeSubaddresses specifies if subaddresses should be included
   * @return {MoneroAccount} is the retrieved account
   */
  async getAccount(accountIdx, includeSubaddresses) {
    throw new Error("Subclass must implement");
  }

  /**
   * Create a new account.
   * 
   * @param {string} label specifies the label for the account (optional)
   * @return {MoneroAccount} is the created account
   */
  async createAccount(label) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get subaddresses.
   * 
   * @param {int} accountIdx specifies the account to get subaddresses within
   * @param {(int|int[])} subaddressIndices specifies subaddresses within the account (optional)
   * @return {MoneroSubaddress[]} are the retrieved subaddresses
   */
  async getSubaddresses(accountIdx, subaddressIndices) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a subaddress.
   * 
   * @param {int} accountIdx specifies the index of the subaddress's account
   * @param {int} subaddressIdx specifies index of the subaddress within the account
   * @return {MoneroSubaddress} is the retrieved subaddress
   */
  async getSubaddress(accountIdx, subaddressIdx) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Create a subaddress within an account.
   * 
   * @param {int} accountIdx specifies the index of the account to create the subaddress within
   * @param {string} label specifies the the label for the subaddress (optional)
   * @return {MoneroSubaddress} is the created subaddress
   */
  async createSubaddress(accountIdx, label) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the address of a specific subaddress.
   * 
   * @param {int} accountIdx specifies the account index of the address's subaddress
   * @param {int} subaddressIdx specifies the subaddress index within the account
   * @return {string} is the receive address of the specified subaddress
   */
  async getAddress(accountIdx, subaddressIdx) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the account and subaddress index of the given address.
   * 
   * @param address is the address to get the account and subaddress index from
   * @return {MoneroSubaddress} contains the indices or undefined
   * @throws {Error} if the address is not found
   */
  async getAddressIndex(address) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the balance of the wallet, an account, or a subaddress.
   * 
   * @param {int} accountIdx specifies an account to get the balance of (optional)
   * @param {int} subaddressIdx specifies a subaddress to get the balance of (optional)
   * @return {BigInteger} is the balance
   */
  async getBalance(accountIdx, subaddressIdx) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get the unlocked balance of the wallet, an account, or a subaddress.
   * 
   * @param {int} accountIdx specifies an account to get the unlocked balance of (optional)
   * @param {int} subaddressIdx specifies a subaddress to get the unlocked balance of (optional)
   * @return {BigInteger} is the unlocked balance
   */
  async getUnlockedBalance(accountIdx, subaddressIdx) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get wallet transactions.  Wallet transactions contain one or more
   * transfers that are either incoming or outgoing to the wallet.
   * 
   * Query results can be configured or filtered by passing in a configuration.
   * Transactions must meet every criteria defined in the configuration in
   * order to be returned.  All configuration is optional and no filtering is
   * applied when not defined.
   * 
   * @param {(MoneroTxFilter|object)} config configures the query (optional)
   * @param {boolean} config.isConfirmed gets txs that are confirmed or not (optional)
   * @param {boolean} config.inMempool get txs that are in the mempool or not (optional)
   * @param {boolean} config.isRelayed gets txs that are relayed or not (optional)
   * @param {boolean} config.isFailed gets txs that are failed or not (optional)
   * @param {boolean} config.isCoinbase gets coinbase txs or not (optional)
   * @param {string} config.id gets a tx with the id (optional)
   * @param {string} config.txId gets a tx with the id (alias of id) (optional)
   * @param {string[]} config.txIds gets txs with the ids (optional)
   * @param {string} config.paymentId gets transactions with the payment id (optional)
   * @param {string[]} config.paymentIds gets transactions with the payment ids (optional)
   * @param {boolean} config.hasPaymentId gets transactions with a payment id or not (optional)
   * @param {int} config.minHeight gets txs with height >= the given height (optional)
   * @param {int} config.maxHeight gets txs with height <= the given height (optional)
   * @param {boolean} config.hasOutgoingTransfer gets txs with an outgoing transfer or not (optional)
   * @param {boolean} config.hasIncomingTransfer gets txs with an incoming transfer or not (optional)
   * @param {MoneroTransferFilter} config.transferFilter gets txs that have a transfer that meets this filter (optional)
   * @param {boolean} config.getVouts specifies that tx vouts should be returned with tx results (optional)
   * @return {MoneroWalletTx[]} are wallet transactions per the configuration
   */
  async getTxs(config) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get incoming and outgoing transfers to and from this wallet.  An outgoing
   * transfer represents a total amount sent from one or more subaddresses
   * within an account to individual destination addresses, each with their
   * own amount.  An incoming transfer represents a total amount received into
   * a subaddress within an account.  Transfers belong to transactions which
   * are stored on the blockchain.
   * 
   * Query results can be configured or filtered by passing in a configuration.
   * Transfers must meet every criteria defined in the configuration in order
   * to be returned.  All configuration is optional and no filtering is applied
   * when not defined.
   * 
   * @param {(MoneroTransferFilter|object)} config configures the query (optional)
   * @param {boolean} config.isOutgoing gets transfers that are outgoing or not (optional)
   * @param {boolean} config.isIncoming gets transfers that are incoming or not (optional)
   * @param {string} config.address is the wallet's address that a transfer either originated from (if outgoing) or is destined for (if incoming) (optional)
   * @param {int} config.accountIndex gets transfers that either originated from (if outgoing) or are destined for (if incoming) a specific account index (optional)
   * @param {int} config.subaddressIndex gets transfers that either originated from (if outgoing) or are destined for (if incoming) a specific subaddress index (optional)
   * @param {int[]} config.subaddressIndices gets transfers that either originated from (if outgoing) or are destined for (if incoming) specific subaddress indices (optional)
   * @param {BigInteger} config.amount is the amount being transferred (optional)
   * @param {MoneroDestination[]} config.destinations are individual destinations of an outgoing transfer, which is local wallet data and NOT recoverable from the blockchain (optional)
   * @param {boolean} config.hasDestinations gets transfers that have destinations or not (optional)
   * @param {MoneroTxFilter} config.txFilter gets transfers whose transaction meets this filter (optional)
   * @return {MoneroTransfer[]} are wallet transfers per the configuration
   */
  async getTransfers(config) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get wallet vouts.  A wallet vout is an output created from a previous
   * transaction that the wallet can spend one time.  Vouts belong to
   * transactions which are stored on the blockchain.
   * 
   * Query results can be configured or filtered by passing in a configuration.
   * Vouts must meet every criteria defined in the configuration in order to be
   * returned.  All configuration is optional and no filtering is applied when
   * not defined.
   * 
   * TODO: add additional filtering in MoneroVoutFilter.js meetsCriteria() (easy)
   * 
   * @param {(MoneroVoutFilter|object)} config configures the query (optional)
   * @param {int} config.accountIndex gets vouts associated with a specific account index
   * @param {int} config.subaddressIndex gets vouts associated with a specific subaddress index
   * @param {int[]} config.subaddressIndices gets vouts associated with specific subaddress indices
   * @param {BigInteger} config.amount gets vouts with a specific amount
   * @param {boolean} config.isSpent gets vouts that are spent or not
   * @param {MoneroKeyImage} config.keyImage is a key image whose defined fields filter vouts to get
   * @param {MoneroTxFilter} config.txFilter gets vouts whose transaction meets this filter (optional)
   * @return {MoneroWalletOutput[]} are wallet vouts per the configuration
   */
  async getVouts(config) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get all signed key images.
   * 
   * @return {MoneroKeyImage[]} are the wallet's signed key images
   */
  async getKeyImages() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Import signed key images and verify their spent status.
   * 
   * @param {MoneroKeyImage[]} keyImages are key images to import and verify (requires hex and signature)
   * @return {MoneroKeyImageImportResult} contains results of the import
   */
  async importKeyImages(keyImages) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get new key images from the last imported outputs.
   * 
   * @return {MoneroKeyImage[]} are the key images from the last imported outputs
   */
  async getNewKeyImagesFromLastImport() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Creates a transaction which transfers funds from this wallet to one or more destinations.
   * 
   * @param {(MoneroSendConfig|object|string)} configOrAddress defines send configuration (documented next) xor an address to send to
   * 
   * Send with single config param:
   * 
   * @param {MoneroDestination[]|object[]} config.destinations are destination addresses to send to and their amounts
   * @param {string} config.paymentId is a random 32-byte/64-character hex string to identify a transaction (optional)
   * @param {int|MoneroSendPriority} config.priority is the priority to have the tx confirmed; 0-3 for default, unimportant, normal, and elevated (optional)
   * @param {int} config.mixin is number of outputs from the blockchain to mix with (optional)
   * @param {int} config.accountIndex identifies the account to transfer from (optional, defaults to 0)
   * @param {int} config.subaddressIndices identifies one or more subaddresses to transfer from (optional, defaults to any)
   * @param {int} config.unlockTime is the number of blocks before the monero can be spent (0 or undefined to not add a lock) (optional)
   * @param {boolean} config.doNotRelay does not relay the created transaction to the Monero network iff true (optional)
   * 
   * Send with multiple function params:
   * 
   * @param {string} address is a destination address to send to (required iff no config object)
   * @para {BigInteger} sendAmount is the amount to send (required iff no config object)
   * @param {int|MoneroSendPriority} priority is the priority to have the tx confirmed; 0-3 for default, unimportant, normal, and elevated (optional)
   * @param {int} mixin is the number of outputs from the blockchain to mix with (optional)
   * 
   * @return {MoneroWalletTx} is the resulting transaction
   */
  async send(configOrAddress, sendAmount, priority, mixin) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Creates one or more transactions which transfer funds from this wallet to one or more destinations.
   * 
   * @param {(MoneroSendConfig|object|string)} configOrAddress defines send configuration (documented next) xor an address to send to
   * 
   * Send with single config param:
   * 
   * @param {MoneroDestination[]|object[]} config.destinations are destination addresses to send to and their amounts
   * @param {string} config.paymentId is a random 32-byte/64-character hex string to identify a transaction (optional)
   * @param {int|MoneroSendPriority} config.priority is the priority to have the tx confirmed; 0-3 for default, unimportant, normal, and elevated (optional)
   * @param {int} config.mixin is number of outputs from the blockchain to mix with (optional)
   * @param {int} config.accountIndex identifies the account to transfer from (optional, defaults to 0)
   * @param {int} config.subaddressIndices identifies one or more subaddresses to transfer from (optional, defaults to any)
   * @param {int} config.unlockTime is the number of blocks before the monero can be spent (0 or undefined to not add a lock) (optional)
   * @param {boolean} config.doNotRelay does not relay the created transaction to the Monero network iff true (optional)
   * 
   * Send with multiple function params:
   * 
   * @param {string} address is a destination address to send to (required iff no config object)
   * @para {BigInteger} sendAmount is the amount to send (required iff no config object)
   * @param {int|MoneroSendPriority} priority is the priority to have the tx confirmed; 0-3 for default, unimportant, normal, and elevated (optional)
   * @param {int} mixin is the number of outputs from the blockchain to mix with (optional)
   * 
   * @return {MoneroWalletTx[]} are the resulting transactions
   */
  async sendSplit(configOrAddress, sendAmount, priority, mixin) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Sweep the wallet's unlocked funds to an address.
   * 
   * @param {string} address is the address to sweep the wallet's funds to
   * @return {MoneroWalletTx[]} are the resulting transactions
   */
  async sweepWallet(address) {
    return await this.sweepUnlocked(new MoneroSendConfig(address));
  }

  /**
   * Sweep an acount's unlocked funds to an address.
   * 
   * @param {int} accountIdx is the index of the account
   * @param {address} address is the address to sweep the account's funds to
   * @return {MoneroWalletTx[]} are the resulting transactions
   */
  async sweepAccount(accountIdx, address) {
    let config = new MoneroSendConfig(address);
    config.setAccountIndex(accountIdx);
    return await this.sweepUnlocked(config);
  }

  /**
   * Sweep a subaddress's unlocked funds to an address.
   * 
   * @param {int} accountIdx is the index of the account
   * @param {int} subaddressIdx is the index of the subaddress
   * @param {string} address is the address to sweep the subaddress's funds to
   * @return {MoneroWalletTx[]} are the resulting transactions
   */
  async sweepSubaddress(accountIdx, subaddressIdx, address) {
    let config = new MoneroSendConfig(address);
    config.setAccountIndex(accountIdx);
    config.setSubaddressIndices([subaddressIdx]);
    return await this.sweepUnlocked(config);
  }

  /**
   * Sweep unlocked funds.
   * 
   * @param {(MoneroSendConfig|object)} is the sweep configuration
   * @return {MoneroWalletTx[]} are the resulting transactions
   */
  async sweepUnlocked(config) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Sweep all unmixable dust outputs back to the wallet to make them easier to spend and mix.
   * 
   * @param {boolean} doNotRelay specifies if the resulting transaction should not be relayed (defaults to false i.e. relayed)
   * @return {MoneroWalletTx[]} are the resulting transactions from sweeping dust
   */
  async sweepDust(doNotRelay) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Sweep an output with a given key image.
   * 
   * @param {(MoneroSendConfig|string)} is a send configuration or destination address
   * @param {string} keyImage is the key image hex of the output to sweep
   * @param {int} priority sets a transaction priority as an integer between 0 and 3 (see {MoneroSendPriority})
   * @param {int} mixin is the number of outputs from the blockchain to mix with (default 11)
   * @return {MoneroWalletTx} is the resulting transaction from sweeping an output 
   */
  async sweepOutput(configOrAddress, keyImage, priority, mixin) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Relay a transaction previously created without relaying.
   * 
   * @param {string} txMetadata is transaction metadata previously created without relaying
   * @return {MoneroWalletTx} is the relayed tx
   */
  async relayTx(txMetadata) {
    return await relayTxs([txMetadata])[0];
  }
  
  /**
   * Relay transactions previously created without relaying.
   * 
   * @param {string[]} txMetadatas are transaction metadata previously created without relaying
   * @return {MoneroWalletTx[]} are the relayed txs
   */
  async relayTxs(txMetadatas) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a transaction note.
   * 
   * @param {string} txId specifies the transaction to get the note of
   * @return {string} is the tx note
   */
  async getTxNote(txId) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Set a note for a specific transaction.
   * 
   * @param {string} txId specifies the transaction
   * @param {string} note specifies the note
   */
  async setTxNote(txId, note) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get notes for multiple transactions.
   * 
   * @param {string[]} txIds identify the transactions to get notes for
   * @preturns {string[]} are notes for the transactions
   */
  async getTxNotes(txIds) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Set notes for multiple transactions.
   * 
   * @param {string[]} txIds specify the transactions to set notes for
   * @param {string[]} notes are the notes to set for the transactions
   */
  async setTxNotes(txIds, notes) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Sign a message.
   * 
   * @param {string} msg is the message to sign
   * @return {string} is the signature
   */
  async sign(msg) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Verify a signature on a message.
   * 
   * @param {string} msg is the signed message
   * @param {string} address is the signing address
   * @param {string} signature is the signature
   * @return {boolean} true if the signature is good, false otherwise
   */
  async verify(msg, address, signature) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a transaction's secret key from its id.
   * 
   * @param {string} txId is the transaction's id
   * @return {string} is the transaction's secret key
   */
  async getTxKey(txId) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Check a transaction in the blockchain with its secret key.
   * 
   * @param {string} txId specifies the transaction to check
   * @param {string} txKey is the transaction's secret key
   * @param {string} address is the destination public address of the transaction
   * @return {MoneroCheckTx} is the result of the check
   */
  async checkTxKey(txId, txKey, address) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get a transaction signature to prove it.
   * 
   * @param {string} txId specifies the transaction to prove
   * @param {string} address is the destination public address of the transaction
   * @param {string} message is a message to include with the signature to further authenticate the proof (optional)
   * @return {string} is the transaction signature
   */
  async getTxProof(txId, address, message) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Prove a transaction by checking its signature.
   * 
   * @param {string} txId specifies the transaction to prove
   * @param {string} address is the destination public address of the transaction
   * @param {string} message is a message included with the signature to further authenticate the proof (optional)
   * @param {string} signature is the transaction signature to confirm
   * @return {MoneroCheckTx} is the result of the check
   */
  async checkTxProof(txId, address, message, signature) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Generate a signature to prove a spend. Unlike proving a transaction, it does not require the destination public address.
   * 
   * @param {string} txId specifies the transaction to prove
   * @param {string} message is a message to include with the signature to further authenticate the proof (optional)
   * @return {string} is the transaction signature
   */
  async getSpendProof(txId, message) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Prove a spend using a signature. Unlike proving a transaction, it does not require the destination public address.
   * 
   * @param {string} txId specifies the transaction to prove
   * @param {string} message is a message included with the signature to further authenticate the proof (optional)
   * @param {string} signature is the transaction signature to confirm
   * @return {boolean} true if the signature is good, false otherwise
   */
  async checkSpendProof(txId, message, signature) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Generate a signature to prove the entire balance of the wallet.
   * 
   * @param {string} message is a message included with the signature to further authenticate the proof (optional)
   * @return {string} is the reserve proof signature
   */
  async getWalletReserveProof(message) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Generate a signature to prove an available amount in an account.
   * 
   * @param {int} accountIdx specifies the account to prove contains an available amount
   * @param {BigInteger} amount is the minimum amount to prove as available in the account
   * @param {string} message is a message to include with the signature to further authenticate the proof (optional)
   * @return {string} is the reserve proof signature
   */
  async getAccountReserveProof(accountIdx, amount, message) {
    throw new Error("Subclass must implement");
  }

  /**
   * Proves a wallet has a disposable reserve using a signature.
   * 
   * @param {string} address is the public wallet address
   * @param {string} message is a message included with the signature to further authenticate the proof (optional)
   * @param {string} signature is the reserve proof signature to check
   * @return {MoneroCheckReserve} is the result of checking the signature proof
   */
  async checkReserveProof(address, message, signature) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get address book entries.
   * 
   * @param {int[]} entryIndices are indices of the entries to get
   * @return {MoneroAddressBookEntry[]} are the address book entries
   */
  async getAddressBookEntries(entryIndices) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Add an address book entry.
   * 
   * @param {string} address is the entry address
   * @param {string} description is the entry description (optional)
   * @param {string} paymentId is the entry paymet id (optional)
   */
  async addAddressBookEntry(address, description, paymentId) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Delete an address book entry.
   * 
   * @param {int} entryIdx is the index of the entry to delete
   */
  async deleteAddressBookEntry(entryIdx) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Tag accounts.
   * 
   * @param {string} tag is the tag to apply to the specified accounts
   * @param {int[]} accountIndices are the indices of the accounts to tag
   */
  async tagAccounts(tag, accountIndices) {
    throw new Error("Subclass must implement");
  }

  /**
   * Untag acconts.
   * 
   * @param {int[]} accountIndices are the indices of the accounts to untag
   */
  async untagAccounts(accountIndices) {
    throw new Error("Subclass must implement");
  }

  /**
   * Return all account tags.
   * 
   * @return {MoneroAccountTag[]} are the wallet's account tags
   */
  async getAccountTags() {
    throw new Error("Subclass must implement");
  }

  /**
   * Sets a human-readable description for a tag.
   * 
   * @param {string} tag is the tag to set a description for
   * @param {string} label is the label to set for the tag
   */
  async setAccountTagLabel(tag, label) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Creates a payment URI from a send configuration.
   * 
   * @param {MoneroSendConfig} sendConfig specifies configuration for a potential tx
   * @return {string} is the payment uri
   */
  async createPaymentUri(sendConfig) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Parses a payment URI to a send configuration.
   * 
   * @param {string} uri is the payment uri to parse
   * @return {MoneroSendConfig} is the send configuration parsed from the uri
   */
  async parsePaymentUri(uri) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Export all outputs in hex format.
   * 
   * @return {string} are all outputs in hex format, undefined if no outputs
   */
  async getOutputsHex() {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Import outputs in hex format.
   * 
   * @param {string} outputsHex are outputs in hex format
   * @return {int} is the number of outputs imported
   */
  async importOutputsHex(outputsHex) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Set an arbitrary attribute.
   * 
   * @param {string} key is the attribute key
   * @param {string} val is the attribute value
   */
  async setAttribute(key, val) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Get an attribute.
   * 
   * @param {string} key is the attribute to get the value of
   * @return {string} is the attribute's value
   */
  async getAttribute(key) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Start mining.
   * 
   * @param {int} numThreads is the number of threads created for mining
   * @param {boolean} backgroundMining specifies if mining should occur in the background
   * @param {boolean} ignoreBattery specifies if the battery should be ignored for mining
   */
  async startMining(numThreads, backgroundMining, ignoreBattery) {
    throw new Error("Subclass must implement");
  }
  
  /**
   * Stop mining.
   */
  async stopMining() {
    throw new Error("Subclass must implement");
  }
}

module.exports = MoneroWallet;