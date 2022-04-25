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


## useLayoutEffect

Идентичен useEffect, но этот хук запускается синхронно после всех изменений DOM. 
Используйте его для чтения макета из DOM и синхронного повторного рендеринга.


## useContext

`const value = useContext(ContextObject);` - lets you subscribe to React context without introducing nesting.


## useReducer

`const [state, dispatch] = useReducer(reducer, initialState, init);` - lets you manage local state of complex components with a reducer.

###### Params:
* `reducer` - (state, action) => newState
* `initialState` - any
* `init` - (initialArg) => initialState


## useCallback

```jsx
const memoizedCallback = useCallback(() => {}, comparisonArray); // Возвращает мемоизированный колбэк.
```
вернёт мемоизированную версию колбэка, который изменяется только, если изменяются значения одной из зависимостей.


## useMemo

```jsx
const memoizedValue  = useMemo(() => {}, comparisonArray); // Возвращает мемоизированное значение.
```
будет повторно вычислять мемоизированное значение только тогда, когда значение какой-либо из зависимостей изменилось.
функция, переданная useMemo, запускается во время рендеринга.


## useRef

```jsx
const refContainer = useRef(initialValue);
return <input ref={refContainer} type="text" />
```
возвращает изменяемый ref-объект, свойство .current которого инициализируется переданным аргументом (initialValue)


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


## useSelector()
```tsx
const result = useSelector(selector, equality)
```
###### Params:
selector (Function) - `(state) => state.someData` (equivalent to the `mapStateToProps` argument to connect)
equality (Function) - optional comparison function (can be `shallowEqual` from  react-redux, or `isEqual` from lodash or Immutable.js's comparison capabilities).
result (any) - value from store

```jsx
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
// usage:
const todos = useSelector((state) => state.todos)
// usage with reselect:
const completedTodosSelector = createSelector(
  (state) => state.todos,
  (todos) => todos.filter((todo) => todo.completed).length
)
const numCompletedTodos = useSelector(completedTodosSelector)
```


## useDispatch()
Returns a reference to the dispatch function from the Redux store.
```jsx
const dispatch = useDispatch()
```


## useStore()
Returns a reference to the same Redux store that was passed in to the `<Provider>` component.
```jsx
const store = useStore()
```
