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
    if (!isConnected) Router.push(`/`);
  }, [isConnected, address])
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content w-full">
        <Background />
        <div className="container m-auto px-16">
          <div className="welcome-page">
            <Header page="Settings"/>
            <div className="settings-card text-black capitalize">
                <div>
                    <div className="font-semibold text-2xl mb-5">Account Details</div>
                    <div className="flex justify-between mb-5">
                        <div>
                            <div className="mb-5">
                                <div className="text-sm font-normal">
                                    Username:
                                </div>
                                <div className="flex items-baseline">
                                    <div className="font-semibold text-2xl mr-2">Binance 8</div>
                                    <div className="font-semibold text-xs">(Edit)</div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="text-sm font-normal">
                                    First Name:
                                </div>
                                <div className="flex items-baseline">
                                    <div className="font-semibold text-2xl mr-2">Jamie</div>
                                    <div className="font-semibold text-xs">(Edit)</div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="text-sm font-normal">
                                    Phone Number:
                                </div>
                                <div className="flex items-baseline">
                                    <div className="font-semibold text-2xl mr-2">+971 52 340 4989</div>
                                    <div className="font-semibold text-xs">(Edit)</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-5">
                                <div className="text-sm font-normal">
                                    Email : 
                                </div>
                                <div className="flex items-baseline">
                                    <div className="font-semibold text-2xl mr-2">binance0808@gmail.com</div>
                                    <div className="font-semibold text-xs">(Edit)</div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="text-sm font-normal">
                                    Second Name :
                                </div>
                                <div className="flex items-baseline">
                                    <div className="font-semibold text-2xl mr-2">Taylor</div>
                                    <div className="font-semibold text-xs">(Edit)</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="hexagon hexagon-settings">
                                <Image src={`/images/default-avatar.jpeg`} alt='' width={143} height={161}/>
                            </div>
                            <div className="text-center">(Edit)</div>
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-xl my-5">Link Social Accounts:</div>
                        <div className="w-1/4 mb-2 flex gap-5">
                            <Image src={`/images/linkedin.svg`} alt='' width={15} height={15} className="flex-1"/>
                            <div className="font-semibold text-base flex-1">LinkedIn</div>
                            <div className="font-normal text-[#FFA800] text-right">Connect</div>
                        </div>
                        <div className="w-1/4 flex gap-5">
                            <Image src={`/images/github.svg`} alt='' width={15} height={12} className="flex-1"/>
                            <div className="font-semibold text-base flex-1">Twitter</div>
                            <div className="font-normal text-[#FFA800] text-right">Connect</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
