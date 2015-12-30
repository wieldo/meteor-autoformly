const {SetModule} = angular2now;

SetModule('autoFormly')
    .run(['autoFormlyParser', (autoFormlyParser) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            if (!formlyField.templateOptions) {
                formlyField.templateOptions = {};
            }

            if (formlyField.type === 'datepicker' && angular.isDefined(fieldSchema.max)) {
                formlyField.templateOptions.maxDate = fieldSchema.max;
            }
        });

    }]);
