// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Token.sol";
contract GBTokenAndCrowdsale {

    // GBToken public tokenContract;

    mapping (address => uint) balances;
    // mapping(address => uint256)  _balances;
    
    // Address of the wallet holding the token funds when they are first created /
    address payable tokenFundsAddress;
    
    // Approved address of the account that will receive the raised Ether funds /
    address payable beneficiary;
    
    // Keep track of ETH funds raised /
    uint amountRaised;

    // Price of a GBT token, in 'wei' denomination /
    uint  private TOKEN_PRICE_IN_WEI = 1*10**18;
    uint check ;
    // This generates a public event on the blockchain that will notify listening clients /
    event TransferGB(address indexed from, address indexed to, uint value);
    event TokenBuy(address indexed from, address indexed to ,uint256 fundsReceived, uint numberOfTokens);
    constructor(uint initialSupply){
     
        balances[msg.sender] = initialSupply;
        check = initialSupply;
        // store a reference to this contract creator's address, 
        // so we can debit tokens from this address each time we distribute tokens to
        // a crowdsale participant
        tokenFundsAddress = payable(msg.sender);
        
        // the beneficiary for the crowd sale (the one who will receive the raised ETH)
        // should be the same as the account holding the tokens to be given away
        beneficiary = tokenFundsAddress;
    }
    function checkcheck()public view returns(uint){
        return check;
    }
    // Send tokens from the message sender's account to the specified account /
    function sendTokens(address receiver, uint amount) public {
        // if sender does not have enough money
        if (balances[msg.sender] < amount) return;
        
        // take funds out of sender's account
        balances[msg.sender] -= amount;
        
        // add those funds to receipient's account
        balances[receiver] += amount;

        emit TransferGB(msg.sender, receiver, amount);

    }

      
    function getBalance(address addr) public view returns (uint) {
        return balances[addr];
    }

    function buyTokensWithEther() public payable{
        uint numTokens = msg.value*10**18 / TOKEN_PRICE_IN_WEI;
        if(numTokens<=balances[tokenFundsAddress]){
                balances[tokenFundsAddress] -= numTokens;
        balances[msg.sender] += numTokens;
        amountRaised += msg.value;
        beneficiary.transfer(msg.value);
        emit TokenBuy(beneficiary ,msg.sender, msg.value, numTokens);
        }
        else
            {
                
            }
        
        }
}

       