var {SetModule} = angular2now;

SetModule('autoFormly')
    .run((autoFormlyParser) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (angular.isDefined(fieldSchema.defaultValue)) {
                formlyField.defaultValue = fieldSchema.defaultValue;
            }
        });

    });