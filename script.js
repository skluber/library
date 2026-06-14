class Book {
    static library = [];

    #id = crypto.randomUUID();

    constructor(title, author, pages, year) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.year = year;
        this.isRead = false;

        Book.library.push(this);
    }

    getSummary() {
        return `"${this.title}" by ${this.author}, published in ${this.year}.`
    }

    toggleRead() {
        if (this.isRead) {
            this.isRead = false;
        } else {
            this.isRead = true;
        }
    }

    get id() {
        return this.#id;
    }

    static removeById(id) {
        Book.library = Book.library.filter(book => book.id !== id);
    }
}

function renderLibrary() {
    const container = document.querySelector('.container');

    container.innerHTML = "";

    Book.library.forEach(book => {
        const iconPath = book.isRead ? 'icons/eye-off.svg' : 'icons/eye.svg';
        const altText = book.isRead ? 'Mark as unread' : 'Mark as read';

        const bookCard = document.createElement("div");
        bookCard.className = "book";

        bookCard.innerHTML = `
        <div class="book-info">
            <h2 class="book-title">${book.title}</h2>
            <h3 class="book-author">${book.author}</h3>
            <p>Pages: ${book.pages}</p>
            <p>Written in: ${book.year}</p>
        </div>

        <div class="book-buttons">
            <button class="icon-btn read-btn" data-id="${book.id}">
                <img src="${iconPath}" alt="${altText}">
            </button>
            <button class="icon-btn delete-btn" data-id="${book.id}">
                <img src="icons/trash.svg" alt="Delete book">
            </button>
        </div>`;

        container.appendChild(bookCard);
    });
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", "310", "1937");
const book2 = new Book("1984", "George Orwell", "328", "1949");
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "281", "1960");
const book4 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "180", "1925");
const book5 = new Book("Pride and Prejudice", "Jane Austen", "279", "1813");
const book6 = new Book("The Catcher in the Rye", "J.D. Salinger", "277", "1951");
const book7 = new Book("Brave New World", "Aldous Huxley", "268", "1932");
const book8 = new Book("The Alchemist", "Paulo Coelho", "208", "1988");
const book9 = new Book("Beloved", "Toni Morrison", "324", "1987");
const book10 = new Book("The Road", "Cormac McCarthy", "287", "2006");
const book11 = new Book("The Fellowship of the Ring", "J.R.R. Tolkien", "423", "1954");
const book12 = new Book("Animal Farm", "George Orwell", "112", "1945");
const book13 = new Book("Frankenstein", "Mary Shelley", "280", "1818");
const book14 = new Book("The Picture of Dorian Gray", "Oscar Wilde", "254", "1890");
const book15 = new Book("Fahrenheit 451", "Ray Bradbury", "194", "1953");
const book16 = new Book("Jane Eyre", "Charlotte Brontë", "507", "1847");
const book17 = new Book("Catch-22", "Joseph Heller", "453", "1961");
const book18 = new Book("The Handmaid's Tale", "Margaret Atwood", "311", "1985");
const book19 = new Book("Dune", "Frank Herbert", "658", "1965");
const book20 = new Book("Moby Dick", "Herman Melville", "635", "1851");

renderLibrary();

document.querySelector('.container').addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    const readBtn = e.target.closest('.read-btn');

    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        Book.removeById(id);
        renderLibrary();
    }

    if (readBtn) {
        const id = readBtn.dataset.id;
        const book = Book.library.find(book => book.id === id);
        book.toggleRead();
        renderLibrary();
    }
});