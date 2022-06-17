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
        InteractionResponses.applyToClass(UserInteraction, ["deferUpdate", "update"])
    }
    get user(){
        return new User(client, Object.entries(this.options.users)[0][1])
    }
    get member(){
        return new Member(client, Object.entries(this.options.members)[0][1])
    }
}
module.exports = UserInteraction