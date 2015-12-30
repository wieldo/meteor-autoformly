describe("autoFormlyParser templateOptions.maxDate", () => {
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
      max: date
    });

    expect(field.templateOptions.maxDate).toEqual(date);
  });
});
