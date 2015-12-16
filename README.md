AutoFormly
==========

[![GitHub version](https://badge.fury.io/gh/wieldo%2Fmeteor-autoformly.svg)](https://badge.fury.io/gh/wieldo%2Fmeteor-autoformly)
[![Build Status](https://travis-ci.org/wieldo/meteor-autoformly.svg)](https://travis-ci.org/wieldo/meteor-autoformly) 
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/wieldo/meteor-autoformly?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://coveralls.io/repos/wieldo/meteor-autoformly/badge.svg?branch=master&service=github)](https://coveralls.io/github/wieldo/meteor-autoformly?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/b55750daf3c6417caf63154da85a9eae)](https://www.codacy.com/app/mys-sterowiec/meteor-autoformly)

Create [Angular-Formly] forms with automatic insert and update, and automatic reactive validation. Requires [SimpleSchema] or [Collection2].

## Installation

```
meteor add wieldo:autoformly
```

## How to use it

### auto-formly component

To insert or update collection
```html
<auto-formly
    collection="vm.booksCollection"
    doc="vm.book"
    options="vm.options"
    on-success="vm.onSuccess"
    on-error="vm.onError">
    <button type="submit">Update</button>
</auto-formly>
```

- **collection** Mongo.Collection object
- **doc** document from collection (optional)
- **options** same object as in autoFormly.collection (to custom configuration and filtering) (optional)
- **onSuccess** callback with result of action as argument (optional)
- **onError** callback with error as argument (false if form contains errors on client-side) (optional)

### Convert all schema fields

```javascript
const fields = autoFormly.collection(BooksCollection);
// or
const fields = autoFormly.collection($meteor.collection(BooksCollection);
// or
const fields = autoFormly.schema(BooksSchema);
```

### Save object to collection with validation error handling

```javascript
const fields = autoFormly.collection(BooksCollection);

function submit(book) {
    $meteor.collection(BooksCollection)
        .save(book)
        .then(() => {
            // success
        })
        .catch(() => autoFormly.errors(BooksCollection, fields);
}
```

### Convert all schema fields excluding one
```javascript
const fields = autoFormly.schema(BooksSchema, {
    fields: {
        published: false
    }
});
```

### Convert selected collection fields
```javascript
const fields = autoFormly.collection(BooksCollection, {
    all: false,
    fields: {
        published: true,
        author: true,
        title: true
    }
});
```

### Extend formly configuration for selected field

```javascript
const fields = autoFormly.schema(BooksSchema, {
    all: false,
    fields: {
        published: true,
        author: {
            templateOptions: {
                label: "Written by"
            }
        }
    }
});
```

## What is ready?

See examples above.

- creating formly fields with validators using collection or schema (autoFormly.collection(), autoFormly.schema())
- handling validation errors (autoFormly.errors() sets validation on form fields)

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
- [x] Add optional manual formly configuration for each field
- [x] More advanced field filtering (show all / hide all / add excluding)
- [x] `schema.key` as `formly.key`
- [x] `schema.label` as `formly.templateOptions.label`
- [x] `schema.optional` and required validator
- [x] `schema.max` for **_String_** and **_Number_** types as **maxlength** and **maxnumber** validator
- [x] `schema.min` for **_String_** and **_Number_** types as **minlength** and **minnumber** validator
- [x] `schema.regEx` as **pattern** validator
- [x] `schema.defaultValue` as `formly.defaultValue`
- [x] `schema.autoformly.templateOptions.rows` to be displayed as textarea
- [x] **_Boolean_** type as checkbox
- [x] `schema.autoformly.type` to be `formly.type`
- [x] `schema.allowedValues` as select element (schema type is a String)
- [x] validation for `schema.allowedValues`
- [ ] `schema.minCount` and `schema.maxCount` support
- [ ] Support for **_array of objects_**
- [ ] Support for **_Object_** type fields
- [x] Support for server-side validation errors (like _unique_)
- [x] Component to automate process of insertion or collection update
- [ ] Interactive **demo**

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