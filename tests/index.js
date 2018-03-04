const EtherscanAPI = require('../build')

describe('Etherscan API', () => {
  test('Instance', () => {
    const etherscan1 = new EtherscanAPI()
    expect(etherscan1.token).toBe('YourApiKeyToken')
    expect(etherscan1.network).toBe('MAIN')
    expect(etherscan1.host).toBe('https://api.etherscan.io')

    const etherscan2 = new EtherscanAPI('123', 'ropsten')
    expect(etherscan2.token).toBe('123')
    expect(etherscan2.network).toBe('ROPSTEN')
    expect(etherscan2.host).toBe('http://api-ropsten.etherscan.io')
  })

  describe('Methods', () => {
    const e = new EtherscanAPI()

    test('getAccountBalance', () => {
      return e
        .getAccountBalance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae')
        .then(data => {
          expect(data).toBe('670456215208885498951364')
        })
    })

    test('getAccountBalance ether', () => {
      return e
        .getAccountBalance(
          '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
          'ether'
        )
        .then(data => {
          expect(data).toBe('670456.215208885498951364')
        })
    })

    test('getAccountBalances', () => {
      return e
        .getAccountBalances([
          '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a',
          '0x63a9975ba31b0b9626b34300f7f627147df1f526',
          '0x198ef1ec325a96cc354c7266a038be8b5c558f67'
        ])
        .then(data => {
          expect(data).toEqual([
            {
              account: '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a',
              balance: '40807168564070000000000'
            },
            {
              account: '0x63a9975ba31b0b9626b34300f7f627147df1f526',
              balance: '332567136222827062478'
            },
            {
              account: '0x198ef1ec325a96cc354c7266a038be8b5c558f67',
              balance: '0'
            }
          ])
        })
    })

    test('getAccountBalances eth', () => {
      return e
        .getAccountBalances(
        [
          '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a',
          '0x63a9975ba31b0b9626b34300f7f627147df1f526',
          '0x198ef1ec325a96cc354c7266a038be8b5c558f67'
        ],
          'eth'
        )
        .then(data => {
          expect(data).toEqual([
            {
              account: '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a',
              balance: '40807.16856407'
            },
            {
              account: '0x63a9975ba31b0b9626b34300f7f627147df1f526',
              balance: '332.567136222827062478'
            },
            {
              account: '0x198ef1ec325a96cc354c7266a038be8b5c558f67',
              balance: '0'
            }
          ])
        })
    })

    test('getTransactions', () => {
      return e
        .getTransactions(
          '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a',
          0,
          9999999,
          3,
          3,
          'asc'
        )
        .then(data => {
          expect(data.length).toBe(3)
          expect(Object.keys(data[0])).toEqual([
            'blockNumber',
            'timeStamp',
            'hash',
            'nonce',
            'blockHash',
            'transactionIndex',
            'from',
            'to',
            'value',
            'gas',
            'gasPrice',
            'isError',
            'txreceipt_status',
            'input',
            'contractAddress',
            'cumulativeGasUsed',
            'gasUsed',
            'confirmations'
          ])
        })
    })

    test('getInternalTransactions', () => {
      return e
        .getInternalTransactions(
          '0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3',
          0,
          2702578,
          3,
          3,
          'asc'
        )
        .then(data => {
          expect(data.length).toBe(3)
          expect(Object.keys(data[0])).toEqual([
            'blockNumber',
            'timeStamp',
            'hash',
            'from',
            'to',
            'value',
            'contractAddress',
            'input',
            'type',
            'gas',
            'gasUsed',
            'traceId',
            'isError',
            'errCode'
          ])
        })
    })

    test('getInternalTransactionsByHash', () => {
      return e
        .getInternalTransactionsByHash(
          '0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170'
        )
        .then(data => {
          expect(Object.keys(data[0])).toEqual([
            'blockNumber',
            'timeStamp',
            'from',
            'to',
            'value',
            'contractAddress',
            'input',
            'type',
            'gas',
            'gasUsed',
            'isError',
            'errCode'
          ])
        })
    })

    test('getMinedBlocks', () => {
      return e
        .getMinedBlocks(
          '0x9dd134d14d1e65f84b706d6f205cd5b1cd03a46b',
          'blocks',
          10,
          1
        )
        .then(data => {
          expect(data.length).toBe(10)
          expect(Object.keys(data[0])).toEqual([
            'blockNumber',
            'timeStamp',
            'blockReward'
          ])
        })
    })
  })
})
