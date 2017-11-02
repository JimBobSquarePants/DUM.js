# <img src="dum-js.svg" height="150" alt="DUM.js logo"/>

**A teeny tiny helper library for working with the DOM**

**DUM.js** helps you work with the DOM a lot easier by providing a concise API for common tasks that would normally be much more verbose. 

**DUM.js** isn't designed for AJAX or animations or anything else already covered by dedicated libraries.

*Please note: This is a work in progress, ideas and assistance most welcome!!
I'm specifically looking for help bundling the library for different importers.
*

## API

**DUM.js** adds an object to the global scope with the following identifiers: `$d` or `DUM` That object contains the following signatures.

<dl>
<dt><code>ready(context)</code></dt>
<dd>Fires when the documents <code>DOMContentLoaded</code> is triggered. Returns a Promise.</dd>
</dl>

``` js
$d.ready().then(() => {
 // Do your thing
});
```

<dl>
<dt><code>id(id)</code></dt>
<dd>A shortcut for <code>document.getElementById()</code></dd>
</dl>

``` js
let mainForm  = $d.id("mainForm");
```

<dl>
<dt><code>query(expression, context)</code></dt>
<dd>A shortcut for <code>element.querySelector()</code>. 
Context defaults to the document when no context is passed.</dd>
</dl>

``` js
let mainForm  = $d.query(".form");
```

<dl>
<dt><code>queryAll(expression, contexts)</code></dt>
<dd>A shortcut for <code>element.querySelectorAll()</code> with enhancements. 
Contexts defaults to the document when no context or context array is passed. Results are a true array and can be enumerated via <code>forEach</code>.</dd>
</dl>

``` js
let inputs  = $d.queryAll("input[type=text]");
```

<dl>
<dt><code>hasClass(elements, names)</code></dt>
<dd>Returns a value indicating whether the given element classlist contains the given class name.</dd>
</dl>

``` js
const hasClass = $d.hasClass($d.query("input[type=text]"), "fancy");
```

<dl>
<dt><code>addClass(elements, names)</code></dt>
<dd>Adds an array or space-separated collection of CSS classes to the element or collection of elements.</dd>
</dl>

``` js
$d.addClass($d.queryAll("input[type=text]"), "fancy");
$d.addClass($d.queryAll("input[type=text]"), "fancy fancier");
$d.addClass($d.queryAll("input[type=text]"), ["fancy","fancier","fanciest"]);
```

<dl>
<dt><code>removeClass(elements, names)</code></dt>
<dd>Removes an array or space-separated collection of CSS classes from the element or collection of elements.</dd>
</dl>

``` js
$d.removeClass($d.queryAll("input[type=text]"), "fancy");
$d.removeClass($d.queryAll("input[type=text]"), "fancy fancier");
$d.removeClass($d.queryAll("input[type=text]"), ["fancy","fancier","fanciest"]);
```

<dl>
<dt><code>toggleClass(elements, names)</code></dt>
<dd>Toggles an array or space-separated collection of CSS classes, adding the classes to or removing from the element or collection of elements.</dd>
</dl>

``` js
$d.toggleClass($d.queryAll("input[type=text]"), "fancy");
$d.toggleClass($d.queryAll("input[type=text]"), "fancy fancier");
$d.toggleClass($d.queryAll("input[type=text]"), ["fancy","fancier","fanciest"]);
```

<dl>
<dt><code>getAttr(element, name)</code></dt>
<dd>Returns the value for the given attribute name from an element.</dd>
</dl>

``` js
$d.getAttr($d.queryAll("input[type=text]"), "name");
```

<dl>
<dt><code>setAttr(elements, values)</code></dt>
<dd>Sets the collection of attribute values on the element or collection of elements.</dd>
</dl>

``` js
$d.setAttr($d.queryAll("input[type=text]"), {"name":"firstname", "placeholder":"first name"});
```

<dl>
<dt><code>setStyle(elements, values)</code></dt>
<dd>Sets the collection of style values on the element or collection of elements.</dd>
</dl>

``` js
$d.setAttr($d.queryAll("input[type=text]"), {"height":"16px", "display":"block"});
```

<dl>
<dt><code>prev(element, expression)</code></dt>
<dd>Gets the first previous element sibling matching the given optional expression.</dd>
</dl>

``` js
$d.prev($d.query("td"), "[scope=row]");
```

<dl>
<dt><code>next(element, expression)</code></dt>
<dd>Gets the first next element sibling matching the given optional expression.</dd>
</dl>

``` js
$d.next($d.query("td"), "[scope=row]");
```

<dl>
<dt><code>children(elements, expression)</code></dt>
<dd>Gets the immediate children of the elements or elements matching the given optional expression.</dd>
</dl>

``` js
$d.children($d.query("tr"), "td");
```

<dl>
<dt><code>create(type)</code></dt>
<dd>A shortcut for <code>document.createElement()</code>.</dd>
</dl>

``` js
$d.create($d.query("p"));
```

<dl>
<dt><code>prepend(elements, children)</code></dt>
<dd>
Prepends the child or collection of child elements to the element or collection of elements.<br/>
If prepending to multiple elements the nodes are deep cloned for successive elements<br/>
The child collection is reversed before prepending to ensure order is correct.
</dd>
</dl>

``` js
$d.append($d.query("p"), $d.create("span"));
```

<dl>
<dt><code>append(elements, children)</code></dt>
<dd>
Appends the child or collection of child elements to the element or collection of elements.<br/>
If appending to multiple elements the nodes are deep cloned for successive elements
</dd>
</dl>

``` js
$d.append($d.query("p"), $d.create("span"));
```

<dl>
<dt><code>empty(elements)</code></dt>
<dd>Empties the contents of the given element or elements. Any event handlers bound to each element contents are automatically removed.</dd>
</dl>

``` js
$d.empty($d.query("input[type=text]"));
$d.empty($d.queryAll("input[type=text]"));
```

<dl>
<dt><code>on(element, events, selector, handler, capture)</code></dt>
<dd>Binds a space-separated collection of events to the element. Can be delegated to a parent if a selector is passed. Returns a collection (or single) of id's representing the handler.</dd>
</dl>

``` js
let handlerId = $d.on($d.query("ul"), "click", ".highlight", e => {
    $d.addClass(e.target, "highlight highlight-alt");
});
```

<dl>
<dt><code>one(element, events, selector, handler, capture)</code></dt>
<dd>Binds a space-separated collection of events to the element, removing it once the event is fired. Can be delegated to a parent if a selector is passed.</dd>
</dl>

``` js
$d.one($d.query("ul"), "click", ".highlight", e => {
    $d.addClass(e.target, "highlight highlight-alt");
});
```

<dl>
<dt><code>off(ids)</code></dt>
<dd>Removes the event listener or listeners matching the given id or ids.</dd>
</dl>

``` js
$d.off(handleIds);
```

<dl>
<dt><code>trigger(elements, event, detail)</code></dt>
<dd>Triggers an event. By default the event bubbles and is cancelable.</dd>
</dl>

``` js
$d.trigger($d.queryAll("li"), "customevent");
```

## Browser Support

We live in the future. Support covers evergreen browers supporting [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/index.html)
