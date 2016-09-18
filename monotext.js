#!/usr/bin/env node
/**
 * (c) cpsdqs 2016
 * MIT License
 *
 * A small utility for converting text to unicode variants
 */

// offsets to apply counting up from 0-26 for A-Z, 27-52 for a-z, and 0-9 for 0-9
/*
 * letters sorted alphabetically
 * m: monospace
 * b: bold
 * i: italic
 * c: script
 * f: fraktur
 * d: double-struck
 * s: sans-serif
 * g: greek
 */
let offsets = {
	m:   [0x1d670, 0x1d7f6],
	b:   [0x1d400, 0x1d7ce],
	i:   [0x1d434, 0x00030],
	bi:  [0x1d468, 0x00030],
	c:   [0x1d49c, 0x00030],
	bc:  [0x1d4d0, 0x00030],
	f:   [0x1d504, 0x00030],
	d:   [0x1d538, 0x1d7d8],
	bf:  [0x1d56c, 0x00030],
	s:   [0x1d5a0, 0x1d7e2],
	bs:  [0x1d5d4, 0x1d7ec],
	is:  [0x1d608, 0x00030],
	bis: [0x1d63c, 0x00030],
	bg:  [0x1d6a8, 0x00030],
	gi:  [0x1d6e2, 0x00030],
	bgi: [0x1d71c, 0x00030]
};

// special characters (absolute values)
// applied *before* any offsets
let special = {
	m: {
		' ': 0x2000,
		'-': 0x2013
	},
	i: {
		'h': 0x210e
	}
};

// use monospace by default
let type = 'm';

// text that will be parsed
let text = '';

// main function
let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
let numbers = '0123456789'
let convert = function(t, end) {
	let result = '';
	for (let k of t) {
		let index;
		let c = k;
		if (special[type] && special[type][c]) c = String.fromCodePoint(special[type][c]);
		if ((index = chars.indexOf(c)) > -1)
			result += String.fromCodePoint(index + offsets[type][0]);
		else if ((index = numbers.indexOf(c)) > -1)
			result += String.fromCodePoint(index + offsets[type][1]);
		else
			result += c;
	}

	process.stdout.write(result);

	if (end) {
		process.stdout.write('\n');
		process.exit(0);
	}
};

{
	let typeFlags = {
		monospace: 'm',
		script:    'c',
		fraktur:   'f',
		double:    'd',
		sans:      's',
		greek:     'g'
	};
	let modFlags = {
		bold:   'b',
		italic: 'i'
	};
	let flagAliases = {
		'doublestruck': 'double',
		'double-struck': 'double',
		'sansserif': 'sans',
		'sans-serif': 'sans'
	};

	let flags = [];

	let args = process.argv.splice(2);
	let input = [];
	let parseFlags = true;
	for (let i in args) {
		if (args[i][0] == '-' && parseFlags) {
			let flag = args[i].replace(/^\-+/, '');
			let flagChars = flag.split('').sort().join('');
			if (flag in flagAliases)
				flag = flagAliases[flag];
			else if (flag in typeFlags)
				flags.push(typeFlags[flag]);
			else if (flag in modFlags)
				flags.push(modFlags[flag]);
			else if (flagChars in offsets)
				flags = flags.concat(flagChars.split(''));
			else if (flag == 'help') {
				if (process.stdin.isTTY) {
					// print help
					process.stdout.write(`---- Monotext Help ----
Converts text to a unicode variant

Usage:
    monotext [flags] [text]
Use with a pipe:
    cat file | monotext [flags]

Flags:
  Types:
    -monospace -m   Monospace text (default)
    -script    -c   Script (!)
    -fraktur   -f   Fraktur (!)
    -double    -d   Double-struck (!)
    -sans      -s   Sans-serif
    -greek     -g   Greek (characters might not yield their respective greek version)
                    This doesn't have a regular version!

    (!): Some characters do not exist in the regular version of this set (i.e. without bold/italic)

  Modifiers:
    -bold      -b   Bold
       Can be used with: script, fraktur, sans and greek
    -italic    -i   Italic
       Can be used with: sans and greek
    Serif is used when no type is specified
`);
					process.exit(0);
				} else {
					process.stdout.write(`Help must be called from TTY!\n`);
					process.exit(127);
				}
			} else {
				process.stdout.write(`Unknown flag ${flag}\n`);
				process.exit(127);
			}
		} else {
			parseFlags = false;
			input.push(args[i]);
		}
	}

	type = flags.sort().join('') || 'm';
	if (!offsets.hasOwnProperty(type)) {
		process.stdout.write(`No such combination. Use -help for help\n`);
		process.exit(127);
	}

	if (process.stdin.isTTY) {
		text = input.join(' ');

		// prompt the user if there's no input
		if (!text) {
			var uinterface = require('readline').createInterface({
				input: process.stdin,
				output: process.stdout
			});
			uinterface.question('Enter Text: ', function(ans) {
				uinterface.close();
				convert(ans, true);
			});
		} else {
			convert(text, true);
		}
	} else {
		// piped file!
		process.stdin.resume();
		process.stdin.on('data', function(buf) {
			convert(buf.toString(), false);
		});
		process.stdin.on('end', function() {
		    process.exit(0);
		});
	}
}