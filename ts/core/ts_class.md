# Class

```typescript
class Child extends Parent implements Child, OtherChild {
  property: Type;
  defaultProperty: Type = 'default value';
  private _privateProperty: Type;
  private readonly _privateReadonlyProperty: Type;
  static staticProperty: Type;
  
  constructor(arg1: Type) {
    super(arg1);
  }
  
  private _privateMethod(): Type {}
  methodProperty: (arg1: Type) => ReturnType

  overloadedMethod(arg1: Type): ReturnType {}
  overloadedMethod(arg1: OtherType): ReturnType {}
  overloadedMethod(arg1: CommonT): CommonReturnT {}

  static staticMethod(): ReturnType {}

  subclassedMethod(arg1: Type): ReturnType {
    super.subclassedMethod(arg1);
  }
}
```

