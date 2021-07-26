const DEVELOPER_MODE = true;


$(document).on('click', '#new_contact', showContactForm);
$(document).on('click', '#cancel_btn', hideContactForm);
$(document).on('click', '#save_btn', save);
$(document).on('click', '#search_btn', search);


function search()
{
    var keyword = $('#search').val();

    if (keyword.length < 3)
    {
        alert('Sorry, you must enter a keyword with at least three characters or numbers.');
        return false;
    }
   
    var contactDB = new ContactDB();

    // If contact database is not loaded
    if (!contactDB.load())
    {
        alert('Sorry, database could not be loaded.');
        return false
    }

    // Search for the keyword
    var results = contactDB.search(keyword)

    var matched = Object.keys(results).length

    if (!matched)
    {
        alert('Sorry, no results found for ' + keyword);
        return false
    }

    
    var resultBox = $('#results').removeClass('hide')

    $('#result_count').html(matched)

    var tableDiv = $('#result_list')

    var resultTable = '<table class="table">'

    for(email in results)
    {
        var curRecord = results[email]

        var newRow = '<tr>'
        var columns = ''

        for(field in curRecord) {

          value = curRecord[field]
          columns += '<td>' + value + '</td>'
    
        }

        newRow += columns
        newRow += '</tr>'
        resultTable += newRow

    }


    resultTable += '</table>';

    tableDiv.html(resultTable)
    resultBox.show();

    return false

}


function save()
{
    var name  = $('#name').val().trim();
    var email = $('#email').val().trim().toLowerCase();
    var phone = $('#phone').val().trim();

    // Make sure name has at least two char
    if (name.length < 2 || !validateName(name))
    {
        alert('Please enter a first and last name');
        $('#name').focus();
        return false;
    }

    // If email length is too small (i.e smaller than u@u.uk)
    // or email has invalid pattern then reject it
    if (email.length < 6 || !validateEmail(email))
    {
        alert('Invalid email. Please enter a valid email address');
        $('#email').focus();
        return false;
    }

    // If phone length is too small less than 10
    // or phone has invalid pattern then reject it
    if (phone.length < 10 || !validatePhone(phone))
    {
        alert('Invalid phone. Please enter a valid US phone number');
        $('#phone').focus();
        return false;
    }

    // Data is valid

    var record = {

        name : name,
        email : email,
        phone : phone

    }

    var contactDB = new ContactDB();
    contactDB.write(record)

    console.group("user data");
    console.log("Name : " + name + " len=" + name.length);
    console.log("Email : " + email + " len=" + email.length);
    console.log("Phone : " + phone + " len=" + phone.length);
    console.groupEnd();
    
    

}

function showContactForm()
{
    $('#search_box').hide();
    $('#contact_editor').removeClass('hide').show();
}


function hideContactForm()
{
    $('#search_box').show();
    $('#contact_editor').hide();

}


$(document).ready(function(){

    console.log("Document loaded");

    if (DEVELOPER_MODE)
    {
        var random = Math.floor(Math.random() * 100)
        $('#name').val('Joe Smith')
        $('#email').val('joe' + random + '@example.com')
        $('#phone').val('916 555-5555')
        // $('#search').val('kabir@evoknow.com')
        $('#search').val('Smith')
    }

})

function validateName(name) {

    const re = /[a-z]+/i;
    return re.test(name);
}

function validatePhone(phone) {

    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone));
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}