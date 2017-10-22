QUnit.module("selectors", {
    setup: function () {
        document.body.focus();
    },
    teardown: globals.tearDown
});

QUnit.test("id selectors match", function (assert) {
    assert.expect(1);

    let actual = $DUM.id("firstp");
    let expected = document.getElementById("firstp");

    assert.equal(expected, actual, "id should return the same element as getElementById");
});

QUnit.test("query selectors match", function (assert) {
    assert.expect(1);

    let actual = $DUM.query("#firstp");
    let expected = document.querySelector("#firstp");
    assert.equal(expected, actual, "query should return the same element as querySelector");
});

QUnit.test("queryAll selectors match", function (assert) {
    assert.expect(2);

    let actual = $DUM.queryAll("#firstp");
    let expected = Array.prototype.slice.call(document.querySelectorAll("#firstp"));

    assert.equal(1, actual.length, "queryAll should have a value");
    assert.deepEqual(expected, actual, "queryAll should return the same elements as querySelectorAll");
});

// TODO: Tests for prev/next