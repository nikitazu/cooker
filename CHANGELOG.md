# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2018-09-02
### Added
- Search box added to the top of the document.
- Typing text into search box would filter "Harvested Seeds".
- Search is done in the following algorithm:
  * search starts when more than one character is typed in;
  * if less than one character is typed in the search is reset;
  * seeds are searched in both checked and unchecked boxes;
  * seed name could be equal or just containing search criteria;
  * search criteria could be typed in lower case;
  * search criteria could by typed ignoring non alphabetical characters.

## [0.1.0] - 2018-08-22
### Changed
- "Gardener's Compendium" section made togglable.
- "Gardener's Compendium" section visibility persists.
- Ensure "Baker's wheat" is harvested by default.
- Changed local storage key names.
- Migration code for local storage.

## [0.0.10] - 2018-08-22
### Changed
- Split the list of checkboxes in "Harvested seeds" section.

## [0.0.9] - 2018-08-21
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

