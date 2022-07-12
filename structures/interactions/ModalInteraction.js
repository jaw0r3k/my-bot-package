const Interaction = require("../Interaction");
const InteractionResponses = require("./InteractionResponses");

class ModalInteraction extends Interaction {
    constructor(client, data){
        super(client, data)
    }
}
InteractionResponses.applyToClass(ModalInteraction, ["showModal"])
module.exports = ModalInteraction