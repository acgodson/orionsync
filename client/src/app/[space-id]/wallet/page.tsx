"use client";
import { ChakraProvider } from "@chakra-ui/react";
import SpaceInfo from "@/components/ConsensusWallet";
import { ethers } from "ethers";
import TopNav from "@/components/Header";
import stringToHexAddress from "@/utils/stringToHexAddress";

const Wallet = () => {
  const SpaceID = ethers.utils.getAddress(
    stringToHexAddress("0xf2750684eB85768")
  );
  
  return (
    <>
      <TopNav>
        <p className="text-4xl font-medium">Wallet</p>
      </TopNav>

      <ChakraProvider disableGlobalStyle>
        <SpaceInfo spaceId={SpaceID} />
      </ChakraProvider>
    </>
  );
};

export default Wallet;
