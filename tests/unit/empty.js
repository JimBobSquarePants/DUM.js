QUnit.module("empty", {
    beforeEach: globals.beforeEach,
    afterEach: globals.afterEach
});

QUnit.test("empty item", function (assert) {
    assert.expect(3);

    let parent = DUM.query("#firstp")
    let child = DUM.query("#firstp > span");

    assert.ok(child);
    assert.equal("SPAN", child.tagName, "Should create find item type");

    DUM.empty(parent);
    assert.equal(parent.innerHTML, "", "Should empty parent item");
});