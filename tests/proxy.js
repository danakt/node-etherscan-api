const EtherscanAPI = require('../src/EtherscanAPI')

/**
 * @todo Make test of methods:
 * — sendRawTransaction
 * — call
 * — estimateGas
 */
describe('Etherscan geth/parity proxy  methods', () => {
  const e = new EtherscanAPI()

  test('getRecentBlockNumber', async () => {
    const data = await e.getRecentBlockNumber()
    expect(isNaN(data)).toBe(false)
    expect(Number(String(data))).toBe(data)
  })

  test('getBlockByNumber', async () => {
    const data = await e.getBlockByNumber(10)
    expect(Object.keys(data)).toEqual([
      'difficulty',
      'extraData',
      'gasLimit',
      'gasUsed',
      'hash',
      'logsBloom',
      'miner',
      'mixHash',
      'nonce',
      'number',
      'parentHash',
      'receiptsRoot',
      'sha3Uncles',
      'size',
      'stateRoot',
      'timestamp',
      'totalDifficulty',
      'transactions',
      'transactionsRoot',
      'uncles'
    ])
  })

  test('getUncleByBlockNumberAndIndex', async () => {
    const data = await e.getUncleByBlockNumberAndIndex(2165403, 0)
    expect(Object.keys(data)).toEqual([
      'difficulty',
      'extraData',
      'gasLimit',
      'gasUsed',
      'hash',
      'logsBloom',
      'miner',
      'mixHash',
      'nonce',
      'number',
      'parentHash',
      'receiptsRoot',
      'sha3Uncles',
      'size',
      'stateRoot',
      'timestamp',
      'totalDifficulty',
      'transactionsRoot',
      'uncles'
    ])
  })

  test('getBlockTransactionCount', async () => {
    const data = await e.getBlockTransactionCount(0x10fb78)
    expect(data).toBe(3)
  })

  test('getTransactionByHash', async () => {
    const data = await e.getTransactionByHash(
      '0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1'
    )
    expect(Object.keys(data)).toEqual([
      'blockHash',
      'blockNumber',
      'from',
      'gas',
      'gasPrice',
      'hash',
      'input',
      'nonce',
      'to',
      'transactionIndex',
      'value',
      'v',
      'r',
      's'
    ])
  })

  test('getTransactionByBlockNumberAndIndex', async () => {
    const data = await e.getTransactionByBlockNumberAndIndex(0x10d4f, 0)
    expect(Object.keys(data)).toEqual([
      'blockHash',
      'blockNumber',
      'from',
      'gas',
      'gasPrice',
      'hash',
      'input',
      'nonce',
      'to',
      'transactionIndex',
      'value',
      'v',
      'r',
      's'
    ])
  })

  test('getTransactionCount', async () => {
    const data = await e.getTransactionCount(
      '0x2910543af39aba0cd09dbb2d50200b3e800a63d2'
    )

    expect(isNaN(data)).toBe(false)
    expect(Number(String(data))).toBe(data)
  })

  test('getTransactionReceipt', async () => {
    const data = await e.getTransactionReceipt(
      '0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1'
    )

    expect(Object.keys(data)).toEqual([
      'blockHash',
      'blockNumber',
      'contractAddress',
      'cumulativeGasUsed',
      'from',
      'gasUsed',
      'logs',
      'logsBloom',
      'root',
      'to',
      'transactionHash',
      'transactionIndex'
    ])
  })

  test('getCode', async () => {
    const data = await e.getCode('0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c')
    expect(data).toBe(
      '0x3660008037602060003660003473273930d21e01ee25e4c219b63259d214872220a'
        + '261235a5a03f21560015760206000f3'
    )
  })

  test('getStorageAt', async () => {
    const data = await e.getStorageAt(
      '0x6e03d9cce9d60f3e9f2597e13cd4c54c55330cfd',
      0
    )
    expect(data).toBe(
      '0x0000000000000000000000003d0768da09ce77d25e2d998e6a7b6ed4b9116c2d'
    )
  })

  test('getGasPrice', async () => {
    const data = await e.getGasPrice()
    expect(isNaN(Number(data))).toBe(false)
  })
})
