import express from "express";

const router = express.Router();

router.get("/", (req, resp) => {
  resp.render("home");
});

export default router;
