// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.

/*global desc, task, jake, fail, complete */
(function () {
	"use strict";

	desc("Build and test");
	task("default", ["lint", "test"]);

	desc("Lint everything");
	task("lint", [], function () {
		var lint = require("./build/lint/lint_runner.js");

		var files = new jake.FileList();
		files.include("**/*.js");
		files.include("**/*.jakefile");
		files.exclude("node_modules");
		var options = nodeLintOptions();
		var passed = lint.validateFileList(files.toArray(), options, {});
		if (!passed) fail("Lint failed");
	});

	desc("Test everything");
	task("test", [], function () {
		var files = new jake.FileList();
		files.include("**/_*_test.js");
		files.exclude("node_modules");

		var reporter = require("nodeunit").reporters["default"];
		reporter.run(files.toArray(), null, function (failures) {
			if (failures) fail("Tests failed");
			complete();
		});
	}, {async:true});

	function nodeLintOptions() {
		return {
			bitwise:true,
			curly:false,
			eqeqeq:true,
			forin:true,
			immed:true,
			latedef:false,
			newcap:true,
			noarg:true,
			noempty:true,
			nonew:true,
			regexp:true,
			undef:true,
			strict:true,
			trailing:true,
			node:true
		};
	}
}());