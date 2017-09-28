/* jshint esversion: 6 */

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

    // Handles the adding and removing of events. 
    // Events can be assigned to the element or delegated to a parent 
    const Handler = (() => {
        let i = 1,
            listeners = {};

        // Bubbled event handling
        const delegate = (selector, handler, event) => {
            let t = event.target;
            while (t && t !== this) {
                if (t.matches(selector)) {
                    handler.call(t, event);
                    break;
                }
                t = t.parentNode;
            }
        };
        return {
            on: (element, event, selector, handler, capture) => {
                let delegateHandler = selector ? delegate.bind(element, selector, handler) : handler;
                element.addEventListener(event, delegateHandler, capture);
                listeners[i] = {
                    element: element,
                    event: event,
                    handler: delegateHandler,
                    capture: capture
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

        // Adds a space separated collection of classes to an element
        addClass(element, names) {
            names.split(rspace).forEach((n) => {
                element.classList.add(n);
            });
        }

        // Adds a space separated collection of classes to an element
        removeClass(element, names) {
            names.split(rspace).forEach((n) => {
                element.classList.remove(n);
            });
        }

        // Adds an event listener to the given element returning the id of the listener
        // Events can be delegated by passing a selector
        on(element, events, selector, handler, capture) {

            if (isArray(events)) {
                let ids = [];
                events.forEach((e => {
                    ids.push(Handler.on(element, e, selector, handler, capture));
                }));

                return ids;
            }

            return Handler.on(element, events, selector, handler, capture);
        }

        // Removes the event listener matching the given id
        off(ids) {
            if (isArray(ids)) {
                ids.forEach((i) => {
                    Handler.off(i);
                });
            } else {
                Handler.off(ids);
            }
        }
    }

    w.$d = w.$DUM = new DUM();

})(window, document);