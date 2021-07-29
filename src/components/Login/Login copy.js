
import React from 'react'

function LoginJs() {

    var button = document.getElementById('mainButton');
    console.log(button)
    var openForm = function () {
        button.className = 'active';
    };

    var checkInput = function (input) {
        if (input.value.length > 0) {
            input.className = 'active';
        } else {
            input.className = '';
        }
    };

    var closeForm = function () {
        button.className = '';
    };

    document.addEventListener("keyup", function (e) {
        if (e.keyCode == 27 || e.keyCode == 13) {
            closeForm();
        }
    });

}

export default LoginJs


