# React.JS - Top 50 React Interview Questions

## 1. Differentiate between Real DOM and Virtual DOM.
Real DOM            | Virtual  DOM 
:------------------|:-----------
1. It updates slow.	|1. It updates faster.
2. Can directly update HTML.|2. Can’t directly update HTML.
3. Creates a new DOM if element updates.|3. Updates the JSX if element updates.
4. DOM manipulation is very expensive.|4. DOM manipulation is very easy.
5. Too much of memory wastage.|5. No memory wastage.

## 2. What is React?
* React is a front-end JavaScript library developed by Facebook in 2011.
* It follows the component based approach which helps in building reusable UI components.
* It is used for developing complex and interactive web and mobile UI.

## 3. What are the features of React? 
* It uses the virtual DOM instead of the real DOM.
* It uses server-side rendering.
* It follows uni-directional data flow or data binding.

## 4. List some of the major advantages of React.
* It increases the application’s performance
* It can be conveniently used on the client as well as server side
* Because of JSX, code’s readability increases
* React is easy to integrate with other frameworks like Meteor, Angular, etc
* Using React, writing UI test cases become extremely easy

## 5. What are the limitations of React?
* React is just a library, not a full-blown framework
* Its library is very large and takes time to understand
* It can be little difficult for the novice programmers to understand
* Coding gets complex as it uses inline templating and JSX

## 6. What is JSX?
This is a type of file that combines JavaScript with HTML-like template syntax.

## 7. What do you understand by Virtual DOM? Explain its working.
A virtual DOM is a lightweight JavaScript object which originally is just the copy of the real DOM.

This Virtual DOM works in three simple steps:
1. Whenever any underlying data changes, the entire UI is re-rendered in Virtual DOM representation.
2. Then the difference between the previous DOM representation and the new one is calculated.
3. Once the calculations are done, the real DOM will be updated with only the things that have actually changed.

## 8. Why can’t browsers read JSX?
Browsers can only read JavaScript objects but JSX in not a regular JavaScript object.
First, we need to transform JSX file into a JavaScript object using JSX transformers like Babel.

## 9. How different is React’s ES6 syntax when compared to ES5?
ES6 added:
* `import React from 'react';`
* `export default Component;`
*  classes
* props
* state
* arrow functions

## 10. How is React different from Angular?
TOPIC	          |   REACT               |   ANGULAR
:-----------------|:----------------------|:-----------
1. ARCHITECTURE	  |Only the View of MVC	  |Complete MVC
2. RENDERING	  |Server-side rendering  |Client-side rendering
3. DOM	          |Uses virtual DOM	      |Uses real DOM
4. DATA BINDING	  |One-way data binding	  |Two-way data binding
5. DEBUGGING	  |Compile time debugging |Runtime debugging
6. AUTHOR	      |Facebook	              |Google

## 11. What do you understand from “In React, everything is a component.”
Components are the building blocks of a React application’s UI. These components split up the entire UI into small independent and reusable pieces. Then it renders each of these components independent of each other without affecting the rest of the UI.

## 12. Explain the purpose of render() in React.
Method returns a single React element which is the representation of the native DOM component. 

## 13. How can you embed two or more components into one?
Wrap your component with another component

## 14. What is Props?
Props are read-only properties that must be kept pure i.e. immutable.
They are always passed down from the parent to the child components throughout the application, and are never pass back.









