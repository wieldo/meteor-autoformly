AutoFormly
==========

[![GitHub version](https://badge.fury.io/gh/wieldo%2Fmeteor-autoformly.svg)](https://badge.fury.io/gh/wieldo%2Fmeteor-autoformly)

[![Build Status](https://travis-ci.org/wieldo/meteor-autoformly.svg)](https://travis-ci.org/wieldo/meteor-autoformly)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/wieldo/meteor-autoformly?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Coverage Status](https://coveralls.io/repos/wieldo/meteor-autoformly/badge.svg?branch=master&service=github)](https://coveralls.io/github/wieldo/meteor-autoformly?branch=master)

[![Codacy Badge](https://api.codacy.com/project/badge/grade/b55750daf3c6417caf63154da85a9eae)](https://www.codacy.com/app/mys-sterowiec/meteor-autoformly)

Create [Angular-Formly](http://angular-formly.com) forms with automatic insert and update, and automatic reactive validation. Requires [SimpleSchema](http://github.com/aldeed/meteor-simple-schema) or [Collection2](http://github.com/aldeed/meteor-collection2).

Installation
------------

```
meteor add wieldo:autoformly
```

How to use it
-------------

Add autoFormly and angular-formly templates to your angular module.

```javascript
angular.module('app', [
  'autoFormly',
  'formlyMaterial' // or other angular-formly templates
]);
```

### Templates

As you can see above, I'm using [angular-formly-templates-material](http://github.com/formly-js/angular-formly-templates-material) which I also maintain. You can add it using `meteor add formly:angular-formly-templates-material`.

### Be aware

```
Be aware that not all angular-formly templates have same API

It is not yet a stable version

If you found some mismatch with other templates, post an issue
```

### auto-formly component

To insert or update collection`html
<auto-formly
    collection="vm.booksCollection"
    doc="vm.book"
    options="vm.options"
    on-success="vm.onSuccess"
    on-error="vm.onError">
    <button type="submit">Update</button>
</auto-formly>
`

-	**collection** Mongo.Collection object
-	**doc** document from collection (optional)
-	**options** same object as in autoFormly.collection (to custom configuration and filtering) (optional)
-	**onSuccess** callback with result of action as argument (optional)
-	**onError** callback with error as argument (false if form contains errors on client-side) (optional)

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

#### Helpers

We're currently working on three other packages that are very useful in autoFormly.

-	[formlyTransformer](http://github.com/wieldo/angular-formly-transformer) to simplify process of formly field transformation.
-	[formlyValidator](http://github.com/wieldo/angular-formly-validator) to make validation easier (with built-in validators)
-	[formlyMaterial](http://github.com/formly-js/angular-formly-templates-material) is a AngularJS module with Angular Material templates to use in angular-formly.

What is ready?
--------------

See examples above.

-	creating formly fields with validators using collection or schema (autoFormly.collection(), autoFormly.schema())
-	handling validation errors (autoFormly.errors() sets validation on form fields)

Take a look at this docs:

-	[autoFormly](docs/auto-formly.md)
-	[autoFormlyParsers](docs/auto-formly-parsers.md)

Contributing
------------

It is a new project, at the beginning of development process.

Feel free to ask me anything.

### You can help

If you would like to add functionality, just fork this repo and create pull request.

### How autoFormly works

Basically it parses simpleSchema structure and creates formly configuration for each field.

For example, to mark field as required we can create the parser function to check if `optional` property is being used. If *opional* is not set to *true* then we're adding `required` validator from `wieldo:angular-formly-validator` package (see [formlyValidator](http://github.com/wieldo/angular-formly-validator) and source code in [required.js](lib/client/parsers/validators/required.js).

#### What is parser?

Parser is a function that receives simpleSchema key with configuration and reference to formly field configuration object.

So basically, you can add properties to formly configuration by checking field's schema.

### Roadmap 1.0

-	[x] Extend SimpleSchema to use `autoformly` property
-	[x] Add optional manual formly configuration for each field
-	[x] More advanced field filtering (show all / hide all / add excluding)
-	[x] `schema.key` as `formly.key`
-	[x] `schema.label` as `formly.templateOptions.label`
-	[x] `schema.optional` and required validator
-	[x] `schema.max` for ***String*** and ***Number*** types as **maxlength** and **maxnumber** validator
-	[x] `schema.min` for ***String*** and ***Number*** types as **minlength** and **minnumber** validator
-	[x] `schema.regEx` as **pattern** validator
-	[x] `schema.defaultValue` as `formly.defaultValue`
-	[x] `schema.autoformly.templateOptions.rows` to be displayed as textarea
-	[x] ***Boolean*** type as checkbox
-	[x] `schema.autoformly.type` to be `formly.type`
-	[x] `schema.allowedValues` as select element (schema type is a String)
-	[x] validation for `schema.allowedValues`
-	[ ] `schema.minCount` and `schema.maxCount` support
-	[x] Support for ***Date*** type fields with min and max
-	[ ] Support for ***array of objects***
-	[ ] Support for ***Object*** type fields
-	[x] Support for server-side validation errors (like *unique*\)
-	[x] Component to automate process of insertion or collection update
-	[ ] Interactive **demo**

Contact
-------

You can find me on [Gitter](https://gitter.im/wieldo/meteor-autoformly).
