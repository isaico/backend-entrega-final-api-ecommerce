import jwt from "jsonwebtoken";

export async function isAuth(req, res, next) {
  try {
   
    const token = req.session.token
    const verify = await jwt.verify(token, process.env.JWT_KEY);
    req.user = verify.user;
    next();
  } catch (error) {
    res.status(401).render('layout/sessionExpired');
  }
}