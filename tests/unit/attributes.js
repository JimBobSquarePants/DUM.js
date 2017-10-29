QUnit.module("attributes", {
    setup: function () {
        document.body.focus();
    },
    teardown: globals.tearDown
});

QUnit.test("add/remove single attribute", function (assert) {
    assert.expect(2);

    let attrName = "data-foo";
    let attrValue = "bar";

    DUM.setAttr(DUM.id("firstp"), { [attrName]: attrValue });
    assert.ok(DUM.id("firstp").getAttribute(attrName), "Can add single attribute");

    DUM.setAttr(DUM.id("firstp"), { [attrName]: "" });
    assert.ok(!DUM.id("firstp").getAttribute(attrName), "Can remove single attribute");
});

QUnit.test("add/remove multiple attributes", function (assert) {
    assert.expect(4);

    let attrName = "data-foo";
    let attrValue = "bar";

    let attrName2 = "data-baz";
    let attrValue2 = "qux";

    DUM.setAttr(DUM.id("firstp"), { [attrName]: attrValue, [attrName2]: attrValue2 });
    assert.ok(DUM.id("firstp").getAttribute(attrName), "Can add first attribute");
    assert.ok(DUM.id("firstp").getAttribute(attrName2), "Can add second attribute");

    DUM.setAttr(DUM.id("firstp"), { [attrName]: "", [attrName2]: "" });
    assert.ok(!DUM.id("firstp").getAttribute(attrName), "Can remove first attribute");
    assert.ok(!DUM.id("firstp").getAttribute(attrName2), "Can remove second attribute");
});