document.addEventListener("DOMContentLoaded", () => {
  const classApi =
    "https://cliniqueplushealthcare.com.ng/prescriptions/drug_class";
  const medicineApi =
    "https://cliniqueplushealthcare.com.ng/prescriptions/get_drug_class_by_id/";
  const allMedicinesApi =
    "https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine";
  let selectedClassId = null;
  let serialNumber = 1; // Counter for S/N

  const table = document.querySelector("tbody");
  const nodrugsRow = document.getElementById("no-drugs-row");

  function updateNoDrugsMessage() {
    if (table.children.length > 1) {
      nodrugsRow.style.display = "none";
    } else {
      nodrugsRow.style.display = "table-row";
    }
  }
  updateNoDrugsMessage();

  // Fetch and populate the Medicine Class dropdown
  fetch(classApi)
    .then((response) => response.json())
    .then((data) => {
      const classDropdown = document.getElementById("medicine-class");
      data.forEach((medClass) => {
        const option = document.createElement("option");
        option.value = medClass.id;
        option.text = medClass.name;
        classDropdown.appendChild(option);
      });
    });

  // Fetch and populate the Medicine Name based on selected class
  document.getElementById("medicine-class").addEventListener("change", (e) => {
    selectedClassId = e.target.value;
    fetch(`${medicineApi}${selectedClassId}`)
      .then((response) => response.json())
      .then((data) => {
        const nameDropdown = document.getElementById("medicine-name");
        nameDropdown.innerHTML = ""; // Clear previous options
        data.forEach((med) => {
          const option = document.createElement("option");
          option.value = med.medicine_id;
          option.text = med.medicine_name;
          nameDropdown.appendChild(option);
        });
      });
  });

  // Handle Add button click
  document.querySelector(".add").addEventListener("click", () => {
    const classText =
      document.getElementById("medicine-class").selectedOptions[0].text;
    const nameText =
      document.getElementById("medicine-name").selectedOptions[0].text;
    const dose = document.getElementById("dose").selectedOptions[0].text; // Get selected dose text
    const interval =
      document.getElementById("interval").selectedOptions[0].text; // Get selected interval text
    const durationValue = document.getElementById("num-input").value; // Get number input value
    const durationUnit = document.getElementById("duration").value; // Get selected duration unit
    const instructions = "Nil"; // Set instructions to "Nil" automatically

    const table = document.querySelector("tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${serialNumber++}</td> <!-- Increment and display serial number -->
        <td>${nameText}</td>
        <td>${classText}</td>
        <td>${dose}</td> <!-- Display dose separately -->
        <td>${interval}</td> <!-- Display interval separately -->
        <td>${durationValue} ${durationUnit}</td>
        <td>${instructions}</td> <!-- Display instructions as "Nil" -->
        <td><button class="remove">Remove</button></td>
      `;

    table.appendChild(row);
    updateNoDrugsMessage();
    // Remove functionality
    row.querySelector(".remove").addEventListener("click", () => {
      table.removeChild(row);
      updateNoDrugsMessage();
    });
  });
});
