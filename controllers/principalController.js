const fs = require("fs");
const path = require("path");


async function principal(req,res){
    res.render("principal/principal.ejs");
}

async function favoritos(req,res){
    res.render("users/favoritos.ejs");
}



module.exports = {
    principal,
    favoritos,
}