var {SetModule} = angular2now;

SetModule('autoFormly')
    .run((autoFormlyParser) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (!formlyField.templateOptions) {
                formlyField.templateOptions = {};
            }

            formlyField.templateOptions.label = fieldSchema.label ? fieldSchema.label : fieldKey;
        });

    });