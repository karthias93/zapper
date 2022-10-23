import React, { Fragment } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const InputField = ({label, isEdit, handleChange, inputs, setIsEdit, updateDetails, name}) => {
    return (
        <div className="mb-5">
            <div className="text-sm font-normal">
                {label}
            </div>
            <div className="flex items-baseline">
                {isEdit ?
                    (
                        <Fragment>
                            <input type="text" name={name} id={name} class="mt-2 mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} value={inputs[name]}/>
                            <div className="flex gap-3 cursor-pointer">
                                <FaCheck fill={'green'} onClick={()=>{updateDetails();setIsEdit(false)}}/>
                                <FaTimes fill={'red'} onClick={()=>setIsEdit(false)}/>
                            </div>
                        </Fragment>
                    ) : 
                    (
                        <Fragment>
                            <div className="font-semibold text-lg lg:text-2xl mr-2">{inputs[name]}</div>
                            <div className="font-semibold text-xs cursor-pointer" onClick={()=>setIsEdit(true)}>(Edit)</div>
                        </Fragment>
                    )
                }
                
            </div>
        </div>
    )
}

export default InputField;
