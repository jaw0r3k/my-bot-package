const User = require("./User");

module.exports = class ClientUser extends User {
    constructor(client, data){
        super(client, data)
    }
    setPresence({status="online", afk=false, activities=[]}){
        this.client.ws.ws.send(JSON.stringify({
            op: 3,
            d: {
              since: Date.now(),
              status,
              afk,
              activities
            }
          }))
        }
        async edit(data){
          await this.client.api.endpoint(`users/@me`, "PATCH", data)
          return this
        }
        setUsername(username) {
          return this.edit({ username });
        }
        setStatus(status) {
          return this.setPresence({ status });
        }
        setActivity(name, options = {}) {
          if (!name) return this.setPresence({ activities: [] });
      
          const activity = Object.assign({}, options, typeof name === 'object' ? name : { name, type: 0, created_at: Date.now() });
          return this.setPresence({ activities: [activity] });
        }
}