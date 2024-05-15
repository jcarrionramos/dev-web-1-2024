import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/login", (req, resp) => {
  resp.render("login");
});

router.get("/register", (req, resp) => {
  resp.render("register", {
    layout: "layout2",
  });
});

router.get("/list_all", async (req, resp) => {
  const id = req.query.user_id;
  const users = await User.find({ _id: id });
  resp.render("user/list_all", {
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
