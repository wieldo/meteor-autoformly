describe("autoFormlyParsers validators minlength", () => {
    let autoFormlyParser;
    let formlyValidator;

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_, _formlyValidator_) => {
            autoFormlyParser = _autoFormlyParser_;
            formlyValidator = _formlyValidator_;
        });
    });

    it("should set minlength validator on String with min value", () => {
        const field = autoFormlyParser.field("test", {
            type: String,
            min: 10
        });

        expect(formlyValidator.getFieldValidator(field, 'minlength')).toEqual(10);
    });

    it("should set minlength validator on String with min and max value", () => {
        const field = autoFormlyParser.field("test", {
            type: String,
            min: 10,
            max: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'minlength')).toEqual(10);
    });

    it("should not set minlength validator on String without min value", () => {
        const field = autoFormlyParser.field("test", {
            type: String,
            max: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'minlength')).toBeUndefined();
    });

    it("should not set minlength validator on Number with min value", () => {
        const field = autoFormlyParser.field("test", {
            type: Number,
            min: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'minlength')).toBeUndefined();
    });

    it("should not set minlength validator on Date with min value", () => {
        const field = autoFormlyParser.field("test", {
            type: Date,
            min: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'minlength')).toBeUndefined();
    });

});