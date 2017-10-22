/**! 
 * DUM.js | MIT License | https://github.com/JimBobSquarePants/DUM.js 
 */

const $d = ((w, d) => {

    // Regular expressions
    const rspace = /\s+/;

    // Returns the type of an object in lowercase
    const type = obj => {
        if (obj === null) {
            return "null";
        }

        if (obj === undefined) {
            return "undefined";
        }

        let ret = (Object.prototype.toString.call(obj).match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();

        if (ret == "number" && isNaN(obj)) {
            return "nan";
        }

        return ret;
    };

    const isString = obj => type(obj) === "string";

    const isArray = obj => type(obj) === "array";

    const arrayFunction = (items, handler, args) => {
        items = isArray(items) ? items : [items];
        let result = [];
        items.forEach(i => {
            let r = handler.apply(i, args);
            result = result.concat(isArray(r) ? r : [r]);
        });
        return result;
    };

    const classAction = (elements, method, names) => {
        (isArray(names) ? names : names.split(rspace)).forEach(n => {
            arrayFunction(elements, function () {
                this.classList[method](n);
            });
        });
    };

    const sibling = (element, dir, expression) => {
        // eslint-disable-next-line no-empty
        while (!element.matches(expression) && (element = element[dir])) { }
        return element;
    };

    // Handles the adding and removing of events. 
    // Events can be assigned to the element or delegated to a parent 
    const Handler = (() => {
        let i = 1,
            listeners = {};

        // Bubbled event handling
        const delegate = (selector, handler, event) => {
            let t = event.target;
            if (t.closest && t.closest(selector)) {
                handler.call(t, event);
            }
        };
        return {
            on: (element, event, selector, handler) => {
                if (selector) {
                    element.addEventListener(event, handler = delegate.bind(element, selector, handler), false);
                } else {
                    element.addEventListener(event, handler, true);
                }
                listeners[i] = {
                    element: element,
                    event: event,
                    handler: handler,
                    capture: selector ? false : true
                };
                return i++;
            },
            off: id => {
                if (id in listeners) {
                    let h = listeners[id];
                    h.element.removeEventListener(h.event, h.handler, h.capture);
                    delete listeners[id];
                }
            }
        };
    })();

    // The public instance. We only need one to power the while thing.
    class DUM {

        // Similar to jQuery's $.ready() function. Returns a Promise
        ready(context) {
            context = context || d;

            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                if (context.readyState !== "loading") {
                    resolve();
                }
                else {
                    Handler.on(context, "DOMContentLoaded", null, () => resolve());
                }
            });
        }

        // A shortcut for document.getElementById();
        id(id) { return d.getElementById(id); }

        // A shortcut for element.querySelectorSelector();
        query(expression, context) {
            if (arguments.length == 2 && !context || !expression) {
                return null;
            }

            return isString(expression) ? (context || d).querySelector(expression) : expression || null;
        }

        // A shortcut for element.querySelectorSelectorAll() that can handle multiple contexts
        queryAll(expression, contexts) {
            if (expression instanceof Node || expression instanceof Window) {
                return [expression];
            }

            if (isArray(contexts) && !contexts.length) {
                return [];
            }

            return arrayFunction(contexts || document, function () {
                return Array.prototype.slice.call(isString(expression) ? this.querySelectorAll(expression) : expression || []);
            });
        }

        // A shortcut for document.createElement()
        create(type) {
            return d.createElement(type);
        }

        // Adds an array or space-separated collection of classes to an element or collection of elements
        addClass(elements, names) {
            classAction(elements, "add", names);
        }

        // Removes an array or space-separated collection of classes to an element or collection of elements
        removeClass(elements, names) {
            classAction(elements, "remove", names);
        }

        // Toggles an array or space-separated collection of classes to an element or collection of elements
        toggleClass(elements, names) {
            classAction(elements, "toggle", names);
        }

        // Returns the value for the given attribute name from an element
        getAttr(element, name) {
            return element.getAttribute(name);
        }

        // Sets the collection of attribute values on the element
        setAttr(element, values) {
            Object.keys(values).forEach(k => element.setAttribute(k, values[k]));
        }

        // Gets the first previous element sibling matching the given optional expression
        prev(element, expression) {
            return expression ? sibling(element, "previousElementSibling", expression) : element.previousElementSibling;
        }

        // Gets the first next element sibling matching the given optional expression
        next(element, expression) {
            return expression ? sibling(element, "nextElementSibling", expression) : element.nextElementSibling;
        }

        // Adds an event listener to the given element returning the id of the listener
        // Events can be delegated by passing a selector
        on(element, events, selector, handler) {
            return arrayFunction(events, function () { return Handler.on(element, this, selector, handler); });
        }

        // Adds an event listener to the given element removing it once the event is fired
        // Events can be delegated by passing a selector
        one(element, events, selector, handler) {
            let ids = [],
                one = () => this.off(ids);

            events = isArray(events) ? events : [events];
            events.forEach(e => {
                ids.push(Handler.on(element, e, selector, handler));
                ids.push(Handler.on(element, e, selector, one));
            });
        }

        // Removes the event listener matching the given ids
        off(ids) {
            arrayFunction(ids, function () { Handler.off(this); });
        }

        // Triggers an event. By default the event bubbles and is cancelable
        trigger(elements, event, detail) {
            let params = { bubbles: true, cancelable: true, detail: detail };
            return arrayFunction(elements, function () { return this.dispatchEvent(new CustomEvent(event, params)); }).length || false;
        }
    }

    return w.$d = w.$DUM = new DUM();

})(window, document);