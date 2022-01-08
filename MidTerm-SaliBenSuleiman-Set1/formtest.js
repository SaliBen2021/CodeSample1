/* Web Application For Jack’s Wholesale Shop
  Midterm Set 1
   
   
   Revision history
       Sali Ben Suleiman, 2021.07.08: Created 

*/



/**********************************Global Variables Definitions***********************************************/

/* Define global variables for each item price */
const Product1_Price = 15;
const Product2_Price = 50;
const Product3_Price = 10;


/* Define global variables to check is there an input */
var Is_There_Input1 = 0;
var Is_There_Input2 = 0;
var Is_There_Input3 = 0;


/* Define global variables for the initial error message and the regex patterns */
var Error_Msg = '';
var No_Input_Flag = 0;
var Name_Pattern = /^([A-Za-z]{1,8})\s|\-|\_([A-Za-z]+)$/;
var Email_Pattern = /^([A-Za-z]+)(\d{1,7})?@([A-Za-z]+)\.([A-Za-z]{2,8})(\.[A-Za-z]{2,8})?$/;
var Phone_Pattern = /^\(\d{3}\)\-\d{3}\-\d{4}$/;
var Credit_Card_Pattern = /^\d{4}([\ \-]?)\d{4}\1\d{4}\1\d{4}$/;
var Credit_Expiry_Month_Pattern = /^[A-Za-z]{3}$/;
var Credit_Expiry_Year_Pattern = /[2][0][29][1-9]/;// restrict the year to the range 2021 t0 2090

/* Define global variables for the user info nad products quantities */
var Full_Name;
var Email;
var Credit_Card;
var Product1_Quantity;
var Product2_Quantity;
var Product3_Quantity;


