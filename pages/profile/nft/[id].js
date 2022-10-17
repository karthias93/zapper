import Image from 'next/image';
import Sidebar from "../../../components/layout/Sidebar";
import Header from "../../../components/layout/Header";
import ProfileComponent from "../../../components/Profile";
import BgRound1 from "../../../public/images/bg-round1.svg";
import BgRound2 from "../../../public/images/bg-round2.svg";
import BgRound3 from "../../../public/images/bg-round3.svg";

export default function Profile() {
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
            <Header page="Profile" />
            <ProfileComponent page='nft' />
          </div>
        </div>
      </div>
    </div>
  )
}
