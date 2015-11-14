AutoFormly
==========

[![Build Status](https://travis-ci.org/wieldo/meteor-autoformly.svg)](https://travis-ci.org/wieldo/meteor-autoformly) 
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/wieldo/meteor-autoformly?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://coveralls.io/repos/wieldo/meteor-autoformly/badge.svg?branch=master&service=github)](https://coveralls.io/github/wieldo/meteor-autoformly?branch=master)

Create [Angular-Formly] forms with automatic insert and update, and automatic reactive validation. Requires [SimpleSchema] or [Collection2].

## How to use it

```javascript
const fields = autoFormly.collection(BooksCollection);
// or
const fields = autoFormly.schema(BooksSchema);
```

## What is ready?
Take a look at this docs:

- [autoFormly]
- [autoFormlyParsers]

## Contributing
It is a new project, at the beginning of development process.

Feel free to ask me anything.

### You can help
If you would like to add functionality, just fork this repo and create pull request.

### How autoFormly works
Basically it parses simpleSchema structure and creates formly configuration for each field.

For example, to mark field as required we can create the parser function to check if `optional` property is being used.
If _opional_ is not set to _true_ then we're adding `required` validator from `wieldo:angular-formly-validator` package 
(see [formlyValidator] and source code in [required.js](lib/client/parsers/validators/required.js).

#### What is parser?
Parser is a function that receives simpleSchema key with configuration and reference to formly field configuration object.

So basically, you can add properties to formly configuration by checking field's schema.

#### Helpers
We're currently working on three other packages that are very useful in autoFormly.

- [formlyTransformer] to simplify process of formly field transformation.
- [formlyValidator] to make validation easier (with built-in validators)
- [formlyMaterial] is a AngularJS module with Angular Material templates to use in angular-formly.

### Roadmap 1.0

- [x] Extend SimpleSchema to use `autoformly` property
- [ ] Support for **_array of objects_**
- [x] `schema.key` as `formly.key`
- [x] `schema.label` as `formly.templateOptions.label`
- [x] `schema.optional` and required validator
- [x] `schema.max` for **_String_** and **_Number_** types as **maxlength** and **maxnumber** validator
- [x] `schema.min` for **_String_** and **_Number_** types as **minlength** and **minnumber** validator
- [ ] `schema.regEx` as **pattern** validator
- [ ] `schema.defaultValue` as `model`
- [ ] `schema.autoformly.rows` to be displayed textarea
- [ ] **_Boolean_** type as checkbox
- [ ] `schema.autoformly.type` to be `formly.type`
- [ ] `schema.allowedValues` as select element
- [ ] `schema.minCount` support
- [ ] `schema.maxCount` support
- [ ] Support for **_Object_** type fields
- [ ] Support for server-side validation errors (like _unique_)

## Contact
You can find me on [Gitter].


[Angular-Formly]: http://angular-formly.com
[SimpleSchema]: http://github.com/aldeed/meteor-simple-schema
[Collection2]: http://github.com/aldeed/meteor-collection2
[AutoForm]: http://github.com/aldeed/meteor-autoform
[Gitter]: https://gitter.im/wieldo/meteor-autoformly

[autoFormly]: docs/auto-formly.md
[autoFormlyParsers]: docs/auto-formly-parsers.md

[formlyValidator]: http://github.com/wieldo/angular-formly-validator
[formlyTransformer]: http://github.com/wieldo/angular-formly-transformer
[formlyMaterial]: http://github.com/wieldo/angular-formly-templates-material