import Image from "next/image";
import React, { Fragment } from "react";
import { useConnect } from 'wagmi';

const UploadAvatar = ({setShowPopup}) => {
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
    return (
        <div tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center bg-gray-600 bg-opacity-50">
            <div className="relative p-4 w-full max-w-[40%] h-full md:h-auto">
                <div className="relative bg-white rounded-3xl shadow dark:bg-gray-700 py-6 px-8 dialog-box modal-content upload-avatar">
                    <div className="absolute">
                        <div>Current Avatar</div>
                        <div className="hexagon preview-profile">
                            <Image src={`/images/default-avatar.jpeg`} alt='' width={185} height={209} />
                        </div>
                    </div>
                    <label htmlFor="upload">
                        <div className="text-center">
                            <div>Upload Avatar</div>
                            <div className="hexagon upload-icon">
                                <Image src={`/images/upload-icon.svg`} alt='' width={88} height={74}/>
                            </div>
                        </div>
                        <input type="file" id="upload" className="hidden"/>
                    </label>
                    <div className="justify-center flex gap-5">
                        <button type="button" className="cancel-btn" onClick={()=>setShowPopup(false)}>Cancel</button>
                        <button type="button" className="save-btn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadAvatar;
