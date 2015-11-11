let {SetModule, Service} = angular2now;

SetModule('autoFormly');
@Service('autoFormlyParser')
class autoFormlyParser {

    parsers = [];

    /**
     * @constructor
     */
    constructor() {

    }

    /**
     * register parser function.
     * Parser arguments:
     * - {string} fieldKey - absolute name of SimpleSchema field
     * - {object} fieldSchema - field's schema from SimpleSchema object
     * - {object} formlyField - formly field configuration object
     *
     * @param {function} parser
     */
    register(parser) {
        if (!angular.isFunction(parser)) {
            throw new Error("Parser has to be a function");
        }

        // push new parser
        this.parsers.push(parser);
    }

    /**
     *
     * @param {Object} schema
     * @returns {array} Array of field configuration objects
     */
    schema(schema) {
        let fieldKey;
        const fields = [];

        for (fieldKey in schema) {
            fields.push(this.field(fieldKey, schema));
        }

        // remove undefined and without type
        return _.reject(_.compact(fields), (field) => "undefined" === typeof field.type);
    }

    /**
     *
     * @param {string} fieldKey
     * @param {Object} schema
     * @returns {Object}
     */
    field(fieldKey, schema) {
        // todo: support for array of objects
        // maybe something like foo.$.bar -> foo[$key]bar will do the work
        if (fieldKey.indexOf('$') !== -1) {
            return;
        }

        const fieldSchema = schema[fieldKey];
        const formlyField = {};

        this.runParsers(fieldKey, fieldSchema, formlyField);

        return formlyField;
    }

    /**
     *
     * @param fieldKey
     * @param fieldSchema
     * @param formlyField
     */
    runParsers(fieldKey, fieldSchema, formlyField) {
        this.parsers.forEach(parser => {
            // call with deep copy of fieldSchema to avoid overwriting
            parser.call(undefined, fieldKey, angular.copy(fieldSchema), formlyField);
        });
    }
}