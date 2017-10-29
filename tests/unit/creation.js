QUnit.module("creation", {
    setup: function () {
        document.body.focus();
    },
    teardown: globals.tearDown
});

QUnit.test("create item", function (assert) {
    assert.expect(2);

    let element= DUM.create("span");

    assert.ok(element);
    assert.equal("SPAN", element.tagName, "create should create correct item type");
});