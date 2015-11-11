/* global autoFormlyHelpers */
let {SetModule, Service, Inject} = angular2now;

SetModule('autoFormly');
@Service('autoFormly')
@Inject(['autoFormlyParser'])
class autoFormly extends autoFormlyHelpers {

    // injectables
    autoFormlyParser;

    constructor(autoFormlyParser) {
        super();
        
        this.autoFormlyParser = autoFormlyParser;
    }

    collection(collection, fields) {
        if (!collection.simpleSchema) {
            throw this.createError("Collection does not contain SimpleSchema");
        }

        return this.schema(collection.simpleSchema(), fields);
    }

    schema(schema, fields) {
        if (!schema instanceof SimpleSchema) {
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

    fields(sortedSchema) {
        return this.autoFormlyParser.schema(sortedSchema);
    }
}