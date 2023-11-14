

const log_tab = document.getElementById("debug5")

log_tab.onclick = function (){
    alert('found id: ')
    alert(getId())
        
}

function getId(){

    UsersInTable = JSON.parse(localStorage.getItem("UsersTable"));
    

    // console.log(UsersInTable)


    let searching = UsersInTable;
    console.log(UsersInTable)
    // searching = document.getElementById(`search_input1`).value
    searching = window.prompt("Input name of a user to edit  (type full name carefully, saving registers):");
    

    var correct = 0;
    var as = document.getElementById('output_table');

    for(var i=0;i<as.rows.length;i++) {
        console.log('i=',i)
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