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
// cannot define it literally as node doesn't support ES6 char points yet
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var charOffset = 0x1D62F;
var lowerChars = 'abcdefghjklmnopqrstuvwxyz';
var lowerCharOffset = 0x1D629;
var numbers = '0123456789';
var numOffset = 0x1D7C6;
var characters = {};
for (var i in chars)
	characters[chars[i]] = fromUnicode(chars.charCodeAt(i) + charOffset);
for (var l in lowerChars)
	characters[lowerChars[l]] = fromUnicode(lowerChars.charCodeAt(l) + lowerCharOffset);
for (var j in numbers)
	characters[numbers[j]] = fromUnicode(numbers.charCodeAt(j) + numOffset);

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
