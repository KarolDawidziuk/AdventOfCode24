import { readFile } from "../utils/file.ts";

const input = readFile( "src/day1/input.txt" );

const LEFT_LIST: Array<number> = [];
const RIGHT_LIST: Array<number> = [];
let totalDistance = 0;

input.split( '\n' ).forEach( line => {
	const [ left, right ] = line.split( '   ' );

	LEFT_LIST.push( parseInt( left ) );
	RIGHT_LIST.push( parseInt( right ) );
} );

// Sort the lists in ascending order to make the comparison easier.
LEFT_LIST.sort( ( a, b ) => a - b );
RIGHT_LIST.sort( ( a, b ) => a - b );

LEFT_LIST.forEach( ( item, index ) => {
	// Calculate the absolute difference between the two list items.
	totalDistance += Math.abs( item - RIGHT_LIST[ index ] );
} );

console.log( `Part1: Total Distance: ${ totalDistance }`, );

// Part2
const similarityScore = LEFT_LIST
	.map( item => {
		return RIGHT_LIST.filter( rightItem =>  rightItem === item )
	} )
	// Flatten the array of arrays into a single array for an easier calculations.
	.flat()
	.reduce( ( sum, current ) => sum + current, 0 );

console.log( `Part2: Similarity score: ${ similarityScore }` );







