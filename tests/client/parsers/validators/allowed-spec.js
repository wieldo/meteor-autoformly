describe("autoFormlyParsers validators allowed", () => {
    let autoFormlyParser;
    let formlyValidator;

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_, _formlyValidator_) => {
            autoFormlyParser = _autoFormlyParser_;
            formlyValidator = _formlyValidator_;
        });
    });

    it("should set allowed validator on schema field with allowed values", () => {
        const allowedValues = ['foo', 'bar'];
        const field = autoFormlyParser.field("test", {
            type: String,
            allowedValues: allowedValues
        });

        expect(formlyValidator.getFieldValidator(field, 'allowed')).toEqual(allowedValues);
    });

});