module.exports = class Interaction extends Base {
    constructor(client, data){
        super(client)
        this.applicationId = data.application_id
        this.id = data.id
        this.channelId = data.channel_id
        this.guildId = data.guild_id
        this.type = data.type
        Object.defineProperty(this, 'token', { value: data.token });
        this.version = data.version
        this.user = new User(client, data.user ?? data.member.user)
        this.member = new Member(client, data.member) ?? null
        this.locale = data.locale ?? null;
        this.guildLocale = data.guild_locale ?? null;
    } 
    get guild() {
        return this.client.guilds.get(this.guildId)
    }
    get channel() {
        return this.client.channels.get(this.channelId)
    }
    static createInteraction(client, data){
        let interaction = {}
        switch(data.type) {
            case 2: {
                switch (data.data.type) {
                    case 1: {
                        interaction = new Commandnteraction(client, data)
                        break
                    }
                    case 2: {
                        interaction = new UserInteraction(client, data)
                        break
                    }
                    case 3: {
                        interaction = new MessageInteraction(client, data)
                        break
                    }
                }
            }
            case 3: {
                switch (data.data.component_type) {
                    case 2: {
                        interaction = new ButtonInteraction(client, data)
                        break
                    } 
                    case 3: { 
                        interaction = new SelectMenuInteraction(client, data)
                        break
                    }
                }
                break
            }
            case 4: {
                interaction = new AutoCompleteInteraction(client, data)
                break
            }
            case 5: {
                interaction = new ModalInteraction(client, data)
                break
            }
        }
        return interaction
    }
    toJSON(...props) {
        return Util.flatten(this, ...props);
      }
}
const AutoCompleteInteraction = require("./interactions/AutoCompleteInteraction")
const ButtonInteraction = require("./interactions/ButtonInteraction")
const Commandnteraction = require("./interactions/CommandInteraction")
const UserInteraction = require("./interactions/UserInteraction")
const Member = require("./Member")
const User = require("./User")
