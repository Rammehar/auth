export enum Cookies {
  AccessToken = 'access',
  RefreshToken = 'refresh',
}

enum TimeSeconds {
  OneMinute = 60,
  OneDay = 24 * 60 * 60,
}

export enum TokenExpiration {
  Access = 5 * TimeSeconds.OneMinute,
  Refresh = 7 * TimeSeconds.OneDay,
  RefreshIfLessThan = 4 * TimeSeconds.OneDay,
}

export interface UserDocument {
  id: string
  name: string
  tokenVersion: number
  gitHubUserId: string
}

export interface RefreshTokensServer {
  accessToken: string
  refreshToken?: string
}

export interface AccessTokenPayload {
  userId: string
}

export interface AccessToken extends AccessTokenPayload {
  exp: number
}

export interface RefreshTokenPayload {
  userId: string
  version: number
}

export interface RefreshToken extends RefreshTokenPayload {
  exp: number
}
