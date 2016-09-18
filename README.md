# 𝚖𝚘𝚗𝚘𝚝𝚎𝚡𝚝
A small utility for converting text to a unicode variant.

| Flag      | Short | Description                   | Example           |
|:--------- |:-----:|:----------------------------- |:----------------- |
| monospace |   m   | Monospace text (default)      | 𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 𝚝𝚎𝚡𝚝! |
| script    |   c   | Script :warning:              | 𝒻𝒶𝓃𝒸𝓎 𝓈𝒸𝓇𝒾𝓅𝓉   |
| fraktur   |   f   | Fraktur :warning:             | 𝔖𝔭𝔩𝔢𝔫𝔡𝔦𝔡 𝔣𝔯𝔞𝔨𝔱𝔲𝔯  |
| double    |   d   | Double-struck :warning:       | 𝔻𝕠𝕦𝕓𝕝𝕖-𝕤𝕥𝕣𝕦𝕔𝕜  |
| sans      |   s   | Sans-serif                    | 𝖲𝖺𝗇𝗌. 𝖲𝖾𝗋𝗂𝖿𝗌.     |
| greek     |   g   | Greek<sup>1</sup>             | 𝛂𝛔𝛅𝛇𝛈𝛉𝛋𝛌       |
| bold      |   b   | Bold (modifier)               | 𝐛𝓸𝖑𝛅 𝘁𝗲𝘅𝘁        |
| italic    |   i   | Italic (modifier)<sup>2</sup> | 𝑖𝘵𝛼𝑙𝘪𝑐             |

> :warning: Not all characters exist in the regular (i.e. non-bold/italic) version of this set

> 1: The output characters might not be the respective greek character of the input character. There is also no regular version of this set

> 2: For the `h` character in this set, the planck constant `U+210E` is used instead of `U+1D455`, as that character
> does not exist in unicode. It might look a bit off with some fonts.

The bold flag can be combined with `script`, `fraktur`, `sans`, and `greek` and the italic flag can be combined with `sans` and `greek`, but both can also be used without another flag, in which case they will use the serif type.

## Usage
![Command-line example showing how to use it](https://i.imgur.com/ZblSzea.png "Command-line example")

Presuming you have node installed, run the file directly with `./monotext.js`
or run it with node: `node monotext.js`.

You can also create a symlink (`ln -s path/to/monotext.js destination/path`) in
`/usr/bin` or whatever is in your `PATH` and then run it directly anywhere with the
filename you specified for it's destination.
