import {
  toTokens,
  // ---
  Token,
  WhitespaceToken,
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
  | WhitespaceToken
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
  '<whitespace-token>': ' ',
  '<CDO-token>': '<!--',
  '<CDC-token>': '-->',
  '<EOF-token>': ''
}

function isStaticToken(token: Token): token is StaticToken {
  return token.type in STATIC_TOKEN_MAP
}

export const toMinifiedString = (tokens: Token[]): string => {
  let minifiedString = ''
  for (const token of tokens) {
    if (isStaticToken(token)) {
      minifiedString += STATIC_TOKEN_MAP[token.type]
    } else if (token.type === '<at-keyword-token>') {
      minifiedString += '@' + token.value
    } else if (token.type === '<delim-token>') {
      minifiedString += String.fromCharCode(token.value)
    } else if (token.type === '<dimension-token>') {
      minifiedString += token.value + token.unit
    } else if (token.type === '<function-token>') {
      minifiedString += token.value + '('
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
  }
  return minifiedString
}

export const minify = (str: string): string => toMinifiedString(toTokens(str))
