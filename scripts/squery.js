export function get_id(e) { 
    return document.getElementById(e);
};

export function qsa(e) {
    return document.querySelectorAll(e);
};

export function cl(e) {
    return console.log(e);
};

export function string(e) {
    return JSON.stringify(e);
};

export function parse(e) {
    return JSON.parse(e);
};

export const headers = {
    "Accept" : "application/json",
    "Content-Type": "application/json"
};