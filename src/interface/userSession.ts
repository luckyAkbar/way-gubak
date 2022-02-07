export default interface UserSession {
  sessionID: string,
  userID: number,
  expiredAt: Date,
}