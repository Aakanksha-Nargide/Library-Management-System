var count = 0;
var students = []; 
var global_id;
function addStudent(){
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const booknameValue = document.getElementById('bookname').value;
    const booktypeValue = document.getElementById('booktype').value;
    const branchValue = document.getElementById('branch').value;

    if(document.querySelector("#submit").innerText == "Edit Entry"){
        console.log("this will edit and not add");
        console.log(global_id);
        let index;

        for (let i = 0; i < students.length; i++) {
            if (students[i]['ID'] == global_id) {
                index=i;
                break;
            }
        }

        let studentobj = students[index];

        studentobj['name'] = nameValue;
        studentobj['email'] = emailValue;
        studentobj['bookname'] = booknameValue;
        studentobj['booktype'] = booktypeValue;
        studentobj['branch'] = branchValue;

        students[index] = studentobj;

        showTable();
        document.querySelector("#submit").innerHTML = "Add Entry";

        document.getElementById('name').value="";
        document.getElementById('email').value="";
        document.getElementById('bookname').value="";
        document.getElementById('booktype').value="";
        document.getElementById('branch').value="";
        
        return;
    }
    if(nameValue=='' || emailValue=='' || booknameValue=='' || booktypeValue =='' || branchValue==""){
        alert("All fields are required!")
        return;
    }
    count++;

    students.push({
        ID:count,
        name:nameValue,
        email:emailValue,
        bookname:booknameValue,
        booktype:booktypeValue,
        branch:branchValue
    });

    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('bookname').value="";
    document.getElementById('booktype').value="";
    document.getElementById('branch').value="";
    console.log(students);
    showTable();
}

function showTable(){
    const table = document.getElementById('tbody');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    table.value="";
    students.forEach((student)=>{
        const row = document.createElement("tr");
        var keys=Object.keys(student);

        var id = document.createElement('td');
        const name = document.createElement('td');
        const email = document.createElement('td');
        const booktype = document.createElement('td');
        const bookname = document.createElement('td');
        const branch = document.createElement('td');

        keys.forEach((key)=>{
            if(key=='ID'){
                id.innerHTML = student[key];
            }
            else if(key=='name'){
                name.innerHTML = student[key];
            }
            else if(key=='email'){
                email.innerHTML = student[key];
            }
            else if(key=='booktype'){
                booktype.innerHTML = student[key];
            }
            else if(key=='bookname'){  
                bookname.innerHTML = student[key];
            }
            else
            branch.innerHTML = `<div class='branch'><div>${student[key]}</div> <div class="icons"><a onClick="edit(${student['ID']})" class='fa'>&#xf044;</a> <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> </div></div> `;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(booktype);
            row.appendChild(bookname);
            row.appendChild(branch);       
        })

        table.appendChild(row);
    })
}

function search(){
    var input, filter, table, tr, td, i, txtValue, txtValue1, txtValue2;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbody");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[2];
        td2 = tr[i].getElementsByTagName("td")[5];
        if (td || td1 || td2) {
            txtValue = td.textContent || td.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function edit(id) {
    let student;
    console.log(id);
    for (let i = 0; i < students.length; i++) {
        if (students[i]['ID'] == id) {
            student = students[i];
            break;
        }
    }

    document.querySelector("#name").value = student['name'];
    document.querySelector("#email").value = student['email'];
    document.querySelector("#bookname").value = student['bookname'];
    document.querySelector("#booktype").value = student['booktype'];
    document.querySelector("#branch").value = student['branch'];

    document.getElementById("submit").innerText = "Edit Entry";

    global_id=id;
}

function del(id){
    students.forEach((student, index) => {
        if(student['ID'] == id){
            students.splice(index, 1);
            showTable();
        }
    })
}