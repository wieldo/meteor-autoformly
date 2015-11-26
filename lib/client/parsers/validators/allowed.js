const {SetModule} = angular2now;

SetModule('autoFormly')
    .run(['autoFormlyParser', 'formlyValidator', (autoFormlyParser, formlyValidator) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (fieldSchema.allowedValues) {
                formlyValidator.setFieldValidator(formlyField, 'allowed', fieldSchema.allowedValues);
            }
        });

    }]);
