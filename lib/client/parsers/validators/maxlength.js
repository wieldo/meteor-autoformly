var {SetModule} = angular2now;

SetModule('autoFormly')
    .run((autoFormlyParser, formlyValidator) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (fieldSchema.max && fieldSchema.type === String) {
                formlyValidator.setFieldValidator(formlyField, 'maxlength', fieldSchema.max);
            }
        });

    });