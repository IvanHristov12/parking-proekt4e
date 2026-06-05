async function loadDashboard() {

    // Statistics
    const statsResponse = await fetch("/stats");
    const stats = await statsResponse.json();

    document.getElementById("stats").innerHTML = `
        <h2>Statistics</h2>
        <p>Total: ${stats.total}</p>
        <p>Occupied: ${stats.occupied}</p>
        <p>Free: ${stats.free}</p>
    `;

    // Spots
    const spotsResponse = await fetch("/spots");
    const spots = await spotsResponse.json();

    const spotsContainer = document.getElementById("spots");

    spotsContainer.innerHTML = "";

    spots.forEach((spot) => {

        const div = document.createElement("div");

        div.classList.add("spot");

        if (spot.is_occupied) {

            div.classList.add("occupied");

            div.innerHTML = `
                <strong>Spot ${spot.spot_number}</strong>
                <br>
                <small>${spot.car_num}</small>
            `;

        } else {

            div.classList.add("free");

            div.innerHTML = `
                <strong>Spot ${spot.spot_number}</strong>
                <br>
                <small>FREE</small>
            `;

        }

        spotsContainer.appendChild(div);
    });
}

async function parkCar() {

    const carNumInput = document.getElementById("carNum");
    const carNum = carNumInput.value;

    if (!carNum) {
        alert("Enter license plate");
        return;
    }

    const response = await fetch("/cars/enter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            car_num: carNum
        })
    });

    const data = await response.json();

    alert(data.message);

    carNumInput.value = "";

    loadDashboard();
}

async function exitCar() {

    const carNumInput = document.getElementById("carNum");
    const carNum = carNumInput.value;

    if (!carNum) {
        alert("Enter license plate");
        return;
    }

    const response = await fetch("/cars/exit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            car_num: carNum
        })
    });

    const data = await response.json();

    alert(data.message);

    carNumInput.value = "";

    loadDashboard();
}

loadDashboard();