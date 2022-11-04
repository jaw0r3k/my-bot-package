const WebSocket = require("ws");
const ClientPresence = require("../structures/presence/ClientPresence");

    module.exports = class WebSocketManager {
        constructor(client){
            Object.defineProperty(this, 'client', { value: client });
            this.ws = null
            this.resumeGatewayUrl = null;
            this.sessionId = null;
            this.sessionType = null
            this.lastSeq = null
    }
    connect(){
        this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json")
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
                status: "online"
            }).toJSON()
        },
    }  
    this.ws.once("open", () =>{
        this.ws.send(JSON.stringify(payload))
    })
    this.ws.on("error", console.log)
    this.ws.on("close", (event) => {
        this.$resume()
    })
    this.ws.on("unexpected-response", console.log)
    this.ws.on("message", (data) => {
        const pl = JSON.parse(data)
        const {t, event, op, d, s} = pl
        if(s) this.lastSeq = s
        if(op === 10){
            this.$heartbeat(d.heartbeat_interval )
        } 
        
        else if(t){
            if(["READY", "INTERACTION_CREATE", "GUILD_CREATE", "GUILD_DELETE", "GUILD_MEMBER_CREATE", "MESSAGE_CREATE", "CHANNEL_CREATE", "CHANNEL_DELETE", "GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE"].includes(t)){
                return require(`../handlers/${t}.js`)(this.client, d, event)
            }
        } else {
            console.log(pl)
        }
    })
}
    $heartbeat (ms) {
        return setInterval(() => {
            console.log("heartbeating")
            this.ws.send(JSON.stringify({ op: 1, d: -1}))
        }, ms * (Math.random() * (1 - 0.6 + 1) + 0.6)).unref()
    }
    async $resume(){
        await this.ws.close()
        this.ws = await new WebSocket(`${this.resumeGatewayUrl ?? "wss://gateway.discord.gg"}?v=10&encoding=json`)
        this.ws.on("open", () => {
            console.log("Resuming!")
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