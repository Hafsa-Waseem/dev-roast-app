
'use client';

import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Terminal, Lightbulb, CheckCircle2, XCircle, ThumbsUp, ThumbsDown, ArrowLeft, Code, Pilcrow, FileCode, Type, Braces, BrainCircuit, Bot, Database, Wind, Gem, Package, Bird, CodeSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const quizData = {
  'JavaScript': {
    icon: (props: any) => <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>JavaScript</title><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.82-2.22-2.123-3.345-.81-.675-1.636-1.26-2.437-1.785.12-.135.255-.27.39-.42.63-.705.945-1.425.945-2.16 0-.75-.33-1.44-.99-2.07-.645-.63-1.44-.945-2.385-.945-1.02 0-1.86.345-2.52 1.035-.66.69-.99 1.515-.99 2.475 0 1.035.33 1.89.99 2.565.66.675 1.515 1.012 2.565 1.012.705 0 1.32-.165 1.845-.495.24-.15.465-.345.675-.585.525.465 1.11.99 1.755 1.575.81.675 1.635 1.26 2.475 1.755.255.15.51.285.765.405.09.045.18.06.27.06.24 0 .465-.09.66-.27.195-.18.285-.405.285-.675 0-.195-.06-.39-.18-.585zm-9.015-3.525c-.27-.285-.405-.63-.405-1.035 0-.42.135-.78.405-1.08.27-.3.615-.45 1.035-.45.42 0 .78.15 1.08.45.3.3.45.66.45 1.08 0 .405-.15.75-.45 1.035-.3.285-.66.435-1.08.435-.42 0-.765-.15-1.035-.435zM4.78 18.284c-.18-1.095-.824-2.22-2.128-3.344-.81-.676-1.637-1.26-2.437-1.786.12-.134.255-.27.39-.42.63-.705.945-1.425.945-2.16 0-.75-.33-1.44-.99-2.07-.645-.63-1.44-.945-2.385-.945-1.02 0-1.86.345-2.52 1.035-.66.69-.99 1.515-.99 2.475 0 1.035.33 1.89.99 2.565.66.675 1.514 1.013 2.564 1.013.706 0 1.32-.165 1.846-.495.24-.15.465-.345.675-.585.525.465 1.11.99 1.755 1.575.81.675 1.635 1.26 2.475 1.755.255.15.51.285.765.405.09.045.18.06.27.06.24 0 .465-.09.66-.27.195-.18.285-.405.285-.675 0-.195-.06-.39-.18-.585zM1.96 14.76c-.27-.284-.405-.63-.405-1.036 0-.42.135-.78.405-1.08.27-.3.615-.45 1.035-.45.42 0 .78.15 1.08.45.3.3.45.66.45 1.08 0 .405-.15.75-.45 1.035-.3.285-.66.436-1.08.436-.42 0-.765-.15-1.035-.435z" fill="currentColor"/></svg>,
    description: "Test your knowledge of JavaScript's tricky parts and weird behaviors.",
    questions: [
        {
            question: "What will `console.log(typeof null)` output?",
            code: "console.log(typeof null);",
            options: ["'null'", "'object'", "'undefined'", "'function'"],
            answer: "'object'",
            explanation: "This is a long-standing bug in JavaScript. The `typeof null` returns 'object', which is incorrect but maintained for historical reasons."
        },
        {
            question: "What is the output of this code?",
            code: "console.log(0.1 + 0.2 === 0.3);",
            options: ["true", "false", "undefined", "TypeError"],
            answer: "false",
            explanation: "JavaScript uses floating-point numbers, which can't represent all decimals with perfect precision. `0.1 + 0.2` results in a value slightly different from `0.3`."
        },
        {
            question: "What will this code output?",
            code: "console.log('5' + 3);",
            options: ["8", "'53'", "NaN", "TypeError"],
            answer: "'53'",
            explanation: "The `+` operator, when used with a string and a number, performs string concatenation. It converts the number `3` to a string and joins it with '5'."
        },
        {
            question: "What will `[] + {}` evaluate to?",
            code: "console.log([] + {});",
            options: ["'[]{}'", "'[object Object]'", "0", "TypeError"],
            answer: "'[object Object]'",
            explanation: "When using the `+` operator, JavaScript's type coercion rules are applied. The empty array `[]` is converted to an empty string `''`. The empty object `{}` is converted to the string `'[object Object]'`. The result is the concatenation of these two strings."
        }
    ]
  },
  'Python': {
    icon: (props: any) => <Pilcrow {...props} />,
    description: "How well do you know Python's syntax and standard library quirks?",
    questions: [
      {
        question: "What is the output of `print('hello'[-1])`?",
        code: "print('hello'[-1])",
        options: ["'h'", "'o'", "IndexError", "'l'"],
        answer: "'o'",
        explanation: "Python supports negative indexing for sequences. `-1` refers to the last element, `-2` to the second last, and so on."
      },
      {
        question: "What will be the value of `my_list` after this code runs?",
        code: "my_list = [1, 2, 3]\nmy_list.append([4, 5])",
        options: ["[1, 2, 3, [4, 5]]", "[1, 2, 3, 4, 5]", "TypeError", "[1, 2, 3, 4]"],
        answer: "[1, 2, 3, [4, 5]]",
        explanation: "The `append()` method adds its argument as a single element to the end of a list. The list `[4, 5]` is added as one nested element."
      },
      {
        question: "What does `print(type(lambda: None))` output?",
        code: "print(type(lambda: None))",
        options: ["<class 'function'>", "<class 'lambda'>", "<class 'NoneType'>", "SyntaxError"],
        answer: "<class 'function'>",
        explanation: "Lambda expressions in Python create anonymous functions. Their type is simply 'function', just like functions defined with `def`."
      }
    ]
  },
  'HTML': {
    icon: (props: any) => <FileCode {...props} />,
    description: "Challenge your understanding of HTML tags, attributes, and semantics.",
    questions: [
      {
        question: "Which of these tags is a 'void' element (cannot have content)?",
        code: "1. <div>\n2. <p>\n3. <br>\n4. <span>",
        options: ["<div>", "<span>", "<br>", "<p>"],
        answer: "<br>",
        explanation: "Void elements in HTML are elements that cannot have any child nodes (i.e., nested elements or text). `<br>`, `<img>`, `<hr>`, and `<input>` are common examples."
      },
      {
        question: "What is the purpose of the `<datalist>` tag?",
        code: "<label for='browser'>Choose:</label>\n<input list='browsers' name='browser' id='browser'>\n<datalist id='browsers'>...</datalist>",
        options: ["To create a dropdown list", "To style a list of data", "To provide autocomplete options for an <input>", "To define a list of commands"],
        answer: "To provide autocomplete options for an <input>",
        explanation: "The `<datalist>` element contains a set of `<option>` elements that represent predefined options for an `<input>` element. It creates an autocomplete feature."
      },
      {
        question: "Which attribute is used to make an input field required?",
        code: "<input type='text' ...>",
        options: ["validate", "mandatory", "required", "important"],
        answer: "required",
        explanation: "The `required` boolean attribute specifies that the user must fill in a value before submitting a form."
      }
    ]
  },
  'CSS': {
    icon: (props: any) => <Wind {...props} />,
    description: "Flexbox, Grid, and the cascade. Test your styling prowess.",
    questions: [
        {
            question: "What is the specificity of this selector: `#nav .item[href]`?",
            code: "#nav .item[href] {}",
            options: ["111", "121", "022", "112"],
            answer: "111",
            explanation: "Specificity is calculated as (ID, Class/Attribute, Type). #nav contributes 100 (ID), .item contributes 10 (Class), and [href] contributes 1 (Attribute). So, 100 + 10 + 1 = 111."
        },
        {
            question: "Which property is used to create space *between* grid or flex items?",
            code: "display: grid; ...",
            options: ["margin", "padding", "gap", "space-between"],
            answer: "gap",
            explanation: "`gap` (or `grid-gap`/`row-gap`/`column-gap`) is the modern property for setting the space between items, replacing older methods like using margins on items themselves."
        },
        {
            question: "How do you select an `<a>` tag that has an `href` attribute containing 'example.com'?",
            code: "a[href...]",
            options: ["a[href='example.com']", "a[href*='example.com']", "a[href~='example.com']", "a[href^='example']"],
            answer: "a[href*='example.com']",
            explanation: "The `*=` attribute selector selects elements whose attribute value *contains* a specified substring. It's a powerful way to style links to specific domains."
        }
    ]
  },
  'TypeScript': {
    icon: (props: any) => <Type {...props} />,
    description: "How well do you know your types, interfaces, and generics?",
    questions: [
        {
            question: "What's the difference between `interface` and `type`?",
            code: "interface A {}\ntype B = {}",
            options: ["Interfaces can be merged, types cannot", "Types can use unions, interfaces cannot", "They are exactly the same", "Interfaces are for objects, types are for primitives"],
            answer: "Interfaces can be merged, types cannot",
            explanation: "Declaration merging is a key feature of interfaces. If you define the same interface twice, TypeScript merges them. `type` aliases cannot be redeclared."
        },
        {
            question: "What does the `never` type represent?",
            code: "function error(message: string): never { throw new Error(message); }",
            options: ["A function that returns nothing", "A value that can be null or undefined", "A value that will never occur", "An empty object type"],
            answer: "A value that will never occur",
            explanation: "The `never` type is used for values that should never exist. This is often the return type of functions that always throw an error or have an infinite loop."
        },
        {
            question: "What is the `keyof` operator used for?",
            code: "type Point = { x: number; y: number };\ntype P = keyof Point;",
            options: ["To get the values of an object's keys", "To create a union of an object's keys", "To check if a key exists on an object", "To get the type of a specific key"],
            answer: "To create a union of an object's keys",
            explanation: "`keyof` takes an object type and produces a string or numeric literal union of its keys. In this example, `P` would be equivalent to `'x' | 'y'`."
        }
    ]
  },
  'React': {
    icon: (props: any) => <CodeSquare {...props} />,
    description: "Hooks, components, and state management. Are you a React pro?",
    questions: [
        {
            question: "When does a component re-render in React?",
            code: "function MyComponent() { ... }",
            options: ["Only when its props change", "Only when its state changes", "When its state or props change", "On every function call"],
            answer: "When its state or props change",
            explanation: "A re-render is triggered whenever a component's state changes (via `useState` or `useReducer`) or when it receives new props from its parent."
        },
        {
            question: "What is the purpose of the `key` prop in a list?",
            code: "items.map(item => <li key={item.id}>{item.name}</li>)",
            options: ["It is used for styling", "It's a unique identifier for the element in the DOM", "It helps React identify which items have changed", "It is passed as a prop to the component"],
            answer: "It helps React identify which items have changed",
            explanation: "`key` helps React's diffing algorithm efficiently update the UI. By providing a stable identity for each item, React can track additions, removals, and re-orders."
        },
        {
            question: "What is the correct way to update state based on previous state?",
            code: "setCount(...)",
            options: ["setCount(count + 1)", "setCount(prev => prev + 1)", "this.setState({ count: count + 1 })", "count++"],
            answer: "setCount(prev => prev + 1)",
            explanation: "Using the functional update form `(prev => ...)` ensures you are working with the most up-to-date state value, which is crucial for avoiding race conditions."
        }
    ]
  },
  'Node.js': {
    icon: (props: any) => <Bot {...props} />,
    description: "Event loops, streams, and modules. Test your backend JS knowledge.",
    questions: [
      {
        question: "What is the event loop in Node.js?",
        code: "// ...",
        options: ["A loop that iterates over events", "A mechanism for handling asynchronous operations", "A way to manage multiple threads", "A data structure for storing events"],
        answer: "A mechanism for handling asynchronous operations",
        explanation: "The event loop allows Node.js to perform non-blocking I/O operations, despite JavaScript being single-threaded, by offloading operations and running callbacks when they complete."
      },
      {
        question: "What is the difference between `require` and `import`?",
        code: "const fs = require('fs');\nimport path from 'path';",
        options: ["`require` is synchronous, `import` is asynchronous", "`require` is for CommonJS, `import` is for ES Modules", "They are interchangeable", "`import` can only be used at the top level"],
        answer: "`require` is for CommonJS, `import` is for ES Modules",
        explanation: "`require` is the traditional way to import modules in Node.js (CommonJS). `import` is the standard for ES Modules, offering features like static analysis and tree shaking."
      },
      {
        question: "Which of these is NOT a core module in Node.js?",
        code: "// ...",
        options: ["fs", "http", "path", "express"],
        answer: "express",
        explanation: "`fs`, `http`, and `path` are all built-in core modules. `express` is a very popular third-party framework that must be installed from npm."
      }
    ]
  },
  'SQL': {
    icon: (props: any) => <Database {...props} />,
    description: "JOINS, GROUP BY, and subqueries. How strong are your database skills?",
    questions: [
      {
        question: "Which JOIN returns all rows from the left table and matched rows from the right?",
        code: "SELECT * FROM A ... JOIN B",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        answer: "LEFT JOIN",
        explanation: "A `LEFT JOIN` (or `LEFT OUTER JOIN`) returns all records from the left table, and the matched records from the right table. The result is NULL from the right side if there is no match."
      },
      {
        question: "What is the purpose of the `GROUP BY` clause?",
        code: "SELECT COUNT(id), country FROM users ...",
        options: ["To sort the result set", "To filter records", "To aggregate rows that have the same values", "To join multiple tables"],
        answer: "To aggregate rows that have the same values",
        explanation: "The `GROUP BY` statement groups rows that have the same values in specified columns into summary rows, like 'find the number of customers in each country'."
      },
      {
        question: "How do you select all columns from a table named `users`?",
        code: "SELECT ... FROM users",
        options: ["SELECT all", "SELECT columns(*)", "SELECT *", "SELECT all()"],
        answer: "SELECT *",
        explanation: "The asterisk `*` is a wildcard character in SQL that represents all columns in the specified table."
      }
    ]
  },
  'Java': {
    icon: (props: any) => <BrainCircuit {...props} />,
    description: "JVM, objects, and verbosity. How well do you know this enterprise giant?",
    questions: [
      {
        question: "What is the difference between `==` and `.equals()` for objects?",
        code: "String a = new String(\"hi\");\nString b = new String(\"hi\");",
        options: ["They are the same", "`==` compares values, `.equals()` compares references", "`==` compares references, `.equals()` compares values", "`.equals()` is faster"],
        answer: "`==` compares references, `.equals()` compares values",
        explanation: "In Java, `==` checks if two object references point to the exact same memory location. The `.equals()` method is meant to be overridden to compare the actual content/values of the objects."
      },
      {
        question: "Is Java pass-by-value or pass-by-reference?",
        code: "void myFunc(MyObject obj) { ... }",
        options: ["Pass-by-reference", "Pass-by-value", "Both", "It depends on the object"],
        answer: "Pass-by-value",
        explanation: "Java is strictly pass-by-value. When you pass an object, you are passing a copy of the reference value (the memory address), not the actual object or a reference to the reference itself."
      },
      {
        question: "Which of these is a checked exception?",
        code: "// ...",
        options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "IOException", "IllegalArgumentException"],
        answer: "IOException",
        explanation: "Checked exceptions are exceptions that are checked at compile-time (e.g., `IOException`). Unchecked exceptions (like `NullPointerException`) are runtime exceptions."
      }
    ]
  },
  'C#': {
    icon: (props: any) => <Type {...props} />,
    description: ".NET, LINQ, and Microsoft's powerhouse language.",
    questions: [
      {
        question: "What is LINQ?",
        code: "var names = from c in customers select c.Name;",
        options: ["A database", "A language for UI", "A query language integrated into C#", "A web framework"],
        answer: "A query language integrated into C#",
        explanation: "LINQ (Language-Integrated Query) provides a powerful, SQL-like way to query data from collections, databases, XML, and more, directly within C# code."
      },
      {
        question: "What is the difference between `string` and `String`?",
        code: "string a = \"...\";\nString b = \"...\";",
        options: ["`string` is a primitive, `String` is an object", "They are aliases for the same type", "`String` is from a different library", "There is no difference"],
        answer: "They are aliases for the same type",
        explanation: "`string` is an alias in C# for `System.String`. They are compiled to the same type, so there is no technical difference, but `string` is the idiomatic convention in C#."
      },
      {
        question: "What does the `async` keyword do in a method signature?",
        code: "public async Task MyMethod() { ... }",
        options: ["It makes the method run on a separate thread", "It makes the method return a Task", "It enables the use of `await` inside the method", "It makes the method run faster"],
        answer: "It enables the use of `await` inside the method",
        explanation: "The `async` modifier enables the method to use the `await` keyword for asynchronous operations. It doesn't run the method on a new thread but allows it to yield control back to the caller."
      }
    ]
  },
  'C++': {
    icon: (props: any) => <Braces {...props} />,
    description: "Pointers, memory management, and high performance.",
    questions: [
      {
        question: "What is the primary purpose of a pointer?",
        code: "int* ptr;",
        options: ["To store a large number", "To store a memory address", "To create a constant variable", "To store a character"],
        answer: "To store a memory address",
        explanation: "A pointer is a variable that stores the memory address of another variable. This allows for direct memory manipulation, dynamic memory allocation, and efficient data structures."
      },
      {
        question: "What is the difference between `new` and `malloc`?",
        code: "int* p1 = new int;\nint* p2 = (int*)malloc(sizeof(int));",
        options: ["`new` is a keyword, `malloc` is a function", "`new` calls constructors, `malloc` does not", "They are the same", "Both A and B are correct"],
        answer: "Both A and B are correct",
        explanation: "`new` is a C++ operator that not only allocates memory but also calls the object's constructor. `malloc` is a C library function that only allocates raw, uninitialized memory."
      },
      {
        question: "What does RAII stand for?",
        code: "// Resource Acquisition Is Initialization",
        options: ["Resource Allocation and Instance Invocation", "Resource Acquisition Is Initialization", "Runtime-Allocated Instance Information", "Realtime Asynchronous I/O"],
        answer: "Resource Acquisition Is Initialization",
        explanation: "RAII is a core C++ concept where a resource's lifetime is tied to an object's lifetime. The resource is acquired in the constructor and released in the destructor, preventing memory leaks."
      }
    ]
  },
  'Ruby': {
    icon: (props: any) => <Gem {...props} />,
    description: "Metaprogramming, Rails, and developer happiness.",
    questions: [
      {
        question: "In Ruby, everything is a(n) ____?",
        code: "1.class # => Integer",
        options: ["method", "block", "object", "variable"],
        answer: "object",
        explanation: "One of Ruby's core philosophies is that everything, from numbers to `nil`, is an object with its own methods and properties."
      },
      {
        question: "What is the difference between a `Proc` and a `lambda`?",
        code: "p = Proc.new { return 1 }\nl = lambda { return 1 }",
        options: ["They are the same", "Lambdas check arity, Procs do not", "Procs return from the enclosing method", "Both B and C are correct"],
        answer: "Both B and C are correct",
        explanation: "Lambdas behave more like methods: they strictly check the number of arguments (arity) and a `return` inside them returns from the lambda itself. Procs are more flexible with arguments, and a `return` inside a Proc will return from the method where the Proc was defined."
      },
      {
        question: "What does `||=` do?",
        code: "x ||= 10",
        options: ["A logical OR operation", "A bitwise OR assignment", "Assigns the value only if the variable is nil or false", "It's a syntax error"],
        answer: "Assigns the value only if the variable is nil or false",
        explanation: "The conditional assignment operator `||=` assigns the value on the right to the variable on the left only if the variable is currently `nil` or `false`."
      }
    ]
  },
  'Go': {
    icon: (props: any) => <BrainCircuit {...props} />,
    description: "Concurrency, simplicity, and Google's backend language.",
    questions: [
      {
        question: "How does Go handle concurrency?",
        code: "go myFunc()",
        options: ["With threads", "With async/await", "With goroutines and channels", "With callbacks"],
        answer: "With goroutines and channels",
        explanation: "Go uses goroutines, which are lightweight threads managed by the Go runtime, and channels for communication between them. This is a core feature of the language."
      },
      {
        question: "What is the `defer` keyword used for?",
        code: "defer file.Close()",
        options: ["To delay execution of a function", "To schedule a function call until the surrounding function returns", "To define a default value", "To handle errors"],
        answer: "To schedule a function call until the surrounding function returns",
        explanation: "A `defer` statement defers the execution of a function until the surrounding function completes. It's commonly used for cleanup tasks like closing files or releasing resources."
      },
      {
        question: "Does Go have classes?",
        code: "type Circle struct { ... }",
        options: ["Yes, using the `class` keyword", "No, it uses structs and methods", "Yes, but they are called objects", "No, it is a functional language"],
        answer: "No, it uses structs and methods",
        explanation: "Go does not have classes in the traditional OOP sense. Instead, it uses structs to hold data and allows you to define methods on those structs to achieve similar behavior."
      }
    ]
  },
  'Rust': {
    icon: (props: any) => <Package {...props} />,
    description: "Memory safety, performance, and the borrow checker.",
    questions: [
      {
        question: "What is the primary goal of the borrow checker?",
        code: "let r1 = &s;\nlet r2 = &mut s; // Error!",
        options: ["To check for syntax errors", "To manage the heap", "To enforce memory safety without a garbage collector", "To optimize code"],
        answer: "To enforce memory safety without a garbage collector",
        explanation: "The borrow checker is Rust's key feature. It analyzes how variables are 'borrowed' (referenced) to prevent data races and other memory-related bugs at compile time."
      },
      {
        question: "What is the difference between `String` and `&str`?",
        code: "let s1: String = String::from(\"hi\");\nlet s2: &str = \"hi\";",
        options: ["They are the same", "`String` is heap-allocated and growable, `&str` is a fixed-size string slice", "`&str` is mutable, `String` is not", "`String` is faster"],
        answer: "`String` is heap-allocated and growable, `&str` is a fixed-size string slice",
        explanation: "`String` is an owned, heap-allocated string buffer, while `&str` (a string slice) is a view into a string, often a string literal, and has a fixed size known at compile time."
      },
      {
        question: "Which keyword is used for pattern matching?",
        code: "// ...",
        options: ["switch", "if/else", "match", "case"],
        answer: "match",
        explanation: "Rust uses the powerful `match` keyword for pattern matching, which is like a `switch` statement on steroids. It requires all possible cases to be handled, ensuring exhaustive checks."
      }
    ]
  },
  'Swift': {
    icon: (props: any) => <Bird {...props} />,
    description: "iOS development, safety, and modern syntax.",
    questions: [
      {
        question: "What does 'optional chaining' (`?`) do?",
        code: "let name = person?.name",
        options: ["It makes a property required", "It safely accesses a property that might be nil", "It unwraps an optional forcefully", "It creates a new optional"],
        answer: "It safely accesses a property that might be nil",
        explanation: "Optional chaining allows you to query properties, methods, and subscripts on an optional that might currently be `nil`. If the optional is `nil`, the expression gracefully returns `nil` instead of crashing."
      },
      {
        question: "What is the difference between a `struct` and a `class`?",
        code: "struct Point {}\nclass Person {}",
        options: ["Structs are value types, classes are reference types", "Classes can have methods, structs cannot", "Structs are older syntax", "There is no difference"],
        answer: "Structs are value types, classes are reference types",
        explanation: "This is a fundamental concept in Swift. Structs are copied when they are passed around (value types), while classes share a single instance (reference types). Apple recommends preferring structs by default."
      },
      {
        question: "Which keyword is used to handle errors in Swift?",
        code: "do { ... } catch { ... }",
        options: ["try/except", "if/err", "do/catch", "result/error"],
        answer: "do/catch",
        explanation: "Swift has a formal error handling model using `do-catch` blocks to handle errors thrown by functions marked with the `throws` keyword."
      }
    ]
  },
  'Kotlin': {
    icon: (props: any) => <CodeSquare {...props} />,
    description: "Android development, null safety, and JVM interoperability.",
    questions: [
      {
        question: "What is the primary advantage of Kotlin's null safety?",
        code: "var a: String? = null",
        options: ["It makes code faster", "It eliminates NullPointerExceptions at compile time", "It allows all variables to be null", "It's just for documentation"],
        answer: "It eliminates NullPointerExceptions at compile time",
        explanation: "Kotlin's type system distinguishes between nullable and non-nullable references. The compiler forces you to handle potential `null` values, drastically reducing the infamous `NullPointerException`."
      },
      {
        question: "What are data classes used for?",
        code: "data class User(val name: String, val age: Int)",
        options: ["For storing raw data from files", "To automatically generate standard methods like `equals()`, `hashCode()`, `toString()`", "For database entities only", "To create a class with no methods"],
        answer: "To automatically generate standard methods like `equals()`, `hashCode()`, `toString()`",
        explanation: "Data classes are a concise way to create classes that exist mainly to hold data. The compiler automatically derives useful methods from the properties declared in the primary constructor."
      },
      {
        question: "What is the equivalent of a static method in Kotlin?",
        code: "// ...",
        options: ["A function inside a `companion object`", "A function with the `static` keyword", "A top-level function", "An extension function"],
        answer: "A function inside a `companion object`",
        explanation: "Kotlin does not have a `static` keyword. To create methods that can be called on a class without an instance, you place them inside a `companion object` block."
      }
    ]
  },
  'PHP': {
    icon: (props: any) => <FileCode {...props} />,
    description: "Web development, WordPress, and the language that powers much of the web.",
    questions: [
      {
        question: "How do you denote a variable in PHP?",
        code: "// ...",
        options: ["With `var`", "With `let`", "With `$`", "With `@`"],
        answer: "With `$`",
        explanation: "All variables in PHP are denoted with a leading dollar sign (`$`), for example: `$name = 'Hafsa';`."
      },
      {
        question: "What is the difference between `==` and `===`?",
        code: "if ('5' ... 5)",
        options: ["They are the same", "`==` is for numbers, `===` is for strings", "`==` compares values after type juggling, `===` compares value and type", "`===` is faster"],
        answer: "`==` compares values after type juggling, `===` compares value and type",
        explanation: "The `==` (equal) operator will convert types to match before comparison (e.g., '5' == 5 is true). The `===` (identical) operator checks that both the value and the type are the same ('5' === 5 is false)."
      },
      {
        question: "What is Composer?",
        code: "composer require guzzlehttp/guzzle",
        options: ["A code editor", "A PHP framework", "A dependency manager for PHP", "A testing tool"],
        answer: "A dependency manager for PHP",
        explanation: "Composer is the de-facto dependency management tool for PHP, similar to npm for Node.js or pip for Python. It allows you to declare and manage project dependencies."
      }
    ]
  },
  'Docker': {
    icon: (props: any) => <Package {...props} />,
    description: "Containers, images, and 'it works on my machine' solutions.",
    questions: [
      {
        question: "What is the difference between a Docker image and a container?",
        code: "docker build -t my-app .\ndocker run my-app",
        options: ["They are the same", "An image is a running instance of a container", "A container is a running instance of an image", "An image is a type of container"],
        answer: "A container is a running instance of an image",
        explanation: "An image is a lightweight, standalone, executable package that includes everything needed to run a piece of software. A container is a runtime instance of that image."
      },
      {
        question: "What is the purpose of a `Dockerfile`?",
        code: "FROM node:18\nCOPY . .\nRUN npm install",
        options: ["To run a container", "To define the steps to build a Docker image", "To manage multiple containers", "To store container data"],
        answer: "To define the steps to build a Docker image",
        explanation: "A `Dockerfile` is a text document that contains all the commands a user could call on the command line to assemble an image. `docker build` uses this file to create an image."
      },
      {
        question: "What does the `-p` flag do in `docker run -p 8080:80`?",
        code: "docker run -p 8080:80 my-app",
        options: ["Sets a password", "Specifies the project name", "Publishes a container's port to the host", "Pauses the container"],
        answer: "Publishes a container's port to the host",
        explanation: "The `-p` or `--publish` flag maps a port on the host machine (e.g., 8080) to a port inside the container (e.g., 80), allowing you to access the containerized application."
      }
    ]
  },
  'Vue.js': {
    icon: (props: any) => <CodeSquare {...props} />,
    description: "The progressive framework, known for its approachability and simplicity.",
    questions: [
      {
        question: "What is the Vue instance property used to store data?",
        code: "new Vue({ ... })",
        options: ["state", "props", "data", "variables"],
        answer: "data",
        explanation: "The `data` property on a Vue instance is where you declare the reactive state for a component. When these values change, the view re-renders."
      },
      {
        question: "Which directive is used for conditional rendering?",
        code: "<div ... >Content</div>",
        options: ["v-if", "v-show", "v-for", "Both v-if and v-show"],
        answer: "Both v-if and v-show",
        explanation: "`v-if` conditionally renders an element (it's added/removed from the DOM). `v-show` toggles the element's `display` CSS property. Both are used for conditional rendering."
      },
      {
        question: "What are Single-File Components (SFCs)?",
        code: "<template>...</template><script>...</script><style>...</style>",
        options: ["Components with no script tag", "Components written in a single JS file", "Files with a `.vue` extension containing HTML, JS, and CSS", "Components that can't have children"],
        answer: "Files with a `.vue` extension containing HTML, JS, and CSS",
        explanation: "SFCs are a hallmark of Vue development, allowing you to encapsulate the template, logic, and styling of a component in a single `.vue` file for better organization."
      }
    ]
  },
  'Angular': {
    icon: (props: any) => <CodeSquare {...props} />,
    description: "The platform for building enterprise-grade web applications.",
    questions: [
      {
        question: "What is the core building block of an Angular application?",
        code: "@...",
        options: ["Module", "Service", "Component", "Directive"],
        answer: "Component",
        explanation: "Components are the main building block for Angular applications. Each component consists of an HTML template, a TypeScript class for logic, and CSS styles."
      },
      {
        question: "What is Dependency Injection (DI)?",
        code: "constructor(private myService: MyService) {}",
        options: ["A way to inject CSS files", "A design pattern where a class receives its dependencies from an external source", "A method for lazy loading modules", "A template syntax"],
        answer: "A design pattern where a class receives its dependencies from an external source",
        explanation: "DI is a core concept in Angular. Instead of creating its own dependencies (like services), a component declares what it needs in its constructor, and the Angular framework provides them."
      },
      {
        question: "What is the purpose of `ngFor`?",
        code: "<li *ngFor='let item of items'>{{item}}</li>",
        options: ["To create a form", "To conditionally render an element", "To repeat a portion of the DOM for each item in a list", "To handle click events"],
        answer: "To repeat a portion of the DOM for each item in a list",
        explanation: "`*ngFor` is a structural directive that iterates over a collection (like an array) and renders a template for each item in that collection."
      }
    ]
  }
};


