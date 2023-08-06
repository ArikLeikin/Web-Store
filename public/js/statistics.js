// $.get("https://data.gov.il/api/3/action/datastore_search?resource_id=64edd0ee-3d5d-43ce-8562-c336c24dbc1f&limit=20", (data, status) => {
//   console.log(data);
// });


const apiUrl = "https://data.gov.il/api/3/action/datastore_search?resource_id=64edd0ee-3d5d-43ce-8562-c336c24dbc1f&limit=20";

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector("#data-table tbody");

    data.result.records.forEach(record => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${record._id}</td>
        <td>${record.נפה}</td>
        <td>${record.גיל_0_5}</td>
        <td>${record.גיל_6_18}</td>
        <td>${record.גיל_19_45}</td>
        <td>${record.גיל_46_55}</td>
        <td>${record.גיל_56_64}</td>
        <td>${record.גיל_65_פלוס}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error("Error fetching data:", error));
