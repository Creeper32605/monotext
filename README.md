# 𝚖𝚘𝚗𝚘𝚝𝚎𝚡𝚝
A small utility for converting text to a mathematical monospace (unicode) version.

It also converts to

| Flag                | Description                  | Example             |
| ------------------- | ---------------------------- | ------------------- |
| bold                | Bold serif text              | 𝐓𝐡𝐢𝐬 𝐢𝐬 𝐛𝐨𝐥𝐝        |
| italic              | Italic serif text            | 𝐼'𝑚 𝑖𝑡𝑎𝑙𝑖𝑐          |
| bolditalic          | Bold Italic serif text       | 𝑩𝒐𝒍𝒅 𝒂𝒏𝒅 𝒊𝒕𝒂𝒍𝒊𝒄!    |
| script              | Script text :warning:        | 𝒻𝒶𝓃𝒸𝓎 𝓈𝒸𝓇𝒾𝓅𝓉        |
| boldscript          | Bold script text             | 𝓫𝓸𝓵𝓭 𝓼𝓬𝓻𝓲𝓹𝓽        |
| fraktur             | Fraktur text :warning:       | 𝔊𝔬𝔬𝔡 𝔬𝔩𝔡 𝔣𝔯𝔞𝔨𝔱𝔲𝔯    |
| boldfraktur         | Bold fraktur text            | 𝕭𝖔𝖑𝖉 𝖋𝖗𝖆𝖐𝖙𝖚𝖗        |
| doublestruck        | Double-struck text :warning: | 𝔻𝕠𝕦𝕓𝕝𝕖 𝕤𝕥𝕣𝕦𝕔𝕜!     |
| sansserif           | Sans-serif text              | 𝖢𝗅𝖺𝗌𝗌𝗒 𝗌𝖺𝗇𝗌 𝗌𝖾𝗋𝗂𝖿   |
| sansserifbold       | Sans-serif bold text         | 𝗖𝗹𝗮𝘀𝘀𝘆 𝗮𝗻𝗱 𝗯𝗼𝗹𝗱     |
| sansserifitalic     | Sans-serif italic text       | 𝘕𝘰𝘸 𝘢𝘭𝘴𝘰 𝘪𝘵𝘢𝘭𝘪𝘤     |
| sansserifbolditalic | Sans-serif bold italic text  | 𝙄𝙩𝙖𝙡𝙞𝙘 𝙖𝙣𝙙 𝙗𝙤𝙡𝙙!     |
| greek               | Greek text                   | 𝚺𝛐𝛎𝛆𝛉𝛐𝛘 𝛈𝛓𝛆𝛆𝛌       |
| greekitalic         | Greek italic text            | 𝛨𝜍𝜀𝜀𝜆 𝛼𝜉𝛿 𝜄𝜏𝛼𝜇𝜄𝛾    |
| greekbolditalic     | Greek bold italic text       | 𝝇𝜺𝜺𝝀, 𝜷𝝄𝝁𝜹, 𝜾𝝉𝜶𝝁𝜾𝜸. |

> :warning: Not all characters exist in this set

## Usage
![Command-line example showing how to use it](https://i.imgur.com/ZblSzea.png "Command-line example")

Presuming you have node installed, run the file directly with `./monotext.js`
or run it with node: `node monotext.js`.

You can also create a symlink (`ln -s path/to/monotext.js destination/path`) in
`/usr/bin` or whatever is in your `PATH` and then run it directly anywhere with the
filename you specified for it's destination.

To use other character sets such as `bold` or `italic`, just add a flag: `node monotext.js -bold`