/***********************************************************Functions**************************************************/
/*User_Info_With_Ordered_Products function will perform:
1-Read the user inputs from the form
2-Remove any spaces at the front or the end of the user inputs fields
3-Compare the user inputs with its corresponding regex format
4-If there is no match with the regex, an error msg is displayed, else the user info/products are displayed
5-Send the data to be displayed under the from
6-Call Generate_Receipt funcion
*/
function User_Info_With_Ordered_Products() {

    /* Read the user inputs from the form */
    Full_Name = document.getElementById('Full_Name').value;
    Email = document.getElementById('email').value;
    Phone_Number = document.getElementById('Phone_Number').value;
    Credit_Card = document.getElementById('Credit_Card').value;
    var Credit_Card_Month = document.getElementById('Credit_Month').value;
    var Credit_Card_Year = document.getElementById('Credit_Year').value;
    Product1_Quantity = document.getElementById('T-Shirts').value;
    Product2_Quantity = document.getElementById('Jackets').value;
    Product3_Quantity = document.getElementById('Caps').value;


    /* Remove any spaces at the front or the end of the user inputs fields */
    Full_Name = Full_Name.trim();
    Email = Email.trim();
    Credit_Card = Credit_Card.trim();
    Credit_Month = Credit_Card_Month.trim();
    Phone_Number = Phone_Number.trim();
    Credit_Year = Credit_Card_Year.trim();
    Product1_Quantity = Product1_Quantity.trim();
    Product2_Quantity = Product2_Quantity.trim();
    Product3_Quantity = Product3_Quantity.trim();


    /* Compare the user inputs with its corresponding regex format */
    validateInputRegex(Full_Name, Name_Pattern, 'Please enter a valid name');
    validateInputRegex(Email, Email_Pattern, 'Please enter a valid email address');
    validateInputRegex(Phone_Number, Phone_Pattern, 'Please enter a valid phone number');
    validateInputRegex(Credit_Card, Credit_Card_Pattern, 'Credit card number is invalid');
    validateInputRegex(Credit_Card_Month, Credit_Expiry_Month_Pattern, 'Credit card Expiry Month is invalid');
    validateInputRegex(Credit_Card_Year, Credit_Expiry_Year_Pattern, 'Credit card Expiry Year is invalid');
    validateInputNumbers(Product1_Quantity, 'Please choose right quantity for the first product', Is_There_Input1);
    validateInputNumbers(Product2_Quantity, 'Please choose right quantity for the second product', Is_There_Input2);
    validateInputNumbers(Product3_Quantity, 'Please choose right quantity for the third product', Is_There_Input3);


    /* If there is no match with the regex or no input at all, an error msg is displayed, 
       else the user info/products are displayed*/
    if (Is_There_Input1 == 0 && Is_There_Input2 == 0 && Is_There_Input3 == 0)
     {
        No_Input_Flag = 1;
        Error_Msg += "Please order any product to check out"
     }

    if (Error_Msg || No_Input_Flag == 1) 
     {
        document.getElementById('Error_Displayed_In_Page').innerHTML = Error_Msg;
     }
    else 
     {
        document.getElementById('Error_Displayed_In_Page').innerHTML = '';
        //show user info and only the last 4 digits of the credit card number 
        Credit_Card = Credit_Card.replace(Credit_Card.substring(0, 15), 'xxxx-xxxx-xxxx-');
        var message = 'Name: ' + Full_Name + '<br> Email' + Email + '<br> Phone' + Phone_Number + '<br> Credit_Card: ' + Credit_Card +
            '<br> Credit_Expiry_Month: ' + Credit_Month + '<br> Credit_Expiry_Year: ' + Credit_Year + '<br>';

        // Check for inputs in all the products fields
        if (Is_There_Input1) 
        {
            // if true there is an input for this product, show it under the form
            var message1 = 'T-Shirts Quantity: ' + Product1_Quantity + '<br>';
        }
        else 
        {
            // if no input for this product, it will not be shown under the form
            message1 = '';
        }

        if (Is_There_Input2) 
        {
            // if true there is an input for this product, show it under the form
            var message2 = 'Jackets Quantity: ' + Product2_Quantity + '<br>';
        }
        else 
        {
            // if no input for this product, it will not be shown under the form
            message2 = '';
        }

        if (Is_There_Input3) 
        {
            // if true there is an input for this product, show it under the form
            var message3 = 'Caps Quantity: ' + Product3_Quantity + '<br>';
        }
        else 
        {
            // if no input for this product, it will not be shown under the form
            message3 = '';
        }



        //Send the data to be displayed under the from
        document.getElementById('Dsplay_User_Data').innerHTML = message + message1 + message2 + message3;

        //call this function to display the receipt side
        Generate_Receipt();

    }

    // Return false will stop the form from submitting and keep it on the current page.
    return false;
}


/*************************************************************************************************************/
/*Generate_Receipt function will perform:
1-Initialize counters for the number of rows to be inserted and the Sub_Total to 0
2-Insert rows and its corresponding columns for the user info table and fill it
3-Insert rows for the receipt table and write its titles
4-Write only the products details that the user enter it, starting by inserting a row for each product
5-Calculate the tax and final total values
6-Insert rows for the tax and the final total and fill them
*/

