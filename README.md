# clut
Tiny module with simple utility functions for parsing command line arguments.

## Usage
Simple example:

```javascript
#!/usr/bin/env node

const clut = require('clut')

// script for searching e.g. Wikipedia and optionally pretty-print result

const options = ['lang', 'pretty']
const {
  args,
  knownFlags,
  unknownFlags,
  hasUnknownFlags,
  getFlags,
  parseArg,
  parseBoolean
} = clut(process.argv, options)

if (!args.length) {
  console.log('No arguments provided...')
  console.log('Allowed options:')
  options.forEach(option => {
    console.log(`${option} (${getFlags(option)})`)
  })
  process.exit(0)
}

if (hasUnknownFlags) {
  console.log('Unknown option(s):', unknownFlags)
  process.exit(0)
}

const searchTerm = args[0]
const lang = parseArg('lang') || 'en'
const pretty = parseBoolean('pretty')

console.log(searchTerm, lang, pretty)

// rest of code goes here

```
