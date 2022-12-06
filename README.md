
publish:
runs-on: ubuntu-latest
permissions:
contents: read
packages: write
steps:
- uses: actions/checkout@v3
- uses: actions/setup-node@v3
with:
node-version: 16
registry-url: https://registry.npmjs.org/
- name: Install dependencies
run: npm i
- name: Build libraries
run: npm run build:extra-clarity
- name: Publish libraries to NPM
working-directory: dist/extra-clarity
run: npm publish
env:
NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
