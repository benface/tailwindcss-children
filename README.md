# Children Variant Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-children
```

## Usage

```js
// tailwind.config.js
{
  variants: {
    display: ['children', 'default', 'first-child', 'last-child', 'responsive'],
    borderWidth: ['children', 'default', 'first-child', 'last-child', 'responsive'],
    borderColor: ['children', 'default', 'first-child', 'last-child', 'responsive'],
  },
  plugins: [
    require('tailwindcss-children')(),
  ],
}
```

The above configuration would generate the following classes:

```css
.children\:block > * {
  display: block;
}

.block {
  display: block;
}

.first-child\:block:first-child {
  display: block;
}

.last-child\:block:last-child {
  display: block;
}

/* etc. */
```

Which you can then use in your HTML like this:

```html
<ul class="children:block children:border-b children:border-black last-child:border-b-0">
  <li>
    First item
  </li>
  <li>
    Second item
  </li>
  <li>
    Last item, this one doesn't have a bottom border
  </li>
</ul>
```

You can also override `children:` classes on specific children if needed:

```html
<ul class="children:block children:bg-gray">
  <li>
    First item
  </li>
  <li class="bg-red">
    Second item, this one has a red background
  </li>
  <li class="bg-blue">
    Third item, this one has a blue background
  </li>
  <li>
    Last item
  </li>
</ul>
```

The above depends on the order of the generated CSS, so make sure to add the `default` variant *after* the `children` one in the array of variants.
