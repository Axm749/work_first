

// const log_tab = document.getElementById("debug5")

// log_tab.onclick = function (){
//     alert('found id: ')
//     alert(getId())
        
// }


function getId(){

    UsersInTable = JSON.parse(localStorage.getItem("UsersTable"));
    

    // console.log(UsersInTable)


    
    console.log(UsersInTable)
    // searching = document.getElementById(`search_input1`).value
    let searching = window.prompt("Input name of a user to edit  (type full name carefully, saving registers):");
    
    var as = document.getElementById('output_table');

    for(var i=0;i<as.rows.length;i++) {
        // console.log('i=',i)
        var trs = as.getElementsByTagName("tr")[i];
        var cellVal=trs.cells[1]
        if (cellVal.innerHTML.includes(searching)){
            console.log(cellVal.innerHTML + ' содержит ' + searching)
            console.log('found Id, iteration:'+(i-2))
            
            console.log(UsersInTable[i-2].id)
            return UsersInTable[i-2].id
            
        }
    }
}



// function get_for_edit(param){

//     UsersInTable = JSON.parse(localStorage.getItem("UsersTable"));
    

//     // console.log(UsersInTable)


    
//     console.log(UsersInTable)
//     // searching = document.getElementById(`search_input1`).value
//     let searching = window.prompt("Input name of a user to edit  (type full name carefully, saving registers):");
    
//     var as = document.getElementById('output_table');

//     for(var i=0;i<as.rows.length;i++) {
//         // console.log('i=',i)
//         var trs = as.getElementsByTagName("tr")[i];
//         var cellVal=UsersInTable[param]
//         console.log(cellVal)
//         if (cellVal.innerHTML.includes(searching)){
//             console.log(cellVal.innerHTML + ' содержит ' + searching)
//             console.log('found Id, iteration:'+(i-2))
            

//             switch(param){
//                 case 0: 
//                     console.log(UsersInTable[i-2].id)
//                     return UsersInTable[i-2].id;
//                     break
//                 case 1: 
//                     console.log(UsersInTable[i-2].name)
//                     return UsersInTable[i-2].name;
//                     break
//                 case 2: 
//                     console.log(UsersInTable[i-2].password)
//                     return UsersInTable[i-2].password;
//                     break
//                 case 3: 
//                     console.log("ищем имя")
//                     console.log(UsersInTable[i-2].name)
//                     return UsersInTable[i-2].name;
//                     break

//             }


            
            
//         }
//     }
// }