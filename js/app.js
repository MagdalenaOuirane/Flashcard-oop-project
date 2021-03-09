// es6 class

class Display {
  constructor() {
    //
    this.feedback = document.querySelector(".feedback");
    //card body
    this.questionCard = document.querySelector(".question-card");

    //question form
    this.questionForm = document.getElementById("question-form");
    this.questionInput = document.getElementById("question-input");
    this.answerInput = document.getElementById("answer-input");

    this.questionsList = document.querySelector("#questions-list");
    this.showAnswer = document.querySelector(".show-answer");

    this.itemList = [];
    this.itemID = 0;
  }

  showQuestionCard() {
    this.questionCard.classList.add("showItem");
    console.log(this.questionCard);
  }

  closeWindow(e) {
    this.questionCard.classList.remove("showItem");
  }

  submitQuestionForm() {
    const questionValue = this.questionInput.value;
    console.log("questionValue:", questionValue);
    const answerValue = this.answerInput.value;
    console.log("answerValue:", answerValue);

    if (questionValue === "" && answerValue === "") {
      this.feedback.classList.add("showItem", "alert-danger");
      this.feedback.innerHTML = `<p>Those values cannot be empty</p>`;

      const self = this;
      console.log("This:", self);
      setTimeout(function () {
        self.feedback.classList.remove("showItem", "alert-danger");
      }, 4000);
    } else {
      this.questionInput.value = "";
      this.answerInput.value = "";

      //create object
      let formObj = {
        id: this.itemID,
        question: questionValue,
        answer: answerValue,
      };
      this.itemID++;
      this.itemList.push(formObj);
      console.log("Array:", this.itemList);

      this.addAnswer(formObj);
    }
  }

  addAnswer(formObj) {
    const div = document.createElement("div");
    div.classList.add("col-md-4");
    console.log(div);
    div.innerHTML = `<div class="card card-body flashcard my-3">
    <h4 class="text-capitalize">${formObj.question}</h4>
    <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
    <h5 class="answer mb-3">${formObj.answer}</h5>
    <div class="flashcard-btn d-flex justify-content-between">
     <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id=${formObj.id}>edit</a>
     <a href="#" id="delete-flashcard" class="btn my-1 delete-flashcard text-uppercase" data-id=${formObj.id}>delete</a>`;

    this.questionsList.appendChild(div);
  }

  //questionList
  editDiv(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    console.log(parent);
    //remove from dom
    this.questionsList.removeChild(parent);
    //remove from list
    let itemElement = this.itemList.filter(function (item) {
      return item.id === id;
    });
    console.log("itemElement:", itemElement); // we return object in array
    // show value

    this.questionInput.value = itemElement[0].question; // now we can update
    this.answerInput.value = itemElement[0].answer;

    //remove from the list
    let tempList = this.itemList.filter(function (item) {
      return item.id !== id;
    });
    console.log(tempList);

    this.itemList = tempList; // przypisujemy nowa tablice do itemList
  }
  deleteDiv(element) {
    let id = parseInt(element.dataset.id);
    //remove from DOM
    this.questionsList.removeChild(
      element.parentElement.parentElement.parentElement
    );

    //REMOVE from the List
    let tempList = this.itemList.filter(function (item) {
      return item.id !== id;
    });
    console.log(tempList);

    this.itemList = tempList;
  }
}

function eventListeners() {
  const questionBtn = document.getElementById("show-btn");
  const questionForm = document.getElementById("question-form");
  const closeBtn = document.querySelector(".close-btn");
  questionsList = document.querySelector("#questions-list");

  const UI = new Display();
  console.log(UI);

  questionBtn.addEventListener("click", function (e) {
    console.log("click");
    UI.showQuestionCard();
  });

  questionForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("submit");
    UI.submitQuestionForm();
  });

  closeBtn.addEventListener("click", function (e) {
    console.log("click");
    UI.closeWindow();
  });

  //questionList check

  questionsList.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-flashcard")) {
      UI.editDiv(e.target);
    } else if (e.target.classList.contains("delete-flashcard")) {
      UI.deleteDiv(e.target);
    } else if (e.target.classList.contains("show-answer")) {
      e.target.nextElementSibling.classList.toggle("showItem");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});
