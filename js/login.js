$(function () {
    if (typeof localStorage['asco_user'] !== 'undefined') {
        alert("You are already logged-in");
        window.location = 'pos.php';
    }

    $('#login').on("click", function (e) {
        e.preventDefault();

        let uname = $('#uname').val();
        let pass = $('#pass').val();

        if (uname == "" || pass == "") {
            alert("Please input username or password!");
        } else {
            $.post('api/login.php', { uname, pass }, function (res) {
                let data = JSON.parse(res)
                if (typeof data.error === "undefined") {
                    localStorage['asco_user'] = res;
                    alert("Log in Successful!");
                    window.location = 'pos.php';
                } else {
                    alert(data.error);
                }
            });
        }
    })

});