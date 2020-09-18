var Validation = function() {
    this.kiemTraRong = function(value, name, selectorError) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = `${name} không hợp lệ`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = ``;
        return true;
    }
    this.kiemTraChu = function(value, name, selectorError) {
        var regexAllLetters = /^[a-z A-Z]+$/;
        if (regexAllLetters.test(value)) {//so sánh với value đúng thì trả về true
            document.querySelector(selectorError).innerHTML = '';
            return true;
        } 
        document.querySelector(selectorError).innerHTML = `${name} phải là chữ!`;
        return false;
    }
    this.kiemtraEmail = function(value, name, selectorError) {
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexEmail.test(value)) {//so sánh với value đúng thì trả về true
            document.querySelector(selectorError).innerHTML = '';
            return true;
        } 
        document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
        return false;
    }
    this.kiemTraTatCaSo = function(value, name, selectorError) {
        var regexAllNumber = /^[0-9]+$/;
        if (regexAllNumber.test(value)) {//so sánh với value đúng thì trả về true
            document.querySelector(selectorError).innerHTML = '';
            return true;
        } 
        document.querySelector(selectorError).innerHTML = `${name} phải là số!`;
        return false;
    }
    this.kiemTraDoDai = function(value, name, selectorError, minLength, maxLength) {
        // Nếu độ dài lớn hơn dộ dài lớn nhất và nhỏ hơn cái nhỏ nhất thì sai
        if (value.length > maxLength || value.length < minLength) {
            document.querySelector(selectorError).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự!`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraGiaTri = function(value, name, selectorError, minValue, maxValue) {
        // Nếu độ dài lớn hơn dộ dài lớn nhất và nhỏ hơn cái nhỏ nhất thì sai
        if (Number(value) > maxValue || Number(value) < minValue) {
            document.querySelector(selectorError).innerHTML = `${name} phải từ ${minValue} đến ${maxValue}`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}