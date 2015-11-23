describe("autoFormlyParser validation.messages", () => {
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

    it("should set validation messages on formly field", () => {
        const field = autoFormlyParser.field("test", {
            autoformly: {
                validation: {
                    messages: {
                        required: true
                    }
                }
            }
        });

        expect(field.validation.messages.required).toBe(true);
    });

});
