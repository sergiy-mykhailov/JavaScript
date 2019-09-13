# React.JS - Advanced Level

## 18. ReactDOMServer
## 19. isomorphic Application
## 20. ReactCSSTransitionGroup
## 21. React Native
## 22. GraphQL

## How to optimize a React app?
##### You should ask the following questions:
* Describe the application
  * How big is this app?
  * What does the app do?
  * Which version of react it's running?
* What kinds of performance issue?
  * What do you mean by bad performance?
  * What exactly do you want to optimize?
  * Is it slow?
  * Is it crashing?
  * The bundle size is big?
  
##### What you need:
* Profiling your app ([Node.js profiling](https://nodejs.org/uk/docs/guides/simple-profiling/))
* Find unnecessary re-renders
* Use React.lazy (bundle size)
* Check for immutability
* Check api requests
* Check assets (CDN's)
* Check type of components (function or class)
* Check methods (function or arrow function)
