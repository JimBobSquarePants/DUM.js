QUnit.module("classes", {
    setup: function () {
        document.body.focus();
    },
    teardown: globals.tearDown
});

QUnit.test("manipulate single classes", function (assert) {
    assert.expect(2);
    let className = "customclass";

    $DUM.addClass($DUM.id("firstp"), className);
    assert.ok($DUM.id("firstp").classList.contains(className), "Can add single classname");

    $DUM.removeClass($DUM.id("firstp"), className);
    assert.ok(!$DUM.id("firstp").classList.contains(className), "Can remove single classname");
});

QUnit.test("manipulate multiple classes", function (assert) {
    assert.expect(4);
    let className = "customclass",
        className2 = "customclass2";

    $DUM.addClass($DUM.id("firstp"), className + " " + className2);
    let expected = $DUM.id("firstp").classList.contains(className) && $DUM.id("firstp").classList.contains(className2);
    assert.ok(expected, "Can add multiple space-separated classnames");

    $DUM.removeClass($DUM.id("firstp"), className + " " + className2);
    expected = !$DUM.id("firstp").classList.contains(className) && !$DUM.id("firstp").classList.contains(className2);
    assert.ok(expected, "Can remove multiple space-separated classnames");

    $DUM.addClass($DUM.id("firstp"), [className, className2]);
    expected = $DUM.id("firstp").classList.contains(className) && $DUM.id("firstp").classList.contains(className2);
    assert.ok(expected, "Can add multiple classnames in array");

    $DUM.removeClass($DUM.id("firstp"), [className , className2]);
    expected = !$DUM.id("firstp").classList.contains(className) && !$DUM.id("firstp").classList.contains(className2);
    assert.ok(expected, "Can remove multiple classnames in array");
});