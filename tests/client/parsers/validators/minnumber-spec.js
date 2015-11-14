describe("autoFormlyParsers validators minnumber", () => {
    let autoFormlyParser;
    let formlyValidator;

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_, _formlyValidator_) => {
            autoFormlyParser = _autoFormlyParser_;
            formlyValidator = _formlyValidator_;
        });
    });

    it("should set minnumber validator on Number with min value", () => {
        const field = autoFormlyParser.field("test", {
            type: Number,
            min: 10
        });

        expect(formlyValidator.getFieldValidator(field, 'minnumber')).toEqual(10);
    });

    it("should set minnumber validator on Number with min and max value", () => {
        const field = autoFormlyParser.field("test", {
            type: Number,
            min: 10,
            max: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'minnumber')).toEqual(10);
    });

    it("should not set minnumber validator on Number without min value", () => {
        const field = autoFormlyParser.field("test", {
            type: Number,
            max: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'minnumber')).toBeUndefined();
    });

    it("should not set minnumber validator on String with min value", () => {
        const field = autoFormlyParser.field("test", {
            type: String,
            min: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'minnumber')).toBeUndefined();
    });

    it("should not set minnumber validator on Date with min value", () => {
        const field = autoFormlyParser.field("test", {
            type: Date,
            min: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'minnumber')).toBeUndefined();
    });
    
});