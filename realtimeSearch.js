
function find_and_blend(color, column){
    let output_table2 = document.getElementById("search_out");
    clear_table2()

    let searching = document.getElementById(`search_input${column}`).value;
    console.log(searching)

    if(searching == ""){
        return
    }

    var correct = 0;
    var as = document.getElementById('output_table');
    for(var i=2;i<as.rows.length;i++) {
        var trs = as.getElementsByTagName("tr")[i];
        var cellVal=trs.cells[column]
        if (cellVal.innerHTML.includes(searching)){
            console.log(cellVal.innerHTML + '=' + searching)
            console.log('we found it!')
            console.log('that was iteration:'+(i-1))

            document.getElementById('output_table').getElementsByTagName("tr")[i].style.background = `${color}`;
            correct+=1;

            {
                output_table2.insertRow().innerHTML+=`
                    <td>${trs.cells[0].innerHTML}</td>
                    <td>${trs.cells[1].innerHTML}</td>
                    <td>${trs.cells[2].innerHTML}</td>
                    <td>${trs.cells[3].innerHTML}</td>
                    `;
            }




        }
        else{
            document.getElementById('output_table').getElementsByTagName("tr")[i].style.background = 'transparent';
        }
    }

    if(correct >=1){
            console.log('total found:' + correct)
            // return correct
    }
}









input_for_search0 = document.getElementById("search_input0")
input_for_search1 = document.getElementById("search_input1")
input_for_search2 = document.getElementById("search_input2")
input_for_search3 = document.getElementById("search_input3")

input_for_search0.onkeyup = function(){
        find_and_blend('#00000023', 0)
    }
input_for_search1.onkeyup = function(){
        find_and_blend('#00000023', 1)
    }
input_for_search2.onkeyup = function(){
        find_and_blend('#00000023', 2)
    }
input_for_search3.onkeyup = function(){
        find_and_blend('#00000023', 3)
    }