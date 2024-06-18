import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import jwtAuthenticated from "../helpers/jwtAuthenticated.js";
import getCurrentUser from "../helpers/getCurrentUser.js";

const router = express.Router();

router.post("/login", async (req, resp) => {
  console.log("userReq", req.body);

  const userReq = req.body;
  const user = await User.findOne({ email: userReq.email });

  if (user === null || userReq.password !== user.password) {
    resp.json({
      jwt: null,
      success: false,
      message: "bad credentials",
    });
    return;
  }

  const payload = {
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
  };

  const signedJWT = jwt.sign(payload, process.env.JWT_SIGNATURE, {
    expiresIn: "1h",
  });

  resp.json({
    jwt: signedJWT,
    success: true,
    message: "ok",
  });
});

router.post("/create", async (req, resp) => {
  const userReq = req.body;
  const user = await User.create(userReq);
  resp.json({ user: user });
});

router.get("/list_all", jwtAuthenticated, async (req, resp) => {
  const users = await User.find({});
  resp.json({
    users: users.map((current) => {
      return {
        id: current.id,
        name: current.name,
        lastName: current.lastName,
        email: current.email,
        age: current.age,
        address: current.address,
      };
    }),
  });
});

router.get("/info", jwtAuthenticated, async (req, resp) => {
  const user = await getCurrentUser(req);
  const users = await User.find({ _id: user.id });
  resp.json({
    users: users.map((current) => {
      return {
        id: current.id,
        name: current.name,
        lastName: current.lastName,
        email: current.email,
        age: current.age,
        address: current.address,
      };
    }),
  });
});

export default router;
