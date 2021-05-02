const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(MyToken)
    const myToken = await MyToken.deployed()

     // Deploy Farm Token
    await deployer.deploy(FarmToken, myToken.address)
    const farmToken = await FarmToken.deployed()

    const allowanceBefore = await myToken.allowance(
        accounts[0],
        farmToken.address
    )
    console.log(
        "Amount of MyToken FarmToken is allowed to transfer on our behalf Before: " +
        allowanceBefore.toString()
    )

    //We allow farmToken to transfer x amount of MyToken on our behalf
    await myToken.approve(farmToken.address, web3.utils.toWei("100","ether"))

    const allowanceAfter = await myToken.allowance(accounts[0])
}