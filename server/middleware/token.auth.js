import jwt from "jsonwebtoken";
import {
  ACCESS_DENIED,
  INVALID_TOKEN,
  NOT_FOUND,
  NO_TOKEN,
  UNAUTHORIZED,
} from "../config/constants";

const verify = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(NOT_FOUND).json({ error: NO_TOKEN });
    }

    console.log("JWT AUTH: ", process.env.JWT_SECRET);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(NOT_FOUND).json({ error: ACCESS_DENIED });
    }

    req.user = verified;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(UNAUTHORIZED).json({ message: INVALID_TOKEN });
  }
};

export default verify;
