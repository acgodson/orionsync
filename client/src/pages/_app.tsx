import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from '@chakra-ui/react';
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { filecoinHyperspace, goerli, polygonMumbai } from "wagmi/chains";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";



const Calibrationnet = {
  id: 314159,
  name: "Filecoin Hyperspace",
  network: "Filecoin",
  nativeCurrency: {
    decimals: 18,
    name: "Filecoin",
    symbol: "tFIL",
  },
  rpcUrls: {
    public: {
      http: ["https://api.calibration.node.glif.io/rpc/v1"],
    },
    default: {
      http: ["https://api.calibration.node.glif.io/rpc/v1"],
    },
  },
  blockExplorers: {
    default: { name: "Filfox", url: "https://calibration.filfox.info/en" },
  },
};
const { chains, publicClient } = configureChains(
  [goerli, Calibrationnet, polygonMumbai],
  [publicProvider()]


);

const { connectors } = getDefaultWallets({
  appName: "orionwallet",
  projectId: "3fd26a982a80d14bad19cc2b594652ac",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider modalSize="compact" chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig >

    </>

  );
}
