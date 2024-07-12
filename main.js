$(document).ready(function(){
    //when first "get in touch " button is pressed scrolls user to form
    $("#toFormButton").click(function(e){
        // Prevent default anchor click behavior if it is inside a link
        e.preventDefault();

        $('html,body').animate({
            scrollTop:$('#formSection').offset().top
        },100);
    });



    //form submission
    $('#contactForm').submit(function (e){
        e.preventDefault();

        let isValid= true;
        $('.errorMessage').html("");
        //regex types for name and phoneNum 
        const nameRegex = /^[a-zA-Z]+$/;
        const phoneRegex = /^\+?\d+$/;
        const form = $('#contactForm');

        //validate email
        let inputEmail = $('[name = "data[email]"]').val();
        if (inputEmail === ''){
            $('#emailError').html("Please Enter Your Work Email");
            isValid = false;
        }

        //validate phonenum
        let inputPhoneNum = $('[name = "data[phoneNum (+44)]"]').val();
        if (inputPhoneNum ==='') {
            $('#phoneError').html("Please Enter Your Phone Number");
            isValid = false;
        } else if (!phoneRegex.test(inputPhoneNum)) {
            $('#phoneError').html("Phone Number Can Only Contain Digits and an Optional '+' At The Start");
            isValid = false;
        } else if (inputPhoneNum.length < 10) {
            $('#phoneError').html("Phone Number Must Be At Least 10 Digits");
            isValid = false;
        }

        //validate first name 
        let inputFName = $('[name = "data[fName]"]').val();
        if(inputFName === ''){
            $('#fNameError').html("Please Enter Your First Name");
            isValid = false;
        } else if(!nameRegex.test(inputFName)){
            $('#fNameError').html("First Name Can Only Be Alphabetical Characters");
            isValid = false;
        }

        // Validate last name
        let inputSName = $('[name= "data[sName]"]').val();
        if (inputSName === '') {
            $('#sNameError').html("Please Enter Your Last Name");
            isValid = false;
        } else if (!nameRegex.test(inputSName)) {
            $('#sNameError').html("Last Name Can Only Be Alphabetical Characters");
            isValid = false;
        }

        // Validate company name
        let inputCName = $('[name= "data[cName]"]').val();
        if (inputCName === '') {
            $('#cNameError').html("Please Enter Your Company Name");
            isValid = false;
        }

        //if from invalid prevent submission
        if(!isValid){
            e.preventDefault();
        }
        // otherwise submit data to google sheet and send user to thank you page
        else{
            fetch(form.attr('action'), {
                method : "POST",
                body: new FormData(form[0]),
            }).then(
                response => response.json()
            ).then((data) =>{
                $('#successSubmission').html("Your Information Has Been Successfully Submitted");
                window.location.href = 'success.html';
            }).catch((error) => {
                console.error('Error:', error);
            });
        }

    });

    $('#headerLogo').click(function(){
        window.location.href = 'index.html';
    });

});
