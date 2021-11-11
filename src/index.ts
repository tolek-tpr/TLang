import { readFileSync } from 'fs'
const prompt = require("prompt-sync")({ sigint: true });

var dept = 0

interface Variable {
  value: any
  type: string
}
class StringVariable implements Variable {
  public type = 'String'
  public value
  constructor(v: string) {
    this.value = v.replace(/\"/g, '')
  }
}
class IntVariable implements Variable {
  public type = 'Int'
  public value
  constructor(v: string) {
    this.value = v
  }
}
const symbols: { [key: string]: Variable } = {}

const E_UNKNOWN_SYMBOL = 1
const E_ASSIGNMENT_EXPECTED = 2

const parseExpression = (l: string, n: number) => {
  if (l == '' || l == " " || l == "   ") return
  if (l.charAt(0) == "/" && l.charAt(1) == "/") { return }
  const args = l.split(' ')
  const cmd = args[0].trim()
  const rest = l.substring(cmd.length)
  switch (cmd) {
    case 'FUNCTION':
      
      break
    case 'INPUT':
      if (args[1] != undefined && symbols[args[1]] != undefined) {
        const key = args[1]
        symbols[key] = new StringVariable(prompt())
      }
      break
    case 'LET':
      if (symbols[args[1]]) {
        if (args[2] == '=') {
          if (symbols[args[3]]) {
            const key = args[1]
            const val = symbols[args[3]].value
            //console.log(key, val)
            symbols[key] = new StringVariable(val)
          }
        }
      }
      break
    case 'STRING':
      if (args[2] == '=') {
        if (args[3] != undefined) {
          if (args[3].charAt(0) == '"') {
            const key = args[1]
            const val = args[3]
            symbols[key] = new StringVariable(val)
          } else {
            if (symbols[args[3]] == undefined) {
              throw new Error(`${args[3]} is not defined. Error at line ${n + 1}: ${l}`)
            }
            const key = args[1]
            const val = symbols[args[3]].value
            //console.log(key, val)
            symbols[key] = new StringVariable(val)
          }
        } else {
          throw new Error(`Expression expected at line ${n + 1}: ${l}`)
        }
      } else {
        throw new Error(`Assignment expected in line ${n + 1}: ${l}`)
      }
      break
    case 'INT':
      if (args[2] == '=') {
        if (args[3] != undefined) {
          if (args[3].charAt(0) != '"') {
            const key = args[1]
            const val = args[3]
            symbols[key] = new IntVariable(val)
          } else {
            throw new Error(`Cannot use quotes when assigning an Int at line ${n + 1}: ${l}`)
          }
        } else {
          throw new Error(`Expression expected at line ${n + 1}: ${l}`)
        }
      } else {
        throw new Error(`Assignment expected in line ${n + 1}: ${l}`)
      }
      break
    case 'PRINT':
      //console.log('CMD:', cmd, args, symbols)
      if (args[1].charAt(0) == '"') {
        console.log(args[1].replace(/\"/g, ''))
      } else if (symbols[args[1]]) {
        console.log(symbols[args[1]].value)
      } else {
        throw new Error(`Unknown symbol '${args[1]}' in line ${n + 1}: ${l}`)
      }
      break
    default:
      throw new Error(`Invalid command '${args[0]}' at line ${n + 1}: ${l}`)
  }
}

const file = readFileSync('./prg.basx', 'utf-8')
const lines = file.split('\n')
lines.forEach(parseExpression)
//console.log(symbols)

