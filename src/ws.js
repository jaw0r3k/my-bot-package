const WebSocket = require("ws")
    /**
     * A user's status. Must be one of:
     * * `online`
     * * `idle`
     * * `invisible`
     * * `dnd` (do not disturb)
     * @typedef {string} PresenceStatusData
     */
module.exports = class WebSocketManager {
    constructor(client){
        this.client = client
        this.ws = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json")
    }
    connect(){
        const payload = {
            op: 2,
            d: {
            token: this.client.token,
            intents: this.client.intents || 37377, 
            properties: {
                $os: "linux",
                $browser: "bot-package",
                $device: "bot-package"
            },
            presence: {

            /**
               * @param {PresenceStatusData} status Status to change to
             */
                status: "online"
            }
        },
    }  
    this.ws.on("open", () =>{
        this.ws.send(JSON.stringify(payload))
    })
    this.ws.on("message", (data) => {
        const pl = JSON.parse(data)
        console.log(pl)
        const {t, event, op, d} = pl
        if(op === 10){
            const { heartbeat_interval } = d
            this.$heartbeat(heartbeat_interval)
        } 
        
        else if(t){
            if(["READY", "GUILD_CREATE", "GUILD_DELETE", "GUILD_MEMBER_CREATE", "MESSAGE_CREATE", "CHANNEL_CREATE", "CHANNEL_DELETE"].includes(t)){
                require(`../handlers/${t}.js`)(this.client, d, event)
            }
        }
    })
}
    $heartbeat (ms) {
        return setInterval(() => {
            console.log("heartbeating")
            this.ws.send(JSON.stringify({ op: 1, d: -1}))
        }, ms).unref()
    }
    destroy(){
        this.ws.close()
    }
}