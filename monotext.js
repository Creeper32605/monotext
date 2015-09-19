#!/usr/bin/env node
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
	} else {
		return String.fromCharCode(codePt);
	}
}

// create a small database of ASCII - monospace pairs

// offset for the char codes [characters, numbers]
var offset = [0x0, 0x0];

// predefined offsets
var offsets = {
	bold:                [-0x1D670 + 0x1D400, -0x1D7F6 + 0x1D7CE],
	italic:              [-0x1D670 + 0x1D434, -0x1D7F6 + 0x00030],
	bolditalic:          [-0x1D670 + 0x1D468, -0x1D7F6 + 0x00030],
	script:              [-0x1D670 + 0x1D49C, -0x1D7F6 + 0x00030],
	boldscript:          [-0x1D670 + 0x1D4D0, -0x1D7F6 + 0x00030],
	fraktur:             [-0x1D670 + 0x1D504, -0x1D7F6 + 0x00030],
	doublestruck:        [-0x1D670 + 0x1D538, -0x1D7F6 + 0x1D7D8],
	boldfraktur:         [-0x1D670 + 0x1D56C, -0x1D7F6 + 0x00030],
	sansserif:           [-0x1D670 + 0x1D5A0, -0x1D7F6 + 0x1D7E2],
	sansserifbold:       [-0x1D670 + 0x1D5D4, -0x1D7F6 + 0x1D7EC],
	sansserifitalic:     [-0x1D670 + 0x1D608, -0x1D7F6 + 0x00030],
	sansserifbolditalic: [-0x1D670 + 0x1D63C, -0x1D7F6 + 0x00030],
	monospace:           [-0x1D670 + 0x1D670, -0x1D7F6 + 0x1D7F6],
	greek:               [-0x1D670 + 0x1D6A8, -0x1D7F6 + 0x00030],
	greekitalic:         [-0x1D670 + 0x1D6E2, -0x1D7F6 + 0x00030],
	greekbolditalic:     [-0x1D670 + 0x1D71C, -0x1D7F6 + 0x00030]
};

// symbols or other things that will break when an offset is applied
var csymbols = {
	' ': 0x2000,
	'-': 0x2013
};

// offset (if specified) will be applied to these characters
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
	z: 0x1D6A3
};
// numbers have different offsets
var numbers = {
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

for (var l in csymbols) {
	csymbols[l] = fromUnicode(csymbols[l]);
}

// characters with offset
var chars = {};
function applyOffset() {
	chars = {};
	for (var i in characters) {
		chars[i] = fromUnicode(characters[i] + offset[0]);
	}
	for (var j in numbers) {
		chars[j] = fromUnicode(numbers[j] + offset[1]);
	}
}
var symbolsEnabled = true;

// iterates over each character and replaces it with a monospace version, if applicable
function convert(text, nl) {
	var result = '';
	for (var k in text) {
		if (text[k] in chars) {
			result += chars[text[k]];
		} else if ((text[k] in csymbols) && symbolsEnabled) {
			result += csymbols[text[k]];
		} else {
			result += text[k];
		}
	}

	process.stdout.write(result);
	if (nl) process.stdout.write('\n');

	process.exit(0);
}
var args = process.argv.splice(2);
var input = [];
var flags = true;
for (var i in args) {
	if (args[i][0] == '-' && flags) {
		var flag = args[i].replace(/^(-)+/, '');
		if (flag in offsets) {
			offset = offsets[flag];
		} else if (flag == 'no-symbols') {
			symbolsEnabled = false;
		} else if (flag == 'help' && process.stdin.isTTY) {
			// print help
			process.stdout.write('---- Monotext Help ----\n\n');
			process.stdout.write('Converts text to a monospace (or other) version\n\n');
			process.stdout.write('Usage:\n');
			process.stdout.write('monotext [flags] <text>\n');
			process.stdout.write('or use a pipe:\n');
			process.stdout.write('cat file | monotext [flags]\n\n');
			process.stdout.write('Flags:\n');
			process.stdout.write('  Formatting:\n');
			process.stdout.write('    -no-symbols:          Disables monospace symbols\n');
			process.stdout.write('    -bold:                Bold serif text\n');
			process.stdout.write('    -italic:              Italic serif text (!)\n');
			process.stdout.write('    -bolditalic:          Bold Italic serif text\n');
			process.stdout.write('    -script:              Script text (!)\n');
			process.stdout.write('    -boldscript:          Bold script text\n');
			process.stdout.write('    -fraktur:             Fraktur text (!)\n');
			process.stdout.write('    -boldfraktur:         Bold fraktur text\n');
			process.stdout.write('    -doublestruck:        Double-struck text (!)\n');
			process.stdout.write('    -sansserif:           Sans-serif text\n');
			process.stdout.write('    -sansserifbold:       Sans-serif bold text\n');
			process.stdout.write('    -sansserifitalic:     Sans-serif italic text\n');
			process.stdout.write('    -sansserifbolditalic: Sans-serif bold italic text\n');
			process.stdout.write('    -monospace:           Monospace text (default)\n');
			process.stdout.write('    -greek:               Greek text\n');
			process.stdout.write('    -greekitalic:         Greek italic text\n');
			process.stdout.write('    -greekbolditalic:     Greek bold italic text\n\n');
			process.stdout.write('  (!): Some characters do not exist in this set.\n\n');
			process.exit(0);
		} else {
			process.stdout.write('Unknown flag ' + flag + '\n');
			process.exit(127);
		}
	} else {
		flags = false;
		input.push(args[i]);
	}
}
applyOffset();
if (process.stdin.isTTY) {
	// no piped input
	input = input.join(' ');

	if (!input) {
		// if there's no arguments prompt the user

		var uinterface = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		});
		uinterface.question('Enter Text: ', function(ans) {
			convert(ans, true);
			uinterface.close();
		});

	} else {
		convert(input, true);
	}

} else {
	// piped file (cat ./foo | monotext)

	var content = '';

	process.stdin.resume();
	process.stdin.on('data', function(buf) { content += buf.toString(); });
	process.stdin.on('end', function() {
	    convert(content);
	});
}

