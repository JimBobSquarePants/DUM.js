QUnit.module("attributes", {
    beforeEach: globals.beforeEach,
    afterEach: globals.afterEach
});

QUnit.test("add/remove single attribute", function (assert) {
    assert.expect(2);

    let element = DUM.id("firstp");
    const attrName = "data-foo";
    const attrValue = "bar";

    DUM.setAttr(element, { [attrName]: attrValue });
    assert.ok(element.getAttribute(attrName), "Can add single attribute");

    DUM.setAttr(element, { [attrName]: "" });
    assert.ok(!element.getAttribute(attrName), "Can remove single attribute");
});

QUnit.test("add/remove single attribute to multiple items", function (assert) {
    assert.expect(9);

    let elements = DUM.queryAll(".tester");
    const attrName = "data-foo";
    const attrValue = "bar";

    DUM.setAttr(elements, { [attrName]: attrValue });
    elements.forEach(element => {
        assert.ok(element.getAttribute(attrName), "Can add single attribute");
    });

    elements.forEach(element => {
        assert.equal(element.getAttribute(attrName), attrValue, "Single attribute value is equal");
    });

    DUM.setAttr(elements, { [attrName]: "" });
    elements.forEach(element => {
        assert.ok(!element.getAttribute(attrName), "Can remove single attribute");
    });
});

QUnit.test("add/remove multiple attributes", function (assert) {
    assert.expect(4);

    let element = DUM.id("firstp");
    const attrName = "data-foo";
    const attrValue = "bar";
    const attrName2 = "data-baz";
    const attrValue2 = "qux";

    DUM.setAttr(element, { [attrName]: attrValue, [attrName2]: attrValue2 });
    assert.ok(element.getAttribute(attrName), "Can add first attribute");
    assert.ok(element.getAttribute(attrName2), "Can add second attribute");

    DUM.setAttr(element, { [attrName]: "", [attrName2]: "" });
    assert.ok(!element.getAttribute(attrName), "Can remove first attribute");
    assert.ok(!element.getAttribute(attrName2), "Can remove second attribute");
});

QUnit.test("add/remove multiple attributes to multiple items", function (assert) {
    assert.expect(18);

    let elements = DUM.queryAll(".tester");
    const attrName = "data-foo";
    const attrValue = "bar";
    const attrName2 = "data-baz";
    const attrValue2 = "qux";

    DUM.setAttr(elements, { [attrName]: attrValue, [attrName2]: attrValue2 });
    elements.forEach(element => {
        assert.ok(element.getAttribute(attrName), "Can add first attribute");
        assert.ok(element.getAttribute(attrName2), "Can add second attribute");
    });

    elements.forEach(element => {
        assert.equal(element.getAttribute(attrName), attrValue, "First attribute value is equal");
        assert.equal(element.getAttribute(attrName2), attrValue2, "Second attribute value is equal");
    });

    DUM.setAttr(elements, { [attrName]: "", [attrName2]: "" });
    elements.forEach(element => {
        assert.ok(!element.getAttribute(attrName), "Can remove first attribute");
        assert.ok(!element.getAttribute(attrName2), "Can remove second attribute");
    });
});