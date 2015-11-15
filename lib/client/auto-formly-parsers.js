/* global autoFormlyHelpers */
let {SetModule, Service} = angular2now;

SetModule('autoFormly');
@Service('autoFormlyParser')
class autoFormlyParser extends autoFormlyHelpers {

    parsers = [];

    constructor() {
        super();
    }

    /**
     * register parser function.
     * Parser arguments:
     * - {string} fieldKey - absolute name of SimpleSchema field
     * - {object} fieldSchema - field's schema from SimpleSchema object
     * - {object} formlyField - formly field configuration object
     *
     * @public
     * @param {function} parser
     */
    register(parser) {
        if (!angular.isFunction(parser)) {
            throw this.createError("Parser has to be a function");
        }

        // push new parser
        this.parsers.push(parser);
    }

    /**
     *
     * @public
     * @param {Object} schema
     * @returns {array} Array of field configuration objects
     */
    schema(schema) {
        let fieldKey;
        const fields = [];

        for (fieldKey in schema) {
            fields.push(this.field(fieldKey, schema[fieldKey]));
        }

        // remove undefined and without type
        return _.reject(_.compact(fields), (field) => "undefined" === typeof field.type);
    }

    /**
     *
     * @param {string} fieldKey
     * @param {Object} fieldSchema
     * @returns {Object}
     */
    field(fieldKey, fieldSchema) {
        // todo: support for array of objects
        // maybe something like foo.$.bar -> foo[$key]bar will do the work
        if (fieldKey.indexOf('$') !== -1) {
            return;
        }

        const formlyField = {};

        this.runParsers(fieldKey, fieldSchema, formlyField);

        return formlyField;
    }

    /**
     *
     * @public
     * @param {string} fieldKey
     * @param {object} fieldSchema
     * @param {object} formlyField
     */
    runParsers(fieldKey, fieldSchema, formlyField) {
        this.parsers.forEach((parser) => {
            // call with deep copy of fieldSchema to avoid overwriting
            parser.call({}, fieldKey, angular.copy(fieldSchema), formlyField);
        });
    }
}