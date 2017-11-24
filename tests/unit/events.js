QUnit.module("events", {
    beforeEach: globals.beforeEach,
    afterEach: globals.afterEach
});

QUnit.test("null or undefined handler", function (assert) {
    assert.expect(10);

    // on
    try {
        globals.addHandlers(DUM.on(DUM.id("firstp"), "click", null, null));
        assert.ok(true, "Passing a null handler to on will not throw an exception");
    } catch (e) { }

    try {
        globals.addHandlers(DUM.on(DUM.id("firstp"), "click", undefined, undefined));
        assert.ok(true, "Passing an undefined handler to on will not throw an exception");
    } catch (e) { }

    try {
        globals.addHandlers(DUM.on(DUM.id("firstp"), "click", null, e => { }));
        assert.ok(true, "Passing a null selector to on will not throw an exception");
    } catch (e) { }

    try {
        globals.addHandlers(DUM.on(DUM.id("firstp"), "click", undefined, e => { }));
        assert.ok(true, "Passing an undefined selector to on will not throw an exception");
    } catch (e) { }

    try {
        globals.addHandlers(DUM.on(DUM.id("firstp"), "click", e => {
            assert.ok(true, "Passing only 3 parameters uses the correct parameter");
        }));

        assert.ok(true, "Passing only 3 parameters will not throw an exception");
        DUM.trigger(DUM.id("firstp"), "click");
    } catch (e) {

    }

    // one
    try {
        DUM.one(DUM.id("firstp"), "click", null, null);
        assert.ok(true, "Passing a null handler to one will not throw an exception");
    } catch (e) { }

    try {
        DUM.one(DUM.id("firstp"), "click", undefined, undefined);
        assert.ok(true, "Passing an undefined handler to one will not throw an exception");
    } catch (e) { }

    try {
        DUM.one(DUM.id("firstp"), "click", null, e => { });
        assert.ok(true, "Passing a null selector to one will not throw an exception");
    } catch (e) { }

    try {
        DUM.one(DUM.id("firstp"), "click", undefined, e => { });
        assert.ok(true, "Passing an undefined selector to one will not throw an exception");
    } catch (e) { }
});