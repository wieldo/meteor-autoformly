autoFormly
==========

```
AngularJS service.
```

__File: [lib/client/auto-formly.js](../lib/client/auto-formly.js)__

-

### *autoFormly*.collection(collection, fields)

```
Parse Mongo.Collection to get array with fields
```

__Arguments__

* __collection__ *{CollectionCollection|AngularMeteorCollection}*   

 Mongo Collection used directly or with $meteor AngularJS service
 
* __options__ *{array|object|undefined}*

 Optional filtering fields using array with collection's keys 
 or options object.
 
* __options.all__ *{boolean}*

 Show all fields when true. Otherwise only these defined (see below)

* __options.fields__ *{object}*

 Object with the field's key as property and formly field configuration (extends the auto-generated configuration).
 Instead of using formly configuration you can set field as visible or not using boolean value (true visible, false not used)
 
 
__Returns__  *{Array}*
 
 Array with fields to use in formly-form.
 
-

### *autoFormly*.schema(schema, options)

```
Parse SimpleSchema object to get array with fields
```

__Arguments__

* __schema__ *{SimpleSchema}*  

 SimpleSchema instance
 
* __options__ *{array|object|undefined}*

 See collection()
 
__Returns__  *{Array}*
 
 Array with fields to use in formly-form.
 
-

### *autoFormly*.errors(collection, fields)

```
Gets errors of fields and sets them in form controls. Use it when insertion or collection update fails.

See example in readme.
```

__Arguments__

* __collection__ *{SimpleSchema}*  

 SimpleSchema instance
 
* __fields__ *{array}*

 Array with fields
 