type Language = keyof typeof quizData;

export default function InteractivePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!selectedLanguage) {
    return (
      <div className="container mx-auto max-w-6xl py-12 px-4">
        <div className="text-center mb-12">
            <div className="inline-block rounded-full p-3 bg-primary/10 mb-4 ring-4 ring-primary/5">
                <Code className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Tech Quiz Arena</h1>
            <p className="text-muted-foreground mt-2 text-lg">Choose your battlefield and test your knowledge.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-in fade-in-50 duration-500">
          {Object.keys(quizData).map((lang) => {
            const language = lang as Language;
            const Icon = quizData[language].icon;
            return (
              <Card 
                key={language} 
                onClick={() => setSelectedLanguage(language)}
                className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex flex-col text-center"
              >
                <CardHeader>
                  <div className="mx-auto bg-secondary p-4 rounded-full w-fit mb-2">
                    <Icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle>{language}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{quizData[language].description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  const quiz = quizData[selectedLanguage];
  const quizQuestions = quiz.questions;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.answer;

  const handleNextQuestion = () => {
    if (isAnswered && isCorrect) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleSubmitAnswer = () => {
      if(selectedOption) {
          setIsAnswered(true);
      }
  }

  const handleRestartQuiz = (changeLanguage = false) => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    if (changeLanguage) {
        setSelectedLanguage(null);
    }
  };

  if (showResult) {
    const finalScore = isAnswered && isCorrect ? score + 1 : score;
    const isWinner = finalScore > quizQuestions.length / 2;

    return (
      <div className="container mx-auto max-w-2xl py-12 px-4 flex items-center justify-center min-h-[60vh]">
        {isWinner && windowSize.width > 0 && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />}
        <Card className="text-center w-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl animate-in fade-in-50">
          <CardHeader>
            <div className="flex justify-center items-center mb-4">
              {isWinner ? (
                <ThumbsUp className="h-16 w-16 text-green-500" />
              ) : (
                <ThumbsDown className="h-16 w-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-3xl">{isWinner ? 'Congratulations!' : 'Better Luck Next Time!'}</CardTitle>
            <CardDescription className="text-lg">You've completed the {selectedLanguage} Quirks Quiz.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className={`text-5xl font-bold ${isWinner ? 'text-green-500' : 'text-red-500'}`}>
              {finalScore} / {quizQuestions.length}
            </p>
            <p className="text-muted-foreground">{isWinner ? "You're a true wizard!" : "Don't worry, these questions are tricky!"}</p>
            <div className='flex gap-2 justify-center'>
                <Button onClick={() => handleRestartQuiz(false)} size="lg">
                 Play Again
                </Button>
                <Button onClick={() => handleRestartQuiz(true)} size="lg" variant="outline">
                    Change Language
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <div className="mb-4">
        <Button variant="ghost" onClick={() => handleRestartQuiz(true)}>
            <ArrowLeft className="mr-2 h-4 w-4"/>
            Change Language
        </Button>
      </div>
      <Card className="transition-transform duration-300 ease-in-out hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
             <Terminal/> {selectedLanguage} Quirks Quiz
          </CardTitle>
          <CardDescription>Test your knowledge of {selectedLanguage}'s tricky parts. Question {currentQuestionIndex + 1} of {quizQuestions.length}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="p-4 space-y-2 rounded-lg bg-secondary/30">
                <div className="font-medium">{currentQuestion.question}</div>
                {currentQuestion.code && (
                  <pre className="bg-background/50 p-4 rounded-md text-sm whitespace-pre-wrap font-code">
                      <code>{currentQuestion.code}</code>
                  </pre>
                )}
            </div>

            <RadioGroup
                value={selectedOption || ''}
                onValueChange={setSelectedOption}
                disabled={isAnswered}
                className="gap-3"
            >
                {currentQuestion.options.map((option, index) => (
                  <Label key={index} htmlFor={`option-${index}`} className={`flex items-center space-x-3 p-3 rounded-md border-2 transition-all ${selectedOption === option ? 'border-primary' : 'border-border'} ${isAnswered ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-primary'}`}>
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <span className="text-base font-mono">{option}</span>
                  </Label>
                ))}
            </RadioGroup>
            
            <Separator />

            {isAnswered ? (
                 <div className="space-y-4 animate-in fade-in duration-500">
                    <div className={`p-4 rounded-md flex items-start gap-3 ${isCorrect ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-red-500/10 text-red-700 dark:text-red-300'}`}>
                        {isCorrect ? <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" /> : <XCircle className="h-5 w-5 mt-0.5 shrink-0" />}
                        <div>
                            <p className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect!'}</p>
                            {!isCorrect && <p className="text-sm">The correct answer is: <span className="font-mono">{currentQuestion.answer}</span></p>}
                        </div>
                    </div>
                     <div className="p-4 rounded-md flex items-start gap-3 bg-blue-500/10 text-blue-700 dark:text-blue-300">
                        <Lightbulb className="h-5 w-5 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-bold">Explanation</p>
                            <p className="text-sm">{currentQuestion.explanation}</p>
                        </div>
                    </div>
                    <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                 </div>
            ) : (
                <Button onClick={handleSubmitAnswer} className="w-full" disabled={!selectedOption}>
                    Submit Answer
                </Button>
            )}

        </CardContent>
      </Card>
    </div>
  );
}

    