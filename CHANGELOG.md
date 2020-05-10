# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project mostly adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2020-05-09

### Added
- Added a `children-not-last` variant

### Changed
- Changed the implementation of the `children-not-first` variant to `> :not(:first-child)` (instead of `> * + *`) for consistency with `children-not-last`

## [2.0.0] - 2020-02-05

### Added
- Added a `children-not-first` variant (e.g. `children:not-first:border-t`)

### Changed
- Changed to use Tailwind 1.2’s new plugin definition syntax
- Changed the name and class prefix of the following variants:
  - `first-child` is now `children-first` and its class prefix is now `children:first:`
  - `last-child` is now `children-last` and its class prefix is now `children:last:`
  - `odd-children` is now `children-odd` and its class prefix is now `children:odd:`
  - `even-children` is now `children-even` and its class prefix is now `children:even:`

### Fixed
- Fixed an issue where the variants didn’t work as expected on utilities with pseudo-elements

## [1.3.0] - 2019-12-20

### Added
- Added `children-visited` and `children-disabled` variants

## [1.2.0] - 2019-09-02

### Added
- Added `odd-children` and `even-children` variants

## [1.1.0] - 2019-07-08

### Added
- Added 4 variants: `children-hover`, `children-focus`, `children-focus-within`, and `children-active`

## [1.0.0] - 2019-02-14

Initial release

[Unreleased]: https://github.com/benface/tailwindcss-children/compare/v2.1.0...HEAD
[2.1.0]: https://github.com/benface/tailwindcss-children/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/benface/tailwindcss-children/compare/v1.3.0...v2.0.0
[1.3.0]: https://github.com/benface/tailwindcss-children/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/benface/tailwindcss-children/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/benface/tailwindcss-children/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/benface/tailwindcss-children/releases/tag/v1.0.0
