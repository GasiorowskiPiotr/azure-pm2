interface StartParameters {
    script?: string,
    name?: string,
    exec_mode?: string,
    instances?: number,
    max_memory_restart?: string,
    env?: {[key: string]: string}
}

interface Packet {
    process: any;
    data: any;
}

interface Bus {
    on(event: string, callback: (packet: Packet)=> void);
}

interface Pm2Static {
    connect(initializer: () => void);
    start(startParams: StartParameters, callback: (error: Error) => void);
    launchBus(callback: (error: Error, bus: Bus) => void);
    killDaemon(callback: (error: Error) => void);
    disconnect();
}

declare module "pm2" {
    export = pm2;
}

declare var pm2: Pm2Static;