$('#pgm').keyup(function() {

	// Find out what is in the field
	var value = $(this).val();

	var how_many_characters = value.length;

	var how_many_left = 14 - how_many_characters;

	if(how_many_left == 0) {
		$('#recipient-error').css('color','red');
	}
	else if(how_many_left < 5) {
		$('#recipient-error').css('color','orange');
	}
	$('#recipient-error').html('You have ' + how_many_left + ' characters left.');

	// Place the message in the card
	$('#test-program-output').html('Test Program :' + value);

});

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

    console.log(value);
    var texto = $('table tr:nth-child(2) td:nth-child(3)').html(value);
});

$('#year').change(function() {

    var value = $(this).val();

    console.log(value);
    var texto = $('table tr:nth-child(2) td:nth-child(1)');
    texto.html(value);
});
$('#typ').change(function() {

     var op =  $(this).find("option:selected").text();
     var texto = $('table tr:nth-child(2) td:nth-child(2)');
    texto.html(op);
});
function recalc(obj){
    var tot = 0;
    var myChildren = $('.hrs').children("input[name*='hr']");
    var names = $('.hrs').children("input[name*='name']");
    for ( var i=0; i<myChildren.length; i++){
        if ($(myChildren[i]).val().trim().length > 1) {
            var validateRegex = /[1-9]/g;
            console.log('hour is :' + $(myChildren[i]).val());
            if(!validateRegex.test($(myChildren[i]).val())){
                alert("Hours has to be numeric, please enter a valid number!");
                return;
            } else {
            var num = Math.floor($(myChildren[i]).val());
            tot = tot+num;
            }
        }
    }
    var rates = {"D":100, "T" :75 , "B": 85, "A":120};

    var res = $('.hrs').children('select');
    var dollar =0; var rate=0 ;

    for ( var i=0; i<res.length; i++){
        var opt = ($(res[i]).val());
        console.log('i is :' + (i+2));
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
        var resDesc =  $(res[i]).find("option:selected").text();
        if(rate == 0){
            resDesc = '';
        }
        $('table tr:nth-child('+cnt+') td:nth-child(4)').html(resDesc);
        dollar = dollar + rate;
    }


    $('#total-hours-output').html('Total Hours : '+ tot);
    $('#total-amount-output').html('Total Amount : '+dollar);
 };

         $(document).ready(function() {
             $('#more').click(function() {
                var num     = $('.hrs').length;
                var newNum  = new Number(num + 1);
                console.log('newnum '+newNum);
                var newElem = $('#input' +num).clone().attr('id', 'input' + newNum);

                newElem.children(':first').attr('id', 'hr' + newNum).attr('hr', 'hr' + newNum).val('');
                newElem.find('select').attr('id', 'res' + newNum).attr('name', 'res' + newNum).attr('value','');
                newElem.children(':last').attr('id', 'name' + newNum).attr('name', 'name' + newNum).val('');

                $('#input' + num).after(newElem);
                $('#newElem').append('<BR>');
                $('#input' + num).html='';
                $('#btnDel').attr('disabled',false);
                var txt="<tr id=row"+newNum+"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                $('#row'+num).after(txt);
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
              });
             $('#btnDel').click(function() {
                 var num = $('.hrs').length;
                 $('#input' + num).remove();
                 $("#est tr:eq("+num+")").remove();
                 calculate();
                 $('#btnAdd').attr('disabled',false);
                 if (num-1 == 1)
                     $('#btnDel').attr('disabled',true);
             });
             $('#btnDel').attr('disabled',true);
         });

        /*
        This method is used for starting over the entry all over.

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
                $('#form-error').html("");
                $('#recipient-error').html("");
        });

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
