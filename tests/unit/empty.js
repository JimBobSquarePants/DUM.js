QUnit.module("empty", {
    beforeEach: globals.beforeEach,
    afterEach: globals.afterEach
});

QUnit.test("empty single item", function (assert) {
    assert.expect(3);

    let parent = DUM.query("#firstp")
    let child = DUM.query("#firstp > span");

    assert.ok(child);
    assert.equal("SPAN", child.tagName, "Should create find item type");

    DUM.empty(parent);
    assert.equal(parent.innerHTML, "", "Should empty parent item");
});

QUnit.test("empty multiple items", function (assert) {
    assert.expect(9);

    let parents = DUM.queryAll(".tester");

    DUM.children(parents).forEach(child => {
        assert.ok(child);
        assert.equal("SPAN", child.tagName, "Should create find item type");
    });

    DUM.empty(parents);
    parents.forEach(p => {
        assert.equal(p.innerHTML, "", "Should empty parent item");
    });
});