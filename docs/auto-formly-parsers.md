autoFormlyParsers
==========

```
AngularJS service.
```

__File: [lib/client/auto-formly-parsers.js](../lib/client/auto-formly-parsers.js)__

-

### *autoFormlyParsers*.register(parser)

```
Register new parsing function
```

__Arguments__

* __collection__ *{Function}*  

 Parsing function with three arguments:
 
 - *{string}* field's key
 - *{object}* copy of field's schema from SimpleSchema object
 - *{object}* object with formly configuration for field
 
 
__Returns__  *{undefined}*
 
 There is no need to return something. Use formly configuration object as reference.
 