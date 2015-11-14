describe('autoFormlyParser', () => {
    let autoFormlyParser;

    const emptyParsers = () => {
        autoFormlyParser.parsers = [];
    };

    const throwErrorOnRegister = (parsers) => {
        parsers.forEach((parser) => {
            expect(() => {
                autoFormlyParser.register(parser);
            }).toThrowError(Error, "[AutoFormly] Parser has to be a function");
        });
    };

    beforeEach(() => {
        module('autoFormly');

        inject((_autoFormlyParser_) => {
            autoFormlyParser = _autoFormlyParser_;
        });
    });

    describe('register()', () => {

        it('should throw error when using number as parser', () => {
            throwErrorOnRegister([1, -1, 0, "1", "-1", "0"]);
        });

        it('should throw error when using empty value as parser', () => {
            throwErrorOnRegister(["", null, undefined]);
        });

        it('should throw error when using boolean value as parser', () => {
            throwErrorOnRegister([true, false]);
        });

        it('should throw error when using object value as parser', () => {
            throwErrorOnRegister([{}, []]);
        });

        it('should be able to register parser function', () => {
            const before = autoFormlyParser.parsers.length;

            autoFormlyParser.register(() => {
            });
            expect(autoFormlyParser.parsers.length).toBe(before + 1);
        });
    });

    describe('runParsers()', () => {

        it('should be able to run parsers with field key, schema and formly configuration', () => {
            emptyParsers();
            const spy = jasmine.createSpy('spy');

            autoFormlyParser.register(spy);
            autoFormlyParser.runParsers("test1", {}, {key: 'test'});

            expect(spy).toHaveBeenCalledWith("test1", {}, {key: 'test'});
        });
        it('shoud pass copy of fieldSchema in each parser', () => {
            emptyParsers();
            const spy = jasmine.createSpy('spy');
            const fieldSchema = {
                name: "test"
            };

            autoFormlyParser.register((fk, fs) => {
                spy();
                fs.name = "test3";
            });
            autoFormlyParser.runParsers("test", fieldSchema, {});

            expect(spy).toHaveBeenCalled();
            expect(fieldSchema.name).toBe("test");
        });

    });

    describe('field()', () => {
        it('should not be able to handle schema field with array of objects type TODO', () => {
            expect(autoFormlyParser.field("parent.$.child")).toBeUndefined();
            expect(autoFormlyParser.field("parent.$")).toBeUndefined();
        });

        it('should run parsers', () => {
            const fieldKey = "test";
            const fieldSchema = {
                name: "test"
            };

            emptyParsers();
            autoFormlyParser.register((fKey, fSchema, fFormly) => {
                fFormly.key = fSchema.name;
            });

            expect(autoFormlyParser.field(fieldKey, fieldSchema)).toEqual({
                key: "test"
            });
        });
    });

    describe('schema()', () => {
        it('should be handle run parsers and reject keys with $ sign', () => {
            emptyParsers();
            autoFormlyParser.register((fKey, fSchema, fFormly) => {
                fFormly.key = fKey;
                fFormly.type = 'input';
            });

            const fields = autoFormlyParser.schema(UserSchema.schema());

            expect(fields.length).toBe(20);
        });
    });

});