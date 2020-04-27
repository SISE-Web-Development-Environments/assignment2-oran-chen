$().ready(function () {
//validate the register form on keyup and submit
    $('#reg_form').validate({
            rules: {
                uname_reg: "required",
                psw_reg: {
                    required: true,
                    minlength: 6,
                    regex: /^[a-zA-Z0-9]*$/
                },
                fname_reg: {
                    required: true,
                    regex: /^([^0-9]*)$/
                },
                email_reg: {
                    required: true,
                    email: true
                },
                Bmonth: {
                    required: true
                },
                Bday: {
                    required: true
                },
                Byear: {
                    required: true
                }
            },
            messages: {
                uname_reg: "Please enter a username",
                psw_reg: {
                    required: "Please enter a password",
                    minlength: "The password must consist of at least 6 characters",
                    regex: "The password should contain letters and numbers"
                },
                fname_reg: {
                    required: "Please enter your full name",
                    regex: "Full name cannot contain numbers"
                },
                email_reg: {
                    required: "Please enter an email",
                    email: "Email address in not valid"
                },
                Bmonth: {
                    required: "Please enter your birth month"
                },
                Bday: {
                    required: "Please enter your birth day"
                },
                Byear: {
                    required: "Please enter your birth year"
                }
            },
            submitHandler: function () {
                var isFormValid = $("#reg_form").valid();
                if (isFormValid) {
                    userManagerRegSubmit();
                    document.getElementById("reg_form").reset();
            }
        }
        });

    //set date picker
        $.dobPicker({
            daySelector: '#Bday',
            monthSelector: '#Bmonth',
            yearSelector: '#Byear',
            dayDefault: 'Day',
            monthDefault: 'Month',
            yearDefault: 'Year',
        });

});
$(function () {
    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        });
});