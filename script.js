// Initial Data
let currentQuestion = 0;// Questão atual
let correctAnswers = 0;// Qts respostas acertou

showQuestion();

// Events do botão
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Exibir a questão
function showQuestion() {
  if(questions[currentQuestion]) {// Se tiver questão
    let q = questions[currentQuestion]; // q é a questão

    let pct = Math.floor((currentQuestion / questions.length) * 100);// Barra de progresso
    document.querySelector('.progress--bar').style.width = `${pct}%`;// Cada barra

    document.querySelector('.scoreArea').style.display = 'none';//Esconde scoreArea
    document.querySelector('.questionArea').style.display = 'block';//Exibe pergunta

    document.querySelector('.question').innerHTML = q.question;// Mostra pergunta[0]
    document.querySelector('.options').innerHTML = q.question;// Limpa e exibe opções

    let optionsHtml = '';// Pega opções
    for(let i in q.options) {// Dá um loop
      optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;// Monta as opções
    }
    document.querySelector('.options').innerHTML = optionsHtml;// Troca só opções

    document.querySelectorAll('.options .option').forEach(item => {// Pega cada opção
      item.addEventListener('click', optionClickEvent);// Adiciona evento clique
    });

  } else {
    // acabaram as questões.
    finishQuiz();
  }
}
function optionClickEvent(e) {
  //console.log("Clicou em: ", e.target.getAttribute('data-op'));// Item clicado
  let clickedOption = parseInt(e.target.getAttribute('data-op'));// Item clicado

  if(questions[currentQuestion].answer === clickedOption) {// Se clicou certo 
    //console.log("ACERTOU");
    correctAnswers++;// Se acertou aumenta um
  }
  
  currentQuestion++;// Vai pra próxima questão
  showQuestion();// Mostra na tela
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);// Qtd de pontos
  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;// Acertou 100%
  if(points < 30) {// Se pontos menor que 30
    document.querySelector('.scoreArea img').src = "bronze.png";
    document.querySelector('.scoreText1').innerHTML = `Tá ruim Heim?!`;// Frase
    document.querySelector('.scorePct').style.color = `#FF0000`;// Cor da porcentagem
  } else if(points >= 30 && points < 70) {
    document.querySelector('.scoreArea img').src = "coroa-prata.jpg";
    document.querySelector('.scoreText1').innerHTML = `Muito bom!`;// Frase
    document.querySelector('.scorePct').style.color = `#FFFF00`;// Cor da porcentagem
  } else if(points >= 70) {
    document.querySelector('.scoreText1').innerHTML = `Parabéns!`;// Frase
    document.querySelector('.scorePct').style.color = `#0D630D`;// Cor da porcentagem
  }
  document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

  document.querySelector('.scoreArea').style.display = 'block';//Esconde scoreArea
  document.querySelector('.questionArea').style.display = 'none';//Exibe pergunta
  document.querySelector('.progress--bar').style.width = '100%';// Completa a barra
}

function resetEvent() {// Zera tudo 
  correctAnswers = 0;
  currentQuestion = 0;
  showQuestion();//e mostra a primeira questão
}