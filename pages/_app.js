import { useEffect } from 'react'
import '../styles/globals.scss'
import { wrapper } from "../store";
import { selectThemeState } from '../store/themeSlice';
import { useSelector } from 'react-redux';
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { ApolloProvider } from "@apollo/client";
import apolloClient from "../apollo-client";
import { IKContext } from 'imagekitio-react';
import Head from 'next/head';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
])

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }) {
  const themeState = useSelector(selectThemeState);
  useEffect(()=>{
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [themeState]);

  return (
    <IKContext publicKey="public_RFMgpmved2Nz3zxH+LMI9OyPmr4=" urlEndpoint={process.env.imgUrlEndpoint} authenticationEndpoint={`${process.env.apiUrl}/api/imagekit/auth`}>
      <ApolloProvider client={apolloClient}>
        <WagmiConfig client={client}>
          <Head>
            <title>Potent - Web3 Portfolio Tracker</title>
            <link rel="shortcut icon" href="/images/logo.svg" />
          </Head>
          <Component {...pageProps} />
        </WagmiConfig>
      </ApolloProvider>
    </IKContext>
  )
}

export default wrapper.withRedux(MyApp);
