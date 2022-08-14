class Library{
    constructor(){
        this.books=[]
    }
    count(){
        return this.books.length;
    }
    pushBook(book){
        //console.log(`Adding '${book.title}' (${book.author}) to library`);
        this.books.push(book);
    }
    showBook(book){
        //console.log(book)
        let index = library.count()-1;
        let bookView=document.createElement("div");
        bookView.classList.add("book");
        if(book.color!="#83a5e8") bookView.style.backgroundColor=book.color;
        bookView.dataset.index=index;
        bookView.id=index;
    
        if (book.cover!=""){
            bookView.classList.add("book-cover");
            let cover=document.createElement("img");
            cover.classList.add("book-cover");
            cover.src=book.cover;
    
            bookView.append(cover);
        }
    
        let title=bookData(book.title,'book-title');
        title.classList.add('title-show');
        if(book.summary!="") title.addEventListener('click',e=>{
            summary.classList.add('summary-show');
            title.classList.remove('title-show');
        });
    
        let author=bookData(book.author,'book-author');
        let summary=bookData(book.summary,'book-summary');
    
        summary.addEventListener('click',event=>{
            title.classList.add('title-show');
            summary.classList.remove('summary-show');
        });
    
        let pages=bookData('');
        if(book.pages!='') pages=bookData(book.pages,'book-pages');
    
        let isRead=document.createElement('button');
        library.read(book,isRead);
    
        isRead.addEventListener('click',e=>{
            let bookInst=library.books[bookView.dataset.index];
            bookInst.toggleRead();
            library.read(book,isRead);
        });
        //let isRead=bookData(book.isRead,'book-isRead');
    
        let rmv=document.createElement('button');
        rmv.classList.add('remove-button');
        rmv.innerText="Remove";
    
        rmv.addEventListener('click',e => {
            bookView.remove();
        });
    
        let bookCont=document.createElement("div");
        bookCont.classList.add("book-container");
        bookCont.append(title,author,summary,pages,isRead,rmv);
    
        bookView.append(bookCont);
    
        bookView.addEventListener('mouseenter',(e)=>{
            isRead.classList.add('isRead-show');
            rmv.classList.add('remove-show');
            if(book.cover!="") bookView.firstChild.classList.add('cover-hover');
        })
        bookView.addEventListener('mouseleave',(e)=>{
            isRead.classList.remove('isRead-show');
            rmv.classList.remove('remove-show');
            if(book.cover!="") bookView.firstChild.classList.remove('cover-hover');
        })
        libraryView.appendChild(bookView);
    }
    read(book,button){
        button.classList.add('readButton');
        if(book.isRead){
            button.innerText='Finished';
            button.classList.add('finished');
            button.classList.remove('not-read');
        }
        else{
            button.innerText='Not read';
            button.classList.add('not-read');
            button.classList.remove('finished');
        }
    }
    showBooks(){
        //console.log('Books in library:');
        library.books.forEach((book,index) => {
            this.showBook(book);
        })
    }
}

class Book{
    constructor(title, author, pages, isRead, cover='', summary='', color=''){
        this.title = title
        this.author = author
        this.summary = summary
        this.pages = pages
        this.isRead = isRead
        this.cover = cover
        this.color = color
    }
    toggleRead(){
        this.isRead=!this.isRead;
        return this.isRead; 
    }
    info(){
        let info = this.title+" by "+this.author+", "+this.pages+" pages, "
        if(this.isRead){
            return info+" finished reading"
        }
        else{
            return info+" not read yet"
        }
    }
}

function formInput(type,placeholder='',required=false){
    let formIn = document.createElement("input");
    formIn.classList.add("input");
    formIn.setAttribute("type",type);
    if (type=='url') formIn.setAttribute("id","Cover");
    else formIn.setAttribute("id",placeholder);
    formIn.setAttribute("name",placeholder);
    let desc=placeholder;
    if(required)desc=`${placeholder}*`;
    formIn.setAttribute("placeholder",desc);
    if(required==true){formIn.setAttribute("required",'required')};
    return formIn;
}

function formLabel(name,innerText=''){
    let label = document.createElement("label");
    label.setAttribute("for",name);
    label.innerText=innerText;
    return label;
}

function submitForm(form){
    const newBook = new Book(form.Title.value,form.Author.value,form.Pages.value, form.isRead.checked,form.Cover.value,form.Summary.value,form.Color.value);
    document.querySelector('.addBook-container').remove();
    library.pushBook(newBook);
    library.showBook(newBook);
}


function addBookForm(){
    let container = document.createElement("div");
    container.classList.add("addBook-container");

    let form = document.createElement("form");
    form.classList.add("form");
    form.setAttribute("id","newBookForm")
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitForm(form);
    });

    container.addEventListener('click',(event)=>{
        if(event.target.classList.value=="addBook-container")document.querySelector('.addBook-container').remove();
    })

    container.addEventListener('keydown',(event)=>{
        if(event.key=='Escape')document.querySelector('.addBook-container').remove();   
    });

    let legend = document.createElement("legend");
    legend.innerText="Add a New Book"
    let titleIn = formInput("text","Title",true);
    let authorIn = formInput("text","Author",true);
    let summaryIn = formInput("text","Summary");
    let pagesIn = formInput("number","Pages");
    let coverIn = formInput("url","Cover (https://abc.com/image.jpg)");

    let colorIn= formInput("color","Color");
    colorIn.value="#83a5e8";
    let colorLabel=formLabel("Color","Book color");
    let color=document.createElement("div");
    color.append(colorLabel,colorIn);
    color.classList.add("color");

    let isReadIn = formInput("checkbox","isRead");
    let readLabel = formLabel("isRead",'Finished Reading');
    let isRead = document.createElement("div");
    isRead.append(readLabel,isReadIn);
    isRead.classList.add("checkbox");

    let submitBtn=document.createElement("button");
    submitBtn.setAttribute("action","submit");
    submitBtn.innerText="Submit";
    submitBtn.classList.add("form-button");

    form.append(legend,titleIn,authorIn,summaryIn,pagesIn,
        coverIn,color,isRead,submitBtn);

    container.appendChild(form);

    let view = document.querySelector(".container");

    view.append(container);

    titleIn.focus();
}

function bookData(data,classes=''){
    let b=document.createElement("div");
    if(classes!='') b.classList.add(classes);
    b.innerText=data;
    return b;
}

let library = new Library();

const libraryView = document.querySelector(".library");

document.querySelector("#newbook").addEventListener("click",addBookForm);

library.pushBook(new Book('The Hobbit','J.R.R. Tolkien',295, false));

library.pushBook(new Book('A Game of Thrones','J.R.R. Martin',694,false,'https://m.media-amazon.com/images/I/51NF6gOqnuL.jpg','In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea.'));

library.showBooks();