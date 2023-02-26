export const apiUrl = location.href.startsWith('http://localhost') 
? 'http://localhost:5002'
: '';

export const getUrl = location.href;