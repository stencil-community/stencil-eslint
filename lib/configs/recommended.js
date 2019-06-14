module.exports = {
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                "@stencil/no-global-html-attribute-prop-names": "error"
            },
        },
    ],
}
