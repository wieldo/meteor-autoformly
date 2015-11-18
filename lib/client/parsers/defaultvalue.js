var {SetModule} = angular2now;

SetModule('autoFormly')
    .run(['autoFormlyParser', (autoFormlyParser) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (angular.isDefined(fieldSchema.defaultValue)) {
                formlyField.defaultValue = fieldSchema.defaultValue;
            }
        });

    }]);