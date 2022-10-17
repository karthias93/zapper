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
import BgRound1 from '../public/images/bg-round1.svg';
import BgRound2 from '../public/images/bg-round2.svg';
import BgRound3 from '../public/images/bg-round3.svg';

export default function Home() {
  const themeState = useSelector(selectThemeState);
  const dispatch = useDispatch();
  const { address, connector, isConnected } = useAccount();

  useEffect(()=>{
    if (isConnected) Router.push(`/profile/${address}`);
  }, [isConnected, address])

  const updateTheme = () => {
    const mode = themeState === 'dark' ? 'light' : 'dark';
    localStorage.theme = mode;
    dispatch(setThemeState(mode))
  }
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content w-full">
        <div className="main-bg">
          <div className='BgRound1 w-1/2'>
            <Image src={BgRound1} alt=""/>
          </div>
          <div className='BgRound2 w-1/2'>
            <Image src={BgRound2} alt=""/>
          </div>
          <div className='BgRound3 w-1/2'>
            <Image src={BgRound3} alt=""/>
          </div>
        </div>
        <div className="container m-auto px-16">
          <div className="welcome-page">
            <Header />
            <Welcome />
          </div>
        </div>
      </div>
    </div>
  )
}
