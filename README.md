# FancyFilter.js
A super simple way to filter items in on a web page.

### Properties
| Property | Default | Description |
| :-: | :-: | :-- |
| `subjectSelector` | undefined | The CSS style selector to define the elements to be filtered. |
| `inputSelector` | undefined | The CSS style selector to define the which input element will have the input event set on. |
| `inputDelimiter` | , | The character used to split the inputValue used to filter the subject. |
| `inputExclude` | ! | The character used to indicate that if this search |


### Methods
| Method | Arguments | Description |
| :-: | :-: | :-- |
| `filter` | inputValue(optional)  | Actually preforms the filter logic by hiding elements that do not match the value of the `inputElement` or the optional argument of `inputValue`. |
| `setInputEvent` | inputSelector(optional) | Creates the on input event using `inputSelector` property which can also be set by using an argument to this method |
| `setSubjectElements` | none | Searches the DOM for the elements matching the `subjectSelector`. This is done automaticly the first time `filter()` is called but this can be used to search the DOM again if the page changes like with an AJAX call |
