import Image from "next/image";
import React, { Fragment, useState } from "react";
import { useAccount, useConnect } from 'wagmi';
import toast from 'react-hot-toast';
import { selectUserState, setUserState } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { IKImage, IKUpload } from "imagekitio-react";
import axios from "axios";

const UploadAvatar = ({setShowPopup}) => {
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
    const { address } = useAccount();
    const dispatch = useDispatch();
    const userState = useSelector(selectUserState);
    const [data, setData] = useState({});
    const onSuccess = (data) => {
        setData(data);
    }

    const handleSubmit = () => {
        if (Object.keys(data).length) {
            axios
                .post(`/api/users/profilepic`, { ...data, id: address })
                .then((res) => {
                    dispatch(setUserState({
                        ...res.data
                    }));
                    setShowPopup(false)
                    toast(`updated successfully`);
                })
                .catch(({ request: { responseText } }) => toast({ type: "error", message: `${JSON.parse(responseText).message}` }));
        }
    }

    const onError = (err) => {
        console.log(err)
    }
    return (
        <div tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center bg-gray-600 bg-opacity-50">
            <div className="relative p-4 w-full max-w-[90%] lg:max-w-[40%] h-full md:h-auto">
                <div className="relative bg-white rounded-3xl shadow dark:bg-gray-700 py-2 px-2 lg:py-6 lg:px-8 dialog-box modal-content upload-avatar">
                    <div className="absolute">
                        <div className="max-lg:hidden">Current Avatar</div>
                        <div className="hexagon preview-profile">
                            <IKImage path={userState?.profilePic?.filePath ? userState.profilePic.filePath : '/profile-picture-default_.jpg'} alt="" loading="lazy" lqip={{ active: true }} className="relative w-100 mb-3" />
                        </div>
                    </div>
                    <label htmlFor="upload">
                        <div className="text-center">
                            <div>Upload Avatar</div>
                            <div className="hexagon upload-icon">
                                <Image src={`/images/upload-icon.svg`} alt='' width={88} height={74}/>
                            </div>
                        </div>
                        <IKUpload id="upload" accept="image/*" onSuccess={onSuccess} onError={onError} className="hidden"/>
                    </label>
                    <div className="justify-center flex gap-5">
                        <button type="button" className="cancel-btn" onClick={()=>setShowPopup(false)}>Cancel</button>
                        <button type="button" className="save-btn" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadAvatar;
