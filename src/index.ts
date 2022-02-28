import {
  toTokens,
  // ---
  Token,
  CommaToken,
  LeftParenToken,
  RightParenToken,
  CDCToken,
  ColonToken,
  SemicolonToken,
  CDOToken,
  LeftBracketToken,
  RightBracketToken,
  LeftCurlyToken,
  RightCurlyToken,
  EOFToken
} from './lexer'

type StaticToken =
  | LeftBracketToken
  | LeftCurlyToken
  | LeftParenToken
  | RightBracketToken
  | RightCurlyToken
  | RightParenToken
  | ColonToken
  | SemicolonToken
  | CommaToken
  | CDOToken
  | CDCToken
  | EOFToken

const STATIC_TOKEN_MAP: Record<string, string | undefined> = {
  '<(-token>': '(',
  '<)-token>': ')',
  '<[-token>': '[',
  '<]-token>': ']',
  '<{-token>': '{',
  '<}-token>': '}\n',
  '<colon-token>': ':',
  '<comma-token>': ',',
  '<semicolon-token>': ';',
  '<CDO-token>': '<!--',
  '<CDC-token>': '-->',
  '<EOF-token>': ''
}

function isStaticToken(token: Token): token is StaticToken {
  return token.type in STATIC_TOKEN_MAP
}

export const toMinifiedString = (tokens: Token[]): string => {
  let minifiedString = ''
  let calcNest = 0
  let isPendingAtRule = false
  let lastToken: Token = {
    type: '<EOF-token>'
  }
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (isStaticToken(token)) {
      minifiedString += STATIC_TOKEN_MAP[token.type]
      if (isPendingAtRule) {
        if (token.type === '<semicolon-token>') {
          isPendingAtRule = false
        } else if (token.type === '<{-token>') {
          minifiedString += '\n'
          isPendingAtRule = false
        }
      }
      if (calcNest > 0) {
        if (token.type === '<(-token>') {
          calcNest += 1
        } else if (token.type === '<)-token>') {
          calcNest -= 1
        }
      }
    } else if (token.type === '<whitespace-token>') {
      if (calcNest < 1) {
        if (isStaticToken(lastToken)) continue
        if (i + 1 < tokens.length) {
          const nextToken = tokens[i + 1]
          if (isStaticToken(nextToken)) continue
        }
      }
      minifiedString += ' '
    } else if (token.type === '<at-keyword-token>') {
      minifiedString += '@' + token.value
      isPendingAtRule = true
    } else if (token.type === '<delim-token>') {
      minifiedString += String.fromCharCode(token.value)
    } else if (token.type === '<dimension-token>') {
      minifiedString += token.value + token.unit
    } else if (token.type === '<function-token>') {
      minifiedString += token.value + '('
      if (token.value === 'calc') {
        calcNest = 1
      }
    } else if (token.type === '<hash-token>') {
      minifiedString += '#' + token.value
    } else if (token.type === '<ident-token>') {
      minifiedString += token.value
    } else if (token.type === '<number-token>') {
      minifiedString += token.value
    } else if (token.type === '<percentage-token>') {
      minifiedString += token.value + '%'
    } else if (token.type === '<url-token>') {
      minifiedString += 'url(' + token.value + ')'
    } else {
      minifiedString += token.raw
    }
    lastToken = token
  }
  return minifiedString
}

export const minify = (str: string): string => toMinifiedString(toTokens(str))
