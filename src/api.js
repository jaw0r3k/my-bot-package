const { default: fetch } = require("node-fetch")

module.exports = class ClientApi {
    constructor(client){
        this.client = client
    }
    async endpoint(end, method="GET", data){
        let options = {
            method: method,
            headers: {
                "Authorization": `Bot ${this.client.token}`,
                "Content-Type": "application/json"
            }
          }
        if(data){
            if(data.reason) options.headers["X-Audit-Log-Reason"] = data.reason
            options.data = JSON.stringify(data)
        }
        return await fetch(`${Constants.api}/${end}`, options)
    }
}