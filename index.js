const plugin = require('tailwindcss/plugin');
const _ = require('lodash');
const selectorParser = require('postcss-selector-parser');

const childrenVariant = function(pseudoClass = null, childrenSelector = null, classPrefix = null) {
  return ({ modifySelectors, separator }) => {
    childrenSelector = childrenSelector ? childrenSelector : (pseudoClass ? `:${pseudoClass}` : '*');
    classPrefix = classPrefix ? classPrefix : `children${pseudoClass ? (separator + pseudoClass) : ''}`;
    return modifySelectors(({ selector }) => {
      return selectorParser(selectors => {
        selectors.walkClasses(classNode => {
          classNode.value = `${classPrefix}${separator}${classNode.value}`;
          classNode.parent.insertAfter(classNode, selectorParser().astSync(` > ${childrenSelector}`));
        });
      }).processSync(selector);
    });
  };
};

module.exports = plugin(function({ addVariant }) {
  addVariant('children', childrenVariant());
  addVariant('children-hover', childrenVariant('hover'));
  addVariant('children-focus', childrenVariant('focus'));
  addVariant('children-focus-within', childrenVariant('focus-within'));
  addVariant('children-active', childrenVariant('active'));
  addVariant('children-visited', childrenVariant('visited'));
  addVariant('children-disabled', childrenVariant('disabled'));
  addVariant('children-first', childrenVariant('first', ':first-child'));
  addVariant('children-last', childrenVariant('last', ':last-child'));
  addVariant('children-odd', childrenVariant('odd', ':nth-child(odd)'));
  addVariant('children-even', childrenVariant('even', ':nth-child(even)'));
  addVariant('owl', childrenVariant(null, '* + *', 'owl'));
});
