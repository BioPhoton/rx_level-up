#Preconditions

git config --global credential.helper wincred

node modules to install globally:
- @types/node
- conventional-changelog-angular
- conventional-changelog
- conventional-changelog-cli
- conventional-commits-detector
- conventional-github-releaser
- conventional-recommended-bump
- semver
- ts-node 
- typescript
- git-describe
- winston


# Process
1. bump version of the libs `package.json`
2. rebuild package with new version `npm run build`
3. npm run changelog
4. commit changelog.md with msg: docs(CHANGELOG): [VERSION_NUMBER]
5. commit package.json with msg: chore(release): [VERSION_NUMBER]
6. git tag [VERSION_NUMBER]
7. git push --follow-tags
8. npm run github-release
9. npm run release:lib

