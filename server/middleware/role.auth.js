import { ACCESS_DENIED, FORBIDDEN } from "../config/constants";

export const authorize = (roles) => {
  return (req, res, next) => {
    console.log("req.user:", req.user);
    if (!roles.includes(req.user.role)) {
      return res.status(FORBIDDEN).json({ message: ACCESS_DENIED });
    }
    next();
  };
};

export default authorize;
