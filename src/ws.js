const WebSocket = require("ws");
const ClientPresence = require("../structures/presence/ClientPresence");

    module.exports = class WebSocketManager {
        constructor(client){
            Object.defineProperty(this, 'client', { value: client });
            this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json")
            this.resumeGatewayUrl = null;
            this.sessionId = null;
            this.sessionType = null
            this.lastSeq = null
    }
    connect(){
        const payload = {
            op: 2,
            d: {
            token: this.client.token,
            intents: this.client.intents || 37377, 
            properties: {
                os: this.client.options.ws?.os || "linux" ,
                browser: this.client.options.ws?.browser ||"bot-package",
                device: this.client.options.ws?.device ||"bot-package"
            },
            presence: new ClientPresence(this.client.options.presence || {

            /**
               * @param {PresenceStatusData} status Status to change to
             */
                status: "online"
            }).toJSON()
        },
    }  
    this.ws.on("open", () =>{
        this.ws.send(JSON.stringify(payload))
    })
    this.ws.on("error", console.log)
    this.ws.on("close", (event) => {
        console.log(event)
        this.$resume()
    })
    this.ws.on("message", (data) => {
        const pl = JSON.parse(data)
        console.log(pl)
        const {t, event, op, d, s} = pl
        if(s) this.lastSeq = s
        if(op === 10){
            this.$heartbeat(d.heartbeat_interval )
        } 
        
        else if(t){
            if(["READY", "INTERACTION_CREATE", "GUILD_CREATE", "GUILD_DELETE", "GUILD_MEMBER_CREATE", "MESSAGE_CREATE", "CHANNEL_CREATE", "CHANNEL_DELETE"].includes(t)){
                require(`../handlers/${t}.js`)(this.client, d, event)
            }
        }
    })
}
    $heartbeat (ms) {
        return setInterval(() => {
            console.log("heartbeating")
            this.ws.send(JSON.stringify({ op: 1, d: -1}))
        }, ms * Math.random()).unref()
    }
    async $resume(){
        await this.ws.close()
        this.ws = await new WebSocket(`${this.resumeGatewayUrl}?v=10&encoding=json`)
        this.ws.on("open", () => {
            this.ws.send(JSON.stringify({
                op: 6,
                d: {
                token: this.client.token,
                session_id: this.sessionId,
                seq: this.lastSeq
                }
            }))
        })
    }
    destroy(){
        this.ws.close()
    }
}