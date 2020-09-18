
renderTitleH1 = function( title ) {
    var tagBody = document.querySelector('body');
    tagBody.innerHTML = `<h1>${title}</h1>`
}
// truyền vô tham số là 1 cái hàm tức là callback 
var main = function( callback ) {//Truyền vào 1 cái callback
    callback('Hai ne');
}
main(renderTitleH1);