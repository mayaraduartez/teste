const fs = require("fs");
const path = require("path");


async function principal(req,res){
    res.render("principal/principal.html");
}

async function abrirprefil(req,res){
    res.render("users/perfil.html");
}

async function favoritos(req,res){
    res.render("users/favoritos.html");
}

async function meuspedidos(req,res){
    res.render("users/pedidos.html");
}

async function principaladm(req,res){
    res.render("admin/principal.html");
}

async function createcardapio(req,res){
    res.render("admin/form-create.html");
}

async function pedidos(req,res){
    res.render("admin/pedidos.html");
}

async function perfiladm(req,res){
    res.render("admin/perfil.html");
}

async function login(req,res){
    res.render("login/login.html");
}

async function cadastro(req,res){
    res.render("login/cadastro.html");
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