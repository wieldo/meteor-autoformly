var {SetModule} = angular2now;

SetModule('autoFormly')
    .run(['autoFormlyParser', (autoFormlyParser) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {

            if (fieldSchema.autoformly && fieldSchema.autoformly.type) {
                formlyField.type = fieldSchema.autoformly.type;
                return;
            }

            if (fieldSchema.type === String) {
                
                if(angular.isDefined(fieldSchema.allowedValues)) {
                    formlyField.type = 'select';
                } else {
                    formlyField.type = 'input';
                }
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

            if (fieldSchema.type === Boolean) {
                formlyField.type = 'checkbox';
                return;
            }
        });

    }]);
