module.exports = {
  create(context) {
    const arweaveKeys = ['d', 'dp', 'dq', 'e', 'ext', 'kty', 'n', 'p', 'q', 'qi'];
    const variablesToCheck = new Set();

    return {
      VariableDeclarator(node) {
        if (node.init && node.init.callee && node.init.callee.name === 'require' &&
            node.init.arguments[0] && node.init.arguments[0].value &&
            (node.init.arguments[0].value.endsWith('.json') || node.init.arguments[0].value.endsWith('.js'))) {
          variablesToCheck.add(node.id.name);
        }
      },
      MemberExpression(node) {
        if (node.object && variablesToCheck.has(node.object.name) &&
            node.property && arweaveKeys.includes(node.property.name)) {
          context.report({
            node: node,
            message: 'Arweave keys are not allowed.',
          });
        }
      },
      CallExpression(node) {
        if (node.callee.name === 'require') {
          const argument = node.arguments[0];

          if (argument && argument.type === 'Literal' && typeof argument.value === 'string' && argument.value.endsWith('.json')) {
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(context.getFilename(), '..', argument.value);

            if (fs.existsSync(filePath)) {
              const fileContent = fs.readFileSync(filePath, 'utf8');
              const fileJSON = JSON.parse(fileContent);

              if (arweaveKeys.every(key => Object.keys(fileJSON).includes(key))) {
                context.report({
                  node: node,
                  message: 'Requiring Arweave keys is not allowed.',
                });
              }
            }
          }
        }
      },
    };
  },
};

