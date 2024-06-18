import jwt from "jsonwebtoken";

const jwtAuthenticated = (req, resp, next) => {
  const jwtCookie = req.headers.authorization;
  if (!jwtCookie) {
    resp.json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  try {
    jwt.verify(jwtCookie, process.env.JWT_SIGNATURE);
    next();
  } catch (error) {
    console.error("error", error);
    resp.json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default jwtAuthenticated;
