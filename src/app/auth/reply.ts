interface ITokens {
  refresh: string;
  access: string;
}

export interface Reply {
  email: string,
  username: string,
  tokens: ITokens
}
