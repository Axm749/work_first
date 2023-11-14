if (localStorage.BearerToken != null){
    // alert("local storage is not empty now and has token:")
    // alert(localStorage.BearerToken)
    
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


}
