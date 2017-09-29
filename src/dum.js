/* jshint esversion: 6 */

/*!
 * DUM.js
 * https://github.com/JimBobSquarePants/DUM.js
 *
 * Copyright James Jackson-South and other contributors
 * Released under the MIT license
 */

((w, d) => {

    // Regular expressions
    const rspace = /\s+/;

    // Returns the type of an object in lowercase
    const type = (obj) => {
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

    const isString = (obj) => { return type(obj) === "string"; };

    const isArray = (obj) => { return type(obj) === "array"; };

    const arrayHandler = (items, handler, args) => {
        if (isArray(items)) {
            let result = [];
            items.forEach((i) => { result.push(handler.apply(i, args)); });
            return result;
        }

        return handler.apply(items, args);
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
                handler.call(this, event);
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
            off: (id) => {
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

            return new Promise((resolve, reject) => {
                if (context.readyState !== "loading") {
                    resolve();
                }
                else {
                    context.addEventListener("DOMContentLoaded", () => {
                        resolve();
                    });
                }
            });
        }

        // A shortcut for element.querySelectorSelector();
        query(expression, context) {
            if (arguments.length == 2 && !context || !expression) {
                return null;
            }

            return isString(expression) ? (context || d).querySelector(expression) : expression || null;
        }

        // A shortcut for element.querySelectorSelectorAll()
        queryAll(expression, context) {
            if (expression instanceof Node || expression instanceof Window) {
                return [expression];
            }

            if (arguments.length == 2 && !context) {
                return [];
            }

            return Array.prototype.slice.call(isString(expression) ? (context || document).querySelectorAll(expression) : expression || []);
        }

        // Adds a space separated collection of classes to an element or collection of elements
        addClass(elements, names) {
            names.split(rspace).forEach((n) => {
                arrayHandler(elements, function () { this.classList.add(n); });
            });
        }

        // Adds a space separated collection of classes to an element or collection of elements
        removeClass(elements, names) {
            names.split(rspace).forEach((n) => {
                arrayHandler(elements, function () { this.classList.remove(n); });
            });
        }

        // Adds an event listener to the given element returning the id of the listener
        // Events can be delegated by passing a selector
        on(element, events, selector, handler) {
            if (isArray(events)) {
                let ids = [];
                events.forEach((e => {
                    ids.push(Handler.on(element, e, selector, handler));
                }));

                return ids;
            }

            return Handler.on(element, events, selector, handler);
        }

        // Removes the event listener matching the given ids
        off(ids) {
            arrayHandler(ids, function () { Handler.off(this); });
        }

        // Triggers an event. By default the event bubbles and is cancelable
        trigger(elements, event, detail) {
            let params = { bubbles: true, cancelable: true, detail: detail };
            arrayHandler(elements, function () { return this.dispatchEvent(new CustomEvent(event, params)); });
        }
    }

    w.$d = w.$DUM = new DUM();

})(window, document);