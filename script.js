document.getElementById('getTimeBtn').addEventListener('click', function() {
    const country = document.getElementById('country').value;
    const apiKey = 'PE5EZ2J8U4H0';
    const apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${country}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                const time = data.formatted;
                document.getElementById('result').innerHTML = `Current time in ${country}: ${time}`;
            } else {
                document.getElementById('result').innerHTML = 'Invalid country or timezone!';
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = 'Error fetching time data!';
        });
});
