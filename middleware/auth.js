const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Leer el toker del header
  const token = req.header("x-auth-token");
  //console.log(token); eliminar luego

  //Revisar si no hya tokern
  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso no válido" });
  }

  //Validdar el token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no valido" });
  }
};
