var {SetModule} = angular2now;

SetModule('autoFormly')
    .run(['autoFormlyParser', (autoFormlyParser) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (!formlyField.templateOptions) {
                formlyField.templateOptions = {};
            }

            if (formlyField.type === 'select' && angular.isDefined(fieldSchema.allowedValues)) {
                formlyField.templateOptions.options = fieldSchema.allowedValues.map((value) => {
                    return {
                        name: value,
                        value: value
                    }
                });
            }
        });

    }]);
