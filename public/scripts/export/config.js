export const apiUrl = location.href.startsWith('http://localhost') 
? 'http://localhost:5000'
: '';

export const getUrl = location.href;