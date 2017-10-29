QUnit.module("selectors", {
    setup: function () {
        document.body.focus();
    },
    teardown: globals.tearDown
});

QUnit.test("id selectors match", function (assert) {
    assert.expect(1);

    let actual = DUM.id("firstp");
    let expected = document.getElementById("firstp");

    assert.equal(expected, actual, "id should return the same element as getElementById");
});

QUnit.test("query selectors match", function (assert) {
    assert.expect(1);

    let actual = DUM.query("#firstp");
    let expected = document.querySelector("#firstp");
    assert.equal(expected, actual, "query should return the same element as querySelector");
});

QUnit.test("queryAll selectors match", function (assert) {
    assert.expect(2);

    let actual = DUM.queryAll("#firstp");
    let expected = Array.prototype.slice.call(document.querySelectorAll("#firstp"));

    assert.equal(1, actual.length, "queryAll should have a value");
    assert.deepEqual(expected, actual, "queryAll should return the same elements as querySelectorAll");
});

QUnit.test("prev selectors id's correctly", function (assert) {
    assert.expect(1);

    let target = DUM.query("#secondp");
    let expected = "firstp";

    assert.equal(expected, DUM.prev(target, "p").id, "prev should select correct item");
});

QUnit.test("next selectors id's correctly", function (assert) {
    assert.expect(1);

    let target = DUM.query("#secondp");
    let expected = "thirdp";

    assert.equal(expected, DUM.next(target, "p").id, "next should select correct item");
});

QUnit.test("children selector matches single child", function (assert) {
    assert.expect(2);

    let target = DUM.query("#firstp");
    let actual = DUM.children(target, "span");

    assert.equal(1, actual.length, "children should have a value");
    assert.equal("SPAN", actual[0].tagName, "children should select correct item type");
});

QUnit.test("children selector matches multiple children", function (assert) {
    assert.expect(4);

    let target = DUM.queryAll("p");
    let actual = DUM.children(target, "span");

    assert.equal(3, actual.length, "children should have a value");

    actual.forEach(element => {
        assert.equal("SPAN", element.tagName, "children should select correct item type");
    });
});