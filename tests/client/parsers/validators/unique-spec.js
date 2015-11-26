describe("autoFormlyParsers validators unique", () => {
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
        const field = autoFormlyParser.field("test", {
            type: String,
            unique: true
        });

        expect(formlyValidator.getFieldValidator(field, 'unique')).toEqual(true);
    });

});