function Generate_Receipt() {

    //Initialize counters for the number of rows to be inserted and the Sub_Total to 0
    var NumberOfRows1 = 0;
    var NumberOfRows2 = 0;
    var Sub_Total = 0;

    //Insert rows and its corresponding columns for the user info table
    var row = User_Info.insertRow(NumberOfRows1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    NumberOfRows1++;
    var row = User_Info.insertRow(NumberOfRows1);
    var cell2 = row.insertCell(0);
    var cell3 = row.insertCell(1);
    NumberOfRows1++;
    var row = User_Info.insertRow(NumberOfRows1);
    var cell4 = row.insertCell(0);
    var cell5 = row.insertCell(1);
    NumberOfRows1++;
    var row = User_Info.insertRow(NumberOfRows1);
    var cell6 = row.insertCell(0);
    var cell7 = row.insertCell(1);

    //Fill the table with the user info 
    cell0.innerHTML = "User Name";
    cell1.innerHTML = Full_Name;
    cell2.innerHTML = "Email";
    cell3.innerHTML = Email;
    cell4.innerHTML = "Phone_Number";
    cell5.innerHTML = Phone_Number;
    cell6.innerHTML = "Credit Card";
    cell7.innerHTML = Credit_Card;

    //Using the second counter to insert rows in the receipt table
    var row = Receipt.insertRow(NumberOfRows2);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);

    //Write titles for each row
    cell0.innerHTML = "Item";
    cell1.innerHTML = "Quantity";
    cell2.innerHTML = "Unit Price $";
    cell3.innerHTML = "Total Price $";

    //Write only the products details that the user enter it, starting by inserting a row for each product
    if (Is_There_Input1)
    {
        NumberOfRows2++;
        //if Is_There_Input1 true, insert a row with 4 columns
        var row = Receipt.insertRow(NumberOfRows2);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);

        //fill the columns with the product's details
        cell0.innerHTML = "T-Shirts";
        cell1.innerHTML = Product1_Quantity;
        cell2.innerHTML = Product1_Price;
        cell3.innerHTML = Product1_Quantity * Product1_Price;
        Sub_Total = (Sub_Total + Product1_Quantity * Product1_Price);

    }

    if (Is_There_Input2) 
    {
        NumberOfRows2++;
        //if Is_There_Input2 true, insert a row with 4 columns
        var row = Receipt.insertRow(NumberOfRows2);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);

        //fill the columns with the product's details
        cell0.innerHTML = "Jackets";
        cell1.innerHTML = Product2_Quantity;
        cell2.innerHTML = Product2_Price;
        cell3.innerHTML = Product2_Quantity * Product2_Price;
        Sub_Total = (Sub_Total + Product2_Quantity * Product2_Price);
    }

    if (Is_There_Input3)
     {
        NumberOfRows2++;
        //if Is_There_Input3 true, insert a row with 4 columns
        var row = Receipt.insertRow(NumberOfRows2);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);

        //fill the columns with the product's details
        cell0.innerHTML = "Caps";
        cell1.innerHTML = Product3_Quantity;
        cell2.innerHTML = Product3_Price;
        cell3.innerHTML = Product3_Quantity * Product3_Price;
        Sub_Total = (Sub_Total + Product3_Quantity * Product3_Price);
    }

    NumberOfRows2++;
    var row = Receipt.insertRow(NumberOfRows2);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);

    cell0.innerHTML = "Sub_Total";
    cell1.innerHTML = "";
    cell2.innerHTML = "";
    cell3.innerHTML = Sub_Total;

    NumberOfRows2++;
    var row = Receipt.insertRow(NumberOfRows2);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);

    cell0.innerHTML = "13% Taxes";
    cell1.innerHTML = "";
    cell2.innerHTML = "";
    cell3.innerHTML = Sub_Total * 0.13;

    NumberOfRows2++;
    var row = Receipt.insertRow(NumberOfRows2);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);

    cell0.innerHTML = "Final Total";
    cell1.innerHTML = "";
    cell2.innerHTML = "";
    cell3.innerHTML = Sub_Total * 0.13 + Sub_Total;

}

/*************************************************************************************************************/
/*validateInputRegex function will perform:
1-Compare the user input with the regex pattern, and retun the error msg if there is no match
*/

function validateInputRegex(user_Input, Regex, Message) 
{
    if (!Regex.test(user_Input)) 
    {
        Error_Msg += `${Message} <br>`; // error message + '<br>';
    }
}

/*************************************************************************************************************/
/*validateInputNumbers function will perform:
1-Check the quantity input from the user, in case it is not a number, is null, or is a negative, return error
*/
function validateInputNumbers(Quantity, Message, Is_There_Input) 
{
    if (Is_There_Input) 
    {
        if (isNaN(Quantity) == true || Quantity == null || Quantity <= 0) 
        {
            Error_Msg += `${Message} <br>`;
        }
    }

}

