QUnit.module("insert", {
    beforeEach: globals.beforeEach,
    afterEach: globals.afterEach
});

QUnit.test("append single item to single parent", function (assert) {
    assert.expect(3);

    const parent = DUM.id("firstp");
    const className = "span1";
    let children = DUM.children(parent, "span");

    assert.equal(1, children.length, "Only one original child present");

    const child = DUM.create("span");
    DUM.addClass(child, className);
    DUM.append(parent, child);

    children = DUM.children(parent, "span");
    assert.equal(2, children.length, "New child has been appended");
    assert.ok(DUM.hasClass(children[1], className), "New child is in correct position");
});

QUnit.test("append multiple items to single parent", function (assert) {
    assert.expect(4);

    const parent = DUM.id("firstp");
    const className = "span1";
    const className2 = "span2";
    let originalChild = DUM.children(parent, "span");

    assert.equal(1, originalChild.length, "Only one original child present");

    let children = [DUM.create("span"), DUM.create("span")];
    DUM.addClass(children[0], className);
    DUM.addClass(children[1], className2);
    DUM.append(parent, children);

    children = DUM.children(parent, "span");

    assert.equal(3, children.length, "New children have been appended");
    assert.ok(DUM.hasClass(children[1], className), "First new child is in correct position");
    assert.ok(DUM.hasClass(children[2], className2), "Second new child is in correct position");
});

QUnit.test("append multiple items to multiple parents", function (assert) {
    assert.expect(10);

    const parents = DUM.queryAll(".tester");
    const className = "span1";
    const className2 = "span2";
    const originalChildren = DUM.children(parents, "span");

    assert.equal(3, originalChildren.length, "Only three original children present");

    const children = [DUM.create("span"), DUM.create("span")];
    DUM.addClass(children[0], className);
    DUM.addClass(children[1], className2);
    DUM.append(parents, children);

    parents.forEach(p => {
        const c = DUM.children(p, "span");
        assert.equal(3, c.length, "New children have been appended");
        assert.ok(DUM.hasClass(c[1], className), "First new child is in correct position");
        assert.ok(DUM.hasClass(c[2], className2), "Second new child is in correct position");
    });
});

QUnit.test("prepend single item to single parent", function (assert) {
    assert.expect(3);

    const parent = DUM.id("firstp");
    const className = "span1";
    let children = DUM.children(parent, "span");

    assert.equal(1, children.length, "Only one original child present");

    const child = DUM.create("span");
    DUM.addClass(child, className);
    DUM.prepend(parent, child);

    children = DUM.children(parent, "span");
    assert.equal(2, children.length, "New child has been prepended");
    assert.ok(DUM.hasClass(children[0], className), "New child is in correct position");
});

QUnit.test("prepend multiple items to single parent", function (assert) {
    assert.expect(4);

    const parent = DUM.id("firstp");
    const className = "span1";
    const className2 = "span2";
    let originalChild = DUM.children(parent, "span");

    assert.equal(1, originalChild.length, "Only one original child present");

    let children = [DUM.create("span"), DUM.create("span")];
    DUM.addClass(children[0], className);
    DUM.addClass(children[1], className2);
    DUM.prepend(parent, children);

    children = DUM.children(parent, "span");

    assert.equal(3, children.length, "New children have been prepended");
    assert.ok(DUM.hasClass(children[0], className), "First new child is in correct position");
    assert.ok(DUM.hasClass(children[1], className2), "Second new child is in correct position");
});

QUnit.test("prepend multiple items to multiple parents", function (assert) {
    assert.expect(10);

    const parents = DUM.queryAll(".tester");
    const className = "span1";
    const className2 = "span2";
    const originalChildren = DUM.children(parents, "span");

    assert.equal(3, originalChildren.length, "Only three original children present");

    const children = [DUM.create("span"), DUM.create("span")];
    DUM.addClass(children[0], className);
    DUM.addClass(children[1], className2);
    DUM.prepend(parents, children);

    parents.forEach(p => {
        const c = DUM.children(p, "span");
        assert.equal(3, c.length, "New children have been prepended");
        assert.ok(DUM.hasClass(c[0], className), "First new child is in correct position");
        assert.ok(DUM.hasClass(c[1], className2), "Second new child is in correct position");
    });
});