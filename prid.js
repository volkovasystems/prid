"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "prid",
			"path": "prid/prid.js",
			"file": "prid.js",
			"module": "prid",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/prid.git",
			"test": "prid-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Get process PID.
	@end-module-documentation

	@include:
		{
			"arid": "arid",
			"comex": "comex",
			"falzy": "falzy",
			"pedon": "pedon",
			"protype": "protype",
			"numric": "numric",
			"wichevr": "wichevr"
		}
	@end-include
*/

const arid = require( "arid" );
const comex = require( "comex" );
const falzy = require( "falzy" );
const pedon = require( "pedon" );
const protype = require( "protype" );
const numric = require( "numric" );
const wichevr = require( "wichevr" );

const resolvePID = function resolvePID( pid ){
	/*;
		@meta-configuration:
			{
				"pid:required": [
					"number",
					"string"
				]
			}
		@end-meta-configuration
	*/

	pid = wichevr( pid, "" ).toString( )
		.split( /\s+/ ).filter( numric ).map( ( pid ) => parseInt( pid ) );

	if( arid( pid ) ){
		return [ ];
	}

	return pid;
};

const prid = function prid( name, synchronous ){
	/*;
		@meta-configuration:
			{
				"name:required": "string",
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( falzy( name ) || !protype( name, STRING ) ){
		throw new Error( "invalid process name" );
	}

	var command = null;
	if( pedon.LINUX || pedon.OSX ){
		command = comex( "ps -e" )
			.pipe( `grep ${ name }` )
			.pipe( "tr -s ' '" )
			.pipe( "cut -d ' ' -f 1-2" )
			.pipe( "grep -o '[0-9]*'" )
			.pipe( "xargs echo -n" )

	}else if( pedon.WINDOWS ){

	}else{
		throw new Error( "cannot determine platform, platform not supported" );
	}

	if( synchronous === true ){
		try{
			return resolvePID( command.execute( true ) );

		}catch( error ){
			throw new Error( `cannot get process identity, ${ error.stack }` );
		}

	}else{
		let catcher = command.execute( )
			.then( function done( error, pid ){
				if( error instanceof Error ){
					return catcher.pass( new Error( `cannot get process identity, ${ error.stack }` ), pid );

				}else{
					return catcher.pass( null, resolvePID( pid ) );
				}
			} );

		return catcher;
	}
};

module.exports = prid;
