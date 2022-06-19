const { default: fetch } = require("node-fetch");
const Constants = require("./Constants");
// TODO: Do it more usful 
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
            if(data.reason){ options.headers["X-Audit-Log-Reason"] = data.reason; delete data.reason }
            options.body = JSON.stringify(data)
        }
        const response = await fetch(`${Constants.api}/${end}`, options)
        if(response.status === 204) return null
        return await(response).json()
    }
}