// Example user location; in a real app, get dynamically via geolocation
const userLat = 12.97;
const userLon = 77.59;

fetch(`/api/schools/listSchools?latitude=${userLat}&longitude=${userLon}`)
  .then(res => res.json())
  .then(data => {
    const ul = document.getElementById("schoolsList");
    data.schools.forEach(school => {
      const li = document.createElement("li");
      li.textContent = `${school.name} - ${school.address} (Distance: ${school.distance.toFixed(2)} km)`;
      ul.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Error fetching schools:", err);
  });
