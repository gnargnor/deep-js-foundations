# Deep JS Foundations
## Intro
* Read the specs - if you don't understand something, you have the ability to dig into what went into the decision to design something.
* In JS especially people have the tendency to develop their own mental model of how things work
* ^^ Birthplace of BUGZ -whenever there's a divergence between the brain and the computer.
## Three Pillars
* **Types**, **Scope**, **Objects**
## Types
_Why are we following rules such as only use === for equality?_
### Language types
* Declaring a type is defining what you expect from a value assigned to a variable
* **Primitive types**: undefined, boolean, string, symbol, number, and object
* **not**: undeclared, null, function, array
* **future?**: bigint
* Many of the more common non types are subtypes of objects
* Variables don't have types, values do -- value types
* typeof: what is the type of the value or the variable assigned to the varlue being checked
* typeof returns strings, not types
* typeof null returns "object", not "null", which is called a bug by Mr. Simpson
* typeof function(){}; returns "function", which is also weird.
* **undeclared** is a variable that hasn't been declared/there is no access to that variable in any scope
* **uninitialized** TDZ: temporal dead zone. within certain scopes, values can become uninitialized and trying to access them will throw a TDZ error
* **NaN** _not_ not a number, more like not a valid number
* 0 is not a placeholder for absence of numeric value
* NaN with any mathematical operation is NaN
* NaN is the only value in JS that doesn't have the identity property
* isNaN coerces values to numbers before it checks if it is NaN
* Number.isNaN() does not coerce the falue
* typeof NaN is number -- NaN is and invalid number, not _not a number_
* -1 is historically returned from queries that are invalid because C could only return numbers
* **Negative Zero**: weird implementation - -0 === 0 true, -0 > 0 false, -0 < 0 false
* Object.is(negativeZeroVariable, -0) is the best/only way to check for -0
* -0 example: number + sign  represents direction and velocity, -0 represents a directionality opposite of 0
### Fundamental Objects
_Built in Objects / Native Functions_
* Use new keyword: Object Array Function Date RegExp Error
* Don't use new keyword: String Number Boolean
* no date literals in JS, so the only way to create dates is the Date constructor
* Declaration: _Type conversion is coercion_
### Abstract Operations
* **ToPrimitive(hint)** - <hint> tells the constructor what you'd like it to coerce it into
* ToPrimitive is inherently recursive.  If what the constructor returns isn't primitive, it operates on itself again.
* ToPrimitive:
  * Number: valueOf(input) then isString(input)
  * String: itString(input) then valueOf(input)
* ToString
* ToString with arrays is odd because it serializes arrays without the brackets, ie ToString([1,2,3])
* You can override the ToString object -- overriding built ins ??
* ToString on objects returns "[object Object]" which is not really very helpful either
* ToNumber:
* ToNumber(0) becomes ""
* ToNumber:
  * false: 0
  * true: 1
  * null: 0 _(weirdness)_
  * undefined: NaN
* ToNumber on arrays is very weird, don't use it
* _empty strings are the root of all corecion evil_
* ToBoolean: Lookup on js truthy/falsiness
* Falsey:
  * ""
  * 0, -0
  * null
  * NaN
  * false
  * undefined
* ToBoolean checks whether the literal value is on the Falsey list; otherwise its TRUEEEEEEE
* "" is false, "  " is true
* while (number > 0) is better than while(!!{number}) for loop definitions
### Coercion
* People tend to claim they don't use coercion, but there are lot of instances where coercion is happening.
* If either operator in a + operation is a string, the result prefers a string.
  * ToString(lOperator) + ToString(rOperator)
* String() is the only way to explicitly coerce a number to string ( without coercion)
* if statements commonly use coercion
* boolean coercion on objects to figure out whether it is not undefined or null actually works pretty well! WOO.
* **Boxing**: using object methods on non objects.  JS implicitly coerces non objects to objects
* Boxing is where the idea of everything is an object comes from -- Implicitly coercing non objects to objects.
* All programming languages deal with conversions/coercions
* Every language has corner cases
* Root of all coercion evil: empty strings
* **Corner Cases**
* 3 > 2 > 1: Booleans implicitly coerce numbers to boolean so
  * (3 > 2) > 1
  * true > 1
  * 1 > 1
  * false
