QUnit.module("classes", {
    beforeEach: globals.beforeEach,
    afterEach: globals.afterEach
});

QUnit.test("add/remove single classes", function (assert) {
    assert.expect(2);
    let element = DUM.id("firstp");
    const className = "customclass";

    DUM.addClass(element, className);
    assert.ok(element.classList.contains(className), "Can add single classname");

    DUM.removeClass(element, className);
    assert.ok(!element.classList.contains(className), "Can remove single classname");
});

QUnit.test("add/remove multiple classes", function (assert) {
    assert.expect(4);

    let element = DUM.id("firstp");
    const className = "customclass",
        className2 = "customclass2";

    DUM.addClass(element, className + " " + className2);
    let expected = element.classList.contains(className) && element.classList.contains(className2);
    assert.ok(expected, "Can add multiple space-separated classnames");

    DUM.removeClass(element, className + " " + className2);
    expected = !element.classList.contains(className) && !element.classList.contains(className2);
    assert.ok(expected, "Can remove multiple space-separated classnames");

    DUM.addClass(element, [className, className2]);
    expected = element.classList.contains(className) && element.classList.contains(className2);
    assert.ok(expected, "Can add multiple classnames in array");

    DUM.removeClass(element, [className, className2]);
    expected = !element.classList.contains(className) && !element.classList.contains(className2);
    assert.ok(expected, "Can remove multiple classnames in array");
});

QUnit.test("toggle single classes", function (assert) {
    assert.expect(2);

    let element = DUM.id("firstp");
    const className = "customclass";

    DUM.toggleClass(element, className);
    assert.ok(element.classList.contains(className), "Can add single classname");

    DUM.toggleClass(element, className);
    assert.ok(!element.classList.contains(className), "Can remove single classname");
});

QUnit.test("toggle multiple classes", function (assert) {
    assert.expect(4);

    let element = DUM.id("firstp");
    const className = "customclass",
        className2 = "customclass2";

    DUM.toggleClass(element, className + " " + className2);
    let expected = element.classList.contains(className) && element.classList.contains(className2);
    assert.ok(expected, "Can add multiple space-separated classnames");

    DUM.toggleClass(element, className + " " + className2);
    expected = !element.classList.contains(className) && !element.classList.contains(className2);
    assert.ok(expected, "Can remove multiple space-separated classnames");

    DUM.toggleClass(element, [className, className2]);
    expected = element.classList.contains(className) && element.classList.contains(className2);
    assert.ok(expected, "Can add multiple classnames in array");

    DUM.toggleClass(element, [className, className2]);
    expected = !element.classList.contains(className) && !element.classList.contains(className2);
    assert.ok(expected, "Can remove multiple classnames in array");
});