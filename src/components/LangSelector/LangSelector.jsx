// @ts-check
import React from 'react';
import { Link } from 'gatsby-plugin-react-i18next';
import { langSelect, langEl, langCurr } from './LangSelector.module.css';

const LangSelector = ({
  language,
  languages = [],
  originalPath = '/',
}) => {

  return (
    <nav className={ langSelect }>
      { languages.map( ( lng ) => (
        <Link
          className={`${ langEl } ${ lng === language ? langCurr : '' }`}
          to={ originalPath }
          language={ lng }
          key={ lng }
          data-testid="lng"
        >
          { lng }
        </Link>
      ))}
    </nav>
  )
}

export default LangSelector;