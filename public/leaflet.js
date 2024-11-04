function mapActive() {

    navigator.geolocation.getCurrentPosition((pos) => {
        let { latitude, longitude } = pos.coords;

        // Initialize the map first
        var map = L.map('map').setView([latitude, longitude], 13);
        // var marker;
        // Add the tile layer (ensure it's added before fetching markers)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

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

                // Fetch the markers from the server
                fetch('/dashboard/getmarkers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(response => response.json())
                    .then(data => {
                        console.log("Markers data:", data);

                        // Loop through the markers data and add them to the map
                        let i=0;
                        data.data.forEach(ele => {
                            console.log("ELEMENT-",i++);
                            let [lat, lng] = ele.location.coordinates;
                            let content = ele.category;
                            let id= ele._id;
                            console.log("HEREEEEEEE*******");
                            // Add marker and bind popup
                            L.marker([lng, lat]).addTo(map).bindPopup(`<p>${content}</p>
                                <a href='/help/gethelpinfo/${id}'>show more</a>`);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching markers:', error);
                    });
            })
            .catch(error => {
                console.error('Error saving location:', error);
            });
    });

}
mapActive();