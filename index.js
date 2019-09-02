const _ = require('lodash');

module.exports = function() {
  return ({ addVariant, e }) => {
    addVariant('children', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`children${separator}${className}`)} > *`;
      });
    });

    addVariant('children-hover', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`children${separator}hover${separator}${className}`)} > :hover`;
      });
    });

    addVariant('children-focus', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`children${separator}focus${separator}${className}`)} > :focus`;
      });
    });

    addVariant('children-focus-within', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`children${separator}focus-within${separator}${className}`)} > :focus-within`;
      });
    });

    addVariant('children-active', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`children${separator}active${separator}${className}`)} > :active`;
      });
    });

    addVariant('odd-children', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`odd-children${separator}${className}`)} > :nth-child(odd)`;
      });
    });

    addVariant('even-children', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`even-children${separator}${className}`)} > :nth-child(even)`;
      });
    });

    addVariant('first-child', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`first-child${separator}${className}`)} > :first-child`;
      });
    });

    addVariant('last-child', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`last-child${separator}${className}`)} > :last-child`;
      });
    });
  };
};
