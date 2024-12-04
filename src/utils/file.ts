import fs from 'fs';

export function readFile( path: string ): string {
	try {
		return fs.readFileSync( path, { encoding: 'utf-8' } );
	} catch ( error ) {
		throw new Error( `Error reading file: ${error}` );
	}
}