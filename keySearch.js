
// // const search = document.getElementById("search_btn");

// search.onclick = function(){
//     let searching = document.getElementById("search_input").value;

//     let Data = JSON.parse(localStorage.getItem("UsersInTable_info"))

//     clear_table()

//     let Table_info = document.getElementById("output_table");
//     rowCount = 0
//     Data.forEach(table =>{
//         if(searching == table.name){
//             rowCount+=1;

//             Table_info.insertRow().innerHTML+=`
//             <td>${table.login}</td>
//             <td>${table.name}</td>
//             <td>${table.role_id}</td>
//             <td>${table.status}</td>`
//         }
        
//     })
//     console.log(rowCount);
// }



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
            "sidebar main main main"
            "sidebar auth auth auth"
            
            "sidebar output output output"
            "footer footer footer footer"`;

        Login_state = true;

    }
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

        Login_state = false;

    } else {
        console.log("User decided to not log off.")
    }

}