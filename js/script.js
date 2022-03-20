//get UI element form "form"

let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');


// Book class

class Book{

    constructor(title,author,isbn){

        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UIDisplay class

class UIDisplay{

    static addToBookList(book){
        
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');

        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class= "delete">X</a></td>`
         
        list.appendChild(row);                

    }

    static clearFields(){

        document.querySelector('#title').value = ' ';
        document.querySelector('#author').value = ' ';
        document.querySelector('#isbn').value = ' ';

    }

    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static deleteFromBook(target){

        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeBookFromLS(target.parentElement.previousElementSibling.textContent.trim());
            UIDisplay.showAlert('Book Removed', 'success');
        }
    }
}


//localstore class
//local store code
class Store{

    static getBooks(){

        let books;

        if(localStorage.getItem('books') === null){

            books = [];
        }else{

            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){

        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks(){

        let books = Store.getBooks();

        books.forEach(book => {
            
            UIDisplay.addToBookList(book)
        });
    }

    static removeBookFromLS(isbn){
        
        let books = Store.getBooks();

      
        books.forEach((book, index) => {
            
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//add event listener

form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks()); ////local store code

//define function

function newBook(e){

    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let isbn = document.querySelector('#isbn').value;

    

    if(title === '' || author === '' || isbn === ''){

        UIDisplay.showAlert('Please fill all the fields', 'error');// to show error message
    }else{

        let book = new Book(title, author, isbn);

       
        UIDisplay.addToBookList(book);
        UIDisplay.clearFields();
        UIDisplay.showAlert('Book Successfully added', 'success'); // show success message

        Store.addBook(book); //local store code

    }

   

    // console.log(book);
    e.preventDefault();
}

function removeBook(e){

   // let ui_display = new UIDisplay();

   UIDisplay.deleteFromBook(e.target);
   
    e.preventDefault();
}