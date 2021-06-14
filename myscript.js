
//Retrieve To-Do Values stored on the local storage
function get_todos()
{
    //Initializing the Array of Items
    var todos = new Array;
    //Seting the array storing address [Local Storage]
    var todos_str = localStorage.getItem('todo');

    //If the returned value is not empty, then display the stored string value
    if (todos_str !== null)
    {
        //Convert the JSON string back into JavaScript Data 
        todos = JSON.parse(todos_str); 
    }
    //Return any values stored on the Database
    return todos;
}

//Is triggered when the ADD button is Clicked
function add()
{
    var task = document.getElementById('task').value;
 
    var todos = get_todos();

     // PuSH Appends[ADD] to the existing list [Local Storage]
    todos.push(task);
     //(STRINGIFY) method converts a JavaScript object or value to a JSON string
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();

    //avoid any further actions caused by the CLICK Action
    return false;
}

// Clears any input from the INPUT Box after the process is over
function clearDefault(a)
{
    //Check for any string value in the INPUT box
    if (a.defaultValue==a.value)
    {
        //set the value into an EMPTY String
        a.value=""
    }
	
}

// It removes the selected item to be deleted
function remove()
{
    //[This] refers to the current DOM value by index
    var id = this.getAttribute('id');
    var todos = get_todos();
    //Remove a specific from the JavaScript Array
    todos.splice(id, 1);
    //Store the new task back into the Database
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}

// Display the Current TO-DO list
function show()
{
    // Call the Array of Items [TO-DO List]
    var todos = get_todos();
    
    // Creating Manual Snippets
    var html = '<ul>';

    for(var i=0; i<todos.length; i++)
    {
        //Automatically Add a [REMOVE] Button
        html += '<li>' + todos[i] + '<button class="remove" id="' + i  + '">Delete</button> </li>';
    };

    html += '</ul>';
    
    //Insert the newly added Snippets in the original document loaded from the server
    //And Replaces the content of the element with the ID [todos]
    //And Display the list regardless to what was their earlier
    document.getElementById('todos').innerHTML = html;
 
    //
    var buttons = document.getElementsByClassName('remove');

    for (var i=0; i < buttons.length; i++)
    {
        buttons[i].addEventListener('click', remove);
    };
}
 
document.getElementById('add').addEventListener('click', add);
show();