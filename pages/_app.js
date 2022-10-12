import { useEffect } from 'react'
import '../styles/globals.scss'
import { wrapper } from "../store";
import { selectThemeState } from '../store/themeSlice';
import { useSelector } from 'react-redux';

function MyApp({ Component, pageProps }) {
  const themeState = useSelector(selectThemeState);
  useEffect(()=>{
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [themeState]);

  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
