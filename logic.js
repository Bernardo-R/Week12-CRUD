// Step 1: In your console, type: npm install -g json-server

//   Step 2: In your console, type: json-server --watch db.json
//           Your console should look something like this:

//          Resources
//           http://localhost:3000/carInventory

const URL = "http://localhost:3000/carInventory";
let btnEl = document.querySelector(".btn");
let btnUpdate = document.querySelector("#update");

$.get(URL).then((data) => {
  //gettig/requesting data and displaying it as a table
  for (let i = 0; i < data.length; i++) {
    // for each data, a row will be created
    $(".tbody").append(
      `<tr><td>${data[i].id}</td><td>${data[i].Model}</td><td>${data[i].Manufactor}</td><td>${data[i].Type}</td>
      <td><button class="btn btn-outline-danger" id="${data[i].id}" onclick="deleteUser(id)">Delete</button></td></tr>`
    );
  }
});

btnEl.addEventListener("click", () => {
  //this btn will post/send information gather from add vehile form
  $.post(URL, {
    //method .post to send data to database
    Model: $("#Model").val(),
    Type: $("#Type").val(),
    Manufactor: $("#Maker").val(),
  });
});

function deleteUser(id) {
  // this function will take id as argument; deleting data thats attached to it in database
  $.ajax(`${URL}/${id}`, {
    type: "DELETE",
  });
}

btnUpdate.addEventListener("click", function updateUser() {
  //this button on click will update selected vehicle id in database
  let id = $("#vehicleId").val(); //stores info from user and hold it in id variable

  $.ajax(`${URL}/${id}`, {
    //method for retrieving data from database that corresponds to the currently inserted ID
    method: "PUT", //PUT; will update/replace data
    data: {
      Model: $("#updateModel").val(),
      Type: $("#updateType").val(),
      Manufactor: $("#updateMaker").val(),
    },
  });
});
