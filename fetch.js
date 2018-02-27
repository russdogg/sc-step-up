const fs = require( "fs" );
const http = require( "http" );
http.get( "http://schems.lbox.com/58", ( response ) => {
	let data = "";
	response.on( "data", ( chunk ) => {
		data += chunk;
	});
	response.on( "end", () => {
		fs.readFile( "./data.json", ( error, previous ) => {
			if( !error ) {
				previous = JSON.stringify( JSON.parse( previous ), null, 4 );
				fs.writeFile( "./data.backup.json", previous, ( error ) => {
					if( !error ) {
						console.log( "Previous Data:" );
						console.log( previous );
					}
					else {
						console.log( "Error:" );
						console.log( error );
					}
					saveSchemsData( data );
				});
			}
			else {
				console.log( "Error:" );
				console.log( error );
				saveSchemsData( data );
			}
		});
	});
}).on( "error", ( error ) => {
	console.log( "Error:" );
	console.log( error );
});
function saveSchemsData( data ) {
	try {
		data = JSON.stringify( JSON.parse( data ).data, null, 4 );
		fs.writeFile( "./data.json", data, ( error ) => {
			if( !error ) {
				console.log( "Data:" );
				console.log( data );
			}
		});
	}
	catch( error ) {
		console.log( "Error:" );
		console.log( error );
	}
};
