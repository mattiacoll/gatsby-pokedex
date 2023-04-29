// @ts-check
import React from 'react';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import { langSelect, langEl, langCurr } from './LangSelector.module.css';

const LangSelector = () => {

  const {
    language,
    languages,
    originalPath,
  } = useI18next();

  return (
    <nav className={ langSelect }>
      { languages.map( ( lng ) => (
        <Link
          className={`${ langEl } ${ lng === language ? langCurr : '' }`}
          to={ originalPath }
          language={ lng }
          key={ lng }
        >
          { lng }
        </Link>
      ))}
    </nav>
  )
}

export default LangSelector;