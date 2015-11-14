describe("autoFormlyParser key", () => {
    let autoFormlyParser;

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_) => {
            autoFormlyParser = _autoFormlyParser_;
        });
    });

    it("should set key property on formly field", () => {
        const field = autoFormlyParser.field("test", {
            type: String
        });
        
        expect(field.key).toBe("test");
    });
});