#! /usr/bin/env node
/**
 * (c) Creeper32605 2015
 * MIT License
 *
 * A small utility for converting text to unicode mathematical monospace
 */

// source: stackoverflow.com/questions/10615409; modified a bit
function fromUnicode(codePt) {
	if (codePt > 0xFFFF) {
		codePt -= 0x10000;
		return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
	} else
		return String.fromCharCode(codePt);
}

// create a small database of ASCII - monospace pairs
var characters = {
	A: 0x1D670,
	B: 0x1D671,
	C: 0x1D672,
	D: 0x1D673,
	E: 0x1D674,
	F: 0x1D675,
	G: 0x1D676,
	H: 0x1D677,
	I: 0x1D678,
	J: 0x1D679,
	K: 0x1D67A,
	L: 0x1D67B,
	M: 0x1D67C,
	N: 0x1D67D,
	O: 0x1D67E,
	P: 0x1D67F,
	Q: 0x1D680,
	R: 0x1D681,
	S: 0x1D682,
	T: 0x1D683,
	U: 0x1D684,
	V: 0x1D685,
	W: 0x1D686,
	X: 0x1D687,
	Y: 0x1D688,
	Z: 0x1D689,
	a: 0x1D68A,
	b: 0x1D68B,
	c: 0x1D68C,
	d: 0x1D68D,
	e: 0x1D68E,
	f: 0x1D68F,
	g: 0x1D690,
	h: 0x1D691,
	i: 0x1D692,
	j: 0x1D693,
	k: 0x1D694,
	l: 0x1D695,
	m: 0x1D696,
	n: 0x1D697,
	o: 0x1D698,
	p: 0x1D699,
	q: 0x1D69A,
	r: 0x1D69B,
	s: 0x1D69C,
	t: 0x1D69D,
	u: 0x1D69E,
	v: 0x1D69F,
	w: 0x1D6A0,
	x: 0x1D6A1,
	y: 0x1D6A2,
	z: 0x1D6A3,
	0: 0x1D7F6,
	1: 0x1D7F7,
	2: 0x1D7F8,
	3: 0x1D7F9,
	4: 0x1D7FA,
	5: 0x1D7FB,
	6: 0x1D7FC,
	7: 0x1D7FD,
	8: 0x1D7FE,
	9: 0x1D7FF
};
for (var i in characters)
	characters[i] = fromUnicode(characters[i]);

// iterates over each character and replaces it with a monospace version, if applicable
function convert(text) {
	var result = '';
	for (var k in text) {
		if (text[k] in characters) {
			result += characters[text[k]];
		} else {
			result += text[k];
		}
	}
	// write it to output and bail
	process.stdout.write(result + '\n');
	process.exit(0);
}

// get the arguments passed from the shell and use them as text
var input = process.argv.splice(2).join(' ');
if (!input) {
	// if there's no arguments prompt the user
	var uinterface = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	});
	uinterface.question('Enter Text: ', function(ans) {
		convert(ans);
		uinterface.close();
	});
} else {
	convert(input);
}
