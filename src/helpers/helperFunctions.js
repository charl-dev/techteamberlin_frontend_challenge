export function getSearchTerm (location) {
    let term = new URLSearchParams(location.search)
    return term.get('term')
}

export function getUrlQuery (q, location) {
    let term = new URLSearchParams(location.search)
    return term.get(q)
}

// export function sort (location) {
//     let term = new URLSearchParams(location.search)
//     return term.get('term')
// }