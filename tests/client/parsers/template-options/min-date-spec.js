describe("autoFormlyParser templateOptions.minDate", () => {
  let autoFormlyParser;

  beforeEach(() => {
    module('autoFormly');

    inject((_autoFormlyParser_) => {
      autoFormlyParser = _autoFormlyParser_;
    });
  });

  it("should set templateOptions.minDate", () => {
    const date = new Date(1995, 11, 17);
    const field = autoFormlyParser.field("test", {
      type: Date,
      min: date
    });

    expect(field.templateOptions.minDate).toEqual(date);
  });
});
