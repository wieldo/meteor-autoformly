Change Log
==========

All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](http://semver.org/).

[0.8.0](https://github.com/wieldo/meteor-autoformly/compare/v0.7.0...v0.8.0) - 2016-01-18

### Changed

- at least wieldo:angular-formly-validator@1.5.0

[0.7.0](https://github.com/wieldo/meteor-autoformly/compare/v0.6.0...v0.7.0) - 2015-12-30

### Added

-	Support for **Date** fields with **min** and **max**

[0.6.0](https://github.com/wieldo/meteor-autoformly/compare/v0.5.1...v0.6.0)
----------------------------------------------------------------------------

### Added

-	validation for `schema.allowedValues`

### Changed

-	BREAKING CHANGE: uses now **formly:angular-formly** instead of wieldo:angular-formly

[0.5.1](https://github.com/wieldo/meteor-autoformly/compare/v0.5.0...v0.5.1) - 2015-11-25
-----------------------------------------------------------------------------------------

### Added

-	add info about options to autoFormly component's documentation

[0.5.0](https://github.com/wieldo/meteor-autoformly/compare/v0.4.0...v0.5.0) - 2015-11-25
-----------------------------------------------------------------------------------------

### Added

-	`auto-formly` component to automate process of insertion or collection update

[0.4.0](https://github.com/wieldo/meteor-autoformly/compare/v0.3.1...v0.4.0) - 2015-11-25
-----------------------------------------------------------------------------------------

### Added

-	`autoFormly.errors()` method to handle validation errors while inserting or updating collection object

[0.3.1](https://github.com/wieldo/meteor-autoformly/compare/v0.3.0...v0.3.1) - 2015-11-23
-----------------------------------------------------------------------------------------

### Fixed

-	Missing support for **$meteor.collection()**

[0.3.0](https://github.com/wieldo/meteor-autoformly/compare/v0.2.1...v0.3.0) - 2015-11-23
-----------------------------------------------------------------------------------------

### Added

-	Support autoformly.validation.messages in SimpleSchema
-	Add optional manual formly configuration for each field in autoFormly service
-	Implement more advanced filtering
-	`schema.autoformly.templateOptions.rows` to be displayed as textarea

### Deprecated

-	Filtering using schema keys as array  

### Fixed

-	Prevent templatesObject.label overwriting

[0.2.1](https://github.com/wieldo/meteor-autoformly/compare/v0.2.0...v0.2.1) - 2015-11-18
-----------------------------------------------------------------------------------------

### Changed

-	Refactor all files to use Strict Dependency Injection

[0.2.0](https://github.com/wieldo/meteor-autoformly/compare/v0.1.0...v0.2.0) - 2015-11-18
-----------------------------------------------------------------------------------------

### Added

-	Support for ***Boolean*** type (as checkbox)
-	Support for allowedValues with ***String*** type (as select)

[0.1.0](https://github.com/wieldo/meteor-autoformly/compare/v0.0.1...v0.1.0) - 2015-11-15
-----------------------------------------------------------------------------------------

### Added

-	Support for default values
-	Support for schema.autoformly.type
-	Support for schema.regEx
-	Tests for all parsers

0.0.1 - 2015-11-14
------------------
