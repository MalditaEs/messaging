## [1.2.18](https://github.com/botpress/messaging/compare/v1.2.17...v1.2.18) (2025-03-13)


### Bug Fixes

* **telegram:** markdown not being correctly set and release ([#679](https://github.com/botpress/messaging/issues/679)) ([6893d90](https://github.com/botpress/messaging/commit/6893d902aaafdf8e751970af6f6809cf4e37529f))



## [1.2.17](https://github.com/botpress/messaging/compare/v1.2.16...v1.2.17) (2024-04-29)


### Bug Fixes

* **telegram:** fix oneTime ([#671](https://github.com/botpress/messaging/issues/671)) ([6304846](https://github.com/botpress/messaging/commit/63048464e6f17c34097e856e872d4221cada7855))



## [1.2.16](https://github.com/botpress/messaging/compare/v1.2.15...v1.2.16) (2024-03-27)


### Bug Fixes

* **messaging:** ignore cache when socket init ([#665](https://github.com/botpress/messaging/issues/665)) ([be85034](https://github.com/botpress/messaging/commit/be850343688a9e79c2c49a48b7ac50d8c5b9a3fc))
* **messaging:** show bot typing from buttons ([#661](https://github.com/botpress/messaging/issues/661)) ([a47d33c](https://github.com/botpress/messaging/commit/a47d33c77d4f9ea62bcbfd2f4e8fc67bdce4ada8))


### Features

* **teams:** add support for quotes ([#663](https://github.com/botpress/messaging/issues/663)) ([0ad7c3c](https://github.com/botpress/messaging/commit/0ad7c3c9f05ea36036ed8022d823cc457179c60a))



## [1.2.15](https://github.com/botpress/messaging/compare/v1.2.14...v1.2.15) (2024-02-29)


### Bug Fixes

* **webchat:** make html escaping configurable ([#654](https://github.com/botpress/messaging/issues/654)) ([b937a8a](https://github.com/botpress/messaging/commit/b937a8ac741ee734b7b61c4ce6e2df063d24b202))


### Features

* **twilio:** add file upload support ([#655](https://github.com/botpress/messaging/issues/655)) ([66361d0](https://github.com/botpress/messaging/commit/66361d0a05f993b09cb69aa2431c6373310efbef))



## [1.2.14](https://github.com/botpress/messaging/compare/v1.2.13...v1.2.14) (2024-02-07)


### Features

* **twilio:** add retry on message send fail ([#651](https://github.com/botpress/messaging/issues/651)) ([a40bc7b](https://github.com/botpress/messaging/commit/a40bc7b6e3953e5a9f9be0332e00d22215f944c9))



## [1.2.11](https://github.com/botpress/messaging/compare/v1.2.10...v1.2.11) (2023-09-12)


### Bug Fixes

* **css:** removed header icon size ([#612](https://github.com/botpress/messaging/issues/612)) ([2d26b69](https://github.com/botpress/messaging/commit/2d26b69fb54ee8ab1aca0d93062f4a7e55aa9d7a))
* **css:** webchat text buttle white spaces ([#613](https://github.com/botpress/messaging/issues/613)) ([89db5ac](https://github.com/botpress/messaging/commit/89db5ac4c49e87135c9699d1fa676f0efd753d46))
* **engine:** lock sqlite version ([#628](https://github.com/botpress/messaging/issues/628)) ([188e125](https://github.com/botpress/messaging/commit/188e1254846ff29bcee22423d8310c01796f1c8a))
* **engine:** roll back sqlite version ([#621](https://github.com/botpress/messaging/issues/621)) ([003d79e](https://github.com/botpress/messaging/commit/003d79ebc78d36605669c10d647d80cdd0c9122a))
* **inject:** change color of dropdown text ([#594](https://github.com/botpress/messaging/issues/594)) ([ba40961](https://github.com/botpress/messaging/commit/ba40961d7f0d59631993313368d5657b1069610d))
* **lock:** delete redis subservice lock if the refresh or release failed ([#617](https://github.com/botpress/messaging/issues/617)) ([78f978a](https://github.com/botpress/messaging/commit/78f978a52d5793dcc1997479df6b87767d078e63))
* **messaging-components:** display address link if the address label isn't available ([#587](https://github.com/botpress/messaging/issues/587)) ([03ce110](https://github.com/botpress/messaging/commit/03ce1106cadee1bdb48628de444282ce34f793c7))
* **messenger:** allow buttonless card ([#579](https://github.com/botpress/messaging/issues/579)) ([adb389a](https://github.com/botpress/messaging/commit/adb389ad7e28d67d45a2f0d8a665bc0dc218c493))
* **triggers:** hide triggers ([#597](https://github.com/botpress/messaging/issues/597)) ([1d40fee](https://github.com/botpress/messaging/commit/1d40feedd66335c3562a496baceff20fa63fd1fa))
* **webchat/shareable:** fix shareable stylesheet to make it work with the mobile friendly media queries ([#592](https://github.com/botpress/messaging/issues/592)) ([1cdfceb](https://github.com/botpress/messaging/commit/1cdfceb9eb7cf33b9b2dea31bbeb334ffd31775a))
* **webchat:** convert plain URLs to links in markdown messages ([#607](https://github.com/botpress/messaging/issues/607)) ([d341cf8](https://github.com/botpress/messaging/commit/d341cf8d55d520c56e1f5fbc03f0c1940f699f21))
* **webchat:** correctly override color for all react-select dropdowns ([#608](https://github.com/botpress/messaging/issues/608)) ([74cb9f1](https://github.com/botpress/messaging/commit/74cb9f1c230a2cc26fe16015105a1d410e95a875))
* **webchat:** default to lazy webchat ([#619](https://github.com/botpress/messaging/issues/619)) ([15546ec](https://github.com/botpress/messaging/commit/15546ec18dd2248a8ae75b5846a2261a8db3f5f0))
* **webchat:** fix react-select color override ([#610](https://github.com/botpress/messaging/issues/610)) ([b487d9b](https://github.com/botpress/messaging/commit/b487d9b5f325de489db4335c30dfb04b23d0b73d))
* **webchat:** fix single choice needs to be clicked twice for them to work ([#589](https://github.com/botpress/messaging/issues/589)) ([6afc1bc](https://github.com/botpress/messaging/commit/6afc1bc0102faf7d333ceea2100780823a4e57cb))
* **webchat:** fix webchat responsiveness issue ([#590](https://github.com/botpress/messaging/issues/590)) ([7064861](https://github.com/botpress/messaging/commit/7064861eca975832c5fd628a467f5ea579fdcb3d))
* **webchat:** fix webchat responsiveness issue ([#591](https://github.com/botpress/messaging/issues/591)) ([cc4421e](https://github.com/botpress/messaging/commit/cc4421e1c178797b5fb5ab73e092fe7564e5863d))
* **webchat:** improved the mobile rendering of the webchat ([#588](https://github.com/botpress/messaging/issues/588)) ([3922a00](https://github.com/botpress/messaging/commit/3922a00ff854cac1513ebaeedd66b0dfe4abe6a9))
* **webchat:** increase conversation history length ([#622](https://github.com/botpress/messaging/issues/622)) ([1e18a83](https://github.com/botpress/messaging/commit/1e18a83f96659f476a8f72bc00e03c2460414d91))
* **webchat:** triggers pt2 ([#598](https://github.com/botpress/messaging/issues/598)) ([6699923](https://github.com/botpress/messaging/commit/6699923e45421505149a1000fe83ced1cdcd2b9d))
* **webchat:** typing indicators on msg sent ([#625](https://github.com/botpress/messaging/issues/625)) ([efc004c](https://github.com/botpress/messaging/commit/efc004c014b533dd7f1b83a1df2db1208f15db06))


### Features

* **messaging:** single tenant option ([#615](https://github.com/botpress/messaging/issues/615)) ([c480db0](https://github.com/botpress/messaging/commit/c480db059bb6f8a57ea674ba43384d02ae490241))
* **slack:** allow receiving file/audio/video/image ([#573](https://github.com/botpress/messaging/issues/573)) ([167a9c3](https://github.com/botpress/messaging/commit/167a9c34d97d205d966328ef9eab61af0599cf7d))
* **webchat:** added new theme ([#616](https://github.com/botpress/messaging/issues/616)) ([c61d4c5](https://github.com/botpress/messaging/commit/c61d4c5fe0c84a5c0d42473d757a9255d4697cdf))



## [1.2.8](https://github.com/botpress/messaging/compare/v1.2.7...v1.2.8) (2023-04-13)


### Bug Fixes

* **client:** better instructions ([#556](https://github.com/botpress/messaging/issues/556)) ([4fd1e81](https://github.com/botpress/messaging/commit/4fd1e81dd4cd4260b7f6c6f773946be6fac8fe23))
* **messaging:** add new payloads ([#557](https://github.com/botpress/messaging/issues/557)) ([125b4ef](https://github.com/botpress/messaging/commit/125b4ef0b0ab9f884565965e9433d7159da37dcc))
* **messaging:** fix inject error ([#551](https://github.com/botpress/messaging/issues/551)) ([87a8ef5](https://github.com/botpress/messaging/commit/87a8ef5529feed93915f5ce4306eb739192c38d9))
* **webchat:** inconsistent scrolling behavior ([#550](https://github.com/botpress/messaging/issues/550)) ([799d051](https://github.com/botpress/messaging/commit/799d0515028ce9616a5fe32ce3af80216aa6a764))
* **webchat:** only display send tooltip on desktop ([#578](https://github.com/botpress/messaging/issues/578)) ([c3ab0fb](https://github.com/botpress/messaging/commit/c3ab0fbc8c33c36a42d66c821be63d61bd2b920d))


### Features

* **gh-actions:** allow uploading webchat manually on staging ([#568](https://github.com/botpress/messaging/issues/568)) ([ae6d553](https://github.com/botpress/messaging/commit/ae6d553c360abba27a2ea926cd7fa53c1b631c2d))
* **webchat:** add userData ([#576](https://github.com/botpress/messaging/issues/576)) ([cae0d2d](https://github.com/botpress/messaging/commit/cae0d2dc0e366a2708a1e4704f4d16a3956e9c56))



## [1.2.7](https://github.com/botpress/messaging/compare/v1.2.6...v1.2.7) (2022-10-19)


### Bug Fixes

* **webchat:** remove start conversion button ([#541](https://github.com/botpress/messaging/issues/541)) ([9d5b5e5](https://github.com/botpress/messaging/commit/9d5b5e59663b26711571e3796a077a50878aeadb))


### Features

* **server:** added prometheus metrics to messaging server ([#546](https://github.com/botpress/messaging/issues/546)) ([bf7fd94](https://github.com/botpress/messaging/commit/bf7fd9431232e504152d15d21f2fedc452445d1e))
* **telegram:** allow receiving file/audio/video/image ([#543](https://github.com/botpress/messaging/issues/543)) ([ba628dd](https://github.com/botpress/messaging/commit/ba628dd33aaebc607ae802cc085a42da0be0a314))



## [1.2.6](https://github.com/botpress/messaging/compare/v1.2.2...v1.2.6) (2022-09-23)


### Bug Fixes

* **components:** fix dropdown not disappearing after selection ([#507](https://github.com/botpress/messaging/issues/507)) ([d3558f6](https://github.com/botpress/messaging/commit/d3558f6dab089a8c30526533844ff986181443a6))
* **components:** focus composer when single choice btn is clicked ([#525](https://github.com/botpress/messaging/issues/525)) ([f467a13](https://github.com/botpress/messaging/commit/f467a13bf34d8bc06d80206f5eaada4df498b7a1))


### Features

* **messenger:** allow receiving file content elements ([#480](https://github.com/botpress/messaging/issues/480)) ([cfab6a1](https://github.com/botpress/messaging/commit/cfab6a175a36dbf1589e41cee804f43b17f79e2d))
* **webchat:** added bot info page to webchat ([#537](https://github.com/botpress/messaging/issues/537)) ([bff1b2f](https://github.com/botpress/messaging/commit/bff1b2ffa4729c6805830c68b262298d20233248))
* **webchat:** allow to react on message click ([#521](https://github.com/botpress/messaging/issues/521)) ([ace6d45](https://github.com/botpress/messaging/commit/ace6d454e63ad14096abe05dc0d33b278a2676d9))
* **webchat:** allow users to subscribe to different webchat events ([#522](https://github.com/botpress/messaging/issues/522)) ([d41eb38](https://github.com/botpress/messaging/commit/d41eb389a135e0cfa9b1625a9de969bb40d80259)), closes [#523](https://github.com/botpress/messaging/issues/523)
* **webchat:** create conversation from iframe api ([#524](https://github.com/botpress/messaging/issues/524)) ([39bc15e](https://github.com/botpress/messaging/commit/39bc15ee6e5f6bd1a8912f562f7d6bad30ba9d08))



## [1.2.5](https://github.com/botpress/messaging/compare/v1.2.4...v1.2.5) (2022-07-29)


## [1.2.4](https://github.com/botpress/messaging/compare/v1.2.3...v1.2.4) (2022-07-28)


### Bug Fixes

* **components:** fix dropdown not disappearing after selection ([#507](https://github.com/botpress/messaging/issues/507)) ([d3558f6](https://github.com/botpress/messaging/commit/d3558f6dab089a8c30526533844ff986181443a6))



## [1.2.3](https://github.com/botpress/messaging/compare/v1.2.2...v1.2.3) (2022-05-25)


### Features

* **messenger:** allow receiving file content elements ([#480](https://github.com/botpress/messaging/issues/480)) ([cfab6a1](https://github.com/botpress/messaging/commit/cfab6a175a36dbf1589e41cee804f43b17f79e2d))



## [1.2.2](https://github.com/botpress/messaging/compare/v1.2.1...v1.2.2) (2022-04-19)


### Bug Fixes

* **shutdown:** fix channels not being cleared correctly ([#444](https://github.com/botpress/messaging/issues/444)) ([95fde0f](https://github.com/botpress/messaging/commit/95fde0ff690a0b47f1f0cde3721c1ff44da320f0))



## [1.2.1](https://github.com/botpress/messaging/compare/v1.2.0...v1.2.1) (2022-04-12)


### Features

* **channels:** channel validation ([#437](https://github.com/botpress/messaging/issues/437)) ([23a6990](https://github.com/botpress/messaging/commit/23a69901f1ad7e1f128bc97cb4466d1c0a4993c4))



# [1.2.0](https://github.com/botpress/messaging/compare/v1.1.8...v1.2.0) (2022-04-01)



## [1.1.8](https://github.com/botpress/messaging/compare/v1.1.7...v1.1.8) (2022-03-30)


### Bug Fixes

* **distributed:** fix locks failing to release ([#429](https://github.com/botpress/messaging/issues/429)) ([dc1f159](https://github.com/botpress/messaging/commit/dc1f1592b7a8376932d79b36919b80fc77e72cc2))


### Features

* **user-tokens:** user tokens api ([#428](https://github.com/botpress/messaging/issues/428)) ([52028f8](https://github.com/botpress/messaging/commit/52028f8a0173fe434d9ba9ddb614dbd2ff2d62a5))



## [1.1.7](https://github.com/botpress/messaging/compare/v1.1.6...v1.1.7) (2022-03-25)


### Bug Fixes

* **messenger:** remove flaky typing off event ([#422](https://github.com/botpress/messaging/issues/422)) ([80549c7](https://github.com/botpress/messaging/commit/80549c772b4f6f01da13f55db0d79ab113fd15a4))


### Features

* **channels:** custom channels ([#425](https://github.com/botpress/messaging/issues/425)) ([a818301](https://github.com/botpress/messaging/commit/a818301604041592364842fb054f620ed6bee2c6))



## [1.1.6](https://github.com/botpress/messaging/compare/v1.1.5...v1.1.6) (2022-03-22)



## [1.1.5](https://github.com/botpress/messaging/compare/v1.1.4...v1.1.5) (2022-03-17)


### Features

* **components:** added location component ([#409](https://github.com/botpress/messaging/issues/409)) ([89ea074](https://github.com/botpress/messaging/commit/89ea074bd5f45a6bfdeeb735a25956617c48c111))



## [1.1.4](https://github.com/botpress/messaging/compare/v1.1.3...v1.1.4) (2022-03-10)


### Bug Fixes

* **pkg:** revert to 5.2.0 ([#404](https://github.com/botpress/messaging/issues/404)) ([58cdf9a](https://github.com/botpress/messaging/commit/58cdf9a4776e69eea9d1044f2a90313bc5c8de94))
* **sockets:** fix socket unable to send error message crashing server ([#402](https://github.com/botpress/messaging/issues/402)) ([b18c779](https://github.com/botpress/messaging/commit/b18c779df73a2a7905e6503de2342b27443c7380))



## [1.1.3](https://github.com/botpress/messaging/compare/v1.1.2...v1.1.3) (2022-02-18)


### Bug Fixes

* **channels:** logging incorrect webhook ([#381](https://github.com/botpress/messaging/issues/381)) ([cf5a296](https://github.com/botpress/messaging/commit/cf5a2960405ea8ea0aaa9795c06f592807052736))
* **client:** wrong typing ([#376](https://github.com/botpress/messaging/issues/376)) ([307b9f8](https://github.com/botpress/messaging/commit/307b9f82153e15d1020c70bbadfa4b72893291cc))


### Features

* **webchat:** local storage encryption ([#377](https://github.com/botpress/messaging/issues/377)) ([be16c91](https://github.com/botpress/messaging/commit/be16c91896f5a100dc18ef9b1794c50aa56fcd68))



## [1.1.2](https://github.com/botpress/messaging/compare/v1.1.1...v1.1.2) (2022-02-17)



## [1.1.1](https://github.com/botpress/messaging/compare/v1.1.0...v1.1.1) (2022-02-17)


### Bug Fixes

* **teams:** error crashing server ([#370](https://github.com/botpress/messaging/issues/370)) ([46269bc](https://github.com/botpress/messaging/commit/46269bcd3db9c09567256f128a6250be6ace1551))



# [1.1.0](https://github.com/botpress/messaging/compare/v1.0.7...v1.1.0) (2022-02-16)


### Bug Fixes

* **inject:** fix inject script public path ([#361](https://github.com/botpress/messaging/issues/361)) ([6736b59](https://github.com/botpress/messaging/commit/6736b59b365fc83e7cc9aeb3b58f388a58f4742c))


### Features

* **channels:** disable legacy channels by default ([#365](https://github.com/botpress/messaging/issues/365)) ([aae6946](https://github.com/botpress/messaging/commit/aae69465c22828871eff2a8450bd2b6c1e7db0fc))
* **mapping:** endpoint api ([#360](https://github.com/botpress/messaging/issues/360)) ([b94d3e5](https://github.com/botpress/messaging/commit/b94d3e56a3dec60a0a6bc1a3b02bfd0ee847ed35))
* **sockets:** enable sockets by default ([#364](https://github.com/botpress/messaging/issues/364)) ([da24263](https://github.com/botpress/messaging/commit/da242634db287b84d8b8853ee781242bcac89970))
* **webchat:** builtin feedback event ([#358](https://github.com/botpress/messaging/issues/358)) ([ff00118](https://github.com/botpress/messaging/commit/ff001182da8e8fa41ae812c522d92705e793ee03))
* **webchat:** send conversation.started event ([#363](https://github.com/botpress/messaging/issues/363)) ([fcf5d8c](https://github.com/botpress/messaging/commit/fcf5d8c2cef1f544288533177e8fa4661b01da6f))



## [1.0.7](https://github.com/botpress/messaging/compare/v1.0.6...v1.0.7) (2022-02-11)


### Bug Fixes

* **api:** fix broken providers creation ([#354](https://github.com/botpress/messaging/issues/354)) ([1527d39](https://github.com/botpress/messaging/commit/1527d39b7d1ccad565a080cefae20a75c614000c))



## [1.0.6](https://github.com/botpress/messaging/compare/v1.0.5...v1.0.6) (2022-02-11)


### Features

* **channels:** remove experimental channels feature flag ([#350](https://github.com/botpress/messaging/issues/350)) ([fffaf9b](https://github.com/botpress/messaging/commit/fffaf9b5e95cf64c74770c90f579985e41256e05))



## [1.0.5](https://github.com/botpress/messaging/compare/v1.0.4...v1.0.5) (2022-02-09)


### Features

* **clients:** allow specifying a custom client id ([#343](https://github.com/botpress/messaging/issues/343)) ([cd42f30](https://github.com/botpress/messaging/commit/cd42f30d331e67654163d354b646facef814228a))



## [1.0.4](https://github.com/botpress/messaging/compare/v1.0.3...v1.0.4) (2022-02-07)



## [1.0.3](https://github.com/botpress/messaging/compare/v1.0.2...v1.0.3) (2022-02-04)


### Bug Fixes

* **client:** strip unknown data received from webhook ([#332](https://github.com/botpress/messaging/issues/332)) ([84a4baa](https://github.com/botpress/messaging/commit/84a4baa653db78355124b80784708958be3e195d))
* **instance:** auto start error 404 instead of 500 ([#335](https://github.com/botpress/messaging/issues/335)) ([4671560](https://github.com/botpress/messaging/commit/467156074c32d7038e2d975b71705df266046b42))


### Features

* **billing:** billing service ([#325](https://github.com/botpress/messaging/issues/325)) ([6882299](https://github.com/botpress/messaging/commit/6882299b2932319e456a985159053559f1789531))
* **messenger:** messenger v1 ([#329](https://github.com/botpress/messaging/issues/329)) ([6717e0a](https://github.com/botpress/messaging/commit/6717e0a1b402f8f38755519758ba05366c31bee8))
* **slack:** slack v1 ([#331](https://github.com/botpress/messaging/issues/331)) ([bf3c5f5](https://github.com/botpress/messaging/commit/bf3c5f5a5159309fce6ff116d4d6ce3068c9ea4e))
* **smooch:** smooch v1 ([#333](https://github.com/botpress/messaging/issues/333)) ([c10e228](https://github.com/botpress/messaging/commit/c10e2288ce649ee65a22d8c2221ffdf15a5581b3))
* **teams:** teams v1 ([#336](https://github.com/botpress/messaging/issues/336)) ([3720261](https://github.com/botpress/messaging/commit/372026187c48cf446aca3b487641b14957451cdd))
* **telegram:** telegram v1 ([#322](https://github.com/botpress/messaging/issues/322)) ([626ffb9](https://github.com/botpress/messaging/commit/626ffb94d39774ee7641a7eacfba4faddd207ab1))
* **twilio:** twilio v1 ([#324](https://github.com/botpress/messaging/issues/324)) ([a1acd2f](https://github.com/botpress/messaging/commit/a1acd2f119b94125d9f0771b3dbe8165956fa6fe))
* **vonage:** vonage v1 ([#338](https://github.com/botpress/messaging/issues/338)) ([c8436d2](https://github.com/botpress/messaging/commit/c8436d2c71cf1610ed5ca2c5cde582537af93f10))



## [1.0.2](https://github.com/botpress/messaging/compare/v1.0.1...v1.0.2) (2022-01-28)


### Features

* **channels:** channel versioning ([#328](https://github.com/botpress/messaging/issues/328)) ([6632794](https://github.com/botpress/messaging/commit/6632794425e2b96ecb77d545bf11a9255c434cc0))



## [1.0.1](https://github.com/botpress/messaging/compare/v1.0.0...v1.0.1) (2022-01-27)


### Bug Fixes

* **conversations:** fix ordering ([#326](https://github.com/botpress/messaging/issues/326)) ([fb40676](https://github.com/botpress/messaging/commit/fb406765475ace16267d6b1cb63426191e982e8a))



# [1.0.0](https://github.com/botpress/messaging/compare/v0.1.23...v1.0.0) (2022-01-25)



## [0.1.23](https://github.com/botpress/messaging/compare/v0.1.22...v0.1.23) (2022-01-19)


### Bug Fixes

* **server:** fix server not closing when spinned ([4bd6a6f](https://github.com/botpress/messaging/commit/4bd6a6fb9ea48a6792b29c0ea05f2485f2f6b4d2))



## [0.1.22](https://github.com/botpress/messaging/compare/v0.1.21...v0.1.22) (2022-01-18)



## [0.1.21](https://github.com/botpress/messaging/compare/v0.1.20...v0.1.21) (2022-01-13)


### Bug Fixes

* **channels:** readd clearing and fix auto start ([#297](https://github.com/botpress/messaging/issues/297)) ([8d01733](https://github.com/botpress/messaging/commit/8d01733ce7e6befc78fe91f479e706d32ed2bebe))
* **migration:** fix alter table migration not working with sqlite ([#290](https://github.com/botpress/messaging/issues/290)) ([2599256](https://github.com/botpress/messaging/commit/2599256fe583d9bd0ddd773ee51bbc6f96f20276))


### Features

* **client:** client tokens ([#298](https://github.com/botpress/messaging/issues/298)) ([709f120](https://github.com/botpress/messaging/commit/709f1202f54b53a97909e8894ccd3fbbf638c2be))
* **migrations:** improve migration system ([#299](https://github.com/botpress/messaging/issues/299)) ([c8ae63e](https://github.com/botpress/messaging/commit/c8ae63e2db18a9108b1001da376387a769f1a966))



## [0.1.20](https://github.com/botpress/messaging/compare/v0.1.19...v0.1.20) (2021-12-13)


### Bug Fixes

* **channels:** read the conversation.started event ([#282](https://github.com/botpress/messaging/issues/282)) ([145d4f4](https://github.com/botpress/messaging/commit/145d4f47b158f726439b77c0686ac982f5aa6db3))
* **migrations:** fix migrations with targets that are out of bounds ([#274](https://github.com/botpress/messaging/issues/274)) ([c0e7a50](https://github.com/botpress/messaging/commit/c0e7a5021871c8bf9f429094b427cf4def71940c))
* **sync:** add lock for provider name ([#284](https://github.com/botpress/messaging/issues/284)) ([f92111c](https://github.com/botpress/messaging/commit/f92111c83a083c726d438921f7888cdd0bc93772))


### Features

* **channels:** add conversation.started event ([#266](https://github.com/botpress/messaging/issues/266)) ([67906da](https://github.com/botpress/messaging/commit/67906daa5011db395ecfd707d0a8c1bdd3e102bf))
* **channels:** channels package ([#270](https://github.com/botpress/messaging/issues/270)) ([2dadfee](https://github.com/botpress/messaging/commit/2dadfeea8c5c84a736793822609838cd5c914c4f)), closes [#271](https://github.com/botpress/messaging/issues/271) [#272](https://github.com/botpress/messaging/issues/272)



## [0.1.19](https://github.com/botpress/messaging/compare/v0.1.18...v0.1.19) (2021-11-30)


### Bug Fixes

* **monitoring:** fix listing outdated errored conduits ([#261](https://github.com/botpress/messaging/issues/261)) ([c046dac](https://github.com/botpress/messaging/commit/c046dac8806618109f4afa9c55b6b7f194a98d48))



## [0.1.18](https://github.com/botpress/messaging/compare/v0.1.17...v0.1.18) (2021-11-29)


### Bug Fixes

* **build:** unnecessary params for Docker build ([#248](https://github.com/botpress/messaging/issues/248)) ([9b2bcfc](https://github.com/botpress/messaging/commit/9b2bcfc9407b1544413495540d5ef298108bf4a4))
* **components:** fix carousel component ([#260](https://github.com/botpress/messaging/issues/260)) ([91e7627](https://github.com/botpress/messaging/commit/91e762758734b964f88fba2ac95daa07da7b63eb))
* **docker:** fix path to engine package files ([#253](https://github.com/botpress/messaging/issues/253)) ([3a0c6cb](https://github.com/botpress/messaging/commit/3a0c6cba4ba7185bd22cefa7acf68535132a7cde))
* **mapping:** fix insert race conditions ([#255](https://github.com/botpress/messaging/issues/255)) ([7e070eb](https://github.com/botpress/messaging/commit/7e070eb5fb4bcb40c30ffbdc699df8958b7abc61))
* **monitoring:** fix timeout not being cleared ([#252](https://github.com/botpress/messaging/issues/252)) ([fa5bb3d](https://github.com/botpress/messaging/commit/fa5bb3dafacf6691a88fa867b45380c531460d84))
* **redis:** fix master failure crashing the server ([#258](https://github.com/botpress/messaging/issues/258)) ([f745ae4](https://github.com/botpress/messaging/commit/f745ae43e311dfee8f7ede1c8b61c951a2603cc0))
* **server:** fix response to other node ([#240](https://github.com/botpress/messaging/issues/240)) ([a54b554](https://github.com/botpress/messaging/commit/a54b5548a0a683f1970b7e328b579725b22a44f3)), closes [#241](https://github.com/botpress/messaging/issues/241)
* **test:** fix rewiring with jest ([#250](https://github.com/botpress/messaging/issues/250)) ([32c2679](https://github.com/botpress/messaging/commit/32c267957357ff44cf693bd012c53cb1efc79eff))
* **webhook:** fix webhooks ([#251](https://github.com/botpress/messaging/issues/251)) ([8b4b60f](https://github.com/botpress/messaging/commit/8b4b60fb0dd53959b3a1c7b53fdc8821f0d4080b))


### Features

* **socket:** authenticate in handshake ([#254](https://github.com/botpress/messaging/issues/254)) ([03e1bd4](https://github.com/botpress/messaging/commit/03e1bd43960e8c80daf2905027ca4bb73352e570))
* **webchat:** port webchat injection ([#239](https://github.com/botpress/messaging/issues/239)) ([1edb476](https://github.com/botpress/messaging/commit/1edb476dabf1b44ef2c85c21d97d9af6f803c1f0))



## [0.1.17](https://github.com/botpress/messaging/compare/v0.1.16...v0.1.17) (2021-11-05)


### Bug Fixes

* **channels:** fixes for smooch and messenger ([#229](https://github.com/botpress/messaging/issues/229)) ([42a1d5b](https://github.com/botpress/messaging/commit/42a1d5bdceaf5ba6214db438d6a53e284a9862d9)), closes [#227](https://github.com/botpress/messaging/issues/227) [#230](https://github.com/botpress/messaging/issues/230)


### Features

* **api:** refact implementation ([#223](https://github.com/botpress/messaging/issues/223)) ([c8aa881](https://github.com/botpress/messaging/commit/c8aa881a45f754610f628d4d3bee561103138fb9))
* **socket:** socket package ([#222](https://github.com/botpress/messaging/issues/222)) ([4c1141e](https://github.com/botpress/messaging/commit/4c1141e56001b0795988706bd10b8806b3ee54b5))
* **test-ui:** update testing ui for new socket ([#224](https://github.com/botpress/messaging/issues/224)) ([326f65e](https://github.com/botpress/messaging/commit/326f65eed3f45760205557f1564275f61a0d2464))



## [0.1.16](https://github.com/botpress/messaging/compare/v0.1.15...v0.1.16) (2021-10-28)


### Bug Fixes

* **client:** fix handling of not found errors ([#219](https://github.com/botpress/messaging/issues/219)) ([025f290](https://github.com/botpress/messaging/commit/025f290df02d474f41fd99beed0a08fd5255f5e5))


### Features

* **components:** implement ui components package ([#208](https://github.com/botpress/messaging/issues/208)) ([a469775](https://github.com/botpress/messaging/commit/a46977536f48dbf3a8bcfbb5fff911a061caf00b)), closes [#210](https://github.com/botpress/messaging/issues/210)
* **converse:** close collector when the bot has finished processing ([#217](https://github.com/botpress/messaging/issues/217)) ([ccb2154](https://github.com/botpress/messaging/commit/ccb215467d0f2bd074f0f7ec2064064ef35c1484))
* **twilio:** twilio testing ([#221](https://github.com/botpress/messaging/issues/221)) ([877d448](https://github.com/botpress/messaging/commit/877d448e19d182eff7ac51480a049ef70775191a))
* **user-tokens:** implement user tokens ([#203](https://github.com/botpress/messaging/issues/203)) ([c27fb4d](https://github.com/botpress/messaging/commit/c27fb4dce039cf9ee32ccc048d5b68d8d8422712))



## [0.1.15](https://github.com/botpress/messaging/compare/v0.1.14...v0.1.15) (2021-10-19)


### Bug Fixes

* **channels:** fix typing indicators always on ([#201](https://github.com/botpress/messaging/issues/201)) ([9015457](https://github.com/botpress/messaging/commit/901545795897e05775c8efdedd0165841f1f0086))
* **client:** fix adding custom headers ([#212](https://github.com/botpress/messaging/issues/212)) ([b92ca08](https://github.com/botpress/messaging/commit/b92ca08124dd914673f836d0885d39c84615d697))
* **repo:** typing errors due to unknow error type ([#213](https://github.com/botpress/messaging/issues/213)) ([b13114e](https://github.com/botpress/messaging/commit/b13114e352ceff41f02c7aa1ebb15a9ebf2cc34b))


### Features

* **api:** add a route to get user info ([#195](https://github.com/botpress/messaging/issues/195)) ([7441823](https://github.com/botpress/messaging/commit/744182315f44d8211de3ff13654962d3d19a855e)), closes [#197](https://github.com/botpress/messaging/issues/197) [#198](https://github.com/botpress/messaging/issues/198)
* **converse:** converse api ([#194](https://github.com/botpress/messaging/issues/194)) ([f4ecbca](https://github.com/botpress/messaging/commit/f4ecbcac401e985af2a40eb6815721df3b1c2f63))
* **instances:** message queue ([#207](https://github.com/botpress/messaging/issues/207)) ([335cf3c](https://github.com/botpress/messaging/commit/335cf3c32851057c0f07674167e5d73e8f16b1df))



## [0.1.14](https://github.com/botpress/messaging/compare/v0.1.13...v0.1.14) (2021-10-14)


### Bug Fixes

* **slack:** slack image rendered requires text in title ([#188](https://github.com/botpress/messaging/issues/188)) ([53141f1](https://github.com/botpress/messaging/commit/53141f11884db2b6d0cdcb0eafa52d9db8484f26))
* **vonage:** fix too many requests when using sandbox ([#176](https://github.com/botpress/messaging/issues/176)) ([59982f2](https://github.com/botpress/messaging/commit/59982f2e2f5a79a2310dd0db3016bc57a7a3c5b1))



## [0.1.13](https://github.com/botpress/messaging/compare/v0.1.12...v0.1.13) (2021-09-14)


### Features

* **apm:** added apm configuration setup ([#167](https://github.com/botpress/messaging/issues/167)) ([a1cc6a0](https://github.com/botpress/messaging/commit/a1cc6a07eda7be1e9245a53951c61a2e03ed635a))
* **webhook:** add convo and user events ([#168](https://github.com/botpress/messaging/issues/168)) ([2e30ddd](https://github.com/botpress/messaging/commit/2e30ddd60807f61332c1f519e269143fbb1ca18a))



## [0.1.12](https://github.com/botpress/messaging/compare/v0.1.11...v0.1.12) (2021-09-02)


### Bug Fixes

* **server:** fix macos binary ([#165](https://github.com/botpress/messaging/issues/165)) ([5b5282b](https://github.com/botpress/messaging/commit/5b5282b24155ae67b32cf71b7adc76569b56b58a))



## [0.1.11](https://github.com/botpress/messaging/compare/v0.1.10...v0.1.11) (2021-08-31)


### Bug Fixes

* **monitoring:** always setup non lazy when spinned ([#158](https://github.com/botpress/messaging/issues/158)) ([2b22a68](https://github.com/botpress/messaging/commit/2b22a689533032eaf4e9eaa49e6a85e157fcba11))



## [0.1.10](https://github.com/botpress/messaging/compare/v0.1.9...v0.1.10) (2021-08-24)


### Bug Fixes

* **chat:** fix crash when replying to null conduit ([#156](https://github.com/botpress/messaging/issues/156)) ([4d0542f](https://github.com/botpress/messaging/commit/4d0542f04451b1f6ab97fd5f63102f333be34cbb))
* **instances:** fix instance service destroy ([#155](https://github.com/botpress/messaging/issues/155)) ([ffeb091](https://github.com/botpress/messaging/commit/ffeb0916c0ea525c816b993013ca5369a788d906))
* **post:** log errors as warnings ([#154](https://github.com/botpress/messaging/issues/154)) ([edf54c2](https://github.com/botpress/messaging/commit/edf54c2cb77f40de2f03f36e0a32a817a3381237))


### Features

* **migration:** implement migration service ([#142](https://github.com/botpress/messaging/issues/142)) ([a6fef7c](https://github.com/botpress/messaging/commit/a6fef7c14fab8116cc0af0d364843ceceb86f719))



## [0.1.9](https://github.com/botpress/messaging/compare/v0.1.8...v0.1.9) (2021-08-23)


### Bug Fixes

* **ci_cd:** fix changelog generation on release ([510040a](https://github.com/botpress/messaging/commit/510040a87bf41428071b591f69eea25777292464))
* **ci_cd:** fix changelog generation on release ([#146](https://github.com/botpress/messaging/issues/146)) ([49e52cc](https://github.com/botpress/messaging/commit/49e52ccf0624ebffdac712d022ce8561bdeeb3ff))
* **health:** send configure event when created ([#144](https://github.com/botpress/messaging/issues/144)) ([58dc686](https://github.com/botpress/messaging/commit/58dc686348ccb2b888aeb4e75be9534c0f5e6021))


### Features

* **board:** host url field ([#145](https://github.com/botpress/messaging/issues/145)) ([cff7316](https://github.com/botpress/messaging/commit/cff73162b53c3c1ab91e89627e81fb33ec31899a))
* **server:** gracefully close websocket connections on server shutdown ([#143](https://github.com/botpress/messaging/issues/143)) ([02b1619](https://github.com/botpress/messaging/commit/02b16195cf5f3e92560054bce84b7eb051124292))
* **webchat:** implement basic webchat ([#126](https://github.com/botpress/messaging/issues/126)) ([aed8705](https://github.com/botpress/messaging/commit/aed8705c345ed69c5a287a93395daa870966bf8b)), closes [#135](https://github.com/botpress/messaging/issues/135)



