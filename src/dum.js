/**! 
 * DUM.js | MIT License | https://github.com/JimBobSquarePants/DUM.js 
 */

const $d = ((w, d) => {

    // Regular expressions
    // Spaces
    const rspace = /\s+/;

    // Array-like collections that we should slice
    const rslice = /nodelist|htmlcollection/;

    const keys = Object.keys;

    // Returns the type of an object in lowercase. Kudos Angus Croll
    // https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
    const type = obj => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

    const isString = obj => type(obj) === "string";

    const isArray = obj => type(obj) === "array";

    // Convert, number, string, and collection types to an array 
    const toArray = obj => {
        return (obj && (isArray(obj) ? obj : rslice.test(type(obj)) ? [].slice.call(obj) : [obj])) || [];
    }

    const arrayFunction = (items, delegate, args) => {
        let result = [];
        toArray(items).forEach(i => {
            const r = delegate.apply(i, args);
            result = result.concat(toArray(r));
        });
        return result;
    };

    const classAction = (elements, method, names) => {
        (isArray(names) ? names : (names && names.split(rspace)) || []).forEach(n => {
            arrayFunction(elements, function () { n && this.classList[method](n); });
        });
    };

    const insertAction = (elements, children, reverse, action) => {
        children = toArray(children);
        children = reverse ? children.reverse() : children;
        let i = 0
        arrayFunction(elements, function () {
            // If we are adding to multiple elements we need to clone
            let clones = i > 0 ? children.map(c => c.cloneNode(true)) : children
            clones.forEach(c => action.call(this, c));
            i++
        });
    }

    const sibling = (element, dir, expression) => {
        // eslint-disable-next-line no-empty
        while ((element = element[dir]) && !element.matches(expression)) { }
        return element;
    };

    // Handles the adding and removing of events. 
    // Events can be assigned to the element or delegated to a parent 
    const Handler = (() => {
        const handlerMap = new WeakMap();
        let i = 0;

        const getHandlers = function (element, event) {
            if (!handlerMap.has(element)) {
                let handlers = { [event]: {} };
                handlerMap.set(element, handlers);
            } else if (!handlerMap.get(element)[[event]]) {
                let handlers = handlerMap.get(element);
                handlers[[event]] = {};
                handlerMap.set(element, handlers);
            }

            return handlerMap.get(element)[[event]];
        };

        // Bubbled event handling, one-time running
        const delegate = (selector, handler, element, once, event) => {
            if (!handler) {
                return;
            }
            if (selector) {
                let t = event.target;
                if (t.closest && t.closest(selector)) {
                    handler.call(t, event);
                }
            } else {
                handler.call(element, event);
            }

            if (once) {
                Handler.off(element, event.type);
            }
        };

        return {
            on: function (element, event, selector, handler, capture, once) {

                handler = delegate.bind(element, selector, handler, element, once);
                element.addEventListener(event, handler, capture);
                getHandlers(element, event)[i++] = {
                    handler: handler,
                    capture: capture
                };
            },
            off: function (element, event) {
                let handlers = getHandlers(element, event);
                keys(handlers).forEach(l => {
                    let h = handlers[l];
                    element.removeEventListener(event, h.handler, h.capture);
                    delete handlers[l];
                });
            }
        }
    })();

    /**
     * Specifies helper methods for traversing and manipulating the Document Object Model (DOM)
     * in an efficient manner 
     * @class DUM
     */
    class DUM {

        /**
         * Specifies a function to execute when the element of DOM is fully loaded.
         * @param {HTMLElement | HTMLDocument} context The context to monitor the state of; defaults to `document` if not set
         * @returns {Promise}
         * @memberof DUM
         */
        ready(context) {
            context = context || d;

            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                if (context.readyState !== "loading") {
                    resolve();
                }
                else {
                    Handler.on(context, "DOMContentLoaded", null, () => resolve(), true, true);
                }
            });
        }

        /**
         * Returns a reference to the first object with the specified value of the `id` or `name` attribute.
         * @param {string} id 
         * @returns {HTMLElement | null}
         * @memberof DUM
         */
        id(id) { return d.getElementById(id); }

        /**
         * Returns the first element that is a descendant of the element on which it is invoked that matches the 
         * specified group of selectors.
         * @param {string} expression The selector expression; this must be valid CSS syntax
         * @param {HTMLElement | HTMLDocument} context The context to search within; defaults to `document` if not set
         * @returns {HTMLElement | null}
         * @memberof DUM
         */
        query(expression, context) {
            if (arguments.length == 2 && !context || !expression) {
                return null;
            }

            return isString(expression) ? (context || d).querySelector(expression) : expression || null;
        }

        /**
         * Returns a list of the elements within the element or collection of elements (using depth-first pre-order traversal of the elements nodes) 
         * that match the specified group of selectors. The object returned is different from `querySelectorAll` in that it is a true array.
         * @param {string} expression The selector expression; this must be valid CSS syntax
         * @param {HTMLElement | HTMLElement[] | HTMLDocument} contexts The element or collection of elements to search within; defaults to `document` if not set
         * @returns {HTMLElement[]}
         * @memberof DUM
         */
        queryAll(expression, contexts) {
            if (expression instanceof Node || expression instanceof Window) {
                return [expression];
            }

            if (isArray(contexts) && !contexts.length) {
                return [];
            }

            return arrayFunction(contexts || document, function () {
                return toArray(isString(expression) ? this.querySelectorAll(expression) : expression || []);
            });
        }

        /**
         * Returns the element matching the optional expression immediately prior to the specified one in its parent's children list, 
         * or `null` if the specified element is the first one in the list.
         * @param {HTMLElement} element The element to search from
         * @param {string} expression The optional selector expression; this must be valid CSS syntax
         * @returns {HTMLElement | null}
         * @memberof DUM
         */
        prev(element, expression) {
            return expression ? sibling(element, "previousElementSibling", expression) : element.previousElementSibling;
        }

        /**
         * Returns the element matching the optional expression immediately following to the specified one in its parent's children list, 
         * or `null` if the specified element is the last one in the list.
         * @param {HTMLElement} element The element to search from
         * @param {string} expression The optional selector expression; this must be valid CSS syntax
         * @returns {HTMLElement | null}
         * @memberof DUM
         */
        next(element, expression) {
            return expression ? sibling(element, "nextElementSibling", expression) : element.nextElementSibling;
        }

        /**
         * Returns an ordered collection of DOM elements that are children of the given element or element collection. 
         * If there are no element children, then children contains no elements and has a length of 0.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements to search within
         * @param {string} expression The optional selector expression; this must be valid CSS syntax
         * @returns {HTMLElement[]}
         * @memberof DUM
         */
        children(elements, expression) {
            return arrayFunction(elements, function () {
                return toArray(this && this.children).filter(c => expression ? c.matches(expression) : true);
            });
        }

        /**
         * Creates an instance of an element for the specified tag
         * @param {string} type 
         * @returns {HTMLElement}
         * @memberof DUM
         */
        create(type) {
            return d.createElement(type);
        }

        /**
         * Prepends the child or collection of child elements to the element or collection of elements.
         * The child collection is reversed before prepending to ensure order is correct.
         * If prepending to multiple elements the nodes are deep cloned for successive elements.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements to prepend within
         * @param {HTMLElement | HTMLElement[]} children The child or collection of child elements
         * @memberof DUM
         */
        prepend(elements, children) {
            insertAction(elements, children, true, function (c) {
                this.insertBefore(c, this.firstChild);
            });
        }

        /**
         * Appends the child or collection of child elements to the element or collection of elements
         * If appending to multiple elements the nodes are deep cloned for successive elements.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements to prepend within
         * @param {HTMLElement | HTMLElement[]} children The child or collection of child elements
         * @memberof DUM
         */
        append(elements, children) {
            insertAction(elements, children, false, function (c) {
                this.appendChild(c);
            });
        }

        /**
         * Detaches an element from the DOM returning the result. Any event handlers bound to the element are still present.
         * @param {HTMLElement} element The element to detach
         * @returns {HTMLElement}
         * @memberof DUM
         */
        detach(element) {
            element && element.remove();
            return element;
        }

        /**
         * Returns a value indicating whether the specified class value exists in class attribute of the element.
         * @param {HTMLElement} element The element to search within
         * @param {string} name The class name 
         * @returns {boolean}
         * @memberof DUM
         */
        hasClass(element, name) {
            return element.classList.contains(name);
        }

        /**
         * Add the specified class, space-separated class values or class array to the given element or collection of elements. 
         * If these classes already exist in attribute of the element, then they are ignored.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements
         * @param {string | string[]} names 
         * @memberof DUM
         */
        addClass(elements, names) {
            classAction(elements, "add", names);
        }

        /**
         * Removes the specified class, space-separated class values or class array from the given element or collection of elements. 
         * If these classes already exist in attribute of the element, then they are ignored.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements
         * @param {string | string[]} names 
         * @memberof DUM
         */
        removeClass(elements, names) {
            classAction(elements, "remove", names);
        }

        /**
         * Toggles the specified class, space-separated class values or class array to or from the given element or collection of elements. 
         * If these classes already exist in attribute of the element, then they are ignored.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements
         * @param {string | string[]} names 
         * @memberof DUM
         */
        toggleClass(elements, names) {
            classAction(elements, "toggle", names);
        }

        /**
         * Returns the value of a specified attribute on the element. If the given attribute does not exists the value 
         * returned will be `null`.
         * @param {HTMLElement} element The element
         * @param {string} name The string specifying the attribute whose value to return
         * @returns {HTMLElement | null}
         * @memberof DUM
         */
        getAttr(element, name) {
            return element && element.getAttribute(name);
        }

        /**
         * Sets the collection of attribute values on the element or collection of elements.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements
         * @param {object} values The object contining the collection of key-value attribute pairs to set
         * @memberof DUM
         */
        setAttr(elements, values) {
            arrayFunction(elements, function () {
                keys(values).forEach(k => this.setAttribute(k, values[k]));
            });
        }

        /**
         * Removes specified attribute, space-separated attribute names or attribute array from the element or collection of elements.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements
         * @param {string | string[]} names The name or array of names to remove
         * @memberof DUM
         */
        removeAttr(elements, names) {
            (isArray(names) ? names : names.split(rspace)).forEach(n => {
                arrayFunction(elements, function () { this.removeAttribute(n); });
            });
        }

        /**
         * Sets the collection of style values on the element or collection of elements.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements
         * @param {object} values The object contining the collection of key-value attribute pairs to set
         * @memberof DUM
         */
        setStyle(elements, values) {
            arrayFunction(elements, function () {
                keys(values).forEach(k => {
                    if (k in this.style) {
                        this.style[k] = values[k];
                    }
                    else {
                        this.style.setProperty(k, values[k]);
                    }
                });
            });
        }

        /**
         * Empties the contents of the given element or collection of elements. 
         * Any event handlers bound to the element contents are automatically garbage collected.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements
         * @memberof DUM
         */
        empty(elements) {
            arrayFunction(elements, function () {
                let child = this;
                while ((child = this.firstChild)) {
                    child.remove(); // Events are automatically gc collected
                }
            });
        }

        /**
         * Adds an event listener to the given element. Events can be delegated to a parent by passing a CSS selector.
         * @param {HTMLElement} element 
         * @param {string | string[]} events The event or collection of event names
         * @param {string | undefined} selector The optional selector expression; this must be valid CSS syntax or `undefined`
         * @param {Function} handler The function to call when the event is triggered
         * @memberof DUM
         */
        on(element, events, selector, handler) {
            if (isString(selector)) {
                arrayFunction(events, function () { Handler.on(element, this, selector, handler, false, false); });
            } else {
                handler = selector;
                arrayFunction(events, function () { Handler.on(element, this, null, handler, true, false); });
            }
        }

        /**
        * Adds an event listener to the given element that is immediately unbound when the event is triggered. 
        * Events can be delegated to a parent by passing a CSS selector.
        * @param {HTMLElement} element 
        * @param {string | string[]} events The event or collection of event names
        * @param {string | undefined} selector The selector expression; this must be valid CSS syntax or `undefined`
        * @param {Function} handler The function to call when the event is triggered
        * @memberof DUM
        */
        one(element, events, selector, handler) {
            if (isString(selector)) {
                arrayFunction(events, function () { Handler.on(element, this, selector, handler, false, true); });
            } else {
                handler = selector;
                arrayFunction(events, function () { Handler.on(element, this, null, handler, true, true); });
            }
        }

        /**
         * Removes any event listener matching the given name or names.
         * @param {number[]} element The element to remove the events from.
         * @param {string | string[]} events The event name or names, previously bound using `on`.
         * @memberof DUM
         */
        off(element, events) {
            arrayFunction(events, function () { Handler.off(element, this); });
        }

        /**
         * Triggers an event returning a value indicating whether the event has been cancelled. 
         * By default the event bubbles and is cancelable.
         * @param {HTMLElement | HTMLElement[]} elements The element or collection of elements
         * @param {string} event The name of the event to trigger
         * @param {object} detail Optional and defaulting to `null` this contains any event dependant value associated with the event
         * @returns {boolean} A value indicating whether at least one of the bound event handlers called `Event.preventDefault()`
         * @memberof DUM
         */
        trigger(elements, event, detail) {
            const params = { bubbles: true, cancelable: true, detail: detail };
            return arrayFunction(elements, function () { return this.dispatchEvent(new CustomEvent(event, params)); }).length || false;
        }
    }

    return w.$d = w.DUM = new DUM();

})(window, document);

// export default $d