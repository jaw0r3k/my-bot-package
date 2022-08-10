const Permissions = require("../utils/Permissions");
const Base = require("./Base");

module.exports = class Command extends Base {
    constructor(client, data){
        super(client)
        this.id = data.id
        this.type = data.type
    }
    _patch(data){
        this.name = data.name
        this.description = data.description ?? null
        this.options = data.options ?? []
        this.defaultMemberPermissions = new Permissions(data.default_member_permissions)
        this.dmPermission = data.dm_permission ?? false
    }
}