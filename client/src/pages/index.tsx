
import { ChakraProvider } from '@chakra-ui/react';
import SpaceInfo from './consensusWallet';
import { ethers } from 'ethers';


export default function Wallet() {
  const SpaceID = ethers.utils.getAddress("0x6945EE254481302AD292Dfc8F7f27c4B065Af96d")
  return (
    <ChakraProvider>
      <  SpaceInfo spaceId={SpaceID} />
    </ChakraProvider>
  )
}

