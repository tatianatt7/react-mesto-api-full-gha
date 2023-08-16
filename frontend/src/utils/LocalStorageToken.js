export function saveTokenToLs(string) {
    localStorage.setItem('token', string)
};

export function getTokenFromLs() {
    return localStorage.getItem('token') || '';
};

export function deleteTokenFromLs() {
    return localStorage.removeItem('token');
};