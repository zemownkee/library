// placeholder for testing layout and dynamic DOM content functionality
const testObj = {
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  pageCount: "1200",
  isRead: true,
};

// global document references
const container = document.querySelector(".card-container");
const form = document.getElementById("form");
const submitNew = document.querySelector(".submit");
const cancelButton = document.querySelector(".cancel");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".cancel");
const newBookButton = document.getElementById("new-book");
const modalDarken = document.querySelector(".darken");

// initial array for library
const myLibrary = {};
let libraryArray = [];

function setIsRead(element) {
  element.classList.add("book-read");
  element.classList.remove("book-unread");
  element.textContent = "I've read it!";
}

function setUnread(element) {
  element.classList.add("book-unread");
  element.classList.remove("book-read");
  element.textContent = "Unread";
}

function newCard(object) {
  const card = document.createElement("div");
  const cardTitle = document.createElement("h1");
  const cardAuthor = document.createElement("p");
  const cardPageCount = document.createElement("p");
  const readToggleButton = document.createElement("button");
  readToggleButton.classList.add("read-toggle-button");
  const cardDeleteButton = document.createElement("button");
  cardDeleteButton.classList.add("delete-entry");
  card.classList.add("card");

  cardTitle.textContent = `${object.title}`;
  cardAuthor.textContent = `Author: ${object.author}`;
  cardPageCount.textContent = `Page Count: ${object.pageCount}`;

  card.append(
    cardTitle,
    cardAuthor,
    cardPageCount,
    readToggleButton,
    cardDeleteButton
  );

  container.append(card);

  readToggleButton.addEventListener("click", object.toggleRead());
  cardDeleteButton.addEventListener("click", object.removeFromLibrary());
}

function showCards() {
  libraryArray.forEach((element) => {
    newCard(element[1]);
  });
}

function refreshLibraryView() {
  libraryArray = Object.entries(myLibrary);
  showCards();
}

// constructor for Book
function Book(title, author, pageCount, isRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  if (this.isRead === true) {
    this.isRead = false;
  } else this.Read = true;
};

Book.prototype.removeFromLibrary = function () {
  delete myLibrary[this.title];
  refreshLibraryView();
};

function addBookToLibrary() {
  const bookInput = Object.fromEntries(new FormData(form).entries());
  console.log(bookInput);
  myLibrary[bookInput.title] = new Book(
    bookInput.title,
    bookInput.author,
    bookInput["page-ct"],
    bookInput["is-read"]
  );
  refreshLibraryView();
}

function openModal() {
  modal.classList.toggle("disabled");
  modalDarken.classList.toggle("disabled");
}

function closeModal() {
  modal.classList.add("disabled");
  modalDarken.classList.add("disabled");
}

// event listeners

newBookButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
