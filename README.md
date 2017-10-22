# <img src="dum-js.svg" height="150" alt="DUM.js logo"/>

**A teeny tiny helper library for working with the DOM**

**DUM.js** helps you work with the DOM a little easier by providing a concise API for common tasks that would normally be much more verbose. 

**DUM.js** isn't designed for AJAX or animations or anything else already covered by dedicated libraries.

*Please note: This is a work in progress, ideas and assistance most welcome!!*

## API

**DUM.js** adds an object to the global scope with the following identifiers: `$d` or `$DUM` That object contains the following signatures.

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
<dt><code>setAttr(element, values)</code></dt>
<dd>Sets the collection of attribute values on the element.</dd>
</dl>

``` js
$d.setAttr($d.queryAll("input[type=text]"), {"name":"firstname", "placeholder":"first name"});
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
