// @ts-check
import React from 'react';
import LangSelector from './LangSelector';
import { useI18next } from 'gatsby-plugin-react-i18next';
import './Layout.css';

const Layout = ({ children }) => {

  const {
    language,
    languages,
    originalPath,
  } = useI18next();

  return (
    <div id="wrapper">
      <header>
        <LangSelector 
          language={ language }
          languages={ languages }
          originalPath={ originalPath }
        />
      </header>
      <main>
        { children }
      </main>
    </div>
  )

};


export default Layout;

export const LayoutHead = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
    </>
  );
};