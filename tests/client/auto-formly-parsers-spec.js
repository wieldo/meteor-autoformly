describe('autoFormlyParser', function () {
    var autoFormlyParser;

    beforeEach(function () {
        module('autoFormly');

        inject(function (_autoFormlyParser_) {
            autoFormlyParser = _autoFormlyParser_;
        });
    });

    describe('register()', function () {

        function throwError(parsers) {
            parsers.forEach((parser) => {
                expect(function () {
                    autoFormlyParser.register(parser);
                }).toThrowError(Error, "[AutoFormly] Parser has to be a function");
            });
        }

        it('should throw error when using number as parser', function () {
            throwError([1, -1, 0, "1", "-1", "0"]);
        });

        it('should throw error when using empty value as parser', function () {
            throwError(["", null, undefined]);
        });

        it('should throw error when using boolean value as parser', function () {
            throwError([true, false]);
        });

        it('should throw error when using object value as parser', function () {
            throwError([{}, []]);
        });

        it('should be able to register parser function', function () {
            var before = autoFormlyParser.parsers.length;

            autoFormlyParser.register(function () {
            });
            expect(autoFormlyParser.parsers.length).toBe(before + 1);
        });
    });

    describe('runParsers()', function () {
        it('should be able to run parsers', function () {
            var spy = jasmine.createSpy('spy');

            autoFormlyParser.register(spy);
            autoFormlyParser.runParsers("test1", {}, {key: 'test'});

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('field()', function () {
        it('should not be able to handle schema field with array of objects type TODO', function () {
            expect(autoFormlyParser.field("parent.$.child")).toBeUndefined();
            expect(autoFormlyParser.field("parent.$")).toBeUndefined();
        });
    });

    function resetParsers() {
        autoFormlyParser.parsers = [];
    }

});