describe("autoFormlyParsers validators required", () => {
    let autoFormlyParser;
    let formlyValidator;

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_, _formlyValidator_) => {
            autoFormlyParser = _autoFormlyParser_;
            formlyValidator = _formlyValidator_;
        });
    });

    it("should set required validator on optional:false", () => {
        const field = autoFormlyParser.field("test", {
            optional: false
        });

        expect(field.transformers.validators.required).toBeTruthy();
    });

    it("should set required validator on missing optional property", () => {
        const field = autoFormlyParser.field("test", {});
        
        expect(formlyValidator.getFieldValidator(field, 'required')).toBeTruthy();
    });

    it("should not set required validator on optional:true", () => {
        const field = autoFormlyParser.field("test", {
            optional: true
        });

        expect(formlyValidator.getFieldValidator(field, 'required')).toBeUndefined();
    });
});