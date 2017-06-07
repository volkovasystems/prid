
const prid = require( "./prid.js" );
const assert = require( "assert" );

//: note: Please open chrome before testing.
assert.equal( prid( "chrome", true ).length != 0, true, "should not be empty" );

prid( "chrome" )( function done( error, pid ){
	assert.equal( pid.length != 0, true, "should not be empty" );

	console.log( "ok" );
} );

assert.equal( prid( "xxx", true ).length == 0, true, "should be empty" );

prid( "xxx" )( function done( error, pid ){
	assert.equal( pid.length == 0, true, "should be empty" );

	console.log( "ok" );
} );

console.log( "ok" );
