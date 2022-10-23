import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SupportModal = ({setShowPopup}) => {
    const [inputs, setInputs] = useState({});
    const handleSubmit = () => {
        axios.post(`/api/support`, {...inputs})
            .then(()=>{
                setShowPopup(false);
                toast('we have received your request. our support team will get back to you')
            })
        
    }
    const handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    return (
        <div tabIndex="-1" aria-hidden="true" className="h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center bg-gray-600 bg-opacity-50">
            <div className="relative p-4 w-full max-w-[90%] lg:max-w-[40%] h-full md:h-auto">
                <div className="relative bg-white rounded-3xl shadow dark:bg-gray-700 dialog-box modal-content">
                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                            <form action="#" className="space-y-8" onSubmit={handleSubmit}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                    <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="example@gmail.com" required onChange={handleChange}/>
                                </div>
                                <div>
                                    <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                                    <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" onChange={handleChange} required />
                                </div>
                                <div className="sm:col-span-2">
                                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                                    <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." onChange={handleChange}></textarea>
                                </div>
                                <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-r from-[#FEAA02] to-[#E15310] sm:w-fit hover:bg-gradient-to-r from-[#FEAA02] to-[#E15310] focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-gradient-to-r from-[#FEAA02] to-[#E15310] dark:hover:bg-gradient-to-r from-[#FEAA02] to-[#E15310] dark:focus:ring-primary-800">Send message</button>
                                <button type="submit" className="ml-3 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-red sm:w-fit hover:bg-red focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-red dark:hover:bg-red dark:focus:ring-primary-800" onClick={()=>setShowPopup(false)}>Close</button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default SupportModal;
