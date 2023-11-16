function get_test(){
   
    let xhr = new XMLHttpRequest();

    xhr.open("GET",GetURL);
    xhr.setRequestHeader("Authorization", "Bearer "+localStorage.BearerToken);
    xhr.onload = function(){
        // console.log(xhr.response);
            // let output = JSON.parse(xhr.response)

        // console.log(output);
        // console.log(xhr.status);
        localStorage.setItem("UsersTable", xhr.response)
        // выводим таблицу с помощью функции
        if(xhr.status == '200'){
            console.log('its all right')
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
            return
        }
        
    }
    xhr.send()

}

get_test()