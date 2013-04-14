# tusk - documentation generator tool for node.js libraries

## Features

- use the README, LICENCE files
- code documentation
- tweet button
- github buttons
- SEO friendly (send pull request to improve it :) )
- support google analytics
- support custom stylesheets and scripts
- integrate the travis badge
- integrate the gemnasium badge
- files in the example[s] folder are used as samples in the documentation

## Ideas of features

- code coverage documentation
- test suite documentation
- code complexity documentation
- use the CHANGELOG file


## Usage

```bash
$ tusk --help
Usage: tusk [--input=FOLDER] [options]

Options:
  --input, -i  use the files contained in FOLDER to generate the documentation  [default: "/home/lbdremy/workspace/nodejs/tusk"]
  --styles     use the FILE(s) as the css file of the site                      [default: "/home/lbdremy/workspace/nodejs/tusk/bin/../lib/assets/stylesheets/normalize.css,/home/lbdremy/workspace/nodejs/tusk/bin/../lib/assets/stylesheets/simplegrid.css,/home/lbdremy/workspace/nodejs/tusk/bin/../lib/assets/stylesheets/github-markdown.css"]
  --scripts    use the FILE(s) as the javascript script(s) of the site          [default: "/home/lbdremy/workspace/nodejs/tusk/bin/../lib/assets/scripts/script.js"]
  --help, -h   show the help                                                    [boolean]
```

Configuration file `.tusk.json`:
(it should be in the root directory of your module)

```json
{
	"google-analytics-id" : "UA-XXXXXXXXXXX",
	"twitter-user" : "username",
	"travis" : false,
	"gemnasium" : false
}
```

## Licence

(The MIT License)

Copyright © 2013, Remy Loubradou

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

The Software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the Software.

Except as contained in this notice, the name of the Remy Loubradou shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the Remy Loubradou.