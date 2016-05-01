/*
Created by : Vikas Sen
Twitter: @vikassen
*/

"use strict";
// Sample Data
var s = {};
s.pageName = "Test:Test";
s.var1 = '20';
//

var enabledTestCase = true;

var mySuite = OUnit.Suites.create("Test Suite");

mySuite.beforeSuite = function(){ console.log("Suite setup done!")};
mySuite.afterSuite = function(){ console.log("Suite clear done!")};

mySuite.beforeTest = function() {console.log("Before Testcase execute..")};
mySuite.afterTest = function() {console.log("After Testcase execute..")};

mySuite.addTest(new OUnit.TestCase("test1", function(assert){
	assert.shouldBeEqual(s.pageName,"Test:Test1");
	assert.shouldBeEqual(s.pageName,"Test:Test");
},enabledTestCase));

mySuite.addTest(new OUnit.TestCase("test2", function(assert){
	assert.shouldBeEqual(5==5,false);
},false));

mySuite.addTest(new OUnit.TestCase("test3", function(assert){
	assert.shouldBeEqual(s.var1,"20");
}));

mySuite.addTest(new OUnit.TestCase("test4", function(assert){
	assert.shouldNotBeEqual(s.var1,"21");
}));

mySuite.addTest(new OUnit.TestCase("test5", function(assert){
	assert.shouldBeNull(null);
}));

mySuite.addTest(new OUnit.TestCase("test6", function(assert){
	assert.shouldNotBeNull(s.pageName);
}));

var test = new OUnit.TestCase("test7", function(assert){
	assert.shouldNotBeNull(s.pageName);
	assert.shouldNotBeEqual(s.var1,"21");
	assert.shouldNotBeNull(null);
});

var result = mySuite.executeTests();
console.log("*************** Summary ***************************************");
console.log(result.getSummary());
console.log("*************** Report ***************************************");
console.log(result.getReport());
console.log("*************** Smart Report ***************************************");
console.log(result.getSmartReport());
