# Changelog

## [19.2.0](https://github.com/extrawest/extra-clarity/compare/v19.1.1...v19.2.0) (2025-04-25)

### ⚠ BREAKING CHANGES

* **time-range-filter:** The format of the EcTimeRangeFilterComponent's output values 'start' and 'end' was changed from numeric unix timestamps to local date (or date-time) strings according to the IANA timezone passed as a component's input (or the client's timezone if nothing passed). The time range preset functions were also affected, as well as the external time-range filter component EcTimeRangeFilterToggleComponent.

### Features

* **time-range-filter:** changed format of output values, added timezone input ([b4c0e23](https://github.com/extrawest/extra-clarity/commit/b4c0e232a4f35679be9be4799b12c996ac1f5cba))
* **timestamp-pipe:** add 'day' precision to format dates without time ([697d25b](https://github.com/extrawest/extra-clarity/commit/697d25b10f5c8cd5be911149d53260efa0988aa4))

### Bug fixes

* **time-range-filter-toggle:** show only dates as toggle's label while working with day-precision ([a9185c7](https://github.com/extrawest/extra-clarity/commit/a9185c7e7bfcee2f44296aaeb7947f2fe4f5916a))

## [19.1.1](https://github.com/extrawest/extra-clarity/compare/v19.1.0...v19.1.1) (2025-03-26)

### Features

* **sidebar-nav:** add helper method to create dividers with unique identity within nav list ([81b252e](https://github.com/extrawest/extra-clarity/commit/81b252e391484dd079c1ce74efc7cb398e5842c4))

### Bug fixes

* **sidebar-nav:** grant all nav items have a unique identity for proper tracking by [@for](https://github.com/for) loops ([eb5901a](https://github.com/extrawest/extra-clarity/commit/eb5901a3a93b5b505ceb2caa87e5ecce34881b6e))

### Misc

* **storybook:** add missing import for card story helper ([e8450d5](https://github.com/extrawest/extra-clarity/commit/e8450d5ae241885b37e37f527b0de4bf42f76216))

## [19.1.0](https://github.com/extrawest/extra-clarity/compare/v19.0.9...v19.1.0) (2025-03-26)

### Features

* migrate to signal queries viewChild(ren) & contentChild(ren) ([af41fd9](https://github.com/extrawest/extra-clarity/commit/af41fd97e33aa5c28bf1a34e580ed29306ed1903))
* migrate to takeUntilDestroyed() for unsubscribing from Observables ([08b6d81](https://github.com/extrawest/extra-clarity/commit/08b6d81717bd5df5966ea41a695b088195037263))
* migrate all templates to new control-flow ([ee14afb](https://github.com/extrawest/extra-clarity/commit/ee14afb10e36f611f6bc9c53807dd387ca09c916))

### Misc

* add external links to badges in top of readme file ([4120d46](https://github.com/extrawest/extra-clarity/commit/4120d46de5820c47f71d6077908ea91bca89084b))

### Documentation

* upgrade readme files with actual data on required version of Clarity packages ([05ddb63](https://github.com/extrawest/extra-clarity/commit/05ddb63bdc4e602e2d6c9b8112f8e8e95ad7a98f))

## [19.0.9](https://github.com/extrawest/extra-clarity/compare/v19.0.8...v19.0.9) (2025-03-26)

### Misc

* set required versions of @clr/angular & @clr/ui as ^17.5.0 (with added support of Angular 19) ([1d96aa8](https://github.com/extrawest/extra-clarity/commit/1d96aa8efd076bc042e598ad962707594818a2b2))
* **release-it:** run 'npm i' before release to grant all modules match versions from package.json ([12f570e](https://github.com/extrawest/extra-clarity/commit/12f570e9c3b24eac83decb7bdd463327df898711))
* **release-it:** build before linting to grant resolution of imports from @extrawest/extra-clarity ([18701f4](https://github.com/extrawest/extra-clarity/commit/18701f4106633d278b72d8189f2065424963e83d))

### CI

* use vXX-latest as npm tag for non-primary releasing branches ([ad22cf5](https://github.com/extrawest/extra-clarity/commit/ad22cf5b2029df64be2a500857c8d8ca3f15f318))

## [19.0.8](https://github.com/extrawest/extra-clarity/compare/v19.0.1...v19.0.8) (2025-03-25)

### Bug fixes

* **string-filter:** stretch input to full width ([7fa583e](https://github.com/extrawest/extra-clarity/commit/7fa583e4f764d18a9e54b5f99e636d623138bb31))

### Misc

* release v19.0.7 ([e04dde3](https://github.com/extrawest/extra-clarity/commit/e04dde32b59940f0b58fc2ffb37a2e6b7d15a7d5))
* update CHANGELOG.md (remove deleted release 19.0.5) ([0b5a32d](https://github.com/extrawest/extra-clarity/commit/0b5a32d97b2a1f8169c80e632c239be6437c3ff9))
* release v19.0.6 ([2dd82bd](https://github.com/extrawest/extra-clarity/commit/2dd82bd74e3a01479bb4741bfab63a93e53b2866))
* release v19.0.5 ([fbe9e83](https://github.com/extrawest/extra-clarity/commit/fbe9e83a2f98159ff8f9e807f4697f3bcd0f26f3))
* reinstall node_modules ([73bf966](https://github.com/extrawest/extra-clarity/commit/73bf96685420412c097db74435dc3b3db6410b73))
* upgrade eslint packages ([ab3578a](https://github.com/extrawest/extra-clarity/commit/ab3578a37364d3369851cd4370a372e9585be880))
* release v19.0.4 ([7b797ff](https://github.com/extrawest/extra-clarity/commit/7b797ffebbb81b75d1059a82cb1f64289389a939))
* release v19.0.3 ([37b247b](https://github.com/extrawest/extra-clarity/commit/37b247b8ee5e12d0c06ce2e1f69477a32bc85a15))
* release v19.0.2 ([cceddd7](https://github.com/extrawest/extra-clarity/commit/cceddd7cd1e1cc575bde381274227183cc11de2d))

### Documentation

* add versions of Angular & Clarity used for current Storybook build ([7cfd0a4](https://github.com/extrawest/extra-clarity/commit/7cfd0a404e63332e6c5de1487af509b45b6f4cb1))

### CI

* fix output name in composite action for getting npm tag ([f988d0e](https://github.com/extrawest/extra-clarity/commit/f988d0e250522cd925ea92df8a24194f0f546efc))
* fix reading value from env variable in bash script for getting npm tag ([bd9669a](https://github.com/extrawest/extra-clarity/commit/bd9669aecb7d17cbf634f8fe595fdd64d334e394))
* reorder steps in GitHub Actions workflow ([182a2aa](https://github.com/extrawest/extra-clarity/commit/182a2aad5d57cbc841224cf78b691f375aac1ad0))
* refactor GitHub Actions workflow, extract custom shell scripts to composite actions ([735aaea](https://github.com/extrawest/extra-clarity/commit/735aaea724e6b8455081f094480398ff1496cfe1))
* add tag for published npm package depending on branch: latest, v18, v17 ([e9e5c35](https://github.com/extrawest/extra-clarity/commit/e9e5c352df8f265dbcc8f6ee2f087d1b81918b8d))
* handle multiline release notes as output of GitHub Action's job ([906c7d6](https://github.com/extrawest/extra-clarity/commit/906c7d67555e4177ac0406f91f76f8cfae2d6aae))
* add quotes to handle multi-line output as single string ([c6706ad](https://github.com/extrawest/extra-clarity/commit/c6706ad0ea98b68f3b68e1fdb6a82da2b42d2fa7))
* try to bring job generating release notes to life ([73c3fb3](https://github.com/extrawest/extra-clarity/commit/73c3fb32f87934b9e740e74b769ae9e2a097d193))

## [19.0.1](https://github.com/extrawest/extra-clarity/compare/v19.0.0...v19.0.1) (2025-03-25)

### Bug fixes

* **search-bar:** stretch input to full width, correct icon alignment & visibility when highlighted ([46d023f](https://github.com/extrawest/extra-clarity/commit/46d023f77b3dee66471c3e3513df8fed3dec946c))

### CI

* use -e flag to enable interpretation of backslash escapes (incl \n) ([83a947e](https://github.com/extrawest/extra-clarity/commit/83a947e5ae6130055da4bd79c8d7033f869dac2e))
* **release-notes:** fix script for preparing release notes for github release (experimental) ([854a943](https://github.com/extrawest/extra-clarity/commit/854a943ff66feb49c6892e5aac13fa6a4779ca86))

## [19.0.0](https://github.com/extrawest/extra-clarity/compare/v18.0.0...v19.0.0) (2025-03-25)

### Features

* upgrade to Angular 19 & Clarity 17.8 ([#13](https://github.com/extrawest/extra-clarity/issues/13)) ([0bb2f9e](https://github.com/extrawest/extra-clarity/commit/0bb2f9e6f08bcb818d796595b384ff7690ec6064))

### Misc

* **git:** add .nx folder entirely to .gitignore ([b09b2ca](https://github.com/extrawest/extra-clarity/commit/b09b2caeb20aa8e3d147df7ecb1f3c78cb8376ae))
* set branch wildcard allowing secondary branches (XX.x) to publish new releases via release-it ([a6b201b](https://github.com/extrawest/extra-clarity/commit/a6b201b56e0f2221f1a26aae5beb4267010f3b88))
* add conventional-changelog-conventionalcommits as explicit dev dependency ([923e8c1](https://github.com/extrawest/extra-clarity/commit/923e8c1b5349d20eb1d7d75a3a64931abc0ee61b))

### CI

* log generated release notes for debug purposes ([875c034](https://github.com/extrawest/extra-clarity/commit/875c0349e9eabb12de167ded35431f5017e0770f))

## 18.0.0 (2025-03-23)

### Documentation

* add package version to overview page ([b63c5cf](https://github.com/extrawest/extra-clarity/commit/b63c5cf))
* **storybook**: upgrade Storybook to version 8.6 (#11) ([79c258f](https://github.com/extrawest/extra-clarity/commit/79c258f)), closes [#11](https://github.com/extrawest/extra-clarity/issues/11)

### CI

* add explicit 'target' suffix for firebase hosting target name, correct comments ([974e05c](https://github.com/extrawest/extra-clarity/commit/974e05c))
* rename workflows ([9532c17](https://github.com/extrawest/extra-clarity/commit/9532c17))
* utilize conventional-changelog to generate release notes for GitHub Releases ([b11d4a3](https://github.com/extrawest/extra-clarity/commit/b11d4a3))
* disable emojis prepending headers within auto-generated release notes ([5b14f84](https://github.com/extrawest/extra-clarity/commit/5b14f84))

### Misc

* reinstall node_modules ([625e44b](https://github.com/extrawest/extra-clarity/commit/625e44b))
* upgrade to Angular 18 (#12) ([c18547d](https://github.com/extrawest/extra-clarity/commit/c18547d)), closes [#12](https://github.com/extrawest/extra-clarity/issues/12)

### BREAKING CHANGE

* EcAutoRefreshComponent's output 'toggle' renamed to 'toggleState' to avoid potential name conflict with standard DOM events

## [17.13.0](https://github.com/extrawest/extra-clarity/compare/v17.12.6...v17.13.0) (2025-03-21)

### ⚠ BREAKING CHANGES

* NumericField has been removed in favor of native alternatives from Clarity 17.6.0:
  - ClrNumberInput component
  - prefix & suffix slots within input fields

### Features

* remove NumericField directive ([2d67557](https://github.com/extrawest/extra-clarity/commit/2d6755779fd290d1a6bde1d60023739937619ac3))

### Misc

* add passed linting as required step prior to pushing new release-tag ([59e010d](https://github.com/extrawest/extra-clarity/commit/59e010d9c433a2cba84b6abbf7a1e54b4e1e783b))
* fix linting errors ([96367bf](https://github.com/extrawest/extra-clarity/commit/96367bfc566eb9cf777f73fd0e5304170c3f1692))
* exclude storybook sources from primary eslint configs to fix broken linting via ng lint ([ce1bd33](https://github.com/extrawest/extra-clarity/commit/ce1bd33b14bd96dda6eff805611b94c824712c27))
* add .nx/cache directory to .gitignore ([29ed61f](https://github.com/extrawest/extra-clarity/commit/29ed61f939b29295b27387b26ee8a6bb2703a6c8))
* add commitlint & husky to validate commit messages against conventional-commits rules ([a4e18e1](https://github.com/extrawest/extra-clarity/commit/a4e18e196934a3d2cf4c88117e0d84360311e42a))

## [17.12.6](https://github.com/extrawest/extra-clarity/compare/0.17.12...v17.12.6) (2025-03-20)

### Misc

* release v17.12.5 ([5f42bce](https://github.com/extrawest/extra-clarity/commit/5f42bce5083260d41af8c34a5d5691c61f8a4c28))
* release v17.12.4 ([87570b1](https://github.com/extrawest/extra-clarity/commit/87570b1801c6c714a0cbbb03a1e9dbb510805b94))
* release v17.12.3 ([d2a71da](https://github.com/extrawest/extra-clarity/commit/d2a71dab57d25eb205a6e6fea6672910626a388b))
* release v17.12.2 ([b83dbaf](https://github.com/extrawest/extra-clarity/commit/b83dbafa6505ea03bf8569f54e1a7fecdf8aa387))
* release v17.12.1 ([1e81f31](https://github.com/extrawest/extra-clarity/commit/1e81f3184b81add452fb047d5fc0067cbad980dd))
* release v17.12.0 ([327b730](https://github.com/extrawest/extra-clarity/commit/327b730e2a90b7e35cbaa2e2001f77376c144b34))

### CI

* fix errors in action scripts ([0a6798b](https://github.com/extrawest/extra-clarity/commit/0a6798b07d422637bab4ffbd94e9948b2d0cca86))
* disable alphabetical sorting of commits within changelog ([68532e8](https://github.com/extrawest/extra-clarity/commit/68532e80f925dee70f0d9fa055cefae0cb197cf5))
* fix incorrect github-output environment variable ([9c5215e](https://github.com/extrawest/extra-clarity/commit/9c5215edb3875d9bc04419d593d6d1ff6b04aa71))
* specify 'shell: bash' for composite actions ([c0d3358](https://github.com/extrawest/extra-clarity/commit/c0d3358695f88724acfd26815037537555e05f29))
* fix typo in action script leading to failed parsing during workflow execution ([b5899ca](https://github.com/extrawest/extra-clarity/commit/b5899caa68bc47f8fdb03e17b2b88fad7b7d7a3d))
* fix typo in action script leading to failed parsing during workflow execution ([083728d](https://github.com/extrawest/extra-clarity/commit/083728d7dac09e112c157b44a84461f8ed62789d))
* create GitHub Release via GitHub Actions, with release notes according to conventional commits ([b5a9c50](https://github.com/extrawest/extra-clarity/commit/b5a9c50154b99f8cab33e3835ffdc40edcd42f79))
* generate CHANGELOG.md according to conventional-commits ([8d9e23a](https://github.com/extrawest/extra-clarity/commit/8d9e23a973c95bc4510706b6f7769afd6270fd6a))
* do not create GitHub Release via release-it script ([e84d61a](https://github.com/extrawest/extra-clarity/commit/e84d61aa0c42ccd05d1b2725e3a3cce86ad0d40e))
* use actions/checkout to make custom actions available within workflows ([88b3efe](https://github.com/extrawest/extra-clarity/commit/88b3efeba03b6e7e62f50981c3eae3ecdf1b6773))
* generate release notes according to conventional-commits, and do not generate CHANGELOG.md ([4ff0681](https://github.com/extrawest/extra-clarity/commit/4ff06816673b23c998100ac1de708c930bcf9512))
* correct release-it configuration to prompt new package version & generate more extended initial changelog ([a8deec3](https://github.com/extrawest/extra-clarity/commit/a8deec385873c2a7398085ca930e4b377e59472f))
* rework CI/CD to support releases & multiple versions ([71b03de](https://github.com/extrawest/extra-clarity/commit/71b03dec404d7873fa04934075c9d2ae5f1ab984))
## [0.17.12](https://github.com/extrawest/extra-clarity/compare/0.17.11...0.17.12) (2025-02-17)
## [0.17.11](https://github.com/extrawest/extra-clarity/compare/0.17.10...0.17.11) (2025-02-17)
## [0.17.10](https://github.com/extrawest/extra-clarity/compare/0.17.9...0.17.10) (2025-01-09)
## [0.17.9](https://github.com/extrawest/extra-clarity/compare/0.17.8...0.17.9) (2024-11-26)
## [0.17.8](https://github.com/extrawest/extra-clarity/compare/0.17.7...0.17.8) (2024-05-09)
## [0.17.7](https://github.com/extrawest/extra-clarity/compare/0.17.6...0.17.7) (2024-05-02)
## [0.17.6](https://github.com/extrawest/extra-clarity/compare/0.17.5...0.17.6) (2024-04-30)
## [0.17.5](https://github.com/extrawest/extra-clarity/compare/0.17.4...0.17.5) (2024-04-27)
## [0.17.4](https://github.com/extrawest/extra-clarity/compare/0.17.3...0.17.4) (2024-04-21)
## [0.17.3](https://github.com/extrawest/extra-clarity/compare/0.17.2...0.17.3) (2024-04-11)
## [0.17.2](https://github.com/extrawest/extra-clarity/compare/0.17.1...0.17.2) (2024-04-09)
## [0.17.1](https://github.com/extrawest/extra-clarity/compare/0.16.7...0.17.1) (2024-04-08)
## [0.16.7](https://github.com/extrawest/extra-clarity/compare/0.16.6...0.16.7) (2024-03-27)
## [0.16.6](https://github.com/extrawest/extra-clarity/compare/0.16.5...0.16.6) (2024-03-04)
## [0.16.5](https://github.com/extrawest/extra-clarity/compare/0.16.4...0.16.5) (2024-02-26)
## [0.16.4](https://github.com/extrawest/extra-clarity/compare/0.16.3...0.16.4) (2024-02-08)
## [0.16.3](https://github.com/extrawest/extra-clarity/compare/0.16.2...0.16.3) (2023-10-12)
## [0.16.2](https://github.com/extrawest/extra-clarity/compare/0.16.1...0.16.2) (2023-09-21)
## [0.16.1](https://github.com/extrawest/extra-clarity/compare/0.15.23...0.16.1) (2023-09-20)
## [0.15.23](https://github.com/extrawest/extra-clarity/compare/0.15.22...0.15.23) (2023-09-18)
## [0.15.22](https://github.com/extrawest/extra-clarity/compare/0.15.21...0.15.22) (2023-09-18)
## [0.15.21](https://github.com/extrawest/extra-clarity/compare/0.15.20...0.15.21) (2023-09-17)
## [0.15.20](https://github.com/extrawest/extra-clarity/compare/0.15.19...0.15.20) (2023-08-30)
## [0.15.19](https://github.com/extrawest/extra-clarity/compare/0.15.18...0.15.19) (2023-08-29)
## [0.15.18](https://github.com/extrawest/extra-clarity/compare/0.15.17...0.15.18) (2023-08-29)
## [0.15.17](https://github.com/extrawest/extra-clarity/compare/0.15.16...0.15.17) (2023-08-29)
## [0.15.16](https://github.com/extrawest/extra-clarity/compare/0.15.15...0.15.16) (2023-08-29)
## [0.15.15](https://github.com/extrawest/extra-clarity/compare/0.15.14...0.15.15) (2023-08-02)
## [0.15.14](https://github.com/extrawest/extra-clarity/compare/0.15.13...0.15.14) (2023-06-27)
## [0.15.13](https://github.com/extrawest/extra-clarity/compare/0.15.12...0.15.13) (2023-06-22)
## [0.15.12](https://github.com/extrawest/extra-clarity/compare/0.15.11...0.15.12) (2023-06-19)
## [0.15.11](https://github.com/extrawest/extra-clarity/compare/0.15.10...0.15.11) (2023-06-16)
## [0.15.10](https://github.com/extrawest/extra-clarity/compare/0.15.9...0.15.10) (2023-06-16)
## [0.15.9](https://github.com/extrawest/extra-clarity/compare/0.15.8...0.15.9) (2023-06-07)
## [0.15.8](https://github.com/extrawest/extra-clarity/compare/0.15.7...0.15.8) (2023-06-07)
## [0.15.7](https://github.com/extrawest/extra-clarity/compare/0.15.6...0.15.7) (2023-06-07)
## [0.15.6](https://github.com/extrawest/extra-clarity/compare/0.15.5...0.15.6) (2023-05-15)
## [0.15.5](https://github.com/extrawest/extra-clarity/compare/0.15.4...0.15.5) (2023-05-15)
## [0.15.4](https://github.com/extrawest/extra-clarity/compare/0.15.3...0.15.4) (2023-05-10)
## [0.15.3](https://github.com/extrawest/extra-clarity/compare/0.15.2...0.15.3) (2023-05-10)
## [0.15.2](https://github.com/extrawest/extra-clarity/compare/0.15.1...0.15.2) (2023-05-10)
## [0.15.1](https://github.com/extrawest/extra-clarity/compare/0.0.44...0.15.1) (2023-05-09)
## [0.0.44](https://github.com/extrawest/extra-clarity/compare/0.0.43...0.0.44) (2023-03-31)
## [0.0.43](https://github.com/extrawest/extra-clarity/compare/0.0.42...0.0.43) (2023-03-30)
## [0.0.42](https://github.com/extrawest/extra-clarity/compare/0.0.41...0.0.42) (2023-03-29)
## [0.0.41](https://github.com/extrawest/extra-clarity/compare/0.0.40...0.0.41) (2023-03-29)
## [0.0.40](https://github.com/extrawest/extra-clarity/compare/0.0.39...0.0.40) (2023-03-29)
## [0.0.39](https://github.com/extrawest/extra-clarity/compare/0.0.38...0.0.39) (2023-03-28)
## [0.0.38](https://github.com/extrawest/extra-clarity/compare/0.0.37...0.0.38) (2023-03-27)
## [0.0.37](https://github.com/extrawest/extra-clarity/compare/0.0.36...0.0.37) (2023-03-27)
## [0.0.36](https://github.com/extrawest/extra-clarity/compare/0.0.35...0.0.36) (2023-03-26)
## [0.0.34](https://github.com/extrawest/extra-clarity/compare/0.0.33...0.0.34) (2023-03-15)
## [0.0.33](https://github.com/extrawest/extra-clarity/compare/0.0.32...0.0.33) (2023-03-01)
## [0.0.32](https://github.com/extrawest/extra-clarity/compare/0.0.31...0.0.32) (2023-03-01)

### Reverted

* Revert "Added AutoRefreshService to persist timers while components rerender" ([24704e6](https://github.com/extrawest/extra-clarity/commit/24704e62e229eb7c56806049eef39272729e341b))
## [0.0.31](https://github.com/extrawest/extra-clarity/compare/0.0.30...0.0.31) (2023-02-26)
## [0.0.30](https://github.com/extrawest/extra-clarity/compare/0.0.29...0.0.30) (2023-02-22)
## [0.0.29](https://github.com/extrawest/extra-clarity/compare/0.0.28...0.0.29) (2023-02-20)
## [0.0.28](https://github.com/extrawest/extra-clarity/compare/0.0.27...0.0.28) (2023-02-16)
## [0.0.27](https://github.com/extrawest/extra-clarity/compare/0.0.26...0.0.27) (2023-01-31)
## [0.0.26](https://github.com/extrawest/extra-clarity/compare/0.0.25...0.0.26) (2023-01-24)
## [0.0.25](https://github.com/extrawest/extra-clarity/compare/0.0.24...0.0.25) (2023-01-24)
## [0.0.24](https://github.com/extrawest/extra-clarity/compare/0.0.23...0.0.24) (2023-01-18)
## [0.0.23](https://github.com/extrawest/extra-clarity/compare/0.0.22...0.0.23) (2023-01-18)
## [0.0.22](https://github.com/extrawest/extra-clarity/compare/0.0.21...0.0.22) (2023-01-18)
## [0.0.21](https://github.com/extrawest/extra-clarity/compare/0.0.20...0.0.21) (2023-01-17)
## [0.0.20](https://github.com/extrawest/extra-clarity/compare/0.0.19...0.0.20) (2023-01-17)
## [0.0.19](https://github.com/extrawest/extra-clarity/compare/0.0.18...0.0.19) (2023-01-12)
## [0.0.18](https://github.com/extrawest/extra-clarity/compare/0.0.17...0.0.18) (2023-01-10)
## [0.0.17](https://github.com/extrawest/extra-clarity/compare/0.0.16...0.0.17) (2023-01-05)
## [0.0.16](https://github.com/extrawest/extra-clarity/compare/0.0.15...0.0.16) (2023-01-05)
## [0.0.15](https://github.com/extrawest/extra-clarity/compare/0.0.14...0.0.15) (2023-01-04)
## [0.0.14](https://github.com/extrawest/extra-clarity/compare/0.0.13...0.0.14) (2022-12-22)
## [0.0.13](https://github.com/extrawest/extra-clarity/compare/0.0.12...0.0.13) (2022-12-22)
## [0.0.12](https://github.com/extrawest/extra-clarity/compare/0.0.11...0.0.12) (2022-12-22)
## [0.0.11](https://github.com/extrawest/extra-clarity/compare/0.0.10...0.0.11) (2022-12-19)
## [0.0.10](https://github.com/extrawest/extra-clarity/compare/0.0.9...0.0.10) (2022-12-19)
## [0.0.9](https://github.com/extrawest/extra-clarity/compare/0.0.8...0.0.9) (2022-12-15)
## [0.0.8](https://github.com/extrawest/extra-clarity/compare/0.0.7...0.0.8) (2022-12-15)
## [0.0.7](https://github.com/extrawest/extra-clarity/compare/0.0.6...0.0.7) (2022-12-14)
## [0.0.6](https://github.com/extrawest/extra-clarity/compare/0.0.5...0.0.6) (2022-12-14)
## [0.0.5](https://github.com/extrawest/extra-clarity/compare/0.0.4...0.0.5) (2022-12-14)
## [0.0.4](https://github.com/extrawest/extra-clarity/compare/0.0.3...0.0.4) (2022-12-08)
## [0.0.3](https://github.com/extrawest/extra-clarity/compare/0.0.2-1...0.0.3) (2022-12-08)
## [0.0.2-1](https://github.com/extrawest/extra-clarity/compare/0.0.2...0.0.2-1) (2022-12-06)
## [0.0.2](https://github.com/extrawest/extra-clarity/compare/0.0.1...0.0.2) (2022-12-06)
## 0.0.1 (2022-12-02)