* Coding Style is declared to be essential to avoiding bugs with coding cases.
  * A quality JS program makes sure the types the program is dealing with are clear.
* _JavaScripts dynamic type system is one of the reasons it has had the staying power it does_
* Dumbing down your tool to the lowest common denominator is lazy (agreed)  Don't code to junior devs, teach them.
* Being clever is not being clear -- communicate effectively.
* Implicitness doesn't have to be magic or bad; instead it can be thought of as abstracted.
* Implicitness like coercion in JS hides unnecessary details in order to highlight the important content
* you can abstract out explicit type checking to keep the implicit usage BUG STRONG
* Consider whether the extra type details are distracting or helpful
  * **Useful** - when the reader focuses on what is important
  * **Dangerous** - when the reader doesn't understand what's important.
  * **Better** - when the reader understands the code
### Equality
_== vs ===_
* Its common to hear that == is loose equality and === is strict equality
* The first step in == is checking to see whether Type(x) and Type(y) are equal and then to return ===
* In any place where the value types already match, == is the same as ===
* Working with coercion depends on whether you're handling corner cases
* equality operators check identity equality -- objects defined by assigning the same structure to two differnt variables do not pass the equality check.
#### **==**
* null compared with undefined passes the double equality check -- you can safely use `thing == null` to check for empty values 
* double equality checks prefer coercing to Number values
* If == falls through the algorithm (both values are not numbers, booleans, or strings), ToPrimitive is called on both values and the algorithm is recursively run
* primitive coercion allows things like String('bloooooood') == 'bloooooood' to be true.
* Corner cases:
  * [] == ![] (You would never compare something to its negation)
  * != is the negation of coercive equation
  * == with boolean:  Don't do this.  Coercion doesn't play nicely with ToPrimitive and booleans, therefore coerced equality doesn't play nicely with ToPrimitive and booleans
* Avoid:
  * When either side can be a 0 or an empty string ("" or " ")
  * Don't use == with non primitives.
  * == true or == false:  allow ToBoolean or use the triple equality
* Case for == _by Kyle Simpson_
  * Knowing types is always better than not knowing them
  * (Static types is not the only way to know your types)
  * == is not about equality with unknown types
  * Therefore, using == forces you to think more about what types are getting to your coerced equality check
  * Useful when when coercion is helpful
  * === when you know the types is redundant
  * If you're comparing different types (when you know the types), == will always be faster since you'd have to account for multiple explicit cases with multiple === statements
#### ===
* When you cannot know the types:
  * If there isn't a way to know the types you're dealing with, use ===
  * If you don't know the types, communicate that to the dear reader (argued that === is the best way to communicate this, probably worth a comment)
### TypeScript, Flow, and other type aware linting
* This falls under the scope of style guide decisions
* Helpful for throwing errors in linting when you  pass the wrong types to functions
* type aware linting may add more cognitive complexity detriment than the benefit of preventing type issues
* github.com/niieani/typescript-vs-flowtype
* Both require a build process which raises the barrier to entry.
* Sophistication can be intimidating
### Typl
* github.com/getify/typl - written by Kyle Simpson
#### Motivations
* Only standard JS syntax
* Compiler component and runtime component, both optional.
* Completely configurable.  Complains by default, choose what is useful
* inferring or annotating value types rather than enforcing static typing
* Uses template tags (built in) instead of adding syntax
### Conclusion
* JS has a type system, it is dynamic and it uses value coercion in a way that is documented (although it has corner cases)
* Avoiding the type system by either using === or solving using TypeScript/Flow _kind of_ goes against JavaScript conventions.


## Scope
_What is the lexical scope pattern of JavaScript_
* All variables are either receiving a value or having a value retrieved from it.
* When the interpretter sees a variable:
  * What is the value of the variable?
  * Which scope does it belong in?
