let {SetModule, Service, Inject} = angular2now;

SetModule('autoFormly');
@Service('autoFormly')
@Inject(['autoFormlyParser'])
class autoFormly {

    // injectables
    autoFormlyParser;

    constructor(autoFormlyParser) {
        this.autoFormlyParser = autoFormlyParser;
    }

    collection(collection, fields) {
        if (!collection.simpleSchema) {
            throw new Error("Collection does not contain SimpleSchema");
        }

        return this.schema(collection.simpleSchema(), fields);
    }

    schema(schema, fields) {
        if (!schema instanceof SimpleSchema) {
            throw new Error("Schema has to be instance of SimpleSchema");
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
            throw new Error("Fields have to be an array");
        }

        const sorted = {};

        fields.forEach(field => {
            if (!schema.schema(field)) {
                throw new Error(`There is no '${field}' in schema`);
            }
            sorted[field] = schema.schema(field);
        });

        return sorted;
    }

    fields(sortedSchema) {
        return this.autoFormlyParser.schema(sortedSchema);
    }
}