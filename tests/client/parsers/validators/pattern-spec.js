describe("autoFormlyParsers validators pattern", () => {
    let autoFormlyParser;
    let formlyValidator;

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_, _formlyValidator_) => {
            autoFormlyParser = _autoFormlyParser_;
            formlyValidator = _formlyValidator_;
        });
    });

    it("should set pattern validator on schema.regEx", () => {
        const field = autoFormlyParser.field("test", {
            regEx: SimpleSchema.RegEx.Email
        });

        expect(formlyValidator.getFieldValidator(field, 'pattern')).toEqual(SimpleSchema.RegEx.Email);
    });

    it("should not set pattern validator on missing schema.regEx", () => {
        const field = autoFormlyParser.field("test", {});
        
        expect(formlyValidator.getFieldValidator(field, 'pattern')).toBeUndefined();
    });
});