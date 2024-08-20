const fs = require("fs");
const path = require("path");


async function principal(req,res){
    res.render("principal.ejs");
}

module.exports = {
    principal,
}