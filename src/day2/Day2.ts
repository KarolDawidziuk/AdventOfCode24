import { readFile } from "../utils/file.ts";

const input = readFile( "src/day2/input.txt" );

let safeReports = 0;
let safeReportsWithToleration = 0;

const parsedValues: Array<Array<number>> = input.split( '\n' )
	.map( line => line
		.split( ' ' )
		.map( line => parseInt( line ) )
);

for ( const arr of parsedValues ) {
	let safe = checkSafety( arr, false );
	if ( safe ) {
		safeReports++;
	}
}

console.log( `Part1: Safe reports: ${ safeReports }`, );

for ( const arr of parsedValues ) {
	const safe = checkSafety( arr, true );

	if ( safe ) {
		safeReportsWithToleration++;
	}
}

function checkSafety( arr: Array<number>, tolerance: boolean ): boolean {
	let canRemove = tolerance;
	let direction = arr[ 1 ] > arr[ 0 ] ? 1 : -1;

	for ( let i = 0; i < arr.length - 1; i++ ) {
		const current = arr[ i ];
		const next = arr[ i + 1 ];
		const absDiff = Math.abs( current - next );
		const currentDirection = next > current ? 1 : -1;

		if ( currentDirection !== direction || absDiff === 0 ||absDiff > 3 ) {
			if ( canRemove )  {
				// Try to remove the previous, current or next element to see if the report will be safe.
				return [ -1, 0 ,1 ].some( offset => {
					const arr1 = [ ...arr ];
					arr1.splice( i + offset, 1 );
					
					return checkSafety( arr1, false );
				} );
			}

			return false;
		}
	}

	return true;
}

console.log( `Part2: Safe reports with a tolerance: ${ safeReportsWithToleration }`, );
