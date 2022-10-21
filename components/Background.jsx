import React from "react";
import BgRound1 from '../public/images/bg-round1.svg';
import BgRound2 from '../public/images/bg-round2.svg';
import BgRound3 from '../public/images/bg-round3.svg';
import BgDarkRound1 from '../public/images/bg-dark-round1.svg';
import BgDarkRound2 from '../public/images/bg-dark-round2.svg';
import BgDarkRound3 from '../public/images/bg-dark-round3.svg';
import { useSelector } from 'react-redux';
import { selectThemeState } from '../store/themeSlice';

const Background = () => {
    const themeState = useSelector(selectThemeState);
    return (
        <div className="main-bg">
          <div className='BgRound1 w-1/2 dark:bg-[#4b4b4b]'>
            {themeState==='dark' ? <BgDarkRound1 /> : <BgRound1 />}
          </div>
          <div className='BgRound2 w-1/2 dark:bg-[#4b4b4b]'>
            {themeState==='dark' ? <BgDarkRound2 /> : <BgRound2 />}
          </div>
          <div className='BgRound3 w-1/2 dark:bg-[#4b4b4b]'>
            {themeState==='dark' ? <BgDarkRound3 /> : <BgRound3 />}
          </div>
        </div>
    )
}

export default Background;
