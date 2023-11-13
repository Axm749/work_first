const debug1 = document.getElementById("debug1");

debug1.onclick = async function returnToken(){
    BearerToken_got_from_function = "Bearer "+localStorage.BearerToken;
    alert(BearerToken_got_from_function)
}

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
        document.documentElement.style.setProperty('--dark--glass_rgb', '--glass_rgb');

        document.documentElement.style.setProperty('--dark--glass_border_rgb', '--glass_border_rgb');
        // document.documentElement.style.setProperty('color', '#000000');
        
        light_theme = false;
        return 0;
    } else {
        document.documentElement.style.setProperty('--dark--glass_rgb', 'rgba(252, 252, 252, 0.2)');

        document.documentElement.style.setProperty('--dark--glass_border_rgb', 'rgba(255, 255, 255, 0.3)');
        light_theme = true;
    }


    
        
}

const debug4 = document.getElementById("debug4");

debug4.onclick = function example_fill(){

    let Table_info = document.getElementById("output_table");
    for (i=0; i<tab_len; i++){
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