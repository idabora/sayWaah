function mapActive() {

    navigator.geolocation.getCurrentPosition((pos) => {
        let { latitude, longitude } = pos.coords;
        // Send lat and lng to the server via a POST request
        fetch('/dashboard/updateLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ latitude, longitude })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Location saved:', data);
                let map = L.map('map').setView([latitude, longitude], 13);

                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);


                // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                //     attribution: '© OpenStreetMap © CartoDB',
                //     maxZoom: 19
                // }).addTo(map);

                map.on('click', (event) => {
                    const { lat, lng } = event.latlng;

                    L.marker([lat, lng])
                        .addTo(map)
                        .bindPopup()
                        .setPopupContent("<p>hellooooo</p>")
                        .openPopup();

                })

            })
            .catch(error => {
                console.error('Error saving location:', error);
            });


    })

}
mapActive();