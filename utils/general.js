export const getClientIp = (req) => {
  return (
    req.headers['x-forwarded-for']?.split(',').shift()?.trim() ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  );
}