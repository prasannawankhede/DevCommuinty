const express = require("express");

const app = express();

app.use((req, res)=>{
    res.send("hello from my   server");
});

app.listen(3000, () =>{
    console.log("server is successfully listening on port number  3000... ");
});