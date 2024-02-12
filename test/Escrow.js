const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    
    let buyer, seller, inspector, lender;
    let realEstate, escrow;

    beforeEach(async () => {
        // Setup accounts
        [buyer, seller, inspector, lender] = await ethers.getSigners();
        
        // gets the contract factory
        const RealEstate = await ethers.getContractFactory('RealEstate')
        // deploy the contract
        realEstate = await RealEstate.deploy();

        // mint
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS");
        await transaction.wait();
        
        const Escrow = await ethers.getContractFactory('Escrow');
        escrow = await Escrow.deploy(
            realEstate.address, 
            seller.address, 
            inspector.address, 
            lender.address
        );
    })

    describe('Deployment', () => {
        it('Returns NFT address', async () => {
            const result = await escrow.nftAddress()
            expect(result).to.be.equal(realEstate.address);
        })
    
        it('Returns seller address', async () => {
            const result = await escrow.seller()
            expect(result).to.be.equal(seller.address);
        })
    
        it('Returns inspector address', async () => {
            const result = await escrow.inspector()
            expect(result).to.be.equal(inspector.address);
        })
    
        it('Returns lender address', async () => {
            const result = await escrow.lender()
            expect(result).to.be.equal(lender.address);
        })
    })
})
