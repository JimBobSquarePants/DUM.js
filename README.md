# DUM.js
**A teeny tiny helper library for working with the DOM**

**DUM.js** helps you work with the DOM a little easier. 

**DUM.js** isn't for AJAX or animations or anything else already covered by dedicated libraries.

*Please note: This is a work in progress, ideas and assistance most welcome!!*

## API

**DUM.js** adds an object to the global scope with the followings signatures: `$d` or `$DUM`

|Method  |Function |
|--------|------------------------------------|
| `ready(context)` | Fires when the documents `DOMContentLoaded` is triggered. Returns a Promise.                                                                                                         |
| `query(expression, context)` | A shortcut for `element.querySelectorSelector()`. Context defaults to the document when no context is passed.                                                                        |
| `queryAll(expression, context)` | A shortcut for `element.querySelectorSelectorAll()`. Context defaults to the document when no context is passed.                                                                     |
| `addClass(element, names)`| Adds a space-separated collection of CSS classes to the element or collection of elements.                                                                                           |
| `removeClass(element, names)`| Removes a space-separated collection of CSS classes from the element  or collection of elements.                                                                                     |
| `on(element, events, selector, handler, capture)` | Binds a space separated collection of events to the element. Can be delagated to a parent if a selector is passed. Returns a collection (or single) of id's representing the handler |
| `off(ids)`| Removes the event listener matching the given id or ids.|
| `trigger(elements, event, detail)`| Triggers an event. By default the event bubbles and is cancelable|


## Example

The following code runs when the document is ready adding a class `highlight` to the even `li` elements. A click handler is bound to the parent which removes that class from the `li` target.

``` js
$d.ready().then(() => {
    let even = $d.queryAll("li:nth-of-type(even)");
    $d.addClass(even, "highlight");

    $d.on($d.query("ul"), "click", ".highlight", (e) => {
        $d.removeClass(e.target, "highlight");
    });
});
```

## Browser Support

We live in the future. Support covers evergreen browers supporting [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/index.html)
