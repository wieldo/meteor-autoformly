var {SetModule} = angular2now;

SetModule('autoFormly')
    .run((autoFormlyParser) => {

        autoFormlyParser.register((fieldKey, fieldSchema, formlyField) => {
            formlyField.key = fieldKey;
        });

    });