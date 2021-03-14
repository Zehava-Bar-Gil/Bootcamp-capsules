const table = document.querySelector('#table');
const categories = document.querySelector('#categories');

const baseUserApi = `https://appleseed-wa.herokuapp.com/api/users`;
let usersData=[];
let userInfo=[];
let arrLength;
createTable();


const getInfoApi = async (id) => {
    let callApi = await fetch(`${baseUserApi}/${id}`);
    let data = await callApi.json();
    // for (let i = 0; i < data.length; i++)
    return data;
}

async function getUserApi(){
const response = await fetch(baseUserApi);
let usersResults = await response.json();
usersData = await Promise.all(
        usersResults.map(async (u) => {
            let information = await getInfoApi(u.id);
            return {id:u.id, firstName: u.firstName, lastName: u.lastName, capsule: u.capsule,
            city:information.city, age: information.age, gender: information.gender, hobby: information.hobby}

        })
        
         )

        }
        
        // createDropDown()

    async function createTable() {
       await getUserApi();
       table.innerHTML += 
        `<thead>
            <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>capsule</th>
            <th>Age</th>
            <th>City</th>
            <th>Gender</th>
            <th>Hobby</th>
        </tr>
      <thead>`
       usersData.forEach((u) => {
            table.innerHTML += `<tr id=${u.id}>
                <td>${u.id}</td>
                    <td>${u.firstName}</td>
                    <td>${u.lastName}</td>
                    <td>${u.capsule}</td>
                    <td>${u.age}</td>
                    <td>${u.city}</td>
                    <td>${u.gender}</td>
                    <td>${u.hobby}</td>
                    <td><i id = "edit" class="far fa-edit" row=${u.id}></i></td>
                    <td><i id = "trash" class="far fa-trash-alt" row=${u.id}></i></td>
                     <span class="confirm"><i class="far fa-check-square" row=${u.id}></i></span>
                     <span class="remove"><i class="fas fa-times" row=${u.id}></i></span>
                    </tr>`
        })
        document.body.appendChild(table)
    }

    table.addEventListener ('click', modeEventHandler);

   
       function trash(rowNum){
       let row = document.getElementById(rowNum);
       row.parentNode.removeChild(row);
       console.log(row);
        }

        
        function modeEventHandler(e){
            let rowNum = e.target.getAttribute('row')
           
        if (e.target.getAttribute('id') === 'trash'){
         trash(rowNum)
        }    
        else if (e.target.getAttribute('id') === 'edit'){
            edit(rowNum)
        }
        if (e.target.getAttribute('id') === 'confirm'){
        confirm(rowNum)
        }
       else if (e.target.getAttribute('id') === 'remove'){
        remove(rowNum)
        }

        console.log(e.target.getAttribute('id'));
        console.log(rowNum)
        }
    // }


   
    // createDropDown() 

