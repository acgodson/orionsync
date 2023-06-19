import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [goerli],
//   [publicProvider()]
// );

// const config = createConfig({
//   autoConnect: true,
//   publicClient,
//   webSocketPublicClient,
//   connectors: [
//     // new MetaMaskConnector({ chains }),
//     new InjectedConnector({
//       chains,
//       options: {
//         name: "Injected",
//         shimDisconnect: true,
//       },
//     }),
//   ],
// });

const { chains, publicClient } = configureChains([goerli], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
});

const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WagmiProvider;
