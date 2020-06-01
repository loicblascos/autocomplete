# AutoComplete

A flexible, accessible, customizable and efficient autocomplete input control with zero dependencies

See [loicblascos.github.io/autocomplete](https://loicblascos.github.io/autocomplete/) for complete docs and demos.

## Installation

Install AutoComplete from npm package manager:

```sh
npm install @loicblascos/autocomplete --save
```

## Basic Usage

You can import polyfills, style and main class from package as follows:

```js
import '@loicblascos/autocomplete/lib/polyfills'; // Optional
import '@loicblascos/autocomplete/lib/style.css'; // Optional
import AutoComplete from '@loicblascos/autocomplete';
```

AutoComplete script works with search and text input elements.  
Explicit and implicit input labels are supported by AutoComplete script to be fully accessible.

```html
<!-- Explicit label -->
<label for="my-input">Input Label</label>
<input type="text" id="my-input" placeholder="type to search">
```

```html
<!-- Implicit label -->
<label>
    Input Label
    <input type="text" id="my-input" placeholder="type to search">
</label>
```

The `AutoComplete()` constructor accepts two arguments: the input element and an options object.

```js
const input = document.querySelector( '#my-input' );
const acplt = new AutoComplete(
    input,
    {
        source: [
            { label: 'label 1', value: 'value 1' },
            { label: 'label 2', value: 'value 2' },
            { label: 'label 3', value: 'value 3' },
        ],
        minLength: 1,
        maxResults: 50,
        autoSearch: true,
    }
);
```

## Options

```js
{
    // Holds list of suggestions to search for.
    source: [],
    // Minimum number of characters to trigger a search.
    minLength: 1,
    // Maximum number of suggestions to display in the list.
    maxResults: -1,
    // Expression used to match string(s) in suggestion.
    regExp: '($1)',
    // Function used to filter suggestions in the list.
    filterResults: exists => exists,
    // Function used to sort suggestions in the list.
    sortResults: ( a, b ) => (
        a.index - b.index ||
        a.label.localeCompare( b.label ) ||
        a.label.length - b.label.length
    ),
    // Element used to append matched string(s).
    highlighter: document.createElement( 'mark' ),
    // Function used to render suggestion in list item.
    renderItem: item => item.content,
    // Element used to append autocomplete menu.
    menuTarget: document.body,
    // Only match accents from searched string.
    smartAccent: false,
    // Highlight all matches string in suggestion.
    matchAll: false,
    // Automatically focus first suggestion in the list.
    autoFocus: true,
    // Automatically searches for suggestions on focus.
    autoSearch: false,
    // Inline auto complete first suggestion while typing.
    autoComplete: false,
    // Display a loader while searching in source (async).
    loader: false,
    // Display a button with cross icon to clear the field.
    clearable: true,
    // Accessible button label used in clear button.
    clearLabel: 'Clear field',
    // Class names used in AutoComplete elements.
    classes: {
        wrapper: 'acplt',
        menu: 'acplt-menu',
        list: 'acplt-list',
        item: 'acplt-item',
        clear: 'acplt-clear',
        loader: 'acplt-loader',
        message: 'acplt-message',
    },
    // Accessible texts appended during user interactions.
    messages: {
        open: 'Use Up and Down to choose suggestions and press Enter to select suggestion.',
        input: 'Type to search or press Escape to clear the input.',
        clear: 'Field cleared.',
        select: '%s suggestion was selected.',
        noResults: 'No suggestions found.',
        loading: 'Loading suggestions...',
    },
}
```

## License

AutoComplete is released under the MIT License. See [LICENSE](https://github.com/loicblascos/autocomplete/blob/master/LICENSE) file for details.
