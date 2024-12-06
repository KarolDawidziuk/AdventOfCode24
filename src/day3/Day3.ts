import { readFile } from "../utils/file.ts";

const input = readFile( "src/day3/input.txt" );

let counter = 0;

const correctMultiplications = input.matchAll( /mul\((?<first>\d+),(?<second>\d+)\)/g );

for ( const multiplication of correctMultiplications ) {
	const { first, second } = multiplication.groups!;
	
	counter += multiplyStringifiedNumbers( first, second );
}

console.log( `Part1: Multiplications result: ${ counter }` );

const enhancedMultiplications = input.matchAll( /mul\((?<first>\d+),(?<second>\d+)\)|do\(\)|don't\(\)/g );

counter = 0;
let multiply = true;

for ( const multiplication of enhancedMultiplications ) {
	const { first, second } = multiplication.groups!;

	switch ( multiplication[ 0 ] ) {
		case "do()":
			multiply = true;
			break;
		case "don't()":
			multiply = false;
			break;
		default:
			if ( multiply ) {
				counter += multiplyStringifiedNumbers( first, second );
			}
	}
}

console.log( `Part2: Enabled multiplications result: ${ counter }` );

function multiplyStringifiedNumbers( first: string, second: string ): number {
	return parseInt( first ) * parseInt( second );
}