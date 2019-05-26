const _ = require('lodash');

module.exports = function() {
  return ({ addVariant, e }) => {
    addVariant('children', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`children${separator}${className}`)} > *`;
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
