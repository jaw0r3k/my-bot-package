const Interaction = require("../Interaction");
const Member = require("../Member");
const User = require("../User");

class UserInteraction extends Interaction {
    constructor(client, data){
        super(client, data)
        this.data = data.data
        this.options = data.options
        this.targetId = data.data.target_id;
        this.commandName = this.data.name	
    }
    get user(){
        return new User(client, Object.entries(this.options.users)[0][1])
    }
    get member(){
        return this.guild.members._add(Object.entries(this.options.members)[0][1])
    }
}
InteractionResponses.applyToClass(UserInteraction, ["deferUpdate", "update"])
module.exports = UserInteraction