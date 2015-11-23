describe('autoFormly', () => {
    //
    // vars
    //

    let autoFormly;

    //
    // helpers
    //

    function fieldExist(key, fields) {
        return "undefined" !== typeof _.find(fields, (field) => field.key === key)
    }

    //
    // tests
    //

    beforeEach(() => {
        module('autoFormly');

        inject(function (_autoFormly_) {
            autoFormly = _autoFormly_;
        });
    });

    describe("filterSchema()", () => {
        it("should fail when fields are not an array", () => {
            const values = ["s", "", 0, 1, true, false, undefined, null, {}, () => {
            }];

            values.forEach((val) => {
                expect(() => {
                    autoFormly.filterSchema({}, val);
                }).toThrowError(Error, "[AutoFormly] Fields to filter have to be an array");
            });
        });

        it('should pass on array fields', () => {
            expect(() => {
                autoFormly.filterSchema({}, []);
            }).not.toThrowError(Error, "[AutoFormly] Fields to filter have to be an array");
        });

        it("should filter correctly", () => {
            const fields = autoFormly.filterSchema(UserSchema, ['username', 'createdAt']);
            expect(fields.username).toBeDefined();
            expect(fields.createdAt).toBeDefined();
            expect(fields.services).toBeUndefined();
        });
    });

    describe('schema()', () => {
        it("should filter correctly using object", () => {
            const fields = autoFormly.schema(UserSchema, {
                fields: {
                    username: true,
                    createdAt: true,
                    services: false
                }
            });
            const keys = {
                username: false,
                createdAt: false,
                services: false
            };

            _.each(keys, (val, key) => {
                keys[key] = fieldExist(key, fields);
            });

            expect(keys.username).toBeTruthy();
            expect(keys.createdAt).toBeTruthy();
            expect(keys.services).toBeFalsy();
        });

        it("should extend autoformly configuration in schema", () => {
            const fields = autoFormly.schema(UserSchema, {
                fields: {
                    username: {
                        templateOptions: {
                            label: "Test label"
                        }
                    }
                }
            });
            const field = _.find(fields, (field) => field.key === 'username');
            expect(field.templateOptions.label).toBe("Test label");
        });

        it('should show all fields excluding one', () => {
            // test all:true without fields
            const allFields = autoFormly.schema(UserSchema, {
                all: true
            });

            // check all:true with one field
            expect(autoFormly.schema(UserSchema, {
                all: true,
                fields: {
                    username: false
                }
            }).length).toEqual(allFields.length - 1);
        });

        it('should show only specified fields', () => {
            const fields = autoFormly.schema(UserSchema, {
                all: false,
                fields: {
                    username: true,
                    createdAt: false
                }
            });
            expect(fieldExist('username', fields)).toBeTruthy();
            expect(fieldExist('createdAt', fields)).toBeFalsy();
        });
        
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