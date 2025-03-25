# Changelog

## [17.13.1](https://github.com/extrawest/extra-clarity/compare/v17.13.0...v17.13.1) (2025-03-25)

### Bug fixes

* **string-filter:** stretch input to full width ([923861c](https://github.com/extrawest/extra-clarity/commit/923861c2de95067f9643c668e94b2a42da35220f))
* **search-bar:** stretch input to full width, correct icon alignment & visibility when highlighted ([b637a5c](https://github.com/extrawest/extra-clarity/commit/b637a5c257b00ad4f965e5a88ae4626b561c3142))

### Misc

* **search-bar:** fix component imports ([a08ea1a](https://github.com/extrawest/extra-clarity/commit/a08ea1a2f0d6eff4f99b1cce9805ff7d77343394))
* **git:** add .nx folder entirely to .gitignore ([0f6da6c](https://github.com/extrawest/extra-clarity/commit/0f6da6cb996374d8f98bf2c2eceae73209eb351a))
* fix broken links to original Clarity docs about datagrids ([cfd5f2b](https://github.com/extrawest/extra-clarity/commit/cfd5f2bd996fa38f78ea5222fc5d4c8cca1385a7))
* **release-it:** correct branch config & required dev dependencies ([67a0902](https://github.com/extrawest/extra-clarity/commit/67a0902d31d690552a7d9b5625e86a558e7463d0))

### Documentation

* add versions of Angular & Clarity used for current Storybook build ([7f6133f](https://github.com/extrawest/extra-clarity/commit/7f6133f88ff3dafb5a8276b2f338fb7c3c0bd424))
* add package version to overview page ([30218f0](https://github.com/extrawest/extra-clarity/commit/30218f0f2e080296d6fa24f53aa75071c348015f))
* **storybook:** upgrade Storybook to version 8.6 ([#11](https://github.com/extrawest/extra-clarity/issues/11)) ([79c258f](https://github.com/extrawest/extra-clarity/commit/79c258f4b0756ddaa5f67580b4adfe771a81f6e0))

### CI

* repair generation of release notes in GitHub Actions ([365870e](https://github.com/extrawest/extra-clarity/commit/365870e040fcf917d8c01ab1fe3db751036e1e6a))
* correct formatting according to main branch ([3ebfde1](https://github.com/extrawest/extra-clarity/commit/3ebfde1436ae91bdc033b94281d7e338a1b96edb))
* rename workflows ([0d7de86](https://github.com/extrawest/extra-clarity/commit/0d7de86b462e0c80b2aaa81006e3945022ddc1bb))
* revert setting of storybook site prefix to evaluate it dynamically from package version ([0a5449d](https://github.com/extrawest/extra-clarity/commit/0a5449d4f6ff0a5a13c493fe13830a83716827c0))
* set storybook hosting site explicitly in .firebaserc ([a5ba68d](https://github.com/extrawest/extra-clarity/commit/a5ba68d58729bd95cf328d00d3bdd72dde913cf6))
* utilize conventional-changelog to generate release notes for GitHub Releases ([b11d4a3](https://github.com/extrawest/extra-clarity/commit/b11d4a3f20ef17a9bf5e86004cf41964394f9f0f))
* disable emojis prepending headers within auto-generated release notes ([5b14f84](https://github.com/extrawest/extra-clarity/commit/5b14f84fa9bcada9664676004b83d2251a433ade))

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
