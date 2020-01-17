# Showoff App

## Description
A simple VueJS project that interacts with a rest api that has user management and CRUD capabilities.

## Link to App
https://niall-roche-showoff-app.herokuapp.com/#/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### .env file
There is an example.env file. Rename this to .env and add the client id and client secret

### Notes
The fact that this is a SPA means the client id and client secret are stored in the browser.
A potential improvement to the project would be to have an express router that makes the calls to the REST api and serves back the response to the browser. This would mean the client id and secret could be stored as an environment varianble on the server and it would never be available from the browser.

### Resources

https://vuejs.org/v2/guide/

https://vuejs.org/v2/cookbook/adding-instance-properties.html

https://scotch.io/tutorials/handling-authentication-in-vue-using-vuex

https://bootstrap-vue.js.org/

https://eslint.org/

https://vuejsdevelopers.com/2019/01/22/vue-what-is-next-tick/

https://dev.to/teroauralinna/global-http-request-and-response-handling-with-the-axios-interceptor-30ae

https://sequelize.org/v5/identifiers.html

https://stackoverflow.com/questions/52737078/how-can-you-use-axios-interceptors

https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards

https://github.com/bootstrap-vue/bootstrap-vue/issues/3934

https://github.com/charliekassel/vuejs-datepicker

https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da

https://blog.sqreen.com/authentication-best-practices-vue/