* Syntax errors are thrown before any code is executed because the code is parsed/processed/compiled before the code is run.
* Parsing produces a plan for the execution of code by lexically sorting all of the code.
* Buckets & Marbles: Units of Scope (functions & blocks) & Declarations (function declarations and variable declarations)
* Variables can be in source or target positions
  * **source**: variable access.  When a variable is being used as the source of retrieving the value it holds
  * **target**: variable assignment.  When the variable is the target of a value
* If a source variable cannot be found, the global scope creates an _auto global_
* Auto globals are javascripts way of being forgiving about the absence of variable declarations.
* In strict mode, auto globals are NOT created.
* You shouldn't use auto globals on purpose
* Type errors are when you try to do something on a source variable that isn't allowed
* Reference errors occur when a variable has not been assigned and the code is set in _strict mode_
* Strict mode is enabled automatically in ES6 modules and classes and is often added in a transpiling step.
* Parameters are formal declarations that create variables that belong to the scope of the function that requires it.
* Functions that are declared within a scope only get hoisted to the top of that scope.
* If a function declared within a scope is called outside of that scope, a reference error is thrown
* Undeclared occurs during the compilation time - a variable
* **Function Declaration**: Adds their identifier to the scope in which it is found
* **Function Expression**:  Adds their identifier into their own scope in a read only way (if the function is not an anonymous function)
  ```js
  var myFunc = function myFuncExpression() {
    console.log(myFuncExpression);
  }
  ```
* Kyle prefers named function expressions and encourages us to use them without exception
  * Creates a reliable function self reference (recursion, etc).  You can find out information about the function itself.
  * Anonymous functions are ambiguous within the stack trace if errors occur, but named function expressions will be identifiable
  * Naming your expressions helps with self documenting code.
* Naming your function expression the same as the variable you're assigning it to is a version of shadowing, but that is ok in many cases.
* Anonymous functions do not have lexical self references.
* Prefer function declarations with names
* If you're going to have a function expression, it would be helpful to have the function thats being assigned to the function expressions target named.
* Heirarchy of function types:
  * (Named) Function Declarations >
  * Named Function Expressions >
  * Anonymous Function Expressions
#### Lexical Scope
* The idea that scopes can be created and exist within each other and ultimately within a global scope.
* ES Levels will color your scope levels -- should be a version of that plugin for different ides
* Dynamic scope is scope that is determined at runtime - Javascript doesn't do this by default, but I'm assuming that is what _this_ is for.
* Lexical scope is determined at author time.
#### Function Scope
* Wrapping a process in a function protects the internal variables.
* **principle of least privilege**  Default to keeping things private and only expose the minimum amount of information.
  * prevents naming collisions
  * protects your variable from being used in higher scopes
  * protects refactoring and difficult to spot bugs
#### IIFE
* Immediately Invoked Function Expression
* Used when you need a scope and can get rid of it after the function has run
* IIFEs can be named or unnamed, but naming functions is always preferred.
* Using parens makes the function a function expression because thefunction keyword is no longer the first thing on the line.
* You can use an iife in the place of a function expression to assign a variable:
  ```js
  var dude = (function getDude() {
    try {
      return canThrowError()
    }
    catch {
      return 'default dude on error'
    }
  })();
  ```
#### Block Scoping
* Blocks are not scopes unless they have a let or a const instide of them.
* Use let when you need to make clear that the variable is block scoped
  ```js
  function diff(x, y) {
    if (x < y) {
      let tmp = x;
      x = y;
      y = tmp;
    }
    return y - x;
  }
  ```
* Use let when you're signaling that the variable should only exist within the scope its declared
* Let does allow you to pass the variable into new scopes, but var is arguably more clear.
* If you only need a variable for a few lines, it is advisable to use a block for scoping so the intention is clear that the variable only needs to exist within that block.
#### Const
* Better than let?
* Assumed to be signifying that the value stored within the variable is immutable
* Defined as a variable that cannot be reassigned
* In java, the _final_ keyword signifies that a variable is immutable.
  ```js
  const lilArray = ['this', 'that'];
  lilArray[1] = 'bugs'; // ['this', 'bugs']
  ```
