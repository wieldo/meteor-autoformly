var both = ['client', 'server'];
var client = 'client';

Package.describe({
    name: "wieldo:autoformly",
    summary: "Create angular-formly forms with automatic insert and update, and automatic reactive validation.",
    version: "0.6.0",

    documentation: 'README.md',
    git: 'https://github.com/wieldo/meteor-autoformly.git'
});

Package.onUse(function (api) {

    var packages = {
        use: [
            'aldeed:simple-schema@1.1.0',
            'aldeed:collection2@2.0.0',
            'underscore',
            'check',
            'angular@1.0.0',
            'angular:angular@1.4.7',
            'pbastowski:angular-babel@1.0.2',
            'pbastowski:angular2-now@0.3.13',
            'mys:angular-template-url@0.0.1',
            'formly:angular-formly@7.3.9_3',
            'wieldo:angular-formly-validator@1.4.0'
        ],
        imply: [
            'mys:angular-template-url',
            'pbastowski:angular-babel',
            'pbastowski:angular2-now',
            'aldeed:simple-schema',
            'aldeed:collection2',
            'formly:angular-formly',
            'wieldo:angular-formly-validator'
        ]
    };

    api.versionsFrom("METEOR@1.0");

    api.use(packages.use);

    api.imply(packages.imply);

    api.addFiles([
        'lib/client/main.js',
        'lib/client/auto-formly-helpers.js',
        'lib/client/auto-formly-parsers.js',
        'lib/client/auto-formly.js',
        'lib/client/auto-formly-component.ng.html',
        'lib/client/auto-formly-component.js',
        // parsers
        'lib/client/parsers/key.js',
        'lib/client/parsers/type.js',
        'lib/client/parsers/templateoptions-label.js',
        'lib/client/parsers/templateoptions-options.js',
        'lib/client/parsers/defaultvalue.js',
        // validation
        'lib/client/parsers/validation/messages.js',
        // validators
        'lib/client/parsers/validators/required.js',
        'lib/client/parsers/validators/minlength.js',
        'lib/client/parsers/validators/maxlength.js',
        'lib/client/parsers/validators/minnumber.js',
        'lib/client/parsers/validators/maxnumber.js',
        'lib/client/parsers/validators/pattern.js',
        'lib/client/parsers/validators/unique.js',
        'lib/client/parsers/validators/allowed.js',
        // extend formlyValidator
        'lib/client/formly-validator/unique.js'
    ], client);

    api.addFiles([
        'lib/schema.js'
    ], both);

});

Package.onTest(function (api) {
    api.use([
        'mongo',
        'underscore',
        'sanjo:jasmine@0.20.2',
        'velocity:helpers',
        'velocity:console-reporter',
        'angular:angular-mocks@1.4.7',
        'wieldo:autoformly'
    ]);

    api.addFiles([
        'tests/client/schema.js',
        'tests/client/collection.js'
    ], both);

    api.addFiles([
        'tests/client/auto-formly-parsers-spec.js',
        'tests/client/auto-formly-spec.js',
        // parsers
        'tests/client/parsers/key-spec.js',
        'tests/client/parsers/templateoptions-label-spec.js',
        'tests/client/parsers/type-spec.js',
        'tests/client/parsers/defaultvalue-spec.js',
        // parsers validation
        'tests/client/parsers/validation/messages-spec.js',
        // parsers validators
        'tests/client/parsers/validators/required-spec.js',
        'tests/client/parsers/validators/pattern-spec.js',
        'tests/client/parsers/validators/minnumber-spec.js',
        'tests/client/parsers/validators/maxnumber-spec.js',
        'tests/client/parsers/validators/minlength-spec.js',
        'tests/client/parsers/validators/maxlength-spec.js',
        'tests/client/parsers/validators/unique-spec.js',
        'tests/client/parsers/validators/allowed-spec.js'
    ], client);
});
