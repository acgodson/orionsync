
import { ChakraProvider } from '@chakra-ui/react';
import SpaceInfo from './consensusWallet';
import { ethers } from 'ethers';


export default function Wallet() {
  const SpaceID = ethers.utils.getAddress("0xf2750684eB187fF9f82e2F980f6233707eF5768C")
  return (
    <ChakraProvider>
      <  SpaceInfo spaceId={SpaceID} />
    </ChakraProvider>
  )
}

