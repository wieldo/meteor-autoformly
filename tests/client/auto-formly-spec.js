describe('autoFormly', () => {
    let autoFormly;

    beforeEach(() => {
        module('autoFormly');

        inject(function (_autoFormly_) {
            autoFormly = _autoFormly_;
        });
    });

    describe("filterSchema()", () => {
        it("should fail when fields are not an array or object", () => {
            const values = ["s", "", 0, 1, true, false, undefined, null, () => {
            }];

            values.forEach((val) => {
                expect(() => {
                    autoFormly.filterSchema({}, val);
                }).toThrowError(Error, "[AutoFormly] Fields have to be an array or object");
            });
        });

        it('should pass on array fields', () => {
            expect(() => {
                autoFormly.filterSchema({}, []);
            }).not.toThrowError(Error, "[AutoFormly] Fields have to be an array or object");
        });

        it('should pass on object fields', () => {
            expect(() => {
                autoFormly.filterSchema({}, {});
            }).not.toThrowError(Error, "[AutoFormly] Fields have to be an array or object");
        });

        it("should filter correctly using array", () => {
            const fields = autoFormly.filterSchema(UserSchema, ['username', 'createdAt']);
            expect(fields.username).toBeDefined();
            expect(fields.createdAt).toBeDefined();
            expect(fields.services).toBeUndefined();
        });

        it("should filter correctly using object", () => {
            const fields = autoFormly.filterSchema(UserSchema, {
                username: true,
                createdAt: true,
                services: false
            });
            expect(fields.username).toBeDefined();
            expect(fields.createdAt).toBeDefined();
            expect(fields.services).toBeUndefined();
        });

        it("should extend autoformly configuration in schema", () => {
            const fields = autoFormly.filterSchema(UserSchema, {
                username: {
                    templateOptions: {
                        label: "Test label"
                    }
                }
            });
            expect(fields.username.autoformly.templateOptions.label).toBe("Test label");
        });
    });

    describe('schema()', () => {
        it('should fail on non SimpleSchema objects', () => {
            const values = ["s", "", 0, 1, true, false, undefined, null, {}, () => {
            }];

            values.forEach((val) => {
                expect(() => {
                    autoFormly.schema(val);
                }).toThrowError(Error, "[AutoFormly] Schema has to be instance of SimpleSchema");
            });
        });
    });

});