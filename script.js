// pegando dados

var sementes = document.getElementById("sementes");
var plantas = document.getElementById("plantas");
var frutosC = document.getElementById("frutosC");
var frutos = document.getElementById("frutos");

var saidaAlert = document.getElementById("saidaAlert");

// alertas

var alertaTimeout;

function alerta(textoAlerta) {
    var timeAlert = 5000;

    $(".alerts").css("display","flex");

    saidaAlert.innerHTML = textoAlerta;

    if (alertaTimeout) {
        clearTimeout(alertaTimeout);
    }

    alertTimeouta = setTimeout(function() {
        $(".alerts").css("display", "none");
    }, timeAlert);
}

function fecharAlerta() {
    $(".alerts").css("display","none");

    if (alertaTimeout) {
        clearTimeout(alertaTimeout);
    }
}

// Função coletar semente

var sementesQtd = 0;

var delaySemente = false;
var tempoDelaySemente = 1000;

function prod1() {
    if (delaySemente == true) {
        alerta("Você deve aguardar 1s para coletar outra semente!");
    } else {
        sementesQtd++
        delaySemente = true;
        
        sementes.innerHTML = sementesQtd;

        setTimeout(function() {
            delaySemente = false;
        }, tempoDelaySemente)

        salvarDados()
    }
}

// Função plantar semente

var plantasQtd = 0;

function prod2() {
    if (sementesQtd >= 4) {
        alerta("Você plantou suas sementes com sucesso!");

        plantasQtd++
        plantas.innerHTML = plantasQtd;

        sementesQtd -= 4;
        sementes.innerHTML = sementesQtd;

        salvarDados()
    } else {
        alerta("Você não possui 4 sementes para plantar!");
    }
}

// Função regar

var frutoPronto = 0;

function prod3() {
    if (plantasQtd >= 1) {

        var delayRegar = Math.floor(Math.random() * 21) + 20;

        plantasQtd -= 1;
        plantas.innerHTML = plantasQtd;

        alerta(`Você regou sua planta, aguarde ${delayRegar}s para colher seus frutos.`);

        setTimeout(function() {
            frutoPronto++
            frutosC.innerHTML = frutoPronto;
            alerta("Você já pode colher um fruto!");
        },delayRegar*1000)

        salvarDados()
    } else {
        alerta("Você não possui plantas para regar");
    }
}

// Função colher

var frutosF = 0;

function colher() {
    if (frutoPronto >= 1) {
        alerta("Parabens, você colheu um fruto!");

        frutoPronto -= 1;
        frutosC.innerHTML = frutoPronto;

        frutosF++
        frutos.innerHTML = frutosF;

        salvarDados()
    } else {
        alerta("Você não possui nenhum fruto pronto para colher!");
    }
}

// Salvar dados

function salvarDados() {
    var sementesLocal = sementesQtd;
    var plantaLocal = plantasQtd;
    var frutoCLocal = frutoPronto;
    var frutoFLocal = frutosF;
    
    var arrayDados = [];
    arrayDados.push(sementesLocal, plantaLocal, frutoCLocal, frutoFLocal);
    
    var dadosToJson = JSON.stringify(arrayDados);
    
    localStorage.setItem("dados", dadosToJson);
}

// Recuperar dados

function recuperarDados() {
    var dados = localStorage.getItem("dados");
    var dadosToArray = JSON.parse(dados);
  
    if (Array.isArray(dadosToArray) && dadosToArray.length === 4) {
      sementesQtd = dadosToArray[0];
      plantasQtd = dadosToArray[1];
      frutoPronto = dadosToArray[2];
      frutosF = dadosToArray[3];
  
      sementes.innerHTML = sementesQtd;
      plantas.innerHTML = plantasQtd;
      frutosC.innerHTML = frutoPronto;
      frutos.innerHTML = frutosF;
    }
}
  
recuperarDados();

// estilização

function openWallet() {
    $("#walletOpen").css("opacity","0%")

    setTimeout(function() {
        $("#walletOpen").css("display","none")
        $("#wallet").css("opacity","100%")
        $("header").css("justify-content","center")
    }, 300)
}

function closeWallet() {
    $("#wallet").css("opacity","0%")

    setTimeout(function() {
        $("#walletOpen").css("display","block")
        $("#walletOpen").css("opacity","100%")
        $("header").css("justify-content","flex-start")
    }, 300)
}