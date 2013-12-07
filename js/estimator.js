/**
 * This function is invoked on key up event of program field
 */
    $('#pgm').keyup(function() {

        // Find out what is in the field
        var value = $(this).val();

        var how_many_characters = value.length;

        var how_many_left = 14 - how_many_characters;

        if(how_many_left == 0) {
            $('#pgm-error').css('color','red');
        }
        else if(how_many_left < 5) {
            $('#pgm-error').css('color','orange');
        }
        $('#pgm-error').html('You have ' + how_many_left + ' characters left.');

        // Place the message in the table
        $('#test-program-output').html('Test Program :' + value);
        $('#test-program-output').css('background-color','cyan');

    });

    /**
     *  This function is invoked on a key up event of test subject
     */

    $('#subj').keyup(function() {

        // Find out what is in the field
        var value = $(this).val();

        var how_many_characters = value.length;

        var how_many_left = 14 - how_many_characters;

        if(how_many_left == 0) {
            $('#subj-error').css('color','red');
        }
        else if(how_many_left < 5) {
            $('#subj-error').css('color','orange');
        }
        $('#subj-error').html('You have ' + how_many_left + ' characters left.');

        $('table tr:nth-child(2) td:nth-child(3)').html(value);
    });

    /**
     * This function is invoked on change event of year
     */
     $('#year').change(function() {
           var value = $(this).val();
           var texto = $('table tr:nth-child(2) td:nth-child(1)');
           texto.html(value);
     });

    /**
     * This function is invoked on change event of work type
     */

     $('#typ').change(function() {
             var op =  $(this).find("option:selected").text();
             var texto = $('table tr:nth-child(2) td:nth-child(2)');
             texto.html(op);
     });
    /**
     * this function gets invoked on change event of the hours, resource type and resource name.
     * This method calculates the hours and amount based on the input fields dynamically.
     */
  function recalc(){
        var tot = 0;
        var myChildren = $('.hrs').children("input[name*='hr']"); // get the values of hour field
        var names = $('.hrs').children("input[name*='name']"); // get the values of resource name field
        // iterate through the array and check if hour is not a number, throw an error
        for ( var i=0; i<myChildren.length; i++){
            var tmp = ($(myChildren[i]).val().trim());
            // check only if the length of the field > 1
            if (tmp.length >= 1) {
                    if(isNaN(tmp)){
                        alert('Hours has to be a valid number');
                        return;
                    } else {
                        var num = Math.floor($(myChildren[i]).val());
                        tot = tot+num;
                    }
            }
        }
        // iterate thru and check if resource name is alpha characters.
        for ( var i=0; i<names.length; i++){
            var tmp = ($(names[i]).val().trim());
            // check only if the length of the field > 1
            if (tmp.length >= 1) {
                var regexLetter = /[a-zA-z]/;
              if(!regexLetter.test(tmp)){
                    alert('Name is invalid, please enter alphabets');
                  return false;
                }
            }
        }
        // Array to hold rates of resources by type
        var rates = {"D":100, "T" :75 , "B": 85, "A":120};
        // select all the resources by the drop down box
        var res = $('.hrs').children('select');

        var dollar =0; var rate=0 ;
        // iterate through to populate the values on the preview pane dynamically and calculate the total amount and hours
        // Apply the appropriate hourly rate based on the resource type
        for ( var i=0; i<res.length; i++){
            var opt = ($(res[i]).val());
            var cnt = i+2;
            if(opt == 'D'){
                rate =  rates['D']* Math.floor($(myChildren[i]).val());
                 $('table tr:nth-child('+cnt+') td:nth-child(6)').html(rates['D']);
            } else if (opt == 'A'){
                rate =  rates['A']* Math.floor($(myChildren[i]).val());
                $('table tr:nth-child('+cnt+') td:nth-child(6)').html(rates['A']);
            } else if (opt == 'B'){
                rate =  rates['B']* Math.floor($(myChildren[i]).val());
                $('table tr:nth-child('+cnt+') td:nth-child(6)').html(rates['B']);
            } else if (opt == 'T'){
                rate =  rates['T']* Math.floor($(myChildren[i]).val());
                $('table tr:nth-child('+cnt+') td:nth-child(6)').html(rates['T']);
            } else if(opt == ''){
                rate = 0;
                $('table tr:nth-child('+cnt+') td:nth-child(6)').html('');
            }
            $('table tr:nth-child('+cnt+') td:nth-child(5)').html($(myChildren[i]).val());
            $('table tr:nth-child('+cnt+') td:nth-child(7)').html($(names[i]).val());
            //if drop down box value is empty, then set the text value to blank for the display purposes on the preview
            var resDesc =  $(res[i]).find("option:selected").text();
            if(rate == 0){
                resDesc = '';
            }
            $('table tr:nth-child('+cnt+') td:nth-child(4)').html(resDesc);
            dollar = dollar + rate; // calculate the dollar amount in a loop
        }
        // set the output divs for the preview
        $('#total-hours-output').html('Total Hours : '+ tot);
        $('#total-amount-output').html('Total Amount : '+dollar);

    }; // end of method recalc

    /**
    *   This method is invoked when a more method or remove method is clicked
    */
    function validate(){
        if( ($('#pgm').val().trim().length < 1 || $('#subj').val().trim().length < 1 || $('#year').val().trim().length < 1 || $('#typ').val().trim().length < 1)) {
            alert('Please enter or select the required fields');
            return false;// || $('#subj').val() ||$('#year').val() || $('#type').val())
        }
        return true;
    }

    $(document).ready(function() {
         $('#more').click(function() {
               if(validate()){
                // check the total number of divs with class=hrs, there is always a min of 1 div with hrs.
                var num     = $('.hrs').length;
                var newNum  = new Number(num + 1); // increment the number by 1
                // clone an existing div with id as input1 and change the attributes of the children elements by incrementing the id, name
                var newElem = $('#input' +num).clone().attr('id', 'input' + newNum);

                newElem.children(':first').attr('id', 'hr' + newNum).attr('hr', 'hr' + newNum).val('');
                newElem.find('select').attr('id', 'res' + newNum).attr('name', 'res' + newNum).attr('value','');
                newElem.children(':last').attr('id', 'name' + newNum).attr('name', 'name' + newNum).val(''); // after cloning, set the values to blanks

                $('#input' + num).after(newElem); // add the new element after the previous input div element
                $('#newElem').append('<BR>');
                $('#input' + num).html='';
                $('#btnDel').attr('disabled',false); // disable the remove button on load

                // add new rows on the preview table at the same time , each time the more button is clicked.
                var clsvar;
                if(num%2 == 1)clsvar = "oddRow"; else clsvar = "evenRow";

                var txt="<tr id=row"+newNum+" class="+clsvar+"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";

                // add the row after the previous row in the preview
                $('#row'+num).after(txt);

                //pre-populate all the values already available into the preview
                var num = $('.hrs').length +1;
                var sub = $('#subj').val();
                var yr = $('#year').val();
                var typ =  $('#typ').find("option:selected").val();
                 if(typ == ''){
                    var displayTyp = '';
                 } else {
                     displayTyp = $('#typ').find("option:selected").text();
                 }
                var typ =  $('#typ').find("option:selected").text();
                $('table tr:nth-child('+num+') td:nth-child(3)').html(sub);
                $('table tr:nth-child('+num+') td:nth-child(1)').html(yr);
                $('table tr:nth-child('+num+') td:nth-child(2)').html(displayTyp);
               }
              }); // end of more function

             // this method is invoked when remove button is clicked, removes the bottom most row and disables when the available row is just 1
            // removes the rows from the preview window as well.
             $('#btnDel').click(function() {
                 var num = $('.hrs').length;
                 $('#input' + num).remove();
                 $("#est tr:eq("+num+")").remove();
                 calculate();
                 $('#btnAdd').attr('disabled',false);
                 if (num-1 == 1)
                     $('#btnDel').attr('disabled',true);
             });
             $('#btnDel').attr('disabled',true); // by default, remove button is disabled.
         });

        /*
         * This method is used for starting over the entry all over.
         */
        $('#refresh-btn').click(function() {
                //remove all the rows greater than 1
                $("#est tr:gt(1)").remove();
                //clear the contents of tds in second row

                for (var i =0; i< 8;i++){
                    $('table tr:nth-child(2) td:nth-child('+i+')').html("");
                }
                //reset all the input fields on the form
                $("input[type=text], select").val("");

                // remove the extra fields for hours and resources
                $('.hrs:gt(0)').remove();

                // clear contents of amount and hours and pgm in the preview screen
                $('#total-amount-output').html("");
                $('#total-hours-output').html("");
                $('#test-program-output').html("");
                $('#subj-error').html("Max 14 chars");
                $('#pgm-error').html("Max 14 chars");

        });

       /*
        * This method is used utility method to calculate the hours and amount any time
        */
        function calculate() {
            var tot = 0;
            var myChildren = $('.hrs').children("input[name*='hr']");
            for ( var i=0; i<myChildren.length; i++){
                var num = Math.floor($(myChildren[i]).val());
                tot = tot+num;
            }

            var rates = {"D":100, "T" :75 , "B": 85, "A":120};

            var res = $('.hrs').children('select');
            var dollar =0; var rate=0 ;
            for ( var i=0; i<res.length; i++){
                var opt = ($(res[i]).val());
                if(opt == 'D'){
                    rate =  rates['D']* Math.floor($(myChildren[i]).val());
                } else if (opt == 'A'){
                    rate =  rates['A']* Math.floor($(myChildren[i]).val());
                } else if (opt == 'B'){
                    rate =  rates['B']* Math.floor($(myChildren[i]).val());
                } else if (opt == 'T'){
                    rate =  rates['T']* Math.floor($(myChildren[i]).val());
                } else if (opt == ''){
                    rate = 0;
                }
                dollar = dollar + rate;
            }

            $('#total-hours-output').html('Total Hours : '+ tot);
            $('#total-amount-output').html('Total Amount : '+dollar);

        };
