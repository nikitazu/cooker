# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Undo alphabetical sort in "Harvested seeds" section.
- More aggressive png crushing.
- Scaledown all plant icons to prevent scrolling.

## [0.0.8] - 2018-08-18
### Added
- Add plant seed images (minified with pngcrush).
- Blue border on hovering "Harvested seed" items.
- Deploy script now uploads images.

## [0.0.7] - 2018-08-18
### Added
- Unit tests.

### Changed
- Lots of refactoring.
- CodeClimante's "A" status achieved.

## [0.0.6] - 2018-08-16
### Changed
- [FIX] deploy script creates dist directory before uploading bundle.js.
- Display "Harvested seeds" sorted by name.

## [0.0.5] - 2018-08-16
### Added
- Setup npm and generate node package.
- Setup webpack to run ES6 modules.
- Setup make to run webpack.
- Setup make to run deploy.
- Setup make to run tests in the future.

## [0.0.4] - 2018-08-16
### Changed
- Rename section "All mutations" to "Gardener's Compendium".
- Rename section "Available plants" to "Harvested seeds".
- Add button to "Uncheck harvested seeds".

## [0.0.3] - 2018-08-13
### Added
- Script deploy.sh to upload site data.
- Script deploy.env.sh to store sensitive settings.
- Exclude deploy.env.sh from git to prevent accidental commit.
- Exclude editor temporary files for vim and emacs.

### Changed
- Display plant names instead of plant IDs in "Recommended plants" section.

### Removed
- Do not show plant IDs in parenthesis after plant names.

## [0.0.2] - 2018-08-07
### Added
- Plant ID and mutation parent ID consistency check.

### Changed
- Whiskerbloom's mutation parent ID was fixed.

## [0.0.1] - 2018-07-26
### Added
- Plants requirements.
- Plants propabilities.
- Editable list of available plants with local storage.
- Recommendation list of plants to fuse.

### Changed
- All.

### Removed
- None.

