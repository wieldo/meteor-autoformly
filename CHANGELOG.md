# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Support autoformly.validation.messages in SimpleSchema
- Add optional manual formly configuration for each field in autoFormly service
- Implement more advanced filtering
- `schema.autoformly.templateOptions.rows` to be displayed as textarea

### Deprecated
- Filtering using schema keys as array  

### Fixed
- Prevent templatesObject.label overwriting

## [0.2.1] - 2015-11-18
### Changed
- Refactor all files to use Strict Dependency Injection

## [0.2.0] - 2015-11-18
### Added
- Support for **_Boolean_** type (as checkbox)
- Support for allowedValues with **_String_** type (as select)

## [0.1.0] - 2015-11-15
### Added
- Support for default values
- Support for schema.autoformly.type
- Support for schema.regEx
- Tests for all parsers

## 0.0.1 - 2015-11-14

[Unreleased]: https://github.com/wieldo/meteor-autoformly/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/wieldo/meteor-autoformly/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/wieldo/meteor-autoformly/compare/v0.1.0...v0.2.0 
[0.1.0]: https://github.com/wieldo/meteor-autoformly/compare/v0.0.1...v0.1.0