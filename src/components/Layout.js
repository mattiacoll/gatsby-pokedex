// @ts-check
import React from 'react';
import LangSelector from './LangSelector/LangSelector';
import { useI18next } from 'gatsby-plugin-react-i18next';
import './Layout.css';

const Layout = ({ children, nolang = false }) => {

  const {
    language,
    languages,
    originalPath,
  } = useI18next();

  return (
    <div id="wrapper">
      <header>{
        nolang ? '' :
          <LangSelector 
            language={ language }
            languages={ languages }
            originalPath={ originalPath }
          />
      }
      </header>
      <main>
        { children }
      </main>
    </div>
  )

};


export default Layout;

export const LayoutHead = () => {
  const {
    language,
  } = useI18next();

  return (
    <>
      <html lang={ language } />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
    </>
  );
};