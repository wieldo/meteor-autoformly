var {SetModule} = angular2now;

SetModule('autoFormly')
    .run(['autoFormlyParser', (autoFormlyParser) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            autoFormlyParser.createNestedObject(formlyField, 'templateOptions');

            // prevent overwriting
            if (!autoFormlyParser.getNestedObject(formlyField, 'templateOptions.label')) {
                formlyField.templateOptions.label = fieldSchema.label ? fieldSchema.label : fieldKey;
            }
        });

    }]);
