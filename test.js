const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const childrenPlugin = require('./index.js');

const generatePluginCss = (variants = [], tailwindOptions = {}, css = null) => {
  return postcss(
    tailwindcss({
      theme: {
        screens: {
          'sm': '640px',
        },
      },
      corePlugins: false,
      plugins: [
        childrenPlugin,
        ({ addUtilities }) => {
          addUtilities(css ? css : {
            '.w-1\\/2': {
              'width': '50%',
            },
          }, variants);
        },
      ],
      ...tailwindOptions,
    })
  )
  .process('@tailwind utilities', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin doesn’t do anything if the variants aren’t used', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('the children variant is working', () => {
  return generatePluginCss(['children']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .children\\:w-1\\/2 > * {
        width: 50%;
      }
    `);
  });
});

test('the children variant can be generated before the default variant', () => {
  return generatePluginCss(['children', 'default']).then(css => {
    expect(css).toMatchCss(`
      .children\\:w-1\\/2 > * {
        width: 50%;
      }
      .w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('all the variants are working', () => {
  return generatePluginCss(['children', 'default', 'children-first', 'children-last', 'children-odd', 'children-even', 'children-not-first', 'children-not-last', 'children-hover', 'hover', 'children-focus', 'focus', 'children-focus-within', 'focus-within', 'children-active', 'active', 'children-visited', 'visited', 'children-disabled', 'disabled']).then(css => {
    expect(css).toMatchCss(`
      .children\\:w-1\\/2 > * {
        width: 50%;
      }
      .w-1\\/2 {
        width: 50%;
      }
      .children\\:first\\:w-1\\/2 > :first-child {
        width: 50%;
      }
      .children\\:last\\:w-1\\/2 > :last-child {
        width: 50%;
      }
      .children\\:odd\\:w-1\\/2 > :nth-child(odd) {
        width: 50%;
      }
      .children\\:even\\:w-1\\/2 > :nth-child(even) {
        width: 50%;
      }
      .children\\:not-first\\:w-1\\/2 > :not(:first-child) {
        width: 50%;
      }
      .children\\:not-last\\:w-1\\/2 > :not(:last-child) {
        width: 50%;
      }
      .children\\:hover\\:w-1\\/2 > :hover {
        width: 50%;
      }
      .hover\\:w-1\\/2:hover {
        width: 50%;
      }
      .children\\:focus\\:w-1\\/2 > :focus {
        width: 50%;
      }
      .focus\\:w-1\\/2:focus {
        width: 50%;
      }
      .children\\:focus-within\\:w-1\\/2 > :focus-within {
        width: 50%;
      }
      .focus-within\\:w-1\\/2:focus-within {
        width: 50%;
      }
      .children\\:active\\:w-1\\/2 > :active {
        width: 50%;
      }
      .active\\:w-1\\/2:active {
        width: 50%;
      }
      .children\\:visited\\:w-1\\/2 > :visited {
        width: 50%;
      }
      .visited\\:w-1\\/2:visited {
        width: 50%;
      }
      .children\\:disabled\\:w-1\\/2 > :disabled {
        width: 50%;
      }
      .disabled\\:w-1\\/2:disabled {
        width: 50%;
      }
    `);
  });
});

test('all variants can be chained with the responsive variant', () => {
  return generatePluginCss(['children', 'default', 'children-first', 'children-last', 'children-odd', 'children-even', 'children-not-first', 'children-not-last', 'children-hover', 'children-focus', 'children-focus-within', 'children-active', 'children-visited', 'children-disabled', 'responsive']).then(css => {
    expect(css).toMatchCss(`
      .children\\:w-1\\/2 > * {
        width: 50%;
      }
      .w-1\\/2 {
        width: 50%;
      }
      .children\\:first\\:w-1\\/2 > :first-child {
        width: 50%;
      }
      .children\\:last\\:w-1\\/2 > :last-child {
        width: 50%;
      }
      .children\\:odd\\:w-1\\/2 > :nth-child(odd) {
        width: 50%;
      }
      .children\\:even\\:w-1\\/2 > :nth-child(even) {
        width: 50%;
      }
      .children\\:not-first\\:w-1\\/2 > :not(:first-child) {
        width: 50%;
      }
      .children\\:not-last\\:w-1\\/2 > :not(:last-child) {
        width: 50%;
      }
      .children\\:hover\\:w-1\\/2 > :hover {
        width: 50%;
      }
      .children\\:focus\\:w-1\\/2 > :focus {
        width: 50%;
      }
      .children\\:focus-within\\:w-1\\/2 > :focus-within {
        width: 50%;
      }
      .children\\:active\\:w-1\\/2 > :active {
        width: 50%;
      }
      .children\\:visited\\:w-1\\/2 > :visited {
        width: 50%;
      }
      .children\\:disabled\\:w-1\\/2 > :disabled {
        width: 50%;
      }
      @media (min-width: 640px) {
        .sm\\:children\\:w-1\\/2 > * {
          width: 50%;
        }
        .sm\\:w-1\\/2 {
          width: 50%;
        }
        .sm\\:children\\:first\\:w-1\\/2 > :first-child {
          width: 50%;
        }
        .sm\\:children\\:last\\:w-1\\/2 > :last-child {
          width: 50%;
        }
        .sm\\:children\\:odd\\:w-1\\/2 > :nth-child(odd) {
          width: 50%;
        }
        .sm\\:children\\:even\\:w-1\\/2 > :nth-child(even) {
          width: 50%;
        }
        .sm\\:children\\:not-first\\:w-1\\/2 > :not(:first-child) {
          width: 50%;
        }
        .sm\\:children\\:not-last\\:w-1\\/2 > :not(:last-child) {
          width: 50%;
        }
        .sm\\:children\\:hover\\:w-1\\/2 > :hover {
          width: 50%;
        }
        .sm\\:children\\:focus\\:w-1\\/2 > :focus {
          width: 50%;
        }
        .sm\\:children\\:focus-within\\:w-1\\/2 > :focus-within {
          width: 50%;
        }
        .sm\\:children\\:active\\:w-1\\/2 > :active {
          width: 50%;
        }
        .sm\\:children\\:visited\\:w-1\\/2 > :visited {
          width: 50%;
        }
        .sm\\:children\\:disabled\\:w-1\\/2 > :disabled {
          width: 50%;
        }
      }
    `);
  });
});

test('the variants work well with Tailwind’s prefix option', () => {
  return generatePluginCss(['children', 'default', 'children-first'], {
    prefix: 'tw-',
  }).then(css => {
    expect(css).toMatchCss(`
      .children\\:tw-w-1\\/2 > * {
        width: 50%;
      }
      .tw-w-1\\/2 {
        width: 50%;
      }
      .children\\:first\\:tw-w-1\\/2 > :first-child {
        width: 50%;
      }
    `);
  });
});

test('the variants work on utilities that include pseudo-elements', () => {
  return generatePluginCss(['children', 'default', 'children-first'], {}, {
    '.placeholder-gray-400::placeholder': {
      'color': '#cbd5e0',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .children\\:placeholder-gray-400 > *::placeholder {
        color: #cbd5e0;
      }
      .placeholder-gray-400::placeholder {
        color: #cbd5e0;
      }
      .children\\:first\\:placeholder-gray-400 > :first-child::placeholder {
        color: #cbd5e0;
      }
    `);
  });
});
