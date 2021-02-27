
const questionBtn = document.getElementById('show-btn');
const questionCard = document.querySelector('.question-card');



// es6 class

class QuestionCard{
    constructor() {
this.feedback = document.querySelector('.feedback');
        this.closeBtn = document.querySelector('.close-btn');

        this.questionInput = document.querySelector('.question-input').value;

    }


    showQuestionCard () {
        questionCard.classList.add('.show-btn'); 
    }
}







// instance of QuestionCard object


const card = new QuestionCard();



questionBtn.addEventListener('click', function() {
   
   
   
    card.showQuestionCard(questionCard)
    console.log('click')
    
})







class Display {
    constructor() {

    }
}

