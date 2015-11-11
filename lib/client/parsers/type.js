var {SetModule} = angular2now;

SetModule('autoFormly')
    .run((autoFormlyParser) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (fieldSchema.type === String) {
                formlyField.type = 'input';
                return;
            }

            if (fieldSchema.type === Number) {
                formlyField.type = 'input';
                return;
            }

            if (fieldSchema.type === Date) {
                formlyField.type = 'input';
                return;
            }
        });

    });