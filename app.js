(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} correctas de ${myQuestions.length} preguntas`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "En la siguiente operación, ¿Cuanto es 10897-589?",
        answers: {
          a: "8741",
          b: "1258",
          c: "10308"
        },
        correctAnswer: "c"
      },
      {
        question: "Mario fua a la tienda con Karla y compraron: una cocacola que les costo Q.8.00 y un pingüinito para compartir que costo Q.10.00. ¿Cuanto gastaron en total?",
        answers: {
          a: "18",
          b: "9",
          c: "25"
        },
        correctAnswer: "a"
      },
      {
        question: "¿Cuanto es 897*23? ",
        answers: {
          a: "10568",
          b: "20631",
          c: "895",
          d: "7894"
        },
        correctAnswer: "b"
      },
      {
        question: "Si el año tiene 365 días y la fecha actual es 16 de septiembre que equivale al día número 259, ¿Cuantos días le quedan al año?",
        answers: {
          a: "100",
          b: "106",
          c: "258",
          d: "89"
        },
        correctAnswer: "b"
      },{
        question: "Una señora compró 8 paquetes con seis sodas cada uno, para llevar a una fiesta, ¿Cuántas sodas llevará a la fiesta? ",
        answers: {
          a: "48 sodas",
          b: "24 sodas",
          c: "56 sodas"
        },
        correctAnswer: "a"
      },{
        question: "En una granja hay 468 gallinas, y cada una puso 8 huevos fecundados. Si cada gallina cuida de sus huevos y logran nacer todos los pollitos, ¿cuantos pollitos nacidos habrá en la granja? ",
        answers: {
          a: "4857",
          b: "3744",
          c: "1258"
        },
        correctAnswer: "b"
      },{
        question: "A una caja de colores le caben 24, si hay en la tienda 9 cajas. ¿Cuántos colores serán por todos? ",
        answers: {
          a: "89",
          b: "216",
          c: "144"
        },
        correctAnswer: "b"
      },{
        question: "Tengo 125 pesos, si me he gastado 66 pesos. ¿Cuánto dinero me sobra? ",
        answers: {
          a: "24",
          b: "89",
          c: "59"
        },
        correctAnswer: "c"
      }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  