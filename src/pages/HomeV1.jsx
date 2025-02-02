import React from "react";
import Header from "../components/header/v1/Header";
import Banner from "../sections/banner/v1/Banner";
import { ethers } from "ethers";

const tokenAddress = "0xceA7A2E865837d28Ce59D395501FeA3765dF51dB"; 
const abi = [
  "function buyTokens() public payable"
];

async function buyTokens(amountInBNB) {
  if (!window.ethereum) {
    console.error("No se detectó una wallet.");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(tokenAddress, abi, signer);

  try {
    console.log(`Comprando tokens con ${amountInBNB} BNB...`);
    
    const tx = await contract.buyTokens({
      value: ethers.utils.parseEther(amountInBNB.toString()) 
    });

    console.log("Transacción enviada:", tx.hash);
    await tx.wait();
    console.log("Compra exitosa:", tx);
    
  } catch (error) {
    console.error("Error en la compra:", error);
  }
}

const HomeV1 = () => {
  return (
    <>
      <Header />
      <Banner />
      
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Comprar $FANPE</h2>
        <button onClick={() => buyTokens(0.1)}>Comprar 0.1 BNB en $FANPE</button>
      </div>
    </>
  );
};

export default HomeV1;
