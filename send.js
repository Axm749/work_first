const requestAuthURL = "http://0.0.0.0:4040/api/v1/auth/token";
const refreshToken = "http://0.0.0.0:4040/api/v1/auth/token/revoke";
const GetURL = "http://0.0.0.0:4040/api/v1/users";
const UsersURL = GetURL;
const Log_OffURL ="http://0.0.0.0:4040/api/v1/auth/user/logoff";

const pls_token = document.getElementById("Get_token");
const get_call = document.getElementById("GetCall");
const outputArea = document.getElementById("get_output")


let Login_state = false;


pls_token.onclick =  function get_token_first(){

    let formData = new FormData(document.forms.loginIn);

    let xhr = new XMLHttpRequest();

    xhr.open("POST",requestAuthURL);
    
    xhr.onload = function(){
        console.log(xhr.response);

            let Token = JSON.parse(xhr.response)
        console.log(Token);

            let BearerToken = Token.access_token;
        console.log('Token is',Token.access_token);

            localStorage.setItem('BearerToken', BearerToken);
            alert(localStorage.BearerToken);
        console.log(xhr.status);
    }
    xhr.send(formData);

    if (localStorage.BearerToken != null){
        alert("local storage is not empty now and has token:", localStorage.BearerToken)
    }

    // uncomment to make it work only on success!
    // if (xhr.status == 200)
    {
        // alert("local storage is not empty now and has token:", localStorage.BearerToken)
        let grid_page = document.getElementById("page_grid");
        var b = document.getElementById('login_form');

        grid_page.style.display = "grid";
        b.style.display = "none"




        grid_page.style.gridTemplateAreas = `
            "header header header header" 
            "nav auth auth auth"
            "sidebar main main main"
            "sidebar output output output"
            "footer footer footer footer"`;

        Login_state = true;

    }
}

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
        localStorage.setItem("UsersInTable_info", xhr.response)
        // выводим таблицу с помощью функции
        get_out(output);

        
    }
    xhr.send()

}


const LogOff = document.getElementById("User_Logout");

LogOff.onclick = function(){

    check = confirm("do you want to log off?");

    console.log(check);

    if (check == true){

        let formData = new FormData(document.forms.loginIn);

        user = formData.get("username");
    
        let xhr = new XMLHttpRequest();
    
        let request = Log_OffURL +"?user_login="+user;
    
        console.log(request);
    
        xhr.open("POST",request);
        xhr.setRequestHeader("Authorization", localStorage.getItem("Bearer_token"));
    
        xhr.onload = function(){
            console.log(xhr.response);
            console.log(xhr.status);
        }
    
        xhr.send();

        console.log("Logged off.")

        let grid_page = document.getElementById("page_grid");
        var b = document.getElementById('login_form');

        grid_page.style.display = "none";
        b.style.display = "block"

        
        // var c = document.getElementById('auth');
        // var e = document.getElementById('User_Logout');

        // e.style.display = "none";
        // b.style.display = "block";
        // c.style.display = "none";

        // grid_page.style.gridTemplateAreas = `
        //     "header header header header" 
        //     "nav login_form login_form login_form"
        //     "sidebar main main main"
        //     "sidebar output output output"
        //     "footer footer footer footer"`;

    } else {
        console.log("User decided to not log off.")
    }

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

        check = confirm("do you really wish to create a new user?");

        if (check === true){

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

    } else {
        alert("Не все поля заполнены")
    }


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

        insert_id = window.prompt("Input user id to edit:");
            
        let xhr = new XMLHttpRequest();

        let Send_Data = JSON.stringify(Data);

        console.log(Send_Data);

        let UserIdUrl = UsersURL + '/' + insert_id;

        xhr.open("PATCH",UserIdUrl);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.setRequestHeader("Authorization", localStorage.getItem("Bearer_token"));

        xhr.onload = function(){
            console.log(xhr.response);
            console.log(xhr.status);
        }

        xhr.send(Send_Data);

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

        insert_id = window.prompt("Input user id to delete");
            
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



const debug1 = document.getElementById("debug1");

debug1.onclick = async function returnToken(){
    BearerToken_got_from_function = "Bearer "+localStorage.BearerToken;
    alert(BearerToken_got_from_function)
}


let light_theme = true


const debug2 = document.getElementById("debug2");

debug2.onclick = async function(){
    
    let grid_page = document.getElementById("page_grid");
    var b = document.getElementById('login_form');
    var c = document.getElementById('auth');

    var e = document.getElementById('User_Logout');

    e.style.display = "block";
    b.style.display = "none";
    c.style.display = "block";

    grid_page.style.gridTemplateAreas = `
    "header header header header" 
    "nav auth auth auth"
    "sidebar main main main"
    "sidebar output output output"
    "footer footer footer footer"`;
}


const debug3 = document.getElementById("debug3");

debug3.onclick = async function(){
    
    if (light_theme == true){
        document.documentElement.style.setProperty('--glass_rgb', 'rgba(36, 36, 36, 0.842)');

        document.documentElement.style.setProperty('--glass_border_rgb', 'rgba(129, 129, 129, 0.952)');
        // document.documentElement.style.setProperty('color', '#000000');
        
        light_theme = false;
        return 0;
    } else {
        document.documentElement.style.setProperty('--glass_rgb', 'rgba(252, 252, 252, 0.2)');

        document.documentElement.style.setProperty('--glass_border_rgb', 'rgba(255, 255, 255, 0.3)');
        light_theme = true;
    }


    
        
}




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const debug4 = document.getElementById("debug4");

let count = 0
let lenght_of_input = 5;


debug4.onclick = function example_fill(){
    



    let Table_info = document.getElementById("output_table");
    for (i=0; i<20; i++){
        Table_info.insertRow().innerHTML+=`
        <td>${makeid(lenght_of_input)}</td>
        <td>${makeid(lenght_of_input)}</td>
        <td>${makeid(lenght_of_input)}</td>
        <td>${makeid(lenght_of_input)}</td>
        `;
        rowCount+=1;
    };
    count+=1;
    console.log(rowCount + ' rows in total');
}






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