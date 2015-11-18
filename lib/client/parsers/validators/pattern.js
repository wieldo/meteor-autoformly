var {SetModule} = angular2now;

SetModule('autoFormly')
    .run(['autoFormlyParser', 'formlyValidator', (autoFormlyParser, formlyValidator) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (fieldSchema.regEx) {
                formlyValidator.setFieldValidator(formlyField, 'pattern', fieldSchema.regEx);
            }
        });

    }]);
