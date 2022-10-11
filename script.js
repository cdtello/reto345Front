var selectedRow = null



//*******    CRUD  CATEGORY     *******/ 

function onCategorySubmit(e) {
	event.preventDefault();
        const formData = readFormCategoryData();
        createCategory(formData);
        resetFormCategory();    
}

//Retrieve the data
function readFormCategoryData() {
    var formData = {};
    formData["name"] = document.getElementById("categoryName").value;
    formData["description"] = document.getElementById("categoryDescription").value;
    return formData;
}

function createCategory(data) {
    $.ajax({
        url : `http://129.158.60.253:8080/api/Category/save`,
        data : data,
        type : "POST", //POST, PUT, DELETE
        dataType : 'json',
        success: function() {
            console.log('insertOK');
        },
        error: function(error) {
            console.log('errorInsert -->', error);
        },
        complete : function(xhr, status) {
            //location.reload();
            loadData();
        }
    })
}


//Load data
function loadData(){
    const table = document.getElementById("categoryList").getElementsByTagName('tbody')[0];
    fetch('http://129.158.60.253:8080/api/Category/all', {
        method: 'GET', // or 'PUT'
        // body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

    // $.ajax({
    //     url : `http://129.158.60.253:8080/api/Category/all`,
    //     data : null,
    //     type : "GET", //POST, PUT, DELETE, GET
    //     dataType : 'json',
    //     success: function(data) {
    //         data.items.map(item => {
    //             const newRow = table.insertRow();
    //             cell1 = newRow.insertCell(0);
    //                 cell1.innerHTML = item.id;
    //             cell2 = newRow.insertCell(1);
    //                 cell2.innerHTML = item.name;
    //             cell3 = newRow.insertCell(2);
    //                 cell3.innerHTML = item.description;
    //             cell4 = newRow.insertCell(4);
    //                 cell4.innerHTML = `<button onClick="onSelect(this)">Select</button> <button onClick="onDelete(this,${item.id})">Delete</button>`;
    //         })
    //     },
    //     error: function(error) {
    //         alert('Error');
    //         console.log('errorLoad -->', error);
    //     },
    //     complete : function(xhr, status) {
    //         console.log('load OK');
    //     }
    // })
    
}
loadData();
//Insert the data


//Edit the data
function onSelect(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("product").value = selectedRow.cells[1].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
    document.getElementById("perPrice").value = selectedRow.cells[3].innerHTML;
}
function updateRecord() {
     fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(data => data.json())
    .then(response => renderPokemonData(response))
    .catch(err => renderNotFound())


    const formData = readFormData();
    console.log('formData ->', formData)
    const data = {nombre: formData.nombre, apellido: formData.apellido, edad: formData.edad}
    $.ajax({
        url : `https://g21b567102d46a9-f8e2c8h6ah6jkxtz.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/estudiantes/estudiantes/${formData.id}`,
        data : data,
        type : "PUT", //POST, PUT, DELETE
        dataType : 'json',
        success: function() {
            
            console.log('insertOK');
        },
        error: function(error) {
            console.log('errorInsert -->', error);
        },
        complete : function(xhr, status) {
            //location.reload();
            loadData();
        }
    })
}

//Delete the data
function onDelete(td, id) {
    $.ajax({
        url : `https://g21b567102d46a9-f8e2c8h6ah6jkxtz.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/estudiantes/estudiantes/${id}`,
        data : null,
        type : "DELETE", //POST, PUT, DELETE,
        dataType : 'json',
        success: function(data) {
            console.log('Eliminado -->', data);
        },
        error: function(error) {
            alert('Error');
            console.log('errorDelete -->', error);
        },
        complete : function(xhr, status) {
            alert('Petición realizada');
        }
    })
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetFormCategory();
    }
}

//Reset the data
function resetFormCategory() {
    document.getElementById("categoryId").value = '';
    document.getElementById("categoryName").value = '';
    document.getElementById("categoryDescription").value = '';
    selectedRow = null;
}
