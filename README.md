AutoFormly [![Build Status](https://travis-ci.org/wieldo/meteor-autoformly.svg)](https://travis-ci.org/wieldo/meteor-autoformly) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/wieldo/meteor-autoformly?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
==========
Create [Angular-Formly] forms with automatic insert and update, and automatic reactive validation. Requires [SimpleSchema] or [Collection2].

## How to use it

```javascript
const fields = autoFormly.collection(BooksCollection);
// or
const fields = autoFormly.schema(BooksSchema);
```

## Contribution
It is a new project, at the beginning of development process.

If you would like to add functionality, just fork this repo and create pull request.

Feel free to ask me anything.

## Contact
You can find me on [Gitter].


[Angular-Formly]: http://angular-formly.com
[SimpleSchema]: http://github.com/aldeed/meteor-simple-schema
[Collection2]: http://github.com/aldeed/meteor-collection2
[AutoForm]: http://github.com/aldeed/meteor-autoform
[Gitter]: https://gitter.im/wieldo/meteor-autoformly