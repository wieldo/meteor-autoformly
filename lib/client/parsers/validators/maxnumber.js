var {SetModule} = angular2now;

SetModule('autoFormly')
    .run((autoFormlyParser, formlyValidator) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (fieldSchema.max && fieldSchema.type === Number) {
                formlyValidator.setFieldValidator(formlyField, 'maxnumber', fieldSchema.max);
            }
        });

    });