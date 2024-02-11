// script.js
const socket = io();
// const socket = io("http://172.168.3.58:5001");
socket.on('connect',function(){
    console.log(`connected with socket ID : ${socket.id}`);
});

// socket.on('server_message', function (data) {
//     console.log('Received data from Flask:', data.data);
//     document.querySelector("#altitude1").innerHTML = "" + data.data;
// });


//socket for altitude
// socket.on('parameters', function(data) {
//     console.log('Received altitude update:', data.data);
//     document.querySelector("#altitude1_dis").innerHTML="Altitude : "+data.data+" m";
// });
$(document).ready(function() {
    var altimeter1 = $.flightIndicator('#altimeter1', 'altimeter');
    altimeter1.setAltitude(0);
    socket.on('parameters', function(data) {
        console.log('Received altitude update:', data.data);
        const altitudeInFeet = data.data * 3.28084;
        altimeter1.setAltitude(altitudeInFeet);
        document.querySelector("#altitude1_dis").innerHTML="Altitude : "+data.data+" m";
    });
    
})




// socket for yaw
// socket.on('yaw_data',function(data){
//     document.querySelector("#yaw_display").innerHTML=" YAW : "+data.data;
// })

$(document).ready(function() {
    var heading1 = $.flightIndicator('#heading1', 'heading');
    heading1.setHeading(0);
    socket.on('yaw1_dis', function(data) {
        heading1.setHeading(data.data);
        document.querySelector("#heading1_dis").innerHTML="YAW : "+data.data;
    });
    
})



function connect() {
    fetch('/drone_connect', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message)
        document.querySelector("#connection").innerHTML=data.message+" ✅";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function takeOff(event) {
    event.preventDefault();
    const altitude = document.getElementById('altitude').value;
    console.log(altitude);
    fetch('/takeoff', {
        method: 'POST',
        body: JSON.stringify({ altitude: altitude }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function land() {
    fetch('/land', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function RTL() {
    fetch('/RTL', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function sats_cnt() {
    fetch('/satellites', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.querySelector(".sats_num").innerHTML="sats: "+data.num_sats;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function yaw(event) {
    event.preventDefault();
    const yaw = document.getElementById('yaw').value;
    console.log(yaw);
    fetch('/yaw', {
        method: 'POST',
        body: JSON.stringify({ yaw: yaw }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function speedtest() {
    fetch('/networkspeed', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        const downloadspeed = Math.floor(data.download_speed);
        document.querySelector("#Downloadspeed").innerHTML="Download Speed : "+data.download_speed;
        console.log(data.download_speed);
        const uploadspeed = Math.floor(data.upload_speed);
        document.querySelector("#Uploadspeed").innerHTML="Upload Speed : "+data.upload_speed;
        console.log(data.upload_speed);


        $(document).ready(function() {
            $("#demo1").gauge(uploadspeed, {
                min: 0,
                max: 100,
                unit: " Mpbs",
                color: "red",
                colorAlpha: 1,
                bgcolor: "#222",
                type: "default"
            });
        
            $("#demo2").gauge(downloadspeed, {
                min: 0,
                max: 100,
                unit: " Mpbs",
                color: "green",
                colorAlpha: 1,
                bgcolor: "#222",
                type: "default"
            });
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });
}




const socketc = io("http://192.168.2.101:5000");
socketc.on('connect',function(){
    console.log(`connected with socket ID : ${socketc.id}`);
});

$(document).ready(function() {
    var altimeter2 = $.flightIndicator('#altimeter2', 'altimeter');
    altimeter2.setAltitude(0);
    socketc.on('parameters', function(data) {
        console.log('Received altitude update:', data.data);
        const altitudeInFeet = data.data * 3.28084;
        altimeter2.setAltitude(altitudeInFeet);
        document.querySelector("#altitude2_dis").innerHTML="Altitude : "+data.data+" m";
    });
})


$(document).ready(function() {
    var heading2 = $.flightIndicator('#heading2', 'heading');
    heading2.setHeading(0);
    socketc.on('yaw1_dis', function(data) {
        heading2.setHeading(data.data);
        document.querySelector("#heading2_dis").innerHTML="YAW : "+data.data;
    });
    
})





$(document).ready(function() {
    $("#demo1").gauge(0, {
        min: 0,
        max: 100,
        unit: " Mpbs",
        color: "red",
        colorAlpha: 1,
        bgcolor: "#222",
        type: "default"
    });

    $("#demo2").gauge(0, {
        min: 0,
        max: 100,
        unit: " Mpbs",
        color: "green",
        colorAlpha: 1,
        bgcolor: "#222",
        type: "default"
    });
});

window.onload = function () {
    var alphaalt = 0;
    var betaalt = 0;

    var options = {
        animationEnabled: true,
        title: {
            text: "Flight Altitudes"
        },
        axisX: {
            minimum: 0, // Set minimum value to 0 for x-axis
            labelFormatter: function (e) {
                return e.value === 2 ? 'alpha' : (e.value === 10 ? 'beta' : '');
            }
        },
        axisY: {
            title: "Elevation (meters)",
            minimum: 0, // Set minimum value to 0 for y-axis
        },

        data: [{
            type: "area",
            markerSize: 5,
            xValueFormatString: "#,##0.## meters",
            yValueFormatString: "#,##0.## meters",
            dataPoints: [
                { x: 2, y: 0 }, // Initialize the first y-coordinate to 0
                { x: 10, y: 0 } // Initialize the second y-coordinate to 0
            ]
        }]
    };

    var chart = new CanvasJS.Chart("chartContainer", options);
    chart.render(); // Initial rendering

    socket.on('parameters', function (data) {
        console.log('Received altitude update:', data.data);
        alphaalt = data.data;

        // Update y-values dynamically
        options.data[0].dataPoints[0].y = alphaalt;

        chart.render(); // Render the updated chart
    });


    socketc.on('parameters', function (data) {
        console.log('Received altitude update from socketc:', data.data);
        betaalt = data.data;

        // Update y-values dynamically
        options.data[0].dataPoints[1].y = betaalt;

        chart.render(); // Render the updated chart
    });
    
}