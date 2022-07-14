# TypeScript base info

**TypeScript** - однопоточный, компилируемый (в JavaScript), асинхронный язык со статической типизацией.

## Why do we need TypeScript?
* Using new features of ECMAScript
* Static Typing
* Type Inference
* Better IDE Support
* Strict Null Checking (Errors, like cannot read property ‘x’ of undefined)
* Interoperability


## The Benefits of using TypeScript are:
* TypeScript is fast, simple, easy to learn and runs on any browser or JavaScript engine.
* It is similar to JavaScript and uses the same syntax and semantics.
* This helps backend developers write front-end code faster.
* You can call the TypeScript code from an existing JavaScript code. Also, it works with existing JavaScript frameworks and libraries without any issues.
* The Definition file, with .d.ts extension, provides support for existing JavaScript libraries like Jquery, D3.js, etc.
* It includes features from ES6 and ES7 that can run in ES5-level JavaScript


## Type guard
A type guard is a TypeScript technique used to get information about the type of a variable, usually within a conditional block. 
Type guards are regular functions that return a boolean, taking a type and telling TypeScript if it can be narrowed down to something more specific. 
```typescript
// instanceof:
function isInstanceofSomeClass(someObject) {
  return someObject instanceof SomeClass;
}

// typeof:
function isString(someValue) {
  return typeof someValue === 'string'
}

// in:
function isPersomWithName(person) {
  return 'name' in person
}

// Equality narrowing type guard:
function isAString(a: number | string, b: string) {
  return a === b // a is equal to b -> narrowed to string
}

// Custom:
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```
