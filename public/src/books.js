function findAuthorById(authors, id) {
    const foundAuthor = authors.find((author) => id === author.id);
    return foundAuthor;
}

function findBookById(books, id) {
    const foundBook = books.find((book) => id === book.id);
    return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
    let partitionedBooks = books.reduce(
        (total, book) => {
            book.borrows[0].returned === false ?
                total[0].push(book) :
                total[1].push(book);

            return total;
        }, [
            [],
            []
        ]
    );
    return partitionedBooks;
}

function getBorrowersForBook(book, accounts) {
    let borrowers = book.borrows.reduce((total, borrower) => {
        for (account of accounts) {
            if (account.id === borrower.id && total.length < 10) {
                total.push(account);
                account["returned"] = borrower.returned;
            }
        }
        return total;
    }, []);
    return borrowers;
}

module.exports = {
    findAuthorById,
    findBookById,
    partitionBooksByBorrowedStatus,
    getBorrowersForBook,
};