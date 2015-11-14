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
     * @param {Collection} collection
     * @param {array} fields - schema keys you want to use (optional)
     * @returns {array}
     */
    collection(collection, fields) {
        if (!collection.simpleSchema) {
            throw this.createError("Collection does not contain SimpleSchema");
        }

        return this.schema(collection.simpleSchema(), fields);
    }

    /**
     * Parse SchemaSchema object
     *
     * @public
     * @method autoFormly.schema
     * @param {SimpleSchema} schema
     * @param {array} fields - schema keys you want to use (optional)
     * @returns {array}
     */
    schema(schema, fields) {
        if (!schema || !angular.isFunction(schema.schema)) {
            throw this.createError("Schema has to be instance of SimpleSchema");
        }

        let sortedSchema;

        if (fields) {
            sortedSchema = this.filterSchema(schema, fields);
        } else {
            sortedSchema = schema.schema();
        }

        return this.fields(sortedSchema);
    }

    /**
     *
     * @param {object} schema
     * @param {array} fields
     * @returns {object}
     */
    filterSchema(schema, fields) {
        if (!angular.isArray(fields)) {
            throw this.createError("Fields have to be an array");
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