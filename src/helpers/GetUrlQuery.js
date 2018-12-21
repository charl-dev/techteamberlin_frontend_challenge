export default function getSearchTerm (location) {
    let term = new URLSearchParams(location.search)
    return term.get('term')
}