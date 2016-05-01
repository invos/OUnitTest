/*
Created by : Vikas Sen
Twitter: @vikassen
*/
"use strict";

var OUnit = OUnit || {};

OUnit.Suit = function(title){
	this.title = title;
	this.tests = [];
	this.testsOn = [];
	this.beforeSuite = function(){};
	this.afterSuite = function(){};
	this.beforeTest = function(){};
	this.afterTest = function(){};
};

OUnit.TestCase = function(title,def,enabled){
	this.title = title;
	this.def = def;
	this.enabled = (enabled === undefined || enabled) ;
	this.passed = true;
	this.recordAssertResult = [];
};

OUnit.Suit.prototype.addTest = function(test){
		this.tests.push(test);
};

OUnit.Suit.prototype.addTestOn = function(el,evt,test){
		el.addEventListener(evt, function(){
			test.recordAssertResult = [];
			test.def(new test.Assert(test));
		});
};

OUnit.TestCase.prototype.Assert = function(test){
	 this.shouldBeEqual = function(expected,actual) {
		var flag = expected === actual;
		recordTestResult(flag);
	 };
	 this.shouldNotBeEqual = function(expected,actual) {
		var flag = expected !== actual;
		recordTestResult(flag);
	 };
	 this.shouldBeNull = function(value) {
		var flag = value === null;
		recordTestResult(flag);
	 };
	 this.shouldNotBeNull = function(value) {
		var flag = value !== null;
		recordTestResult(flag);
	 };
	 var recordTestResult = function(flag){
		test.passed &= flag;
		test.recordAssertResult.push("Assert No: "+
      (test.recordAssertResult.length+1)+ " is"+ (flag ? " passed": " failed"));
	 };
};

OUnit.Suit.prototype.executeTests = function(){
	var performance = performance || { now: function() { return 0; } };
	var suiteExecutionStarts = performance.now();
	this.beforeSuite();
	var result = "Total Test Cases Executed: ";
	var detailedResult = "";
	var testCasesExecuted = [];
	var passedTestCases = [];
	var failedTestCases = [];
	var testExecutionTime = [];
	for(var index in this.tests){
		var test = this.tests[index];
		if(test.enabled){
			var testExecutionStarts = performance.now();
			this.beforeTest();
			test.def(new test.Assert(test));
			this.afterTest();
			var testExecutionEnds = performance.now();
			testExecutionTime.push(testExecutionEnds - testExecutionStarts);
			testCasesExecuted.push(test.title);
			if(test.passed){
				passedTestCases.push(test.title);
			}else{
				failedTestCases.push(test.title);
			}
			detailedResult += ">>TestCase ("+test.title+"):" + test.recordAssertResult +"| Test Result - {"+(test.passed?"Passed":"Failed")+"}"+"\n";
		}
	}
	result += testCasesExecuted.length;
	result += " ,Total Passed Test Cases: " + passedTestCases.length;
	result += " ,Total Failed Test Cases: " + failedTestCases.length;
	this.afterSuite();
	var suiteExecutionEnds = performance.now();
	var timeTaken = suiteExecutionEnds - suiteExecutionStarts;
	return {
		getReport : function(){ return detailedResult;},
		getSmartReport : function(){ return{
														report: this.getReport(),
														summary: this.getSummary(),
														testCasesExecuted: this.getTestCasesExecuted(),
														executionTime: this.getExecutionTime(),
														passedTestCases: this.getPassedTestCases(),
														failedTestCases: this.getFailedTestCases(),
														testExecutionTime: this.getExecutionTime()
												};},
		getSummary : function(){ return result;},
		getExecutionTime: function(){ return timeTaken===1 ? "Upgrade browser" : timeTaken;},
		getTestCasesExecuted : function(){ return testCasesExecuted;},
		getPassedTestCases: function(){ return passedTestCases;},
		getFailedTestCases: function(){ return failedTestCases;},
		getTestExecutionTime: function(){ return testExecutionTime;}
	};
};

OUnit.Suites = {
	create: function(title){
		var suite = new OUnit.Suit(title);
		this.suites.push(suite);
		return suite;
	},
	suites : []
};
