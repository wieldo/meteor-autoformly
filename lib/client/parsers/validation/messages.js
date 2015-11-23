var {SetModule} = angular2now;

SetModule('autoFormly')
    .run(['autoFormlyParser', (autoFormlyParser) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (autoFormlyParser.getNestedObject(fieldSchema, 'autoformly.validation.messages')) {
                autoFormlyParser.createNestedObject(formlyField, 'validation.messages');
                formlyField.validation.messages = fieldSchema.autoformly.validation.messages;
            }
        });

    }]);
