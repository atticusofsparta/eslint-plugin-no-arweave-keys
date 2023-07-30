const RuleTester = require('eslint').RuleTester;
const rule = require('../no-arweave-keys');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" }, // add parserOptions here
});

ruleTester.run('no-arweave-keys', rule, {
  valid: [
    `const config = {
      a: 'some value',
      b: 'another value'
    };`,
    `const config = require('./somefile.json');`,
  ],
  invalid: [
    {
      code: `const key = require('./arweaveKey.json');
      console.log(key);`,
      errors: [{ message: 'Requiring Arweave keys is not allowed.' }],
    },
    {
      code: `const arweaveKey = require('./arweaveKey.json');
      const config = {
        d: arweaveKey.d,
        dp: arweaveKey.dp,
        dq: arweaveKey.dq,
        e: arweaveKey.e,
        ext: arweaveKey.ext,
        kty: arweaveKey.kty,
        n: arweaveKey.n,
        p: arweaveKey.p,
        q: arweaveKey.q,
        qi: arweaveKey.qi
      };`,
      errors: [{ message: 'Arweave keys are not allowed.' }],
    },
    {
      code: `const arweaveKey = require('./arweaveKey.js');
      console.log(arweaveKey.d);`,
      errors: [{ message: 'Arweave keys are not allowed.' }],
    },
  ],
});
