# Dependency used

## Translation:

- [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next) - General translation
- [gatsby-source-filesystem](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-filesystem) - used by gatsby-plugin-react-i18next to source translation files in `./locales`

## Scroll virtualization

- [react-virtualized](https://github.com/bvaughn/react-virtualized)

## Testing

### Unit

- [jest](https://github.com/jestjs/jest) + [testing-library](https://github.com/testing-library) 
- there are a few other dependencies linked to jest since we cannot reuse the gatsby ones (babel, identity-obj-proxy)

## End-to-end

- [playwright](https://github.com/microsoft/playwright)

---

# How to run this project locally

1. **Requirements**  

    Make sure to have these programs installed:
    - [node](https://nodejs.org/en) (v18 or above)
    - npm (v5.2 or above, is usually bundled with node)
    - [git](https://git-scm.com/downloads) (optional)  

2. **Clone this repo**  

    If you have git installed run 
    ```sh
    git clone https://github.com/mattiacoll/gatsby-pokedex.git
    ``` 
    or, **if you have SSH keys setup on github**
    ```sh
    git clone git@github.com:mattiacoll/gatsby-pokedex.git
    ```
    If you don't have git installed click on the green button "Code", then "Download zip".  
    After that extract the zip in your preferd folder.

3. **Navigate to the project and install the dependencies**  

    ```sh
    cd gatsby-pokedex
    npm ci
    npx playwright install --with-deps
    ```

4. **Development build**  
    If you want to create a development build run:

    ```sh
    npm run develop
    ```

    Wait untill you see the message

    ```sh
    You can now view gatsby-pokedex in the browser.

    http://localhost:8000/
    ```

    then open http://localhost:8000/ in your browser

5. **Production build**  
    If you want to create a production build, which can then be deployed on your server or any other platform run:

    ```sh
    npm run build
    ```

    Wait untill you see the message

    ``` 
    info Done building in X.X sec
    ```

    You'll find your files in the `./public` folder.  
    Keep in mind that you'll need a webserver to view your site, opening the `.html` might result in the site not working. 

6. **Running tests**

    You may want to run some automated tests to check the site functionality and accessibility.  

    To run unit tests:
    ```
    npm run test:unit
    ```
    To run end-to-end tests:
    ```sh
    npm run build # this step is needed only the first time or on subsequent site changes
    npm run test:e2e
    ```
    To run both unit and end-to-end tests:
    ```sh
    npm run build # this step is needed only the first time or on subsequent site changes
    npm run test
    ```

# Deployment

Currently this site is being built with github actions and deployed to https://truelayer.mttcls.com/ using github pages.  