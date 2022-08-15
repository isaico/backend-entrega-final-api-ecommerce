import jwt from "jsonwebtoken";

export async function isAuth(req, res, next) {
  try {
    console.log(req.session.token)
    // const token = req.get("Authorization");
    const token = req.session.token
    const verify = await jwt.verify(token, process.env.JWT_KEY);
    req.user = verify.user;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
}