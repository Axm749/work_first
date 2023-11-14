const requestAuthURL = "http://0.0.0.0:4040/api/v1/auth/token";
const refreshToken = "http://0.0.0.0:4040/api/v1/auth/token/revoke";
const GetURL = "http://0.0.0.0:4040/api/v1/users";
const UsersURL = GetURL;
const Log_OffURL ="http://0.0.0.0:4040/api/v1/auth/user/logoff";


const get_call = document.getElementById("GetCall");
const outputArea = document.getElementById("get_output")




get_call.onclick = function(){
    get_table()
}

async function get_table(){
   
    let xhr = new XMLHttpRequest();

    xhr.open("GET",GetURL);
    xhr.setRequestHeader("Authorization", "Bearer "+localStorage.BearerToken);
    xhr.onload = function(){
        console.log(xhr.response);
            let output = JSON.parse(xhr.response)

        console.log(output);
        console.log(xhr.status);
        localStorage.setItem("UsersTable", xhr.response)
        // выводим таблицу с помощью функции
        clear_table()
        get_out(output);

        {
            let output_table2 = document.getElementById("search_out");
            clear_table2()
        
            let searching = document.getElementById(`search_input${0}`).value;
            console.log(searching)
        
            var correct = 0;
                var as = document.getElementById('output_table');
        
        
            if(searching == ""){
                for(var i=2;i<as.rows.length;i++) {
                    var trs = as.getElementsByTagName("tr")[i];
                    {
                        output_table2.insertRow().innerHTML+=`
                            <td>${trs.cells[0].innerHTML}</td>
                            <td>${trs.cells[1].innerHTML}</td>
                            <td>${trs.cells[2].innerHTML}</td>
                            <td>${trs.cells[3].innerHTML}</td>
                            `;
                    }
                }
                console.log('no input, show all')
            }
        
        }

        
    }
    xhr.send()

}

const creating_form = document.getElementById("create_form");

creating_form.onclick = function show_form(){
    var a = document.getElementById("create_tab");
    a.style.display = "block";
    var b = document.getElementById("funks")
    b.style.display = "none";
}

const cancel_form = document.getElementById("cancel_create");

cancel_form.onclick = function unshow_form(){
    var a = document.getElementById("create_tab");
    a.style.display = "none";
    var b = document.getElementById("funks")
    b.style.display = "block";
}



const Create = document.getElementById("Create_User");

Create.onclick = function(){
    let Data = {login:document.getElementById("New_Login").value,
    password:document.getElementById("New_Password").value,
    name:document.getElementById("New_Name").value,
    role_id:document.getElementById("New_Role_Id").value}

    // нельзя использовать любое role_id, нужно использовать те роли которые уже существуют
    // xhr.setRequestHeader("Content-Type", "application/json") объявляет о том что данные которые мы отправляем будут в формате JSON
    // Если пробовать создать уже существующего пользователя, то сервер выдаст ошибку (что впринципе логично)

    console.log(Data);

    alert("hi! Create-form is made?")

    if (Data.login != "",Data.password != "",Data.name != "",Data.role_id != ""){

        // check = confirm("do you really wish to create a new user?");

        // if (check === true){

            console.log("Userd said: ",check);
                
            let xhr = new XMLHttpRequest();

            let Send_Data = JSON.stringify(Data);

            console.log(Send_Data);

            xhr.open("POST",UsersURL);

            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.setRequestHeader("Authorization", "Bearer "+localStorage.BearerToken);

            xhr.onload = function(){
                console.log(xhr.response);
                console.log(xhr.status);
            }

            xhr.send(Send_Data);

            console.log("New user created.")
            
            var a = document.getElementById("create_tab");
            a.style.display = "none";
            var b = document.getElementById("funks")
            b.style.display = "block"; 


        } else {
            console.log("Userd said: ",check);

            console.log("User decided to not create a new user.")
        }

    // } else {
    //     alert("Не все поля заполнены")
    // }


}


const Edit_User = document.getElementById("Edit_user");

