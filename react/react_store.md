# Store


## Data flow

### Three Principles
- Single source of truth - The global state of your application is stored in an object tree within a single store.
- State is read-only - The only way to change the state is to emit an action, an object describing what happened.
- Changes are made with pure functions - To specify how the state tree is transformed by actions, you write pure reducers.

### React app parts:
- **state** - the source of truth that drives our app;
- **view** - a declarative description of the UI based on the current state
- **actions** - the events that occur in the app based on user input, and trigger updates in the state

### "one-way data flow": state -> view -> action
- **State** describes the condition of the app at a specific point in time
- The UI (**view**) is rendered based on that state
- When some **action** happens (such as a user clicking a button), the state is updated based on what occurred
- The UI re-renders based on the new state


## createStore

### Info
```jsx
const store = createStore(reducer, [preloadedState], [enhancer])
```
###### Params:
- **reducer** (Function) - A reducing function `(state, action) => newState`
- **preloadedState** (any) - The initial state.
- **enhancer** (Function) - The store enhancer (third-party capabilities such as middleware, time travel, persistence, etc.)

### Tips:
- Don't create more than one store in an application!
- Redux state is normally plain JS objects and arrays.
- Never mutate state!
- Immutable updates (create new object): `return { ...state, ...newData }`

### Example
```jsx
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
// ...other import...
const store = createStore(rootReducer)
return(
  <Provider store={store}>
    <App />
  </Provider>
)
```


## Store

### Info
A store holds the whole state tree of your application.

### Methods

#### getState()
`const state = store.getState()`
Returns the current state tree of your application

#### dispatch(action)
Dispatches an action.
The store's reducing function will be called with the current state and action object.
```jsx
store.dispatch({ type: 'SOME_TYPE', ...additionalData }) // type - required field!
```
if you wrap `createStore` with `applyMiddleware` the middleware can provide support for dispatching async actions.
```jsx
function asyncAction(data) {
  return { type: 'ADD_TODO', data }
}
store.dispatch(asyncAction('Read the docs'))
```

#### subscribe(listener)
Adds a change listener. 
It will be called any time an action is dispatched, and some part of the state tree may potentially have changed.
```jsx
let currentValue
function listener() {
  let previousValue = currentValue
  currentValue = store.getState()
  //...
}
const unsubscribe = store.subscribe(listener)
unsubscribe() // A function that unsubscribes the change listener.
```
###### Params:
- **listener** (Function) - The callback, you may call `dispatch()` and `getState()` here

#### replaceReducer(nextReducer)
You might need this if your app implements code splitting (example, React.lazy), and you want to load some of the reducers dynamically.
```jsx
replaceReducer(nextReducer)
```
###### Params
- **nextReducer** (Function) - The next reducer for the store to use.

### Example
```jsx
import { createStore } from 'redux'
function reducer(state = {}, action) {
  if (action.type === 'SOME_TYPE') {
    return { ...state, ...action.newData }
  }
  return state
}
const store = createStore(reducer, { initial: 'data' })
store.dispatch({ type: 'SOME_TYPE', newData: 'newData' })
console.log(store.getState()) // { initial: 'data', newData: 'newData' }
```


## reducer

A **reducer** (also called a **reducing function**) is a function that accepts an accumulation and a value and returns a new accumulation.

Redux is using immutability because it doesn't have to traverse an object tree to check for the changes in every key value. 
Instead, it will only check the object's reference is changed or not in order to update DOM on state change.

```jsx
const initialState = { someProp: 'someValue' }
const reducer = (state, action) => {
  if (action.type = 'SOME_ACTION_TYPE') {    // action.type - required field!
    return { ...state, newProp: 'newValue' } // allways return new object!
  }
  return state
}
```


## combineReducers(reducers)

Split different reducers into one reducer.
You may call combineReducers at any level of the reducer hierarchy.
You may use it again to split the child reducers.
```jsx
const potatoReducer = (potatoState, action) => newPotatoState
const tomatoReducer = (tomatoState, action) => newTomatoState
rootReducer = combineReducers({ potato: potatoReducer, tomato: tomatoReducer })
// This would produce the following state object:
{
  potato: {}
  tomato: {}
}
```


## applyMiddleware(...middlewares)

### Info
Middleware lets you wrap the store's `dispatch` method.
Multiple middleware can be combined together.

```jsx
const enhancer = applyMiddleware(...middlewares)
```
###### Params:
- **middlewares** (Function[]) -  `({ getState, dispatch }) => next => action => dispatchValue`
- **enhancer** (Function) -  store enhancer

### Example
```jsx
const reducer = (state, action) => newState
function middlware1({ getState, dispatch }) {
  return next => action => {
    //...
    const returnValue = next(action)
    //...
    return returnValue
  }
}
function middlware2({ getState, dispatch }) { /*...*/}
const store = createStore(reducer, ['Use Redux'], applyMiddleware(middlware1, middlware2))
```


## bindActionCreators(actionCreators, dispatch)

### Info
```jsx
const actions = bindActionCreators(actionCreators, dispatch)
```
###### Params:
- actionCreators (Function | Object): An action creator, or an object whose values are action creators.
- dispatch (Function): A dispatch function available on the Store instance.

### Example
```jsx
const actionCreators = {
  addTodo: (text) => ({ type: 'ADD_TODO', text }),
  removeTodo: (id) => ({ type: 'REMOVE_TODO', id })
}
const actions = bindActionCreators(actionCreators, dispatch) // dispatch from redux store
return <TodoList {...actions} />
```


## compose(...functions)

Composes functions from right to left.
Each function is expected to accept a single parameter. Its return value will be provided as an argument to the next function.
```jsx
const composedFunction = compose(...functions)
```
###### Params:
- **functions** (Function[]) - The functions to compose: `(value) => newValue`
- **composedFunction** (Function) - The final function obtained by composing the given functions from right to left.


