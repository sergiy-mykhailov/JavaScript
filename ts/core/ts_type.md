# Types
***

## Primitive types

| Description                                                  | Type        |
|:-------------------------------------------------------------|:------------|
| Any type (explicitly untyped)                                | `any`       |
| void type (undefined or null, use for function returns only) | `void`      |
| Undefined type                                               | `undefined` |
| Null type                                                    | `null`      |
| never type                                                   | `never`     |
| unknown type                                                 | `unknown`   |
| String (including ES6 multi-line string templates)           | `string`    |
| Number                                                       | `number`    |
| Boolean                                                      | `boolean`   |
| object (may be an Object or non-primitive)                   | `object`    |

## Object type literals

### Object with implicit Any properties
```typescript
{ foo; bar; }
```

### Object with optional property
```typescript
type ObjectOptional = { required: Type; optional?: Type; }
```

### Hash map
```typescript
type HashMap = { [key: string]: Type; }
```


## Union and intersection types

### Union type
```typescript
let myUnionVariable: number | string;
```

### Intersection type
```typescript
let myIntersectionType: Foo & Bar;
```


## Arrays and tuples
### Array of strings
```typescript
type ArrayType = {
  array1: string[]
  array2: Array<string>
}
```

### Array of functions that return strings
```typescript
type ArrayOfFunctions = { (): string; }[]
type ArrayOfFunctions = Array<() => string>
```

### Tuples
```typescript
let myTuple: [ string, number, boolean? ];
myTuple = [ 'test', 42 ];
```


## Functions

### Function 	
```typescript
type FuncType = { (arg1: Type, argN: Type): Type; }
type FuncType = (arg1: Type, argN: Type) => Type;
 ```

### Constructor 
```typescript
type ConstructorFunction = { new (): ConstructedType; }
type ConstructorFunction = new () => ConstructedType;
```

### Function type with optional param
```typescript
(arg1: Type, optional?: Type) => ReturnType
```

### Function type with rest param
```typescript
(arg1: Type, ...allOtherArgs: Type[]) => ReturnType
```

### Function type with static property 
```typescript
type FuncType = { (): Type; staticProp: Type; }
```

### Default argument 
```typescript
function fn(arg1: Type = 'default'): ReturnType {}
```

### Arrow function 
```typescript
(arg1: Type): ReturnType => {}
(arg1: Type): ReturnType => Expression
```

### this typing 
```typescript
function fn(this: Foo) {}
```


## Partial and mapped types
### Partial type
```typescript
type PartialType = Partial<{ x: number; y: number; z: number; }>
// is equivalent to
type PartialType = { x?: number; y?: number; z?: number; }
```

### Readonly type
```typescript
type SomeType = Readonly<{ x: number; y: number; z: number; }>
// is equivalent to
type SomeType = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}
```

### Pick type
```typescript
type SomeType = Pick<{ x: number; y: number; z: number; }, 'x' | 'y'>
// is equivalent to
type SomeType = { x: number; y: number; }
```

### Record type
```typescript
type SomeType = Record<'x' | 'y' | 'z', number>
// is equivalent to
type SomeType = { x: number; y: number; z: number; }
```

### Mapped type
```typescript
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// eual to:
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// }
```

## Conditional types
### Conditional types
```typescript
declare function createLabel<T extends number | string>(idOrName: T): T extends number ? Id : Name;
```

### Exclude
```typescript
type Excluded = Exclude<string | number, string>;
// is equivelant to
number
```

### Extract
```typescript
type Extracted = Extract<string | number, string>;
// is equivelant to
string
```

### NonNullable
```typescript
type NonNull = NonNullable<string | number | void>;
// is equivalent to
string | number
```

### ReturnType
```typescript
type ReturnValue = ReturnType<() => string>;
// is equivalent to
string
```

### InstanceType
```typescript
class Renderer {}
type Instance = InstanceType<typeof Renderer>;
// is equivalent to
Renderer
```
