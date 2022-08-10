const Activity = require("./ClientActivity")

module.exports = class Presence {
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
    setStatus(status="online"){
        this.status = status
        return this
    }
    addActivity(activity){
        if(!activity) throw new Error("No activity provided")
        this.activities.push(new Activity(activity))
        return this
    }    
    setActivities(activities){
        this.activities = activities.map(a => new Activity(a))
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