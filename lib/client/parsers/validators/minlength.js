var {SetModule} = angular2now;

SetModule('autoFormly')
    .run(['autoFormlyParser', 'formlyValidator', (autoFormlyParser, formlyValidator) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (fieldSchema.min && fieldSchema.type === String) {
                formlyValidator.setFieldValidator(formlyField, 'minlength', fieldSchema.min);
            }
        });

    }]);
