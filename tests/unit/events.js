QUnit.module("events", {
    beforeEach: globals.beforeEach,
    afterEach: globals.afterEach
});

QUnit.test("null or undefined handler", function (assert) {
    assert.expect(10);

    // on
    try {
        DUM.on(DUM.id("firstp"), "click", null, null);
        assert.ok(true, "Passing a null handler to on will not throw an exception");
    } catch (e) { }

    try {
        DUM.on(DUM.id("firstp"), "click", undefined, undefined);
        assert.ok(true, "Passing an undefined handler to on will not throw an exception");
    } catch (e) { }

    try {
        DUM.on(DUM.id("firstp"), "click", null, e => { });
        assert.ok(true, "Passing a null selector to on will not throw an exception");
    } catch (e) { }

    try {
        DUM.on(DUM.id("firstp"), "click", undefined, e => { });
        assert.ok(true, "Passing an undefined selector to on will not throw an exception");
    } catch (e) { }

    try {
        DUM.on(DUM.id("firstp"), "click", e => {
            assert.ok(true, "Passing only 3 parameters uses the correct parameter");
        });

        assert.ok(true, "Passing only 3 parameters will not throw an exception");
        DUM.trigger(DUM.id("firstp"), "click");
    } catch (e) { }

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

QUnit.test("Once handling of bound events", function (assert) {
    assert.expect(1);

    DUM.one(DUM.id("firstp"), "mouseover", e => {
        assert.ok(true, "Event is only triggered once");
    });

    DUM.trigger(DUM.id("firstp"), "mouseover");
    DUM.trigger(DUM.id("firstp"), "mouseover");
});

QUnit.test("Namespacing", function (assert) {
    assert.expect(4);
    const p = DUM.id("firstp");

    // No namespace trigger. Namespace Off
    DUM.on(p, "custom1.a", e => {

        assert.ok(true, "Event 'a' is only triggered");
        assert.equal("", e.detail.namespace, "Namespace should be empty");

    });

    DUM.on(p, "custom1.b", e => {
        assert.ok(true, "Event  'b' is only triggered");
    });

    DUM.off(p, "custom1.b");

    DUM.trigger(p, "custom1");

    // Trigger with full namespace
    DUM.on(p, "custom2.c", e => {

        assert.ok(true, "Event 'c' is only triggered");
        assert.equal("c", e.detail.namespace, "Namespace should equal 'c'");
    });

    DUM.trigger(p, "custom2.c");
});