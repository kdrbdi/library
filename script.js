const myLibrary = [];

function Book(title, author, pages, yearPublished, ISBN, genre, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.yearPublished = yearPublished;
  this.ISBN = ISBN;
  this.genre = genre;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !read;
};

function addBookToLibrary(
  title,
  author,
  pages,
  yearPublished,
  ISBN,
  genre,
  read
) {
  const book = new Book(title, author, pages, yearPublished, ISBN, genre, read);
  myLibrary.push(book);
}

// Populate library with dummy data

addBookToLibrary(
  "To Kill a Mockingbird",
  "Harper Lee",
  281,
  1960,
  "9780061120084",
  "Fiction",
  true
);
addBookToLibrary(
  "1984",
  "George Orwell",
  328,
  1949,
  "9780451524935",
  "Dystopian",
  false
);
addBookToLibrary(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  180,
  1925,
  "9780743273565",
  "Classic",
  true
);
addBookToLibrary(
  "The Hobbit",
  "J.R.R. Tolkien",
  310,
  1937,
  "9780547928227",
  "Fantasy",
  true
);
addBookToLibrary(
  "Pride and Prejudice",
  "Jane Austen",
  279,
  1813,
  "9780141439518",
  "Romance",
  false
);
addBookToLibrary(
  "The Catcher in the Rye",
  "J.D. Salinger",
  214,
  1951,
  "9780316769488",
  "Coming-of-age",
  true
);
addBookToLibrary(
  "The Alchemist",
  "Paulo Coelho",
  208,
  1988,
  "9780061122415",
  "Adventure",
  false
);
addBookToLibrary(
  "Sapiens: A Brief History of Humankind",
  "Yuval Noah Harari",
  443,
  2011,
  "9780062316097",
  "Non-fiction",
  true
);
addBookToLibrary(
  "The Road",
  "Cormac McCarthy",
  287,
  2006,
  "9780307387899",
  "Post-apocalyptic",
  false
);
addBookToLibrary(
  "Harry Potter and the Sorcerer's Stone",
  "J.K. Rowling",
  309,
  1997,
  "9780590353427",
  "Fantasy",
  true
);

const table = document.querySelector("#library>table>tbody");
const dialog = document.querySelector("dialog");
const form = document.querySelector("dialog form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const yearPublishedInput = document.querySelector("#yearPublished");
const isbnInput = document.querySelector("#isbn");
const genreInput = document.querySelector("#genre");
const readInput = document.querySelector("#read");
const showButton = document.querySelector("dialog + button");
const submitButton = document.querySelector("dialog button[type='submit']");
const closeButton = document.querySelector("dialog .btn-close");

// function used to display a book
function showBook(book) {
  let bookRow = document.createElement("tr");
  for (let prop in book) {
    if (typeof book[prop] === "function") {
      continue; // Skip if it's a method
    }
    if (prop !== "id") {
      let bookData = document.createElement("td");
      bookData.classList.add(`td-${prop}`);
      // Add check for read or not yet
      if (prop == "read") {
        // If the property is "read", change the element to a link to
        // enable toggle functionality
        if (book[prop]) {
          bookData.textContent = "Done";
          bookData.setAttribute("data-status", "done");
        } else {
          bookData.textContent = "Not yet";
          bookData.setAttribute("data-status", "pending");
        }
        bookRow.appendChild(bookData);
      } else {
        bookData.textContent = book[prop];
        bookRow.appendChild(bookData);
      }
    }
  }
  const tdDelete = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("data-attribute", book.id);
  deleteBtn.classList.add("delete-button");
  deleteBtn.innerHTML = `<!-- From Uiverse.io by philipo30 --> 
  <svg
    class="trash-svg"
    viewBox="0 -10 64 74"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="trash-can">
      <rect
        x="16"
        y="24"
        width="32"
        height="30"
        rx="3"
        ry="3"
        fill="#fff"
      ></rect>

      <g transform-origin="12 18" id="lid-group">
        <rect
          x="12"
          y="12"
          width="40"
          height="6"
          rx="2"
          ry="2"
          fill="#fff"
        ></rect>
        <rect
          x="26"
          y="8"
          width="12"
          height="4"
          rx="2"
          ry="2"
          fill="#fff"
        ></rect>
      </g>
    </g>
  </svg>
`;
  tdDelete.appendChild(deleteBtn);
  bookRow.appendChild(tdDelete);
  table.appendChild(bookRow);
}

// display books in library
function displayLibrary() {
  for (let book of myLibrary) {
    showBook(book);
  }
}
displayLibrary();

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    titleInput.value &&
    authorInput.value &&
    pagesInput.value &&
    yearPublishedInput.value &&
    isbnInput.value &&
    genreInput.value
  ) {
    let newBook = [
      titleInput.value,
      authorInput.value,
      +pagesInput.value,
      +yearPublishedInput.value,
      isbnInput.value,
      genreInput.value,
      `${readInput.checked ? true : false}`,
    ];
    addBookToLibrary(...newBook);
    showBook(myLibrary.at(-1));
    form.reset();
  }
});

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

table.addEventListener("click", (e) => {
  if (e.target.classList.contains("td-read")) {
    if (e.target.getAttribute("data-status") === "done") {
      e.target.setAttribute("data-status", "pending");
      e.target.textContent = "Not yet";
    } else {
      e.target.setAttribute("data-status", "done");
      e.target.textContent = "Done";
    }
  }
  if (e.target.classList.contains("delete-button")) {
    let bookID = e.target.getAttribute("data-attribute");
    console.dir(bookID);
    for (let book of myLibrary) {
      if (book.id === bookID) {
        let bookIndex = myLibrary.findIndex((bk) => bk.id == bookID);
        myLibrary.splice(bookIndex, 1);
        console.log(myLibrary);
        table.innerHTML = "";
        displayLibrary();
      }
    }
  }
});