## connect()

### Info
Connects a React component to a Redux store.
Returns a new, connected component class that wraps the component you passed in.

```jsx
const WrappedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)
```
###### Params (all optional):
- **mapStateToProps** (Function) - `(state, ownProps?) => Object` - gets state from store
- **mapDispatchToProps** (Function | Object) - `Object | (dispatch, ownProps?) => Object` - returns actions
- **mergeProps** (Function) - `(stateProps, dispatchProps, ownProps) => Object`
- **options** (Object)

### mapStateToProps
```jsx
const mapStateToProps = (state, ownProps) => ({ todos: state.todos[ownProps.id], })
```
###### Params:
- **state** (Object) - current state
- **ownProps** (Object) -  wrapper components props

### mapDispatchToProps
```jsx
const mapDispatchToProps = (dispatch, ownProps) => ({
  reset: (someId) => dispatch({ type: 'RESET', data: someId }),
})
// inside the component:
return <button onClick={() => this.props.reset(this.props.someId)} />
```
###### Params:
- **dispatch** (Function) - dispatch function of your store
- **ownProps** (Object) - wrapper components props

### mergeProps
Defines how the final props for your own wrapped component are determined.
Default: `{ ...ownProps, ...stateProps, ...dispatchProps }`

```jsx
const mergeProps = (stateProps, dispatchProps, ownProps) => newMergedProps
```
###### Params:
- stateProps (Object)
- dispatchProps (Object)
- ownProps (Object)

### options
Options object
###### Params
- context (Object) - You need to pass the instance of your context to both `<Provider />` and your connected component (>= v6.0).
- areStatesEqual (Function) - `(next: Object, prev: Object) => boolean` - default: strictEqual - `(next, prev) => prev === next`
- areOwnPropsEqual (Function) - `(next: Object, prev: Object) => boolean` - default: shallowEqual - returns true when each field of the objects is equal
- areStatePropsEqual (Function) - `(next: Object, prev: Object) => boolean` - default: shallowEqual - Compares the result of `mapStateToProps` to its previous value
- areMergedPropsEqual (Function)  - `(next: Object, prev: Object) => boolean` - default: shallowEqual - Compares the result of `mergeProps` to its previous value.
- forwardRef (boolean) - if true will return the instance of the wrapped component (>= v6.0).


## batch()
React-Redux v7.0.0
If you're using **React 18, you do not need to use the batch API**. 
React 18 automatically batches all state updates, no matter where they're queued.

```jsx
import { batch } from 'react-redux'
function myThunk() {
  return (dispatch, getState) => {
    // should only result in one combined re-render, not two
    batch(() => {
      dispatch(increment())
      dispatch(increment())
    })
  }
}
```


## createSelector

```
createSelector(...inputSelectors | [inputSelectors], resultFunc, selectorOptions?)
```

```jsx
import { createSelector } from 'reselect'
const customizedSelector = createSelector(
  state => state.a,
  state => state.b,
  (a, b) => a + b,
  {
    memoizeOptions: { // New in 4.1: Pass options through to the built-in `defaultMemoize` function
      equalityCheck: (a, b) => a === b,
      maxSize: 10,
      resultEqualityCheck: shallowEqual
    }
  }
)
```


## redux-saga

### createSagaMiddleware(options)
```jsx
const sagaMiddleware = createSagaMiddleware({ context, sagaMonitor, onError, effectMiddlewares })
```
###### Params:
- context (Object) - initial value of the saga's context.
- sagaMonitor (SagaMonitor) - the middleware will deliver monitoring events to the monitor.
- onError (Function) `(error: Error, { sagaStack: string }) => {}`
- effectMiddlewares (Function[]) - allows you to intercept any effect, resolve it on your own and pass to the next middleware.

### middleware.run
```jsx
middleware.run(saga, ...args)
```
- saga (Function): a Generator function
- args (Array<any>): arguments to be provided to saga

### Example
```jsx
import { call, put, takeLatest } from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '...'
import Api from '...'
// saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}
// some other saga:
function* fetchTodo(action) {/*...*/}
// main saga:
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest("TODO_FETCH_REQUESTED", fetchTodo);
}
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
// then run the saga
sagaMiddleware.run(mySaga)
// render the application
```

### saga effects
- `call(fn, ...args)` - calls the function `fn` with `args` as arguments.
- `put(action)` - dispatches an action to the store
- `takeLatest(pattern, saga, ...args)` - when an action is dispatched to the store, cheks if this action matches pattern, then starts a new saga task in the background.


## redux-thunk

"thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's `dispatch` and `getState` methods.
```jsx
export const fetchTodoById = todoId => async (dispatch, getState) => {
  const response = await client.get(/* some api */)
  dispatch(todosLoaded(response.todos))
}
function Component({ todoId }) {
  const dispatch = useDispatch()
  const onFetchClicked = () => {
    // Calls the thunk action creator, and passes the thunk function to dispatch
    dispatch(fetchTodoById(todoId))
  }
}
```


## Redux-Thunk vs Redux-Saga
|                  Redux-Thunk                  |                                                   Redux-Saga                                                    |
|:---------------------------------------------:|:---------------------------------------------------------------------------------------------------------------:|
|             Less boilerplate code             |                                              More boilerplate code                                              |
| Easy to understand as compared to redux-saga  | Difficult to understand as there are multiple concepts to learn like generator functions and redux-saga effects |
|         May be difficult to scale up          |                                    Easy to scale as compared to redux-thunk                                     |
| Action creators may hold too much async logic |                                            Action creators stay pure                                            |
|           May get difficult to test           |                       Comparatively easy to test as all your async logic remains together                       |

