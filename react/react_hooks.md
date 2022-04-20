# React Hooks

[docs](https://reactjs.org/docs/hooks-reference.html)

## Rules of Hooks

* Hooks only for function components!
* Do not use hooks in the react classes!
* Only call Hooks **at the top level**. Don’t call Hooks inside loops, conditions, or nested functions.
* Only call Hooks **from React function components**. Don’t call Hooks from regular JavaScript functions.
* Use `eslint-plugin-react-hooks`!


## useState - State Hook

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


## useEffect - Effect Hook

```jsx
useEffect(function hookFunction() {
    // do something
    return function cleanupFunction() {
        // do some cleanup
    };
}, comparisonArray);
```
###### Params:
* `hookFunction` - function that runs after every render (similar to `componentDidMount` and `componentDidUpdate` and `componentWillUnmount`)
* `cleanupFunction` - cleanup function that runs after every re-render.
* `comparisonArray` - array with current state/props for comparison with previous state/props (similar to `shouldComponentUpdate`).


## useContext

`const value = useContext(ContextObject);` - lets you subscribe to React context without introducing nesting.


## useReducer

`const [state, dispatch] = useReducer(reducer, initialState, init);` - lets you manage local state of complex components with a reducer.

###### Params:
* `func` - function that will be run after every render, including the first render.


## Custom Hooks

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