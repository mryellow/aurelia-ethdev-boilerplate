import environment from '../../environment';
import Web3 from 'web3';

export class EthService {
  constructor() {
    this.readonly = false;

    if (typeof window.web3 !== 'undefined') {
      console.log('Web3 using currentProvider');
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      // TODO: Warn user that MetaMask is required? Only for read/write functions?

      if (environment.testing) {
        console.log('Web3 using HttpProvider (local)');
        this.web3 = new Web3(
          new Web3.providers.HttpProvider('http://localhost:8545')
        );
      } else {
        const network = environment.debug ? 'ropsten' : 'mainnet';
        console.log('Web3 using WebsocketProvider (' + network + ')');
        this.web3 = new Web3(
          new Web3.providers.WebsocketProvider(
            'wss://' + network + '.infura.io/ws'
          )
        );
      }
      this.readonly = true;
    }

    this._abis = {
      erc20: [
        {
          constant: false,
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' }
          ],
          name: 'approve',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          type: 'function'
        },
        {
          constant: true,
          inputs: [],
          name: 'totalSupply',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          type: 'function'
        },
        {
          constant: false,
          inputs: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' }
          ],
          name: 'transferFrom',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          type: 'function'
        },
        {
          constant: true,
          inputs: [{ name: 'who', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          type: 'function'
        },
        {
          constant: false,
          inputs: [
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' }
          ],
          name: 'transfer',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          type: 'function'
        },
        {
          constant: false,
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'extraData', type: 'bytes' }
          ],
          name: 'approveAndCall',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          type: 'function'
        },
        {
          constant: true,
          inputs: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' }
          ],
          name: 'allowance',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          type: 'function'
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'owner', type: 'address' },
            { indexed: true, name: 'spender', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' }
          ],
          name: 'Approval',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'from', type: 'address' },
            { indexed: true, name: 'to', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' }
          ],
          name: 'Transfer',
          type: 'event'
        }
      ]
    };
  }

  getContract(abi, addr) {
    if (!abi || !addr) throw new Error('Required arguments invalid');
    if (!this.web3) throw new Error('Web3 not Initalised');
    return new this.web3.eth.Contract(this._abis[abi], addr);
  }
}
