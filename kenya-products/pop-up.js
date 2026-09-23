// ============================================================
// PROCUREMENT POPUP 2
// ============================================================


// ============================================================
// OPEN MODAL
// ============================================================

window.zwOpenModal2 = function () {

    const modal = document.getElementById('zwModalOverlay2');

    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

};


// ============================================================
// CLOSE MODAL
// ============================================================

window.zwCloseModal2 = function () {

    const modal = document.getElementById('zwModalOverlay2');

    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

};


// ============================================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ============================================================

window.zwCloseModalCheck2 = function (e) {

    if (e.target.id === 'zwModalOverlay2') {
        window.zwCloseModal2();
    }

};


// ============================================================
// DOCUMENT READY
// ============================================================

$(document).ready(function () {


    // ========================================================
    // OPEN POPUP ON BUTTON CLICK (LOAD pop-up.html DYNAMICALLY)
    // ========================================================

    $('#seeActionBtn').on('click', function () {

        // agar modal pehle se load ho chuka hai to seedha open karo
        if ($('#zwModalOverlay2').length) {
            window.zwOpenModal2();
            return;
        }

        // pop-up.html fetch karke body me daalo
        $.get('pop-up.html', function (html) {

            $('body').append(html);

            // page_url field set karo (jo pehle PHP se aata tha)
            $('#zwPageUrl').val(window.location.href);

            window.zwOpenModal2();

        }).fail(function () {

            console.error('Popup load nahi ho paya.');

        });

    });


    // ========================================================
    // FORM VALIDATION
    // ========================================================

    function zwValidateForm2() {

        var isValid = true;
        var firstInvalid = null;


        // ----------------------------------------------------
        // Reset previous errors
        // ----------------------------------------------------

        $('#procurement2 .zw-input-box')
            .css('border-color', '#d8d8d8');

        $('#procurement2 .zw-field-error').remove();


        // ----------------------------------------------------
        // Mark invalid field
        // ----------------------------------------------------

        function markInvalid($input, msg) {

            isValid = false;

            var $box = $input.closest('.zw-input-box');

            $box.css('border-color', '#e74c3c');

            $box.after(
                '<div class="zw-field-error" ' +
                'style="color:#e74c3c;font-size:12px;margin-top:4px;">' +
                msg +
                '</div>'
            );

            if (!firstInvalid) {
                firstInvalid = $input;
            }

        }


        // ====================================================
        // FULL NAME
        // ====================================================

        var $fullName = $('#procurement2 [name="full_name"]');

        if ($fullName.length) {

            var fullNameValue = $fullName.val().trim();

            if (fullNameValue.length < 2) {

                markInvalid(
                    $fullName,
                    'Please enter your full name.'
                );

            }

        }


        // ====================================================
        // WORK EMAIL
        // ====================================================

        var $email = $('#procurement2 [name="work_email"]');

        if ($email.length) {

            var emailVal = $email.val().trim();

            var emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(emailVal)) {

                markInvalid(
                    $email,
                    'Please enter a valid work email.'
                );

            }

        }


        // ====================================================
        // PHONE NUMBER
        // ====================================================

        var $phone = $('#procurement2 [name="phone"]');

        if ($phone.length) {

            var phoneDigits =
                $phone.val().replace(/\D/g, '');

            if (
                phoneDigits.length < 7 ||
                phoneDigits.length > 15
            ) {

                markInvalid(
                    $phone,
                    'Please enter a valid phone number.'
                );

            }

        }


        // ====================================================
        // COMPANY NAME
        // ====================================================

        var $company = $('#procurement2 [name="company"]');

        if ($company.length) {

            var companyValue =
                $company.val().trim();

            if (companyValue.length < 2) {

                markInvalid(
                    $company,
                    'Please enter your company name.'
                );

            }

        }


        // ====================================================
        // FOCUS FIRST INVALID FIELD
        // ====================================================

        if (firstInvalid) {

            firstInvalid.focus();

        }


        return isValid;

    }


    // ============================================================
    // FORM SUBMIT
    // ============================================================

    $(document).on('submit', '#procurement2', function (e) {

        e.preventDefault();


        // --------------------------------------------------------
        // Validate form
        // --------------------------------------------------------

        if (!zwValidateForm2()) {
            return false;
        }


        // --------------------------------------------------------
        // Form data
        // --------------------------------------------------------

        var formData = $(this).serialize();


        // --------------------------------------------------------
        // Submit button
        // --------------------------------------------------------

        var submitButton = $('#proc_button2');


        // Disable button
        submitButton.prop('disabled', true);


        // Show loader
        submitButton.find('.btn-text').hide();
        submitButton.find('.btn-loader').show();


        // ========================================================
        // AJAX
        // ========================================================

        $.ajax({

            type: 'POST',

            url: window.procurementPopup2Url,

            data: formData,

            dataType: 'json',


            // ====================================================
            // SUCCESS
            // ====================================================

            success: function (response) {

                if (response.Status === 'Success') {


                    // --------------------------------------------
                    // Success message
                    // --------------------------------------------

                    $('#success_msg2')
                        .html(response.message)
                        .fadeIn();


                    $('#error_msg2').hide();


                    // --------------------------------------------
                    // Reset form
                    // --------------------------------------------

                    $('#procurement2')[0].reset();


                    // --------------------------------------------
                    // Reset border
                    // --------------------------------------------

                    $('#procurement2 .zw-input-box')
                        .css(
                            'border-color',
                            '#d8d8d8'
                        );


                    // --------------------------------------------
                    // Remove errors
                    // --------------------------------------------

                    $('#procurement2 .zw-field-error')
                        .remove();


                    // --------------------------------------------
                    // Close popup after 2 seconds
                    // --------------------------------------------

                    setTimeout(function () {

                        $('#success_msg2').fadeOut();

                        window.zwCloseModal2();

                    }, 2000);


                } else {


                    // --------------------------------------------
                    // Error response
                    // --------------------------------------------

                    $('#error_msg2')
                        .html(
                            response.message ||
                            'Something went wrong. Please try again.'
                        )
                        .fadeIn();


                    $('#success_msg2').hide();


                    // --------------------------------------------
                    // Hide error after 3 seconds
                    // --------------------------------------------

                    setTimeout(function () {

                        $('#error_msg2').fadeOut();

                    }, 3000);

                }

            },


            // ====================================================
            // AJAX ERROR
            // ====================================================

            error: function (xhr, status, error) {

                console.error(
                    'Procurement Form Error:',
                    error
                );


                $('#error_msg2')
                    .html(
                        'Something went wrong. Please try again.'
                    )
                    .fadeIn();


                $('#success_msg2').hide();


                setTimeout(function () {

                    $('#error_msg2').fadeOut();

                }, 3000);

            },


            // ====================================================
            // AJAX COMPLETE
            // ====================================================

            complete: function () {

                // Enable button
                submitButton.prop(
                    'disabled',
                    false
                );


                // Hide loader
                submitButton.find('.btn-text').show();

                submitButton.find('.btn-loader').hide();

            }

        });


        return false;

    });


    // ============================================================
    // LIVE CLEAR ERROR
    // ============================================================

    $(document).on(
        'input',
        '#procurement2 .zw-input-box input, #procurement2 .zw-input-box textarea',
        function () {

            $(this)
                .closest('.zw-input-box')
                .css(
                    'border-color',
                    '#d8d8d8'
                )
                .next('.zw-field-error')
                .remove();

        }
    );


    // ============================================================
    // OPTIONAL: ESC KEY CLOSE MODAL
    // ============================================================

    $(document).on('keydown', function (e) {

        if (e.key === 'Escape') {

            const modal =
                document.getElementById('zwModalOverlay2');

            if (
                modal &&
                modal.classList.contains('open')
            ) {

                window.zwCloseModal2();

            }

        }

    });

});