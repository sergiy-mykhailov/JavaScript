# React.JS - Advanced Level

## 11. Redux
## 12. Flux pattern
## 13. Use reducers, actions, states, etc
## 14. Composition and Inheritance (pros and cons)
## 15. PureRenderMixin, PureComponent
## 16. react-addons-test-utils
## 17. React Hooks - [docs](https://reactjs.org/docs/hooks-reference.html)

Hooks only for function components! Do not use hooks in the react classes!

Use `eslint-plugin-react-hooks`!


### 17.1. useState - State Hook

`const [state, setState] = useState(initialState);` - add some local state to function component.

###### Params:
* `state` - current state value (similar to `this.state.value`)
* `setState` - function that updates the state (similar to `this.setState`)
* `initialState` - initial state or function that returns initial value

```jsx
// Lazy initial state:
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
// sets a new state:
setState(newState);
// or update state:
setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues};
});
```


### 17.2. useEffect - Effect Hook

```jsx
useEffect(function hookFunction() {
    // do something
    return function cleanupFunction() {
        // do some cleanup
    };
}), comparisonArray);
```
###### Params:
* `hookFunction` - function that runs after every render (similar to `componentDidMount` and `componentDidUpdate` and `componentWillUnmount`)
* `cleanupFunction` - cleanup function that runs after every re-render.
* `comparisonArray` - array with current state/props for comparison with previous state/props (similar to `shouldComponentUpdate`). 

### 17.3. useContext

`const value = useContext(ContextObject);` - lets you subscribe to React context without introducing nesting.

### 17.4. useReducer

`const [state, dispatch] = useReducer(reducer, initialState, init);` - lets you manage local state of complex components with a reducer.

###### Params:
* `func` - function that will be run after every render, including the first render.

### 17.5. Rules of Hooks

* Only call Hooks **at the top level**. Don’t call Hooks inside loops, conditions, or nested functions.
* Only call Hooks **from React function components**. Don’t call Hooks from regular JavaScript functions.

### 17.6. Custom Hooks

```jsx
import React, { useState, useEffect } from 'react';

function useSomeCustomHook(someParam) {
  const [value, setValue] = useState('some init value');
  useEffect(() => {
    // do something
    setValue(someParam);
    return () => {
      // cleanup function
    }
  }, [value]); // will re-run the effect if one of elements is different.
  return value;
}

function Component1(props) {
  const value = useSomeCustomHook(props.someProp);
  // do something with value
  return value;
}

function Component2(props) {
  const value = useSomeCustomHook(props.someOtherProp);
  // do something with value
  return value;
}
```
