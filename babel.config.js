module.exports = {
    presets: [
        ['@babel/preset-env', {
            loose: true,
            modules: 'commonjs',
            useBuiltIns: 'entry',
            targets: {
                browsers: ['ie >= 10', 'chrome >= 31', 'ios >= 8', 'android >= 4.4'],
                node: '8'
            }
        }],
        ['@babel/preset-react']
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        // Stage 0
        '@babel/plugin-proposal-function-bind',

        // Stage 1
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-logical-assignment-operators',
        ['@babel/plugin-proposal-optional-chaining', { loose: false }],
        ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
        ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
        '@babel/plugin-proposal-do-expressions',

        // Stage 2
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-function-sent',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-throw-expressions',

        // Stage 3
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        ['@babel/plugin-proposal-class-properties', { loose: false }],
        '@babel/plugin-proposal-json-strings',
        '@babel/plugin-proposal-object-rest-spread',

        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
    ],
    env: {
        development: {
        }
    }
};

