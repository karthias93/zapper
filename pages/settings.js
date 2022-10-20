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
            <div className="card-wrapper rounded-3xl">
                <div>
                    <div>Account Details</div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    Username
                                </div>
                                <div>
                                    <div>Binance 8</div>
                                    <div>(edit)</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    Username
                                </div>
                                <div>
                                    <div>Binance 8</div>
                                    <div>(edit)</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    Username
                                </div>
                                <div>
                                    <div>Binance 8</div>
                                    <div>(edit)</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    Username
                                </div>
                                <div>
                                    <div>Binance 8</div>
                                    <div>(edit)</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    Username
                                </div>
                                <div>
                                    <div>Binance 8</div>
                                    <div>(edit)</div>
                                </div>
                            </div>
                            <div>
                                <Image src={`/images/default-avatar.jpeg`} alt='' width={143} height={161}/>
                                <div>(edit)</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>Link Social Accounts:</div>
                        <div>
                            <Image src={`/images/linkedin.svg`} alt='' width={15} height={15}/>
                            <div>LinkedIn</div>
                            <div>Connect</div>
                        </div>
                        <div>
                            <Image src={`/images/twitter.svg`} alt='' width={15} height={12} />
                            <div>LinkedIn</div>
                            <div>Connect</div>
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
