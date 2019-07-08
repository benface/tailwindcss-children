const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const childrenPlugin = require('./index.js');

const generatePluginCss = (variants = []) => {
  return postcss(
    tailwindcss({
      theme: {
        screens: {
          'sm': '640px',
        },
      },
      corePlugins: false,
      plugins: [
        childrenPlugin(),
        ({ e, addUtilities }) => {
          addUtilities({
            '.block': {
              'display': 'block',
            },
          }, variants);
        },
      ],
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
      .block {
        display: block;
      }
    `);
  });
});

test('the children variant is working', () => {
  return generatePluginCss(['children']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .children\\:block > * {
        display: block;
      }
    `);
  });
});

test('the children variant can be generated before the default variant', () => {
  return generatePluginCss(['children', 'default']).then(css => {
    expect(css).toMatchCss(`
      .children\\:block > * {
        display: block;
      }
      .block {
        display: block;
      }
    `);
  });
});

test('all the variants are working', () => {
  return generatePluginCss(['children', 'default', 'first-child', 'last-child', 'children-hover', 'hover', 'children-focus', 'focus', 'children-focus-within', 'focus-within', 'children-active', 'active']).then(css => {
    expect(css).toMatchCss(`
      .children\\:block > * {
        display: block;
      }
      .block {
        display: block;
      }
      .first-child\\:block > :first-child {
        display: block;
      }
      .last-child\\:block > :last-child {
        display: block;
      }
      .children\\:hover\\:block > :hover {
        display: block;
      }
      .hover\\:block:hover {
        display: block;
      }
      .children\\:focus\\:block > :focus {
        display: block;
      }
      .focus\\:block:focus {
        display: block;
      }
      .children\\:focus-within\\:block > :focus-within {
        display: block;
      }
      .focus-within\\:block:focus-within {
        display: block;
      }
      .children\\:active\\:block > :active {
        display: block;
      }
      .active\\:block:active {
        display: block;
      }
    `);
  });
});

test('all variants can be chained with the responsive variant', () => {
  return generatePluginCss(['children', 'default', 'first-child', 'last-child', 'children-hover', 'children-focus', 'children-focus-within', 'children-active', 'responsive']).then(css => {
    expect(css).toMatchCss(`
      .children\\:block > * {
        display: block;
      }
      .block {
        display: block;
      }
      .first-child\\:block > :first-child {
        display: block;
      }
      .last-child\\:block > :last-child {
        display: block;
      }
      .children\\:hover\\:block > :hover {
        display: block;
      }
      .children\\:focus\\:block > :focus {
        display: block;
      }
      .children\\:focus-within\\:block > :focus-within {
        display: block;
      }
      .children\\:active\\:block > :active {
        display: block;
      }
      @media (min-width: 640px) {
        .sm\\:children\\:block > * {
          display: block;
        }
        .sm\\:block {
          display: block;
        }
        .sm\\:first-child\\:block > :first-child {
          display: block;
        }
        .sm\\:last-child\\:block > :last-child {
          display: block;
        }
        .sm\\:children\\:hover\\:block > :hover {
          display: block;
        }
        .sm\\:children\\:focus\\:block > :focus {
          display: block;
        }
        .sm\\:children\\:focus-within\\:block > :focus-within {
          display: block;
        }
        .sm\\:children\\:active\\:block > :active {
          display: block;
        }
      }
    `);
  });
});
