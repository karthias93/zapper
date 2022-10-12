import { selectThemeState, setThemeState } from "../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image'
import BgRound1 from '../public/bg-round1.svg'
import BgRound2 from '../public/bg-round2.svg'
import BgRound3 from '../public/bg-round3.svg'
import Logo from '../public/logo.svg'
import more from '../public/more.svg'
import profile from '../public/profile.svg'
import settings from '../public/settings.svg'
import support from '../public/support.svg'
import wallet from '../public/wallet.svg'
import defi from '../public/defi.svg'
import dashboard from '../public/dashboard.svg'
import feed from '../public/feed.svg'
import Dark from '../public/dark.svg'
import hexa from '../public/hexa.svg'
import search from '../public/search.svg'
import poly1 from '../public/poly1.svg'
import poly2 from '../public/poly2.svg'
import poly3 from '../public/poly3.svg'
import poly4 from '../public/poly4.svg'
import skel1 from '../public/skel-1.svg'
import skel2 from '../public/skel-2.svg'
export default function Home() {
  const themeState = useSelector(selectThemeState);
  const dispatch = useDispatch();

  const updateTheme = () => {
    const mode = themeState === 'dark' ? 'light' : 'dark';
    localStorage.theme = mode;
    dispatch(setThemeState(mode))
  }
  return (
    // <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-sky-500 dark:to-indigo-500 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
    //   <div>
    //     <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg" onClick={updateTheme}>
    //       <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
    //     </span>
    //   </div>
    //   <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
    //   <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
    //     The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
    //   </p>
    // </div>
    <div>
      <div className="layout">
        <div className="sidebar bg-regal-white ">
          <div>
            <div className="sidebar-header text-center mb-4">
              <Image src={Logo} />
            </div>
            <div className="sidebar-body">
              <div>
                <ul className="menus mb-8">
                  <li><Image src={dashboard} className="sidebar-icons" /><span className="menutext">Dashboard</span></li>
                  <li><Image src={feed} className="sidebar-icons" /><span className="menutext">Feed</span></li>
                  <li><Image src={profile} className="sidebar-icons" /><span className="menutext">Social Rankings</span></li>
                  <li><Image src={defi} className="sidebar-icons" /><span className="menutext">Defi List</span></li>
                  <li><Image src={more} className="sidebar-icons" /><span className="menutext">More</span></li>

                </ul>
              </div>
            </div>
          </div>
          <div className="sidebar-footer">
            <ul className="menus1">
              <li><Image src={support} className="sidebar-icons" /><span className="menutext">Support</span></li>
              <li><Image src={settings} className="sidebar-icons" /><span className="menutext">Settings</span></li>
              <li className="mt-2 dark-btn"><button className="flex"><Image src={Dark} className="sidebar-icons" /> <span className="menutext">Dark Mode</span></button></li>
            </ul>
          </div>
        </div>
        <div className="main-content w-full">
          <div className="main-bg">
            <div className='BgRound1 w-1/2'>
              <Image src={BgRound1} />
            </div>
            <div className='BgRound2 w-1/2'>
              <Image src={BgRound2} />
            </div>
            <div className='BgRound3 w-1/2'>
              <Image src={BgRound3} />
            </div>
          </div>
          <div className="container m-auto px-16">
            <div className="welcome-page">
              <div className="page-header mt-5 mb-4 flex justify-between">
                <div>
                  <h1 className="text-4xl font-bold">Welcome 👋</h1>
                </div>
                <div className="flex">
                  <div>
                    <input type="search" className="search-input text-sm" placeholder="Search address / Web3 ID / ENS / Protocol" />
                    <span className="search-icon">
                      <Image src={search} />
                    </span>
                  </div>
                  <div>
                    <button className="text-regal-white login-btn">Log in via web3 wallet.</button>
                  </div>
                  <div>
                    <Image height={45} width={45} src={hexa} />
                  </div>
                </div>
              </div>
              <div className="page-content">
                <div className="main-card w-4/5">
                  <div className="flex">
                    <div className="w-3/5">
                      <h1 className="text-5xl heading1 mb-6">
                        Keep up with the<br /> amazing world of<br /> Web3
                      </h1>
                      <div>
                        <button className="text-regal-white login-btn flex"><span className="mr-3">Log in via web3 wallet. </span><Image height={20} width={20} src={wallet} /></button>
                      </div>
                    </div>
                    <div className="w-2/5">
                      <div className="slek-card slek-card1">
                        <div className="flex">
                          <div className="mr-3">
                            <Image height={100} width={100} src={poly1} />
                          </div>
                          <div>
                            <div className="mb-3">
                              0xbd........5c50
                            </div>
                            <div className="ske11">
                              <Image src={skel1} />
                            </div>
                            <div className="ske12">
                              <Image src={skel2} />
                            </div>
                            <div className="ske12">
                              <Image src={skel2} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="slek-card">
                        <div className="flex">
                          <div className="mr-3">
                            <Image height={100} width={100} src={poly2} />
                          </div>
                          <div>
                            <div className="mb-3">
                              0xbd........5c50
                            </div>
                            <div className="ske11">
                              <Image src={skel1} />
                            </div>
                            <div className="ske12">
                              <Image src={skel2} />
                            </div>
                            <div className="ske12">
                              <Image src={skel2} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="slek-card slek-card1">
                        <div className="flex">
                          <div className="mr-3">
                            <Image height={100} width={100} src={poly3} />
                          </div>
                          <div>
                            <div className="mb-3">
                              0xbd........5c50
                            </div>
                            <div className="ske11">
                              <Image src={skel1} />
                            </div>
                            <div className="ske12">
                              <Image src={skel2} />
                            </div>
                            <div className="ske12">
                              <Image src={skel2} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="slek-card">
                        <div className="flex">
                          <div className="mr-3">
                            <Image height={100} width={100} src={poly4} />
                          </div>
                          <div>
                            <div className="mb-3">
                              0xbd........5c50
                            </div>
                            <div className="ske11">
                              <Image src={skel1} />
                            </div>
                            <div className="ske12">
                              <Image src={skel2} />
                            </div>
                            <div className="ske12">
                              <Image src={skel2} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-14 w-1/3">
                  <p>
                    Log in now to view all your holdings and past transactions or use the search bar to view transaction details of any web3 wallet address.
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
