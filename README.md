## Prerequisites
1. Node.js 최신 버전을 설치하세요 (NVM을 이용해서 설치하는 것을 추천합니다.)

    `https://github.com/creationix/nvm`

    * NVM 을 통한 Node.js 설치

        `nvm install node`

2. Node Package Manager인 Yarn을 설치하세요

    `npm install -g yarn`

## Installation guide

1. `git clone http://ljunghan@yona.linewalks.com/MDwalks_for_CDM/EXI-Client`

2. `cd EXI-Client`

3. `yarn install`

4. `yarn dev`

5. `localhost:3000`에서 구동 확인!

## Release

1. `rm -rf .next/`
2. `rm -rf node_modules/`
3. `rm yarn.lock`
4. `yarn`
5. `yarn build`
6. `yarn start`

## Versioning

1. git checkout -b {branch}
2. `yarn version` - update version 입력(package.json 버전 업데이트, git tag 달림)
3. git push origin --tags
4. git push origin {branch}

## Version 파악
`yarn get-version`
