const pm2 = require('pm2');
const maxMemory = process.env.WEB_MEMORY || 512;    // " " "

pm2.connect(function () {
    pm2.start({
        script: './bin/www',
        name: process.env.APP_ID,     // ----> THESE ATTRIBUTES ARE OPTIONAL:
        exec_mode: 'cluster',            // ----> https://github.com/Unitech/PM2/blob/master/ADVANCED_README.md#schema
        instances: "MAX",
        max_memory_restart: maxMemory + 'M',   // Auto-restart if process takes more than XXmo
        env: {                            // If needed declare some environment variables
            "NODE_ENV": "production",
            "AWESOME_SERVICE_API_TOKEN": "xxx"
        },
    }, function (err) {
        if (err) return console.error('Error while launching applications', err.stack || err);
        console.log('PM2 and application has been succesfully started');

        // Display logs in standard output
        pm2.launchBus(function (err, bus) {
            console.log('[PM2] Log streaming started');

            bus.on('log:out', function (packet) {
                console.log('[App:%s] %s', packet.process.name, packet.data);
            });

            bus.on('log:err', function (packet) {
                console.error('[App:%s][Err] %s', packet.process.name, packet.data);
            });
        });
    });
});