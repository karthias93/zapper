import { selectThemeState, setThemeState } from "../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Welcome from "../components/Welcome";
import { useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import Router from 'next/router';
import Background from "../components/Background";

export default function Home() {
  const { address, connector, isConnected } = useAccount();

  useEffect(()=>{
    if (isConnected) Router.push(`/profile/${address}`);
  }, [isConnected, address])
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content w-full ml-64">
        <Background />
        <div className="container m-auto px-0 lg:px-4 lg:px-16">
          <div className="welcome-page">
            <Header />
            <Welcome />
          </div>
        </div>
      </div>
    </div>
  )
}
