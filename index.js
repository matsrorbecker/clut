const clut = (argv, options = []) => {
  const args = argv.slice(2)
  const getFlags = (option) => [`-${option[0]}`, `--${option.toLowerCase()}`]
  const knownFlags = options.map((option) => getFlags(option))
    .reduce((acc, el) => acc.concat(el), [])
  const unknownFlags = knownFlags.length
    ? args.filter(arg => arg.startsWith('-') && !knownFlags.includes(arg))
    : []
  const hasUnknownFlags = unknownFlags.length > 0
  const parseArg = (option, boolean = false) => {
    const [short, long] = getFlags(option)
    const argsHasFlag = args.includes(short) || args.includes(long)
    if (boolean) return argsHasFlag
    if (!argsHasFlag) return
    const argIndex = Math.max(args.indexOf(short), args.indexOf(long)) + 1
    return args[argIndex]
  }
  const parseBoolean = (option) => parseArg(option, true)
  return {
    args,
    knownFlags,
    unknownFlags,
    hasUnknownFlags,
    getFlags,
    parseArg,
    parseBoolean
  }
}

module.exports = clut
