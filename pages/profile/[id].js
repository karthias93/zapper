import Image from 'next/image';
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import ProfileComponent from "../../components/Profile";
import Background from '../../components/Background';

export default function Profile() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content w-full">
        <Background />
        <div className="container m-auto px-16">
          <div className="welcome-page">
            <Header page="Profile" />
            <ProfileComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
