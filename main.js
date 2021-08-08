const express = require("express");
const app = express();
const port = 5000;

console.log("hi");
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
