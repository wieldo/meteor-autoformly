describe("autoFormlyParsers validators maxnumber", () => {
    let autoFormlyParser;
    let formlyValidator;

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_, _formlyValidator_) => {
            autoFormlyParser = _autoFormlyParser_;
            formlyValidator = _formlyValidator_;
        });
    });

    it("should set maxnumber validator on Number with max value", () => {
        const field = autoFormlyParser.field("test", {
            type: Number,
            max: 10
        });

        expect(formlyValidator.getFieldValidator(field, 'maxnumber')).toEqual(10);
    });

    it("should set maxnumber validator on Number with max and min values", () => {
        const field = autoFormlyParser.field("test", {
            type: Number,
            min: 10,
            max: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'maxnumber')).toEqual(20);
    });

    it("should not set maxnumber validator on Number without max value", () => {
        const field = autoFormlyParser.field("test", {
            type: Number,
            min: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'maxnumber')).toBeUndefined();
    });

    it("should not set maxnumber validator on String with max value", () => {
        const field = autoFormlyParser.field("test", {
            type: String,
            max: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'maxnumber')).toBeUndefined();
    });

    it("should not set maxnumber validator on Date with max value", () => {
        const field = autoFormlyParser.field("test", {
            type: Date,
            max: 20
        });

        expect(formlyValidator.getFieldValidator(field, 'maxnumber')).toBeUndefined();
    });

});