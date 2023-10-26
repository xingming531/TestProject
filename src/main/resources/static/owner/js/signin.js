(() => {

    $(document).ready(function () {
        preventSpaceInput();
        $('#btn_signin')
            .on('click', onClickSignin);
    });


    function onClickSignin(e) {
        e.preventDefault();
        validateForm();
    }

    function preventSpaceInput() {
        const inputElements = document.querySelectorAll('input');
        inputElements.forEach(input => {
            input.addEventListener('keypress', function (e) {
                if (e.key === ' ') {
                    e.preventDefault();
                }
            });
        });
    }

    function validateForm() {
        const account = $('#account').val().trim();
        const password = $('#password').val().trim();

        if (validateAccount(account) && validatePassword(password)) {
            signin(account, password);
        }
    }

    function validateAccount(account) {
        if (account === undefined || account === null || account === '') {
            showAlert('請輸入帳號！');
            return false;
        }
        hideAlert();
        return true;
    }

    function validatePassword(password) {
        if (password === undefined || password === null || password === '') {
            showAlert('請輸入密碼！');
            return false;
        }
        return true;
    }

    function showAlert(message) {
        $('.alert')
            .text(message)
            .addClass('d-block')
            .removeClass('d-none');
    }

    function hideAlert() {
        $('.alert')
            .addClass('d-none')
    }

function signin(account, password) {
    const data = {
        account: account,
        password: password
    };

    $.ajax({
        url: '/ownerLogin/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(json) {
            saveHotelOwner(json);
            popBack();
        },
        error: function(xhr, status, error) {
            showAlert(xhr.responseText);
        }
    });
}


    function popBack() {
        window.location.href = '/owner/OwnerAccount.html';
    }

})();
