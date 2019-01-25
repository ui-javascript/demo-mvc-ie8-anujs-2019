### KeystoneJS-KnockoutJS Boilerplate

###### Comes with a component system to build modular elements using KnockoutJS component process

---

### Usage

    npm install
    gulp

> make sure your mongo process is running

> make sure you have setup the .env file (template provided .env-template)

### Requirements

- NodeJS
- MongoDB

### Features
 
- **gulp**

    gulp default task that...

    - starts the KeystoneJS app
    - watches KeystoneJS app files and restarts the KeystoneJS app whenever a file changes
    - watches `public/styles` and compiles sass on file change
    - watches `public/js` and compiles a `bundle.js` file using webpack

- **webpack**

    webpack is called by the gulp task using `webpack.config.js` to compile one static `bundle.js` file

- **sass**

    **gulp-sass** compiles `public/styles/scss` directory to one `public/styles/site.css` file

- **bootstrap**

    bootstrap 4 (beta) is included and is ready to go with any custom component by using `import 'bootstrap'`

- **knockout**

    KnockoutJS is included and is used to register components for simple modular development. No need for a .jsx editor or learning the beast that is Angular2 (I do like Angular but it is a discipline in itself)