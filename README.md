# OUnitTest
Simple and small JavaScript unit testing library

API (See documenation for more details):

	OUnit.Suites.create
	<suiteInstance.>beforeSuite
	<suiteInstance.>afterSuite
	<suiteInstance.>beforeTest
	<suiteInstance.>afterTest
	<suiteInstance.>addTest
	assert.shouldBeEqual
	assert.shouldNotBeEqual
	assert.shouldBeNull
	assert.shouldNotBeNull
	<suiteInstance.>executeTests
	<testCaseResult.>getSummary
	<testCaseResult.>getReport
	<testCaseResult.>getSmartReport

Documentation:

- Creating suite
	> var mySuite = OUnit.Suites.create("Test Suite");

- Specifying before/after for suite and test case
	> mySuite.beforeSuite = function(){ console.log("Setup done!")};

	> mySuite.afterSuite = function(){ console.log("clear done!")};

	> mySuite.beforeTest = function() {console.log("Before Testcase execute..")};

	> mySuite.afterTest = function() {console.log("After Testcase execute..")};

- Adding test cases
	> mySuite.addTest(new OUnit.TestCase("test1", function(assert){

	>	assert.shouldBeEqual(s.pageName,"Test:Test1");

	>	assert.shouldBeEqual(s.pageName,"Test:Test");

	> },enabledTestCase)); // enabledTestCase to enable or disabled test case

	> mySuite.addTest(new OUnit.TestCase("test2", function(assert){

	> 	assert.shouldBeEqual(5==5,false);

	> },false));

	> mySuite.addTest(new OUnit.TestCase("test3", function(assert){

	> 	assert.shouldBeEqual(s.var1,"20");

	> }));

	> mySuite.addTest(new OUnit.TestCase("test4", function(assert){

	> 	assert.shouldNotBeEqual(s.var1,"21");

	> }));

	> mySuite.addTest(new OUnit.TestCase("test5", function(assert){

	> 	assert.shouldBeNull(null);

	> }));

	> mySuite.addTest(new OUnit.TestCase("test6", function(assert){

	> 	assert.shouldNotBeNull(s.pageName);

	> }));

- Add test case on dom element, will be executed when specifid event fired.
	> var test = new OUnit.TestCase("test7", function(assert){

	>	assert.shouldNotBeNull(s.pageName);

	>	assert.shouldNotBeEqual(s.var1,"21");

	>	assert.shouldNotBeNull(null);

	> });

- How to view result.
	> var result = mySuite.executeTests();

	> console.log("*************** Summary ***************************************");

	> console.log(result.getSummary());

	> console.log("*************** Report ***************************************");

	> console.log(result.getReport());

	> console.log("*************** Smart Report ***************************************");

	> console.log(result.getSmartReport());

	> "*************** Summary ***************************************" OUnitTestDemo.js:57:0

	> "Total Test Cases Executed: 5 ,Total Passed Test Cases: 4 ,Total Failed Test Cases: 1" OUnitTestDemo.js:58:0

	> "*************** Report ***************************************" OUnitTestDemo.js:59:0

	> "TestCase (test1):Assert No: 1 is failed,Assert No: 2 is passed| Test Result - {Failed}

	> TestCase (test3):Assert No: 1 is passed| Test Result - {Passed}

	> TestCase (test4):Assert No: 1 is passed| Test Result - {Passed}

	> TestCase (test5):Assert No: 1 is passed| Test Result - {Passed}

	> TestCase (test6):Assert No: 1 is passed| Test Result - {Passed}

	> " OUnitTestDemo.js:60:0

	> "*************** Smart Report ***************************************" OUnitTestDemo.js:61:0

	> Object { report: ">>TestCase (test1):Assert No: 1 is …", summary: "Total Test Cases Executed: 5 ,Total…", testCasesExecuted: Array[5], executionTime: 0, passedTestCases: Array[4], failedTestCases: Array[1], testExecutionTime: 0 }
