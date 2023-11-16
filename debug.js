const debug1 = document.getElementById("debug1");

debug1.onclick = async function returnToken(){
    BearerToken_got_from_function = "Bearer "+localStorage.BearerToken;
    alert(BearerToken_got_from_function)
}

// const debug2 = document.getElementById("debug2");

// debug2.onclick = async function(){
    
//     let grid_page = document.getElementById("page_grid");
//     var b = document.getElementById('login_form');
//     var c = document.getElementById('auth');

//     var e = document.getElementById('User_Logout');

//     e.style.display = "block";
//     b.style.display = "none";
//     c.style.display = "block";

//     grid_page.style.gridTemplateAreas = `
//     "header header header header" 
//     "nav auth auth auth"
//     "sidebar main main main"
//     "sidebar output output output"
//     "footer footer footer footer"`;
// }



let light_theme = false

const debug3 = document.getElementById("debug3");

debug3.onclick = async function(){
        

        dark_theme = `rgba(36, 36, 36, 0.842)`
        dark_theme_border = `rgba(129, 129, 129, 0.952)`
        //выносим все темы в переменные: ...но я незнаю, как это делать
        alt_theme = `rgba(252, 252, 252, 0.2)`
        alt_theme_border = `rgba(255, 255, 255, 0.3)`

        null_grad_main = `rgb(245, 255, 100)`
        first_grad_main = `rgb(201, 240, 128)`
        second_grad_main = `rgb(100, 198, 255)`

        null_grad_alt = `rgb(201, 240, 128)`
        first_grad_alt = `rgb(100, 198, 255)`
        second_grad_alt = `rgb(245, 255, 100)`
        let video = document.querySelector('video');
    
        if (light_theme == true){
            
            video.src = "Comp_8.mp4";
            document.documentElement.style.setProperty('--main--glass_rgb', `${dark_theme}`);
            document.documentElement.style.setProperty('--main--glass_border_rgb', `${dark_theme_border}`);


            document.documentElement.style.setProperty('--grad_null_rgb', `${null_grad_alt}`);
            document.documentElement.style.setProperty('--grad_first_rgb', `${first_grad_alt}`);
            document.documentElement.style.setProperty('--grad_first_rgb', `${second_grad_alt}`);

            light_theme = false;
            return
        } 
        document.documentElement.style.setProperty('--main--glass_rgb', `${alt_theme}`);
        document.documentElement.style.setProperty('--main--glass_border_rgb', `${alt_theme_border}`);
        
        document.documentElement.style.setProperty('--grad_null_rgb', `${null_grad_main}`);
        document.documentElement.style.setProperty('--grad_first_rgb', `${first_grad_main}`);
        document.documentElement.style.setProperty('--grad_first_rgb', `${second_grad_main}`);
        
        video.src = "bg_loop.mp4";
        light_theme = true;      
        return
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