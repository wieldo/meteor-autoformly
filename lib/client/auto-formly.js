/* global autoFormlyHelpers */
let {SetModule, Service, Inject} = angular2now;

SetModule('autoFormly');
@Service('autoFormly')
@Inject(['autoFormlyParser'])
    /**
     * AngularJS Service
     * @property autoFormly
     * @public
     */
class autoFormly extends autoFormlyHelpers {

    // injectables
    autoFormlyParser;

    constructor(autoFormlyParser) {
        super();

        this.autoFormlyParser = autoFormlyParser;
    }

    /**
     * Parse Mongo.Collection object
     *
     * @public
     * @method autoFormly.collection
     * @param {Collection|AngularMeteorCollection} collection - used directly or with $meteor service
     * @param {array|object} options - schema keys you want to use or formly fields configuration (optional)
     * @returns {array}
     */
    collection(collection, options) {
        // Collection object
        if (angular.isFunction(collection.simpleSchema)) {
            return this.schema(collection.simpleSchema(), options);
        }
        // angular meteor collection object with collection2
        if (angular.isDefined(collection.$$collection) && collection.$$collection._c2) {
            // check for schema
            if (angular.isUndefined(collection.$$collection.schema)) {
                throw this.createError(`Collection "${collection.$$collection._name}" has no schema`);
            }
            return this.schema(collection.$$collection.schema, options);
        }
        // nope, not found
        throw this.createError("Collection has no schema as instance of SimpleSchema");
    }

    /**
     * Parse SchemaSchema object
     *
     * @public
     * @method autoFormly.schema
     * @param {SimpleSchema} schema
     * @param {array|object} options - schema keys you want to use or formly fields configuration (optional)
     * @returns {array}
     */
    schema(schema, options) {
        let sortedSchema;
        const schemaCopy = angular.copy(schema);

        /**
         * @deprecated avoid filtering with fields keys as array, use object configuration instead
         */
        if (!schemaCopy || !angular.isFunction(schemaCopy.schema)) {
            throw this.createError("Schema has to be instance of SimpleSchema");
        }

        // filter and return
        if (angular.isArray(options)) {
            return this.fields(this.filterSchema(schemaCopy, options));
        }

        // no options
        if (angular.isUndefined(options)) {
            return this.fields(schemaCopy.schema());
        }

        //
        // handle options object
        //

        // pass only object
        if (!angular.isObject(options)) {
            throw this.createError("Options have to be an array or object");
        }

        // use filter?
        if (options.all === false) {
            // pass only with defined fields
            if (!angular.isObject(options.fields)) {
                throw this.createError("Missing or invalid property fields in options");
            }
            // skip fields marked as unused ("fieldKey": false)
            sortedSchema = this.filterSchema(schemaCopy, Object.keys(_.omit(options.fields, (val) => val === false)));
        } else {
            sortedSchema = schemaCopy.schema();
        }

        // check each field
        if (options.fields) {
            _.each(sortedSchema, (fSchema, fKey) => {
                // and skip field if marked as unused
                if (options.fields[fKey] === false) {
                    delete sortedSchema[fKey];
                }
                // or extend autoformly in schema using defined field extension
                if (angular.isObject(options.fields[fKey])) {
                    sortedSchema[fKey].autoformly = angular.merge({}, fSchema.autoformly, options.fields[fKey]);
                }
            });
        }

        return this.fields(sortedSchema);
    }

    /**
     *
     * @param {object} schema
     * @param {array} fields - schema keys you want to use (optional)
     * @returns {object}
     */
    filterSchema(schema, fields) {
        if (!angular.isArray(fields)) {
            throw this.createError("Fields to filter have to be an array");
        }

        const sorted = {};

        fields.forEach((field) => {
            if (!schema.schema(field)) {
                throw this.createError(`There is no '${field}' in schema`);
            }
            sorted[field] = schema.schema(field);
        });

        return sorted;
    }

    /**
     *
     * @param {object} sortedSchema
     * @returns {array}
     */
    fields(sortedSchema) {
        return this.autoFormlyParser.schema(sortedSchema);
    }
}