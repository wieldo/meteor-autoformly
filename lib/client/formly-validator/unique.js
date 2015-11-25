const {SetModule} = angular2now;

SetModule('autoFormly').run(['formlyValidator', (formlyValidator) => {
    formlyValidator.register('unique', () => {
        return true;
    });
}]);