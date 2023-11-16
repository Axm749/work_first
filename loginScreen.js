let Login_state = false;

const pls_token = document.getElementById("Get_token");

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
        if (xhr.status == 200)
        {
            alert("its alright", localStorage.BearerToken)
            let grid_page = document.getElementById("page_grid");
                let login_form = document.getElementById('login_form');

                grid_page.style.display = "grid";
                login_form.style.display = "none"

                grid_page.style.gridTemplateAreas = `
                    "header header header header" 
                    "sidebar main main main"
                    "sidebar output output output"
                    "sidebar auth auth auth"
                    "footer footer footer footer"`;

                Login_state = true;
            get_table()

        }
    }
    xhr.send(formData);
    // uncomment to make it work only on success!
    
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
        localStorage.removeItem("Bearer_token")

    } else {
        console.log("User decided to not log off.")
    }

}

const to_main = document.getElementById("get_to_auth");
to_main.onclick =  function(){

    // alert("local storage is not empty now and has token:", localStorage.BearerToken)
    let grid_page = document.getElementById("page_grid");
    var b = document.getElementById('login_form');

    grid_page.style.display = "grid";
    b.style.display = "none"




    grid_page.style.gridTemplateAreas = `
        "header header header header" 
        "sidebar main main main"
        
        
        "sidebar output output output"
        "sidebar auth auth auth"
        "footer footer footer footer"`;

    Login_state = true;

}
// get_to_auth