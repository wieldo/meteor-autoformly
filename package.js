var both = ['client', 'server'];
var client = 'client';
var server = 'server';

Package.describe({
    name: "wieldo:autoformly",
    summary: "Create angular-formly forms with automatic insert and update, and automatic reactive validation.",
    version: "0.0.1",

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
            'wieldo:angular-formly-validator@1.0.0'
        ],
        imply: [
            'wieldo:angular-formly-validator',
            'aldeed:simple-schema',
            'aldeed:collection2'
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
        // parsers
        'lib/client/parsers/key.js',
        'lib/client/parsers/type.js',
        'lib/client/parsers/templateoptions-label.js',
        // validators
        'lib/client/parsers/validators/required.js',
        'lib/client/parsers/validators/minlength.js',
        'lib/client/parsers/validators/maxlength.js',
        'lib/client/parsers/validators/minnumber.js',
        'lib/client/parsers/validators/maxnumber.js'
    ], client);

    api.addFiles([
        'lib/schema.js'
    ], both);
    
});

Package.onTest(function(api) {
    api.use([
        'pbastowski:angular-babel@1.0.2',
        'pbastowski:angular2-now@0.3.13',
        'underscore@1.0.4',
        'sanjo:jasmine@0.20.2',
        'velocity:helpers',
        'velocity:console-reporter',
        'angular:angular-mocks@1.4.7',
        'aldeed:simple-schema@1.1.0',
        'wieldo:autoformly'
    ]);

    api.addFiles([
        'tests/client/schema.js',
        'tests/client/auto-formly-parsers-spec.js',
        'tests/client/auto-formly-spec.js'
    ], client);
});