* Like a nightlight - reassures a child that there be no dragons, but there be no dragons with or without.  Maybe even there be dragons either way.
* Use const only with immutable primitive values.
* API urls
* Object.freeze(mutableValue) - shallow immutability
### Hoisting
* This is a metaphor for what happens during parsing.
* Usually var hoisting is a bad idea.  Don't assign variables before they're declared.
* function hoisting can be useful for code readability
* let and const variables can be declared anywhere and will be hoisted, but unlike var, they don't get initialized.
* TDZ errors exist to prevent const from existing in two different states.  When const is hoisted and initialized, it would be undefined.
### Closure
* Scheme in the browser - JavaScript
* Perl at the time was the only language that was consumer driven and used closure
* Closure predated computer science in lambda calculus
* Scope is a prerequisite of Closure, Closure is a prerequisite for Modularization
* **Closure Definition** When a function remembers its lexical scope even when the function is executed outside that lexical scope
* You don't close over a value, you close over variables.  Whenever you access that variable, its value is whatever it is at the time.
* Watch out for closures within a for loop
  ```js
  for (var i = 1; i <3; i++) {
    setTimeout(function(){
      console.log(`i: ${i}`);
    }, i * 1000);
  }
  // i: 3, i: 3
  for (var i = 1; i <3; i++) {
    let j = i;
    setTimeout(function(){
      console.log(`i: ${i}`);
    }, j * 1000);
  }
  //j: 1, j: 2
  for (let i = 1; i <3; i++) {
    setTimeout(function(){
      console.log(`i: ${i}`);
    }, i * 1000);
  }
  // i: 1, i: 2
  ```
* `let` in a for loop creates a new instance of the variable inside each 
### Modules
* **namespace**: Taking a set of functions and data and putting them inside of an object
* namespaces are not modules because they don't use 
* **encapsulation** hiding data and behavior
* **module**:  Contains things that are public and things that are private.
* Modules encapsulate data and behavior together and 
```js
var workshop = (function Module(teacher) {
  var publicAPI = { ask, };
  return publicAPI;

  function ask(question) {
    console.log(teacher, question);
  }

})('kyle');

workshop.ask("Yo who am I?");
```
* A factory function uses the module pattern to create new instances of the module each time the function is called
  ```js
  function Module(teacher) {
    var publicAPI = { ask, };
    return publicAPI;

    function ask(question) {
      console.log(teacher, question);
    }

  }
  var workshopKyle = Module("Kyle");
  workshopKyle.ask("Where do babies come from?");
  // Kyle where do babies come from
  var workshopBilly = Module("Billy");
  workshopBilly.ask("What are babies made of?");
  // Billy what are babies made of?
  ```
* ES6 module pattern was implemented by tc39 before communicating with Node so currently you have to use transpiling to use modules within node.
```js
var teacher = "Kyle";

export default function ask(question) {
  console.log(teacher, question);
}
```
* ES6 modules can be thought of as having a function wrapper and all variables private by default
* Modules are compiled back to a single file before shipping.  You can just
* **importing**:
  ```js
  // default import, explicit import.
  import ask from "workshop.mjs";

  ask("Its a defaul import yeah yeah?");

  --------
  // namespace import
  import * as workshop from "workshop.mjs";

  workshop.ask("Its a namespace import, yes?")
  ```
