#Preconditions

git config --global credential.helper wincred

# Process
1. bump version of the libs `package.json`
2. rebuild package with new version `npm run build`
2. npm run changelog
3. commit changelog.md with msg: docs(CHANGELOG): [VERSION_NUMBER]
4. commit package.json with msg: chore(release): [VERSION_NUMBER]
5. git tag [VERSION_NUMBER]
6. git push --follow-tags
7. npm run github-release
8. npm run release:lib

