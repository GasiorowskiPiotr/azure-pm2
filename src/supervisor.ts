import * as pm2 from 'pm2';

const instances = process.env.INSTANCES || -1;
const maxMemory = process.env.MAX_MEMORY || 512;

pm2.connect(() => {
    pm2.start({
        env: process.env,
        //exec_mode: 'cluster',
        instances: instances,
        max_memory_restart: maxMemory,
        name: 'Piotrek',
        script: 'dist/server.js'
    }, (err) => {
        if(err) {
            console.error(err);
            return;
        }

        console.log("[Main] PM2 and the Application has been started.");

        pm2.launchBus((err: Error, bus: Bus) => {
            console.log('[PM2] Log streaming started');

            bus.on('log:out', function(packet) {
                console.log('[App:%s] %s', packet.process.name, packet.data);
            });
        
            bus.on('log:err', function(packet) {
                console.error('[App:%s][Err] %s', packet.process.name, packet.data);
            });
        });
    });
});

process.on('SIGINT', () => {
    pm2.killDaemon(() => {
        pm2.disconnect();
    });
});