* UMD - universal module definition
## Objects
### this
* **this** references the execution context for that call & is determined entirely by how that function was called.
* this aware functions can have a differnt context each time its called, which makes it very flexy bro.
* There are 4 ways to invoke a function, and each way answers what the this keyword is differently
  * Implicit Binding: When a function call is namespaced
    ```js
    function ask(question) {
        console.log(this.teacher, question)
      }

    var workshop1 = {
      teacher: "Kyle",
      ask: ask
    }
    var workshop2 = {
      teacher: "Billy",
      ask: ask
    }

    workshop1.ask("what up god");
    workshop2.ask("whats that smell");
  ```
  * Explicit binding: pass the context
    ```js
    ask.call(workshop1, "question??")

    ask.call(setTimeout())
    ```
  * New binding: invoking a function using the new keyword before the function call.
    ```js

    ```
  * default binding:  doesn't match implicit, explicit, or new.  In strict mode, this is kept undefined and you'll get a type error for calling it.
* new function does:
  * create a new empty object
  * the new keyword links that new object to another object
  * invokes the function with this keyword pointed at new object
  * if the function doesnt return an object, this is returned

* hard binding: when you use .bind to maintain the context of the function being called.
* this aware object methods must bind this when calling other methods within that object if that method is this aware.
* the .bind method tells the function being called that this is going to always refer to the context in which it is bound
  ```js
  setTimeout(workshop.ask, 10, "nobind");
  // this context will be lost
  setTimeout(workshop.ask.bind(workshop), 10, "yes bind")
  // this context will be bound to workshop
  ```
* This keyword binding precedence:
  * new
  * call or apply (also bind since it uses apply)
  * Is the function called on a context object? implicit
  * default

* Arrow functions & this
* lexical this behavior: this resolves lexically depending on the callsite
* many people think an arrow function hard binds the function to the parent function
```js
workshop = {
  teacher: "Billy",
  ask: setTimeout(() => console.log(this.teacher, question), 10)
}
```
* lexical this scope is definitely a place to use arrow functions
* To understand this in a function, look for the call site of that function and ask the four binding precedence questions
* If we want predictability, use the module pattern
* If you want flexibility, use this
### class {}
* essentially syntactic sugar on prototype creation
* using super to refer to a parent class is actually a new mechanism within js
* methods on classes lose their this context
* The lexical module pattern is preferrable when you want to define instance bound self references within class methods
### Prototypes
* Objects are created by constructor calls (via new)
* Objects are copies of a new class contructor call at the time the object is created
* A constructor call makes an object linked to its own prototype
* A linked object maintains a relationship to its prototype.
* Objects start from a fundamental function Object() {} which has a property/object, prototype
* Object points to prototype, prototype points to object with constructor
* When a function is declared, a property `prototype` pointing to an object that contains the functions prototype properties
* You can add properties directly to the proptotype object on a function.
* When you create a new SelfDefinedObject, an object is created that is linked to the functions proptotype object
* When you look for a property on an object and it doesn't exist, it looks at the function that created that objects prototype
* The created object's this refers to that objects context.
* The prototype chain can be thought of as mirroring the lexical scope chain.
* __proto__ exists as a Object.prototype getter, so its a function call internally.  This in that function call will refer to its caller, which is whatever object called it.  Therefore, this.prototype will refer to the calling object's this and return that objects this.prototype
* You can use __proto__ as a setter to relink a prototype chain to a different object.
* arrow functions do not have prototypes which is why they cannot be called with new
* The directionality of prototypal inheritance is the opposite of class inheritance
* Implementing classes in javascript is a super complicated set of gymnastics to attempt to recreate other languages class systems
* Javascript "Inheritance" is actually "Behavior Delegation"
### Inheritance vs Behavior Delegation (OO vs. OLOO)
* OO - Object Oriented -- OLOO - Objects Linked to Other Objects
```js
var Workshop {
  setTeacher(teacher) {
    this.teacher = teacher
  },
  ask(question) {
    console.log(this.teacher, question);
  }
};
var AnotherObject = Object.assign(
  Object.create(Workshop),
  {
    speakup(msg) {
      return this.ask(msg).toUppercase()
    }
  }
)
```
* With delegation, you stop thinking about parent child and start thinking about peer to peer relationships
* Delegation is a pretty clean form of composition
* Delegation also allows for clean mocking/testing
* There's a differntiation between not using something in JS and not learning it.  Sometimes we should learn and not use.