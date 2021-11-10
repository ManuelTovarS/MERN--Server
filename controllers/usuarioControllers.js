const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //Revision de errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    res.status(400).json({ errores: errores.array() });
  }

  //Extraccion de email
  const { email, password } = req.body;

  try {
    //Revisar que el usuario registrado sea el unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //Crea el nuevo usuario
    usuario = new Usuario(req.body);

    //Hashearel pass
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //Guarda el nuevo usuario
    await usuario.save();

    //Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    //Firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //1 hora
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
