# eslint-plugin-no-arweave-keys

An ESLint plugin to disallow Arweave keys in JSON files.

## Installation

First, you'll need to install [ESLint](http://eslint.org):

\`\`\`bash
npm i eslint --save-dev
\`\`\`

Next, install \`eslint-plugin-no-arweave-keys\`:

\`\`\`bash
npm install eslint-plugin-no-arweave-keys --save-dev
\`\`\`

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install \`eslint-plugin-no-arweave-keys\` globally.

## Usage

Add \`no-arweave-keys\` to the plugins section of your \`.eslintrc\` configuration file, and configure the rules you want to use under the rules section.

\`\`\`json
{
    "plugins": [
        "no-arweave-keys"
    ],
    "rules": {
        "no-arweave-keys/no-arweave-keys": "error"
    }
}
\`\`\`

## Supported Rules

* no-arweave-keys: Disallows the presence of Arweave keys in JSON files.

## Testing

You can run tests for this plugin with:

\`\`\`bash
npm run test
\`\`\`
