const fs = require("fs");
const path = require("path");


async function principal(req,res){
    res.render("principal/principal.ejs");
}

async function abrirprefil(req,res){
    res.render("users/perfil.ejs");
}

async function favoritos(req,res){
    res.render("users/favoritos.ejs");
}

async function meuspedidos(req,res){
    res.render("users/pedidos.ejs");
}

async function principaladm(req,res){
    res.render("admin/principal.ejs");
}

async function createcardapio(req,res){
    res.render("admin/form-create.ejs");
}

async function pedidos(req,res){
    res.render("admin/pedidos.ejs");
}

async function perfiladm(req,res){
    res.render("admin/perfil.ejs");
}

async function login(req,res){
    res.render("login/login.ejs");
}

async function cadastro(req,res){
    res.render("login/cadastro.ejs");
}

module.exports = {
    principal,
    favoritos,
    abrirprefil,
    meuspedidos,
    principaladm,
    createcardapio,
    pedidos,
    perfiladm,
    login,
    cadastro
}