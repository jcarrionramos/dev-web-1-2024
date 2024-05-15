import { app } from "./app.js";

import userRouter from "./routes/user.js";
import mainRouter from "./routes/main.js";

const port = 3000;

app.use("", mainRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
