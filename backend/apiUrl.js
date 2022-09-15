export const apiUrl = location.href.startsWith('http://localhost') 
? `http://localhost:${config.PORT}`
: '';