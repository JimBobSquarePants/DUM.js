QUnit.module("creation", {
    beforeEach: globals.beforeEach,
    afterEach: globals.afterEach
});

QUnit.test("create item", function (assert) {
    assert.expect(2);

    let element = DUM.create("span");

    assert.ok(element);
    assert.equal("SPAN", element.tagName, "create should create correct item type");
});