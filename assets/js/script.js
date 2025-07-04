'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}


//////////////////////////////////////////////////////////////////////////
//Função que formata a hora por Extenso
//////////////////////////////////////////////////////////////////////////
function TempoExtenso() {
  TempoAtual = new Date();
  HoraAtual = TempoAtual.getHours();
  MinutoAtual = TempoAtual.getMinutes();
  SegundoAtual = TempoAtual.getSeconds();

  TempoAuxiliar = (HoraAtual > 24) ? HoraAtual - 24 : HoraAtual;
  if (TempoAuxiliar == "0") MomentoAuxiliar = 24;
  TempoAuxiliar += ((MinutoAtual < 10) ? ":0" : ":") + MinutoAtual;
  TempoAuxiliar += ((SegundoAtual < 10) ? ":0" : ":") + SegundoAtual;

  return TempoAuxiliar;		
}

//////////////////////////////////////////////////////////////////////////
// Função que formata a data por Extenso
//////////////////////////////////////////////////////////////////////////
function DataExtenso() {		
  const ArrayDia = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const ArrayMes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const DataAtual = new Date();
  let AnoAtual = DataAtual.getFullYear(); // Use getFullYear() para obter o ano correto
  const DiaSemana = DataAtual.getDay();
  const MesAtual = DataAtual.getMonth();
  const DiaAtual = DataAtual.getDate();

  let DataAuxiliar = ArrayDia[DiaSemana] + ", ";
  DataAuxiliar += DiaAtual + " de ";
  DataAuxiliar += ArrayMes[MesAtual] + " de " + AnoAtual;

  return DataAuxiliar;
}	

//////////////////////////////////////////////////////////////////////////
// Função que formata a hora por Extenso
//////////////////////////////////////////////////////////////////////////
function TempoExtenso() {
  const DataAtual = new Date();
  let horas = DataAtual.getHours();
  let minutos = DataAtual.getMinutes();
  let segundos = DataAtual.getSeconds();

  // Adiciona zero à esquerda se necessário
  horas = horas < 10 ? '0' + horas : horas;
  minutos = minutos < 10 ? '0' + minutos : minutos;
  segundos = segundos < 10 ? '0' + segundos : segundos;

  return `${horas}:${minutos}:${segundos}`;
}

//////////////////////////////////////////////////////////////////////////
// Função que formata a data e hora por Extenso
//////////////////////////////////////////////////////////////////////////
function DataHoraExtenso(IdObjeto) {	
  document.getElementById(IdObjeto).innerHTML = DataExtenso() + " - " + TempoExtenso();
}

// index.html
document.addEventListener("DOMContentLoaded", function() {
  DataHoraExtenso('DataHoraAtual');

  setInterval(() => {
    DataHoraExtenso('DataHoraAtual');
  }, 1000);
});
