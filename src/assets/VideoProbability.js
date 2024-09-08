
function SingoGet(level) {
    const value = Math.min(level,75)
    const s = Math.log(value);
    const a = Math.log(value)+value;

    const range = Math.random()*100;
    return range<s?'S':range<a?'A':'B';
}
export{SingoGet}