# <img src="dum-js.svg" height="150" alt="DUM.js logo"/>

**A teeny tiny helper library for working with the DOM**

**DUM.js** helps you work with the DOM a lot easier by providing a concise API for common tasks that would normally be much more verbose. 

**DUM.js** isn't designed for AJAX or animations or anything else already covered by dedicated libraries.

*Please note: This is a work in progress, ideas and assistance most welcome!!
I'm specifically looking for help bundling the library for different importers.
*

## API

**DUM.js** adds an object to the global scope with the following identifiers: `$d` or `DUM` That object contains the following signatures.

<a name="DUM"></a>

## DUM - $d
**Kind**: global class

* [DUM](#DUM)
    * [.ready(context)](#DUM+ready) ⇒ <code>Promise</code>
    * [.id(id)](#DUM+id) ⇒ <code>HTMLElement</code> \| <code>null</code>
    * [.query(expression, context)](#DUM+query) ⇒ <code>HTMLElement</code> \| <code>null</code>
    * [.queryAll(expression, contexts)](#DUM+queryAll) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
    * [.prev(element, expression)](#DUM+prev) ⇒ <code>HTMLElement</code> \| <code>null</code>
    * [.next(element, expression)](#DUM+next) ⇒ <code>HTMLElement</code> \| <code>null</code>
    * [.children(elements, expression)](#DUM+children) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
    * [.create(type)](#DUM+create) ⇒ <code>HTMLElement</code>
    * [.prepend(elements, children)](#DUM+prepend)
    * [.append(elements, children)](#DUM+append)
    * [.detach(element)](#DUM+detach) ⇒ <code>HTMLElement</code>
    * [.hasClass(element, name)](#DUM+hasClass) ⇒ <code>boolean</code>
    * [.addClass(elements, names)](#DUM+addClass)
    * [.removeClass(elements, names)](#DUM+removeClass)
    * [.toggleClass(elements, names)](#DUM+toggleClass)
    * [.getAttr(element, name)](#DUM+getAttr) ⇒ <code>HTMLElement</code> \| <code>null</code>
    * [.setAttr(elements, values)](#DUM+setAttr)
    * [.removeAttr(elements, names)](#DUM+removeAttr)
    * [.setStyle(elements, values)](#DUM+setStyle)
    * [.empty(elements)](#DUM+empty)
    * [.on(element, events, selector, handler)](#DUM+on)
    * [.one(element, events, selector, handler)](#DUM+one)
    * [.off(element, ids)](#DUM+off)
    * [.trigger(elements, event, detail)](#DUM+trigger) ⇒ <code>boolean</code>

<a name="DUM+ready"></a>

### DUM.ready(context) ⇒ <code>Promise</code>
Specifies a function to execute when the element of DOM is fully loaded.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| context | <code>HTMLElement</code> \| <code>HTMLDocument</code> | The context to monitor the state of; defaults to `document` if not set |

``` js
$d.ready().then(() => {
 // Do your thing
});
```

<a name="DUM+id"></a>

### DUM.id(id) ⇒ <code>HTMLElement</code> \| <code>null</code>
Returns a reference to the first object with the specified value of the `id` or `name` attribute.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type |
| --- | --- |
| id | <code>string</code> |

``` js
let mainForm  = $d.id("mainForm");
```

<a name="DUM+query"></a>

### DUM.query(expression, context) ⇒ <code>HTMLElement</code> \| <code>null</code>
Returns the first element that is a descendant of the element on which it is invoked that matches the 
specified group of selectors.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>string</code> | The selector expression; this must be valid CSS syntax |
| context | <code>HTMLElement</code> \| <code>HTMLDocument</code> | The context to search within; defaults to `document` if not set |

``` js
let mainForm  = $d.query(".form");
```

<a name="DUM+queryAll"></a>

### DUM.queryAll(expression, contexts) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
Returns a list of the elements within the element or collection of elements (using depth-first pre-order traversal of the elements nodes) 
that match the specified group of selectors. The object returned is different from `querySelectorAll` in that it is a true array.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>string</code> | The selector expression; this must be valid CSS syntax |
| contexts | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> \| <code>HTMLDocument</code> | The element or collection of elements to search within; defaults to `document` if not set |

``` js
let inputs  = $d.queryAll("input[type=text]");
```

<a name="DUM+prev"></a>

### DUM.prev(element, expression) ⇒ <code>HTMLElement</code> \| <code>null</code>
Returns the element matching the optional expression immediately prior to the specified one in its parent's children list, or `null` if the specified element is the first one in the list.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The element to search from |
| expression | <code>string</code> | The optional selector expression; this must be valid CSS syntax |

``` js
let previous = $d.prev($d.query("td"), "[scope=row]");
```

<a name="DUM+next"></a>

### DUM.next(element, expression) ⇒ <code>HTMLElement</code> \| <code>null</code>
Returns the element matching the optional expression immediately following to the specified one in its parent's children, or null if the specified element is the last one in the list

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The element to search from |
| expression | <code>string</code> | The optional selector expression; this must be valid CSS syntax |

``` js
let next = $d.next($d.query("td"), "[scope=row]");
```

<a name="DUM+children"></a>

### DUM.children(elements, expression) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
Returns an ordered collection of DOM elements that are children of the given element or element collection. 
If there are no element children, then children contains no elements and has a length of 0.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements to search within |
| expression | <code>string</code> | The optional selector expression; this must be valid CSS syntax |

``` js
let children = $d.children($d.query("tr"), "td");
```

<a name="DUM+create"></a>

### DUM.create(type) ⇒ <code>HTMLElement</code>
Creates an instance of an element for the specified tag

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type |
| --- | --- |
| type | <code>string</code> |

``` js
let para = $d.create($d.query("p"));
```

<a name="DUM+prepend"></a>

### DUM.prepend(elements, children)
Prepends the child or collection of child elements to the element or collection of elements.
The child collection is reversed before prepending to ensure order is correct.
If prepending to multiple elements the nodes are deep cloned for successive elements.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements to prepend within |
| children | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The child or collection of child elements |

``` js
$d.prepend($d.query("p"), $d.create("span"));
```

<a name="DUM+append"></a>

### DUM.append(elements, children)
Appends the child or collection of child elements to the element or collection of elements
If appending to multiple elements the nodes are deep cloned for successive elements.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements to prepend within |
| children | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The child or collection of child elements |

``` js
$d.append($d.query("p"), $d.create("span"));
```

<a name="DUM+detach"></a>

### DUM.detach(element) ⇒ <code>HTMLElement</code>
Detaches an element from the DOM returning the result. Any event handlers bound to the element are still present.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The element to detach |

``` js
let detached = $d.detach($d.id("detach"));
```

<a name="DUM+hasClass"></a>

### DUM.hasClass(element, name) ⇒ <code>boolean</code>
Returns a value indicating whether the specified class value exists in class attribute of the element.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The element to search within |
| name | <code>string</code> | The class name |

``` js
const hasClass = $d.hasClass($d.query("input[type=text]"), "fancy");
```

<a name="DUM+addClass"></a>

### DUM.addClass(elements, names)
Add the specified class, space-separated class values or class array to the given element or collection of elements. 
If these classes already exist in attribute of the element, then they are ignored.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |
| names | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  |

``` js
$d.addClass($d.queryAll("input[type=text]"), "fancy");
$d.addClass($d.queryAll("input[type=text]"), "fancy fancier");
$d.addClass($d.queryAll("input[type=text]"), ["fancy","fancier","fanciest"]);
```

<a name="DUM+removeClass"></a>

### DUM.removeClass(elements, names)
Removes the specified class, space-separated class values or class array from the given element or collection of element.
If these classes already exist in attribute of the element, then they are ignored.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |
| names | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  |

``` js
$d.removeClass($d.queryAll("input[type=text]"), "fancy");
$d.removeClass($d.queryAll("input[type=text]"), "fancy fancier");
$d.removeClass($d.queryAll("input[type=text]"), ["fancy","fancier","fanciest"]);
```

<a name="DUM+toggleClass"></a>

### DUM.toggleClass(elements, names)
Toggles the specified class, space-separated class values or class array to or from the given element or collection of elements. 
If these classes already exist in attribute of the element, then they are ignored.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |
| names | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  |

``` js
$d.toggleClass($d.queryAll("input[type=text]"), "fancy");
$d.toggleClass($d.queryAll("input[type=text]"), "fancy fancier");
$d.toggleClass($d.queryAll("input[type=text]"), ["fancy","fancier","fanciest"]);
```

<a name="DUM+getAttr"></a>

### DUM.getAttr(element, name) ⇒ <code>HTMLElement</code> \| <code>null</code>
Returns the value of a specified attribute on the element. If the given attribute does not exists the value 
returned will be `null`.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The element |
| name | <code>string</code> | The string specifying the attribute whose value to return |

``` js
const attr = $d.getAttr($d.queryAll("input[type=text]"), "name");
```

<a name="DUM+setAttr"></a>

### DUM.setAttr(elements, values)
Sets the collection of attribute values on the element or collection of elements

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |
| values | <code>object</code> | The object contining the collection of key-value attribute pairs to set |

``` js
$d.setAttr($d.queryAll("input[type=text]"), {"name":"firstname", "placeholder":"first name"});
```

<a name="DUM+removeAttr"></a>

### DUM.removeAttr(elements, names)
Removes specified attribute, space-separated attribute names or attribute array from the element or collection of elements

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |
| names | <code>string</code> \| <code>Array.&lt;string&gt;</code> | The name or array of names to remove |

``` js
$d.removeAttr($d.queryAll("input[type=text]"), "placeholder");
$d.removeAttr($d.queryAll("input[type=text]"), ["name", "placeholder"]);
```

<a name="DUM+setStyle"></a>

### DUM.setStyle(elements, values)
Sets the collection of style values on the element or collection of elements.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |
| values | <code>object</code> | The object contining the collection of key-value attribute pairs to set |

``` js
$d.setStyle($d.queryAll("input[type=text]"), {"height":"16px", "display":"block"});
```

<a name="DUM+empty"></a>

### DUM.empty(elements)
Empties the contents of the given element or collection of elements. 
Any event handlers bound to the element contents are automatically removed.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |

``` js
$d.empty($d.query("#to-empty"));
$d.empty($d.queryAll(".to-empty"));
```

<a name="DUM+on"></a>

### DUM.on(element, events, selector, handler)
Adds an event listener to the given element or collection of elements. Events can be delegated to a parent by passing an optional CSS selector.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |
| events | <code>string</code> \| <code>Array.&lt;string&gt;</code> | The event or collection of event names |
| selector | <code>string</code> \| <code>undefined</code> | The selector expression; this must be valid CSS syntax or `undefined` |
| handler | <code>function</code> | The function to call when the event is triggered |

``` js
$d.on($d.query("ul"), "click", e => {
    $d.addClass(e.target, "foo");
});

$d.on($d.query("ul"), "click", ".highlight", e => {
    $d.addClass(e.target, "bar");
});
```

<a name="DUM+one"></a>

### DUM.one(element, events, selector, handler)
Adds an event listener to the given element or collection of elements that is immediately unbound when the event is triggered. 
Events can be delegated to a parent by passing a CSS selector.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |
| events | <code>string</code> \| <code>Array.&lt;string&gt;</code> | The event or collection of event names |
| selector | <code>string</code> \| <code>undefined</code> | The selector expression; this must be valid CSS syntax or `undefined` |
| handler | <code>function</code> | The function to call when the event is triggered |

``` js
$d.one($d.query("ul"), "click", e => {
    $d.addClass(e.target, "foo");
});

$d.one($d.query("ul"), "click", ".highlight", e => {
    $d.addClass(e.target, "bar");
});
```

<a name="DUM+off"></a>

### DUM.off(element, events)
Removes any event listener matching the given event name or names.

**Kind**: instance method of [<code>DUM</code>](#DUM)

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |
| events | <code>string</code> \| <code>Array.&lt;string&gt;</code> | The event name or names, previously bound using `on`. |

``` js
$d.off(element, "click");
$d.off(element, ["click", "keydown"]);
```

<a name="DUM+trigger"></a>

### DUM.trigger(elements, event, detail) ⇒ <code>boolean</code>
Triggers an event returning a value indicating whether the event has been cancelled. 
By default the event bubbles and is cancelable.

**Kind**: instance method of [<code>DUM</code>](#DUM)
**Returns**: <code>boolean</code> - A value indicating whether at least one of the bound event handlers called `Event.preventDefault()`

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>HTMLElement</code> \| <code>Array.&lt;HTMLElement&gt;</code> | The element or collection of elements |
| event | <code>string</code> | The name of the event to trigger |
| detail | <code>object</code> | Optional and defaulting to `null` this contains any event dependant value associated with the event |

``` js
if($d.trigger($d.queryAll("li"), "customevent")){
    return;
}
```

## Browser Support

We live in the future. Support covers evergreen browers supporting [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/index.html)
