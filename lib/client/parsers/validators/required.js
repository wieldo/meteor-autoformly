var {SetModule} = angular2now;

SetModule('autoFormly')
    .run((autoFormlyParser, formlyValidator) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (!fieldSchema.optional) {
                formlyValidator.setFieldValidator(formlyField, 'required', true);
            }
        });

    });