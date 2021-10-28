function getTotalBooksCount(books) {
    return books.length;
}

function getTotalAccountsCount(accounts) {
    return accounts.length;
}

function getBooksBorrowedCount(books) {
    borrowedCount = books.reduce((total, book) => {
        if (book.borrows[0].returned === false) {
            total++;
        }
        return total;
    }, 0);

    return borrowedCount;
}

function getGenres(books) {
    let genres = [];
    books.map((book) => {
        if (!genres.includes(book.genre)) {
            genres.push(book.genre);
        }
    });
    return genres;
}

// OR
// let genres = books.reduce((total, book) => {
//     if (!total.includes(book.genre)) {
//         total.push(book.genre)
//     };
//     return total;
// }, [])

// return genres
// }

function getMostCommonGenres(books) {
    let commonGenres = getGenres(books).reduce((total, genre) => {
        total.push({ name: genre, count: 0 });
        return total;
    }, []);

    for (let book of books) {
        for (let genre of commonGenres) {
            if (genre.name === book.genre) {
                genre.count++;
            }
        }
    }

    commonGenres.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));
    return commonGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
    let popularBooks = books.reduce((total, book) => {
        total.push({ name: book.title, count: book.borrows.length });
        return total;
    }, []);

    popularBooks.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));

    return popularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
    let popularAuthors = authors.reduce((total, author) => {
        let count = 0;
        for (let book of books) {
            if (author.id == book.authorId) {
                count += book.borrows.length;
            }
        }
        total.push({
            name: `${author.name.first} ${author.name.last}`,
            count: count,
        });

        return total;
    }, []);

    popularAuthors.sort((authorA, authorB) =>
        authorA.count < authorB.count ? 1 : -1
    );

    return popularAuthors.slice(0, 5);
}

module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};