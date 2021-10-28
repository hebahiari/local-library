function findAccountById(accounts, id) {
    let accountId = accounts.find((account) => id === account.id);
    return accountId;
}

function sortAccountsByLastName(accounts) {
    accounts.sort((accountA, accountB) =>
        accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
    );

    return accounts;
}

function getTotalNumberOfBorrows(account, books) {

    let numberOfBorrows = 0;
    for (let book of books) {
        let borrows = book.borrows.filter((borrower) => borrower.id === account.id).length;
        numberOfBorrows += borrows
    }
    return numberOfBorrows;
}

function getBookAuthor(book, authors) {
    for (let author of authors) {
        if (author.id === book.authorId) {
            return author;
        }
    }
}

function getBooksPossessedByAccount(account, books, authors) {
    let booksPossesed = books.reduce((total, book) => {
        for (let borrower of book.borrows) {
            const { id, returned } = borrower
            if (id === account.id && returned === false) {
                total.push(book);
                book["author"] = getBookAuthor(book, authors);
            }
        }
        return total;
    }, []);

    return booksPossesed;
}

module.exports = {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
};