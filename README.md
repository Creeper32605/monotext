# 𝚖𝚘𝚗𝚘𝚝𝚎𝚡𝚝
A small utility for converting text to a mathematical monospace (unicode) version.

It also converts to
- bold:                Bold serif text
- italic:              Italic serif text
- bolditalic:          Bold Italic serif text
- script:              Script text :warning:
- boldscript:          Bold script text
- fraktur:             Fraktur text :warning:
- boldfraktur:         Bold fraktur text
- doublestruck:        Double-struck text :warning:
- sansserif:           Sans-serif text
- sansserifbold:       Sans-serif bold text
- sansserifitalic:     Sans-serif italic text
- sansserifbolditalic: Sans-serif bold italic text
- greek:               Greek text
- greekitalic:         Greek italic text
- greekbolditalic:     Greek bold italic text

> :warning: Not all characters exist in this set

## Usage
![Command-line example showing how to use it](https://i.imgur.com/ZblSzea.png "Command-line example")

Presuming you have node installed, run the file directly with `./monotext.js`
or run it with node: `node monotext.js`.

You can also create a symlink (`ln -s path/to/monotext.js destination/path`) in
`/usr/bin` or whatever is in your `PATH` and then run it directly anywhere with the
filename you specified for it's destination.

To use other character sets such as `bold` or `italic`, just add a flag: `node monotext.js -bold`
