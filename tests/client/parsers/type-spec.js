describe("autoFormlyParsers type", () => {
    let autoFormlyParser;

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_) => {
            autoFormlyParser = _autoFormlyParser_;
        });
    });

    it("should set input as formly field type on String type", () => {
        const field = autoFormlyParser.field("test", {
            type: String
        });

        expect(field.type).toBe("input");
    });

    it("should set input as formly field type on Number type", () => {
        const field = autoFormlyParser.field("test", {
            type: Number
        });

        expect(field.type).toBe("input");
    });

    it("should set input as formly field type on Date type", () => {
        const field = autoFormlyParser.field("test", {
            type: Date
        });

        expect(field.type).toBe("input");
    });

    it("should not set formly field type on Array type", () => {
        const field = autoFormlyParser.field("test", {
            type: Array
        });
        
        expect(field.type).toBeUndefined();
    });

    it("should not set formly field type on Object type", () => {
        const field = autoFormlyParser.field("test", {
            type: Object
        });

        expect(field.type).toBeUndefined();
    });
});