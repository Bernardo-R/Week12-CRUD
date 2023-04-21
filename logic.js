const URL = "https://643d8ccb6c30feced81531da.mockapi.io/cars";

let btnEl = document.querySelector(".btn");
let btnUpdate = document.querySelector("#update");
let tableData = []; //to hold data recieve for API

getData(); //fetch

function getData() {
  //storing fetch on a function to be able to call it with less coding
  fetch(URL) //Dispay API Data to the console
    .then((response) => response.json()) //graps data and convert it to more readible data using json()
    .then((data) => {
      //a promese to use data received and stored it in tableData arr and use it in funcion displayVehicleData()
      tableData = data;
      displayVehicleData(data);
    })
    .catch((error) => {
      //in case something wrong when getting data from API
      console.error("Error fetching data:", error);
    });
}

function displayVehicleData(data) {
  //display information in a table form
  $(".tbody").empty(); //clear the table body
  for (let i = 0; i < data.length; i++) {
    //fills the table
    let existingRow = $(`.tbody tr[id='${data[i].id}']`); //storing table body rows
    if (existingRow.length) {
      //checking by id if specific row already exist
      existingRow.find(".model").text(data[i].Model); //if found then will update current cell info
      existingRow.find(".manufactor").text(data[i].Manufactor);
      existingRow.find(".type").text(data[i].Type);
    } else {
      //if row not found then a new row will be created
      $(".tbody").append(
        `<tr id="${data[i].id}"><td>${data[i].id}</td><td class="model">${data[i].Model}</td><td class="manufactor">${data[i].Manufactor}</td><td class="type">${data[i].Type}</td>
          <td><button class="btn btn-outline-danger" id="${data[i].id}" onclick="deleteVehicle(id)">Delete</button></td></tr>`
      );
    }
  }
}

btnEl.addEventListener("click", () => {
  //adding function to add button
  //Adding new Vehicle
  console.log("Pls Work"); //just checking if btn works =)
  fetch(URL, {
    // to send info to API
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //converting info in a more readible way
      Model: $("#Model").val(),
      Type: $("#Type").val(),
      Manufactor: $("#Maker").val(),
    }),
  })
    .then((response) => response.json()) // response we get is again converted to object
    .then((data) => {
      // then first i console the data received, push to arry, diplay array and refresh form
      console.log(data);
      tableData.push(data);
      displayVehicleData(tableData);
      $("#addVehicle").trigger("reset"); //reset form
    })
    .catch((error) => console.error(error)); //in case something goes wrong with the API call
});

btnUpdate.addEventListener("click", function updateVehicle() {
  //update Vehicle
  //Updating selected Vehicle
  let id = $("#vehicleId").val(); //holds data given by user to then search in tableData arr

  let vehicleToUpdate = tableData.find((vehicle) => vehicle.id === id); //holds the matching id vehicle
  if (!vehicleToUpdate) {
    //in case no vehicle found
    alert(`No vehicle found with id ${id}`); //alert user
    $("#UpdateVehicle").trigger("reset"); //empty form
    return;
  }

  fetch(`${URL}/${id}`, {
    //if matching object id is found function will send a PUT request to API
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //converting all this inputs value that will be send to API
      Model: $("#updateModel").val(),
      Type: $("#updateType").val(),
      Manufactor: $("#updateMaker").val(),
    }),
  })
    .then((response) => response.json())
    .then(() => {
      getData(); //after response, getData() is called to update tableData arr
      $("#UpdateVehicle").trigger("reset"); //empty form
    })
    .catch((error) => console.error(error)); //in case something goes wrong with the API call
});

function deleteVehicle(id) {
  //take id as parameter
  // Send the delete request
  fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json()) //after response
    .then(getData) //getData() is called to update tableData arr
    .catch((error) => console.error(error));
}
