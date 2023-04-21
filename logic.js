const URL = "https://643d8ccb6c30feced81531da.mockapi.io/cars";

let btnEl = document.querySelector(".btn");
let btnUpdate = document.querySelector("#update");

fetch(URL) //Dispay API Data to the console
  .then((response) => response.json())
  .then((data) => {
    tableData = data;
    displayVehicleData(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
function displayVehicleData(data) {
  $(".tbody").empty();
  for (let i = 0; i < data.length; i++) {
    let existingRow = $(`.tbody tr[id='${data[i].id}']`);
    if (existingRow.length) {
      existingRow.find(".model").text(data[i].Model);
      existingRow.find(".manufactor").text(data[i].Manufactor);
      existingRow.find(".type").text(data[i].Type);
    } else {
      $(".tbody").append(
        `<tr id="${data[i].id}"><td>${data[i].id}</td><td class="model">${data[i].Model}</td><td class="manufactor">${data[i].Manufactor}</td><td class="type">${data[i].Type}</td>
          <td><button class="btn btn-outline-danger" id="${data[i].id}" onclick="deleteVehicle(id)">Delete</button></td></tr>`
      );
    }
  }
}

let tableData = [];
btnEl.addEventListener("click", () => {
  //Adding new Vehicle
  console.log("Pls Work");
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Model: $("#Model").val(),
      Type: $("#Type").val(),
      Manufactor: $("#Maker").val(),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      tableData.push(data);
      displayVehicleData(tableData);
      $("#addVehicle").trigger("reset");
    })
    .catch((error) => console.error(error));
});

btnUpdate.addEventListener("click", function updateVehicle() {
  //Updating selected Vehicle
  let id = $("#vehicleId").val();

  // check if the id exists in the tableData array
  let vehicleToUpdate = tableData.find((vehicle) => vehicle.id === id);
  if (!vehicleToUpdate) {
    alert(`No vehicle found with id ${id}`);
    $("#UpdateVehicle").trigger("reset");
    return;
  }

  fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Model: $("#updateModel").val(),
      Type: $("#updateType").val(),
      Manufactor: $("#updateMaker").val(),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      tableData = tableData.map((vehicle) => {
        if (vehicle.id === id) {
          return data;
        } else {
          return vehicle;
        }
      });
      displayVehicleData(tableData);
      $("#UpdateVehicle").trigger("reset");
    })
    .catch((error) => console.error(error));
});

function deleteVehicle(id) {
  // Find the index of the vehicle to delete in the tableData array
  let index = tableData.findIndex((vehicle) => vehicle.id === id);

  // Send the delete request
  fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Remove the deleted vehicle from the tableData array
      tableData.splice(index, 1);

      // Update the table with the new data
      displayVehicleData(tableData);
      console.log(data);
    })
    .catch((error) => console.error(error));
}
