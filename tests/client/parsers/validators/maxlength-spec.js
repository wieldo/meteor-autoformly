describe("autoFormlyParsers validators maxlength", () => {
    let autoFormlyParser;
    let formlyValidator;

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_, _formlyValidator_) => {
            autoFormlyParser = _autoFormlyParser_;
            formlyValidator = _formlyValidator_;
        });
    });

    it("should set maxlength validator on String with min value", () => {
        const field = autoFormlyParser.field("test", {
            type: String,
            max: 10
        });

        expect(formlyValidator.getFieldValidator(field, 'maxlength')).toEqual(10);
    });

    it("should set maxlength validator on String with min and max values", () => {
        const field = autoFormlyParser.field("test", {
            type: String,
            min: 10,
            max: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'maxlength')).toEqual(20);
    });

    it("should not set maxlength validator on String without max value", () => {
        const field = autoFormlyParser.field("test", {
            type: String,
            min: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'maxlength')).toBeUndefined();
    });

    it("should not set maxlength validator on Number with min value", () => {
        const field = autoFormlyParser.field("test", {
            type: Number,
            max: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'maxlength')).toBeUndefined();
    });

    it("should not set maxlength validator on Date with min value", () => {
        const field = autoFormlyParser.field("test", {
            type: Date,
            max: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'maxlength')).toBeUndefined();
    });

});