// @ts-check
import React from 'react';
import { graphql } from 'gatsby';
import Layout, { LayoutHead } from '../components/Layout';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { homeH1, homeSearch, homeTop } from './index.module.css';

const NotFoundPage = () => {

  const { t } = useTranslation();

  return (
    <Layout nolang={ true }>

      <div className={ homeTop }>

        <h1 className={ homeH1 }>
          { t( '404.title' ) }
        </h1>

        <p className={ homeSearch }>
          { t( '404.body' ) }
        </p>

        <Link to="/">
          { t( '404.home' ) }
        </Link>

      </div>

    </Layout>
  );
};

export const Head = () => {

  return (
    <>
      <title>404</title>
      <LayoutHead/>
    </>
  );

};

export const query = graphql`
  query {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default NotFoundPage;