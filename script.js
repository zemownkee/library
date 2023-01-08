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
let myLibrary = [];

function styleButton(button, object) {
  if (object.isRead === true) {
    button.classList.add("book-read");
    button.classList.remove("book-unread");
  } else {
    button.classList.add("book-unread");
    button.classList.remove("book-read");
  }
  console.log(button);
}

function newCard(object) {
  const card = document.createElement("div");
  const cardTitle = document.createElement("h1");
  const cardAuthor = document.createElement("p");
  const cardPageCount = document.createElement("p");
  const readToggleButton = document.createElement("button");
  const cardDeleteButton = document.createElement("button");

  readToggleButton.classList.add("read-toggle-button");
  cardDeleteButton.classList.add("delete-entry");
  card.classList.add("card");

  cardTitle.textContent = `${object.title}`;
  cardAuthor.textContent = `Author: ${object.author}`;
  cardPageCount.textContent = `Page Count: ${object.pageCount}`;

  styleButton(readToggleButton, object);

  card.append(
    cardTitle,
    cardAuthor,
    cardPageCount,
    readToggleButton,
    cardDeleteButton
  );

  readToggleButton.addEventListener("click", () => object.toggleRead());
  cardDeleteButton.addEventListener("click", () => object.removeFromLibrary());

  container.append(card);
}

function showCards() {
  myLibrary.forEach((element) => {
    element.order = myLibrary.indexOf(element);
    newCard(element);
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function refreshLibraryView() {
  removeAllChildNodes(container);
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
  } else this.isRead = true;
  console.log(this);
  refreshLibraryView();
};

Book.prototype.removeFromLibrary = function () {
  myLibrary.splice(this.order, 1);
  console.log(this);
  refreshLibraryView();
};

function addBookToLibrary(e) {
  e.preventDefault();
  const bookInput = Object.fromEntries(new FormData(form).entries());

  let cleanedisRead;

  if (!bookInput["is-read"]) {
    cleanedisRead = false;
  } else cleanedisRead = true;
  console.log(cleanedisRead);

  const newObj = new Book(
    bookInput.title,
    bookInput.author,
    bookInput["page-ct"],
    cleanedisRead
  );
  console.log(newObj);
  myLibrary.push(newObj);
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
submitNew.addEventListener("click", (e) => {
  addBookToLibrary(e);
  form.reset();
  closeModal();
});
