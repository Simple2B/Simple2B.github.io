$(function () {

  const TARGET_HOST = 'http://46.101.221.249:5555';

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      let name = $("input#name").val();
      let email = $("input#email").val();
      let message = $("textarea#message").val();
      let firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

      const files = document.querySelector('#chosenFile').files;
      // Send FormData
      const formData = new FormData();
      formData.set('name', name);
      formData.set('email', email);
      formData.set('message', message);
      if (files && files.length > 0) {
        formData.append('file', files[0])
      }

      fetch(`${TARGET_HOST}/send_message`, {
          method: 'POST',
          body: formData
        })
        .then(() => {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        })
        .catch(error => {
          console.error(error);
          // Fail message

          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        })
        .finally(() => {
          setTimeout(function () {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });

});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
  $('#success').html('');
});


$('#my_alert').hide()

document.querySelector('#chosenFile').addEventListener('change', e => {
  let myTittle = document.querySelector('#attach_icon')
  let choosen_file = e.target.files[0];
  let FileSize = choosen_file.size / 1024 / 1024;
  if (FileSize < 1) {
    $('#my_alert').hide()
    let filename = choosen_file.name;
    myTittle.setAttribute("title", filename);
  } else {
    choosen_file = '';
    myTittle.setAttribute("title", '');
    $('#my_alert').show();
  }
})
