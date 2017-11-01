QUnit.module("style", {
    beforeEach: globals.beforeEach,
    afterEach: globals.afterEach
});

QUnit.test("add/remove single style to single item", function (assert) {
    assert.expect(3);

    let element = DUM.id("firstp");
    const styleName = "height";
    const styleValue = "100px";

    DUM.setStyle(element, { [styleName]: styleValue });
    assert.ok(element.style[styleName], "Can add single style");
    assert.equal(element.style[styleName], styleValue, "Single style value is equal");

    DUM.setStyle(element, { [styleName]: "" });
    assert.ok(!element.style[styleName], "Can remove single style");
});

QUnit.test("add/remove single style to multiple items", function (assert) {
    assert.expect(9);

    let elements = DUM.queryAll(".tester");
    const styleName = "height";
    const styleValue = "100px";

    DUM.setStyle(elements, { [styleName]: styleValue });
    elements.forEach(element => {
        assert.ok(element.style[styleName], "Can add single style");
    });

    elements.forEach(element => {
        assert.equal(element.style[styleName], styleValue, "Single style value is equal");
    });

    DUM.setStyle(elements, { [styleName]: "" });
    elements.forEach(element => {
        assert.ok(!element.style[styleName], "Can remove single style");
    });
});

QUnit.test("add/remove multiple styles to single item", function (assert) {
    assert.expect(6);

    let element = DUM.id("firstp");
    const styleName = "height";
    const styleValue = "100px";
    const styleName2 = "width";
    const styleValue2 = "50px";

    DUM.setStyle(element, { [styleName]: styleValue, [styleName2]: styleValue2 });
    assert.ok(element.style[styleName], "Can add first style");
    assert.ok(element.style[styleName2], "Can add second style");
    assert.equal(element.style[styleName], styleValue, "First style value is equal");
    assert.equal(element.style[styleName2], styleValue2, "Second style value is equal");

    DUM.setStyle(element, { [styleName]: "", [styleName2]: "" });
    assert.ok(!element.style[styleName], "Can remove first style");
    assert.ok(!element.style[styleName2], "Can remove second style");
});

QUnit.test("add/remove multiple styles to multiple items", function (assert) {
    assert.expect(18);

    let elements = DUM.queryAll(".tester");
    const styleName = "height";
    const styleValue = "100px";
    const styleName2 = "width";
    const styleValue2 = "50px";

    DUM.setStyle(elements, { [styleName]: styleValue, [styleName2]: styleValue2 });
    elements.forEach(element => {
        assert.ok(element.style[styleName], "Can add first style");
        assert.ok(element.style[styleName2], "Can add second style");
    });

    elements.forEach(element => {
        assert.equal(element.style[styleName], styleValue, "First style value is equal");
        assert.equal(element.style[styleName2], styleValue2, "Second style value is equal");
    });

    DUM.setStyle(elements, { [styleName]: "", [styleName2]: "" });
    elements.forEach(element => {
        assert.ok(!element.style[styleName], "Can remove first style");
        assert.ok(!element.style[styleName2], "Can remove second style");
    });
});