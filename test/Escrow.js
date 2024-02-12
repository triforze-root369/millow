const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    
    // means of testing if one can save the escrow contract address
    it('saves the addresses', async() => {

        // gets the contract factory
        const RealEstate = await ethers.getContractFactory('RealEstate')
        // deploy the contract
        realEstate = await RealEstate.deploy();

        // log the address
        //console.log(realEstate.address)

        // mint
        let transaction = await realEstate.mint();

        // https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS
    })
})
