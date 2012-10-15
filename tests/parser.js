describe("trim", function() {
    it("No whitespace", function() {
        expect("foo".trim()).toBe("foo");
    });

    it("Leading whitespace", function() {
        expect("  foo".trim()).toBe("foo");
    });

    it("Trailing whitespace", function() {
        expect("foo  ".trim()).toBe("foo");
    });

    it("Whitespace everywhere", function() {
        expect("  f o o  ".trim()).toBe("f o o");
    });
});


describe("Core / Parser", function() {
    var ArgumentParser;

    requireDependencies(["core/parser"], function(cls) {
        ArgumentParser = cls;
    });

    describe("_parse", function() {
        it("Positional argument", function() {
            var parser=new ArgumentParser();
            parser.add_argument("selector");
            var opts = parser._parse(".MyClass");
            expect(opts.selector).toBe(".MyClass");
        });

        it("Empty first value value", function() {
            var parser=new ArgumentParser();
            parser.add_argument("first");
            parser.add_argument("second");
            var opts = parser._parse("; bar");
            expect(opts.first).toBe(undefined);
            expect(opts.second).toBe("bar");
        });

        it("Named argument", function() {
            var parser=new ArgumentParser();
            parser.add_argument("selector");
            parser.add_argument("attr");
            var opts = parser._parse("attr: class");
            expect(opts.selector).toBe(undefined);
            expect(opts.attr).toBe("class");
        });

        it("Dash in key", function() {
            var parser=new ArgumentParser();
            parser.add_argument("time-delay");
            var opts = parser._parse("15");
            expect(opts["timeDelay"]).toBeDefined();
        });

        it("Extra colons in named argument", function() {
            var parser=new ArgumentParser();
            parser.add_argument("selector");
            var opts = parser._parse("selector: nav:first");
            expect(opts.selector).toBe("nav:first");
        });

        it("Ignore extra positional parameters", function() {
            var parser=new ArgumentParser();
            parser.add_argument("foo");
            var opts = parser._parse("bar; buz");
            expect(opts.foo).toBe("bar");
        });

        it("Ignore unknown named parameter", function() {
            var parser=new ArgumentParser();
            parser.add_argument("selector");
            var opts = parser._parse("attr: class");
            expect(opts.attr).toBeUndefined();
        });
    });
    
    describe("parse", function() {
        describe("Value bubbling", function() {
            it("Use default from parser", function() {
                var parser=new ArgumentParser();
                parser.add_argument("selector", "default");
                var opts = parser.parse($(), "");
                expect(opts.selector).toBe("default");
            });

            it("Value from data attribute", function() {
                var parser=new ArgumentParser("mypattern");
                parser.add_argument("selector", "default");
                var opts = parser.parse($('<div data-pat-mypattern="element"/>'));
                expect(opts.selector).toBe("element");
            });

            it("Inherit value from parent data attribute", function() {
                var parser=new ArgumentParser("mypattern");
                parser.add_argument("selector", "default");
                var $content = $("<div data-pat-mypattern='parent'><span/></div>").find("span");
                var opts = parser.parse($content);
                expect(opts.selector).toBe("parent");
            });

            it("Prefer value from element data attribute", function() {
                var parser=new ArgumentParser("mypattern");
                parser.add_argument("selector", "default");
                var $content = $("<div data-pat-mypattern='parent'><span data-pat-mypattern='el'/></div>").find("span");
                var opts = parser.parse($content);
                expect(opts.selector).toBe("el");
            });

            it("Parameter trumps all", function() {
                var parser=new ArgumentParser("mypattern");
                parser.add_argument("selector", "default");
                var opts = parser.parse(
                    $('<div data-pat-mypattern="element"/>'),
                    {selector: "parameter"});
                expect(opts.selector).toBe("parameter");
            });

        });

        describe("Multiple argument handling", function() {
            it("Ignore extra arguments when multiple not requested", function() {
                var parser=new ArgumentParser("mypattern");
                parser.add_argument("value");
                var $content = $("<div data-pat-mypattern='one && two'/>");
                var opts = parser.parse($content);
                expect(Array.isArray(opts)).toBe(false);
                expect(opts.value).toBe("one");
            });

            it("Return all arguments when multiple requested", function() {
                var parser=new ArgumentParser("mypattern");
                parser.add_argument("value");
                var $content = $("<div data-pat-mypattern='one && two'/>");
                var opts = parser.parse($content, true);
                expect(Array.isArray(opts)).toBe(true);
                expect(opts[0].value).toBe("one");
                expect(opts[1].value).toBe("two");
            });
        });
    });

    describe("_coerce", function() {
        it("Convert to number", function() {
            var parser = new ArgumentParser();
            parser.add_argument("value", 0);
            expect(parser._coerce({value: "15"}).value).toBe(15);
        });

        it("Always use decimal notation for numbers", function() {
            var parser = new ArgumentParser();
            parser.add_argument("value", 0);
            expect(parser._coerce({value: "010"}).value).toBe(10);
        });

        it("Convert to boolean", function() {
            var parser = new ArgumentParser();
            parser.add_argument("value", false);
            expect(parser._coerce({value: "1"}).value).toBe(true);
            expect(parser._coerce({value: "TRUE"}).value).toBe(true);
            expect(parser._coerce({value: "YeS"}).value).toBe(true);
            expect(parser._coerce({value: "0"}).value).toBe(false);
            expect(parser._coerce({value: "False"}).value).toBe(false);
            expect(parser._coerce({value: "n"}).value).toBe(false);
            expect(parser._coerce({value: "unknown"}).value).toBe(false);
        });

        it("Convert to number", function() {
            var parser = new ArgumentParser();
            parser.add_argument("value", 15);
            expect(parser._coerce({value: "1"}).value).toBe(1);
            expect(parser._coerce({value: "0"}).value).toBe(0);
            expect(parser._coerce({value: "010"}).value).toBe(10);
            expect(isNaN(parser._coerce({value: "ZZZ"}).value)).toBe(true);
        });
    });
});

// jshint indent: 4, browser: true, jquery: true, quotmark: double
// vim: sw=4 expandtab
