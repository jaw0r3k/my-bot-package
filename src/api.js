const { default: fetch } = require("node-fetch");
const Constants = require("./Constants");
const FormData = require('form-data');


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
            if(data.reason){ options.headers["X-Audit-Log-Reason"] = data.reason; }
            if(data.files?.[0]){
                delete options.headers["Content-Type"]
                const form = new FormData();
                form.append("payload_json", JSON.stringify(
                    data.data
                ));
                data.files.forEach((f, index) => form.append(`file[${index}]`, f.file, f.name ))
                // options.payload_json = data.data
                options.body = form
            } else {
                if(data.data) options.body = JSON.stringify(data.data)
            }
        }
        const response = await fetch(`${Constants.api}/${end}`, options)
        if(response.status === 204) return null
        const lol = await(response).json()
        return lol
    }
}