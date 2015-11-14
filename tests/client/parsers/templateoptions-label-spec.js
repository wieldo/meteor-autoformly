describe("autoFormlyParser templateOptions.label", () => {
    let autoFormlyParser;

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_) => {
            autoFormlyParser = _autoFormlyParser_;
        });
    });

    it("should set label property on formly field templateOptions when schema.label exists", () => {
        const field = autoFormlyParser.field("test", {
            type: String,
            label: "test-label"
        });

        expect(field.templateOptions.label).toBe("test-label");
    });

    it("should set key as label property on formly field templateOptions when schema.label does not exist", () => {
        const field = autoFormlyParser.field("test", {
            type: String
        });

        expect(field.templateOptions.label).toBe("test");
    });
});