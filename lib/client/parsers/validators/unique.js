const {SetModule} = angular2now;

SetModule('autoFormly')
    .run(['autoFormlyParser', 'formlyValidator', (autoFormlyParser, formlyValidator) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (fieldSchema.unique) {
                formlyValidator.setFieldValidator(formlyField, 'unique', true);
            }
        });

    }]);
