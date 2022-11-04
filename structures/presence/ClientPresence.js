const ClientActivity = require("./ClientActivity")
const Activity = require("./ClientActivity")
/**
 * @typedef ClientPresenceData
 * @property {?Date|number} since
 * @property {Array<Activity>} activities
 * @property {ClientPresenceStatus} status
 * @property {boolean} afk
 */
module.exports = class ClientPresence {
    /**
     * 
     * @param {ClientPresenceData} data 
     */
    constructor(data={}) {
        this.since = new Date(data.since).getTime() || Date.now()
        this.activities = data.activities?.map(a => new Activity(a)) ?? []
        this.status = data.status
        this.afk = data.afk ?? false
    }
    setAfk(afk=true){
        this.afk = afk
        return this
    }
    setSince(since=Date.now()){
        this.since = new Date(since).getTime() 
        return this
    }
        /**
     * A user's status. Must be one of:
     * * `online`
     * * `idle`
     * * `invisible`
     * * `dnd` (do not disturb)
     * @typedef {string} ClientPresenceStatus
     */
    /**
     * @param {ClientPresenceStatus} status
     * @returns {ClientPresence}
     */
    setStatus(status="online"){
        this.status = status
        return this
    }
    /**
     * @param {ClientActivityData|ClientActivity} activity 
     * @returns {ClientPresence}
     */
    addActivity(activity){
        if(!activity) throw new Error("No activity provided")
        this.activities.push(new ClientActivityData(activity))
        return this
    }    
    /**
     * 
     * @param {Array<ClientActivityData|Activity>} activities 
     * @returns {ClientPresence}
     */
    setActivities(activities){
        this.activities = activities.map(a => new ClientActivity(a))
        return this
    }
    toJSON(){
        return {
            status: this.status,
            activities: this.activities,
            since: this.since,
            afk: this.afk,
        }
    }
}