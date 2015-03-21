
var app = {
    macAddress: "20:13:10:17:09:53", // Lumen Addr

    // Application Constructor
    initialize: function() {
        this.bindEvents();

        $('#picker').minicolors({
            control: 'wheel',
            inline: true,
            change: function() {
                var color = $(this).minicolors('rgbObject');

                app.setColor(color.r, color.g, color.b);
                console.log(color);
            }
        });

        $('#bt-turnoff').on('click', function(){
            $('#picker').minicolors('value', '#000000');
        });
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    onDeviceReady: function() {
        $('#connexion-status-img').css('background-image', 'url(img/256/bulb_blue.png)');

        // Check if BT is enabled
        bluetoothSerial.isEnabled(
            // Enabled
            app.connectLumen,

            // Disabled
            function() {
                $('#connexion-status-img').css('background-image', 'url(img/256/bulb_yellow.png)');
                $('#connexion-status .event').text("Offline"); 
            }
        );
    },

    connectLumen: function () {
        bluetoothSerial.connect(
            app.macAddress,

            // Connected
            function() {
                $('#connexion-status-img').css('background-image', 'url(img/256/bulb_green.png)');
                $('#connexion-status .event').text("Connected").css('background-color', '#4B946A');

                $('#color-controls').show();
            },

            // Error
            function() {
                $('#connexion-status-img').css('background-image', 'url(img/256/bulb_red.png)');
                $('#connexion-status .event').text("Connexion error");
            }
        );   
    },

    setColor: function (r, g, b) {
        var cmd = 'w' + r + ' ' + g + ' ' + b + '#';

        bluetoothSerial.write(
            cmd // Command

        );
    }
};
