describe("autoFormlyParser defaultValue", () => {
    //
    // vars
    //
    
    let autoFormlyParser;
    
    //
    // tests
    //

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_) => {
            autoFormlyParser = _autoFormlyParser_;
        });
    });

    it("should set default value on formly field", () => {
        const field = autoFormlyParser.field("test", {
            defaultValue: "test"
        });

        expect(field.defaultValue).toBe("test");
    });

    it("should set default value on formly field even if empty", () => {
        const field = autoFormlyParser.field("test", {
            defaultValue: ""
        });

        expect(field.defaultValue).toBe("");
    });

    it("should set default value on formly field even if equals null", () => {
        const field = autoFormlyParser.field("test", {
            defaultValue: null
        });

        expect(field.defaultValue).toBe(null);
    });
    
});
