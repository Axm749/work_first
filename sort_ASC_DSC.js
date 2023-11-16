function sort_table_by_column(html_table_object){
    // get table head
    let head = html_table_object.tHead;
    // get table body (it can have multiple bodies)
    let body = html_table_object.tBodies[0];

    // get head cells (its names)
    let column_marks = head.children[0].children;
    // get body cells
    let rows = body.children;

    // mark position of a head
    let position;
    // switcher of sort order (asc,dsc)
    let trigger = true;

    // click listener
    head.addEventListener('click', isHeaderClicked)
    // click handler
    function isHeaderClicked(event){
          
        let t = event.target;
        // console.log(t);
        // выпаковал элементы html-collection в массив
        // далее получаем номер элемента соответствующего нажатому
        if(t.parentNode == column_marks[0].parentNode){
            position = [...column_marks].findIndex(el=>el==t);
            // console.log(`клик сработал на ячейке с индексом ${position}`);
            // грубо говоря, соотносим родителей нажатой строки и строки в body
            // обозначение троеточия - это распаковка объекта, iterate (пока мне сложно понять, что именно это значит, надо почитать)
            handler2(position);
        };
    };
    // здесь получаем значение trigger и на основании этого поймем, как сортировать (в процессе сменить триггер)
    function handler2(position){
        if (trigger){
            trigger = false;
            body.replaceChildren(...sort_body_asc(position));

        }
        else{
            trigger = true;
            body.replaceChildren(...sort_body_dsc(position));
            
        }
    };
    // sort asc
    function sort_body_asc(position){
        // будет&UpArrowDownArrow применяться .sort((a,b))
        // оно проверяет знак перед разницу (a-b < 0 или >0)
        //  a - трейс, его ребёнок - ячейка th, а уже его innerText - содержимое

        return [...rows].sort((a,b)=> ( (a.children[position].innerText < b.children[position].innerText) ? -1 : 1) )
    }
    // sort dsc
    function sort_body_dsc(position){

        return [...rows].sort((a,b)=> ( (a.children[position].innerText > b.children[position].innerText) ? -1 : 1) )
        
    }
    // Единственная проблема в том, что мы сравниваем не номера, а строки. То есть для него 10 < 2, так как первый символ "1" меньше, чем "2"
    // а также 9<10 по тем же причинам
    // я пока не знаю, как это нормально сделать
};


