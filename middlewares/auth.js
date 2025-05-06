const jwt = require('jsonwebtoken')

module.exports = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ msg: 'sem token' })

    const token = authHeader.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (roles.length && !roles.includes(decoded.tipo)) return res.status(403).json({ msg: 'acesso negado' })
      req.user = decoded
      next()
    } catch (err) {
      res.status(401).json({ msg: 'token inválido' })
    }
  }
}
