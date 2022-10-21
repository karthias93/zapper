import { selectThemeState, setThemeState } from "../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Welcome from "../components/Welcome";
import { Fragment, useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import Router from 'next/router';
import Background from "../components/Background";
import UploadAvatar from "../components/UploadAvatar";
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from "axios";
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import { selectUserState } from "../store/userSlice";
import { IKImage } from "imagekitio-react";

export default function Settings() {
  const { address, connector, isConnected } = useAccount();
  const [ showPopup, setShowPopup ] = useState(false);
  const [ usernameEdit, setUsernameEdit ] = useState(false);
  const [ firstnameEdit, setFirstnameEdit ] = useState(false);
  const [ phoneEdit, setPhoneEdit ] = useState(false);
  const [ emailEdit, setEmailEdit ] = useState(false);
  const [ secondnameEdit, setSecondnameEdit ] = useState(false);
  const userState = useSelector(selectUserState);
  const [inputs, setInputs] = useState({});

  useEffect(()=>{
    if (!isConnected) Router.push(`/`);
  }, [isConnected, address]);
  useEffect(()=>{
    setInputs({
        username: userState.username,
        firstname: userState.firstname,
        phone: userState.phone,
        email: userState.email,
        secondname: userState.secondname,
    })
  }, [userState])

  const updateDetails = () => {
    axios.patch(`/api/users/${address}`, {...inputs})
        .then(res=>{
            toast('Updated Successfully')
        })
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
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
                            <InputField 
                                label="Username:"
                                isEdit={usernameEdit}
                                handleChange={handleChange}
                                inputs={inputs}
                                updateDetails={updateDetails}
                                setIsEdit={setUsernameEdit}
                                name="username"
                            />
                            <InputField 
                                label="First Name:"
                                isEdit={firstnameEdit}
                                handleChange={handleChange}
                                inputs={inputs}
                                updateDetails={updateDetails}
                                setIsEdit={setFirstnameEdit}
                                name="firstname"
                            />
                            <InputField 
                                label="Phone Number:"
                                isEdit={phoneEdit}
                                handleChange={handleChange}
                                inputs={inputs}
                                updateDetails={updateDetails}
                                setIsEdit={setPhoneEdit}
                                name="phone"
                            />
                        </div>
                        <div>
                            <InputField 
                                label="Email :"
                                isEdit={emailEdit}
                                handleChange={handleChange}
                                inputs={inputs}
                                updateDetails={updateDetails}
                                setIsEdit={setEmailEdit}
                                name="email"
                            />
                            <InputField 
                                label="Second Name :"
                                isEdit={secondnameEdit}
                                handleChange={handleChange}
                                inputs={inputs}
                                updateDetails={updateDetails}
                                setIsEdit={setSecondnameEdit}
                                name="secondname"
                            />
                        </div>
                        <div>
                            <div className="hexagon hexagon-settings">
                                <IKImage path={userState?.profilePic?.filePath ? userState.profilePic.filePath : '/profile-picture-default.jpg'} alt="" loading="lazy" lqip={{ active: true }} className="relative w-100 mb-3"/>
                            </div>
                            <div className="text-center cursor-pointer" onClick={()=>setShowPopup(true)}>(Edit)</div>
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
      {showPopup && <UploadAvatar setShowPopup={setShowPopup} />}
    </div>
  )
}
