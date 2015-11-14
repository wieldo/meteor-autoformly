describe('autoFormly', () => {
    let autoFormly;

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
                }).toThrowError(Error, "[AutoFormly] Fields have to be an array");
            });
        });
        it("should filter correctly", () => {
            const fields = autoFormly.filterSchema(UserSchema, ['username', 'createdAt']);
            expect(fields.username).toBeDefined();
            expect(fields.createdAt).toBeDefined();
            expect(fields.services).toBeUndefined();
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