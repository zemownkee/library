// placeholder for testing layout and dynamic DOM content functionality
const testObj = {
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  pageCount: "1200",
  isRead: true,
};

// initial array for library
const myLibrary = {};
let libraryArray = [];

// insert placeholder into obj
myLibrary[testObj.title] = {
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  pageCount: "1200",
  isRead: true,
};

// constructor for Book
function Book(title, author, pageCount, isRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
}

function addBookToLibrary() {
  const form = document.getElementById("form");
  const bookInput = Object.fromEntries(new FormData(form).entries());
  console.log(bookInput);
  myLibrary[bookInput.title] = new Book(
    bookInput.title,
    bookInput.author,
    bookInput["page-ct"],
    bookInput["is-read"]
  );
  libraryArray = Object.entries(myLibrary);
  console.log(myLibrary);
}

addBookToLibrary();
// console.log(myLibrary);
// console.log(libraryArray);

// functions to open and close modal
const modal = document.querySelector(".modal");

function openModal() {
  modal.classList.toggle("disabled");
}

function closeModal() {
  modal.classList.add("disabled");
}

// set reference to container for cards to get added
const container = document.querySelector(".card-container");

// display cards from array

// remove card

// get info out of form

function newCard(object) {
  let card = document.createElement("div");
  let cardTitle = document.createElement("h1");
  let cardAuthor = document.createElement("p");
  let cardPageCount = document.createElement("p");
  let cardIsRead = document.createElement("button");
  cardIsRead.classList.add("is-read");
  let cardDeleteEntry = document.createElement("button");
  cardDeleteEntry.classList.add("delete-entry");
  card.classList.add("card");

  cardTitle.textContent = `${object.title}`;
  cardAuthor.textContent = `Author: ${object.author}`;
  cardPageCount.textContent = `Page Count: ${object.pageCount}`;

  card.append(
    cardTitle,
    cardAuthor,
    cardPageCount,
    cardIsRead,
    cardDeleteEntry
  );
  container.append(card);
}

function setIsRead(element) {
  element.classList.add("is-read");
  element.classList.remove("not-read");
  element.textContent = "I've read it!";
}

// newCard(testObj);

function showCards() {
  libraryArray.forEach((element) => {
    newCard(element[1]);
  });
}
showCards();
// button references and event listeners
const newBookButton = document.getElementById("new-book");
newBookButton.addEventListener("click", openModal);

const closeButton = document.querySelector(".cancel");
closeButton.addEventListener("click", closeModal);