Edit_User.onclick = function(){

    let Role_select = document.getElementById("New_Role_Id")
    let Role = Role_select.options[Role_select.selectedIndex].value

    let Data = {login:document.getElementById("New_Login").value,
    password:document.getElementById("New_Password").value,
    name:document.getElementById("New_Name").value,
    role_id:Role,
    status:"active",
    dark_theme:true,
    max_sessions:1
    };

    // нельзя использовать любое role_id, нужно использовать те роли которые уже существуют
    // xhr.setRequestHeader("Content-Type", "application/json") объявляет о том что данные которые мы отправляем будут в формате JSON
    // Если пробовать создать уже существующего пользователя, то сервер выдаст ошибку (что впринципе логично)

    console.log(Data);

    if (Data.login != "",Data.password != "",Data.name != ""){

        insert_id = getId()
            
        let xhr = new XMLHttpRequest();

        let Send_Data = JSON.stringify(Data);

        console.log(Send_Data);

        let UserIdUrl = UsersURL + '/' + insert_id;

        xhr.open("PATCH",UserIdUrl);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.setRequestHeader("Authorization", "Bearer "+localStorage.BearerToken);

        xhr.onload = function(){
            console.log(xhr.response);
            console.log(xhr.status);
        }

        xhr.send(Send_Data);

        alert('done')
        var a = document.getElementById("create_tab");
        a.style.display = "none";
        var b = document.getElementById("funks")
        b.style.display = "block"; 
        // get_table()

    } else {
        alert("Не все поля заполнены")
    }


}


const DELETE_User = document.getElementById("DELETE_user");

DELETE_User.onclick = function(){

    check = confirm("do you wish to remove the user?");

    // check = false;
    console.log(check)

    if (check == true){

        insert_id = getId();
            
        let xhr = new XMLHttpRequest();

        let UserIdUrl = UsersURL + '/' +insert_id;

        xhr.open("DELETE",UserIdUrl);

        xhr.setRequestHeader("Authorization", "Bearer "+localStorage.BearerToken);

        xhr.onload = function(){
            console.log(xhr.response);
            console.log(xhr.status);
        }

        xhr.send();

        console.log("User removed user with id-",insert_id);

        clear_table();
        get_table();



    } else {
        console.log("User refused to remove other users.");
    }


}








// smth for output
let rowCount = 0;


async function get_out(output){
    let Table_info = document.getElementById("output_table");
    rowCount = 0
    output.forEach(table =>{
        // Table_info.deleteRow().innerHTML;
        // idk if this works
        rowCount+=1;

        Table_info.insertRow().innerHTML+=`
        <td>${table.login}</td>
        <td>${table.name}</td>
        <td>${table.role_id}</td>
        <td>${table.status}</td>`
    })
    console.log(rowCount);
    
        
}

const Clear_Table = document.getElementById("clear_table");

Clear_Table.onclick = function (){
    clear_table()
}


function clear_table(){
    let Table_info = document.getElementById("output_table");
    Table_info.innerHTML = `
    <thead>
        <tr>
            <th>login &UpArrowDownArrow;</th>
            <th>name &UpArrowDownArrow;</th>
            <th>role id &UpArrowDownArrow;</th>
            <th>status &UpArrowDownArrow;</th>

        </tr> 
    </thead>
    <tbody>
        <tr style="display: none;">
            <th>login</th>
            <th>name</th>
            <th>role id</th>
            <th>status</th>

            </tr>
    </tbody> 
    `;
    rowCount = 0;
    sort_table_by_column(Table_info);
}
function clear_table2(){
    let Table_info2 = document.getElementById("search_out");
    Table_info2.innerHTML = `
    <thead>
        <tr>
            <th>login &UpArrowDownArrow;</th>
            <th>name &UpArrowDownArrow;</th>
            <th>role id &UpArrowDownArrow;</th>
            <th>status &UpArrowDownArrow;</th>

        </tr> 
    </thead>
    <tbody>
        <tr style="display: none;">
            <th>login</th>
            <th>name</th>
            <th>role id</th>
            <th>status</th>

            </tr>
    </tbody> 
    `;
    sort_table_by_column(Table_info2);
}

let light_theme = true




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



let count = 0
let lenght_of_input = 2;
let tab_len = 50;












// output_table




function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}



