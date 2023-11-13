
const search = document.getElementById("search_btn");

search.onclick = function(){
    let searching = document.getElementById("search_input").value;

    let Data = JSON.parse(localStorage.getItem("UsersInTable_info"))

    clear_table()

    let Table_info = document.getElementById("search_out");
    rowCount = 0
    Data.forEach(table =>{
        if(searching == table.name){
            rowCount+=1;

            Table_info.insertRow().innerHTML+=`
            <td>${table.login}</td>
            <td>${table.name}</td>
            <td>${table.role_id}</td>
            <td>${table.status}</td>`
        }
        
    })
    console.log(rowCount);
}








