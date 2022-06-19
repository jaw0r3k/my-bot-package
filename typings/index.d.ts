import { EventEmitter } from "node:events";
export type Awaitable<T> = T | PromiseLike<T>;
export type If<T extends boolean, A, B = null> = T extends true ? A : T extends false ? B : A | B;
export class Client<Ready extends boolean = boolean> extends EventEmitter {
    public constructor(options: ClientOptions);
    public user: If<Ready, User>
    public channels: Map<String, Channel>
    public guilds: Map<String, Guild>
    public login(token:String): Promise<String>
    public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
    public on<S extends string | symbol>(
      event: Exclude<S, keyof ClientEvents>,
      listener: (...args: any[]) => Awaitable<void>,
    ): this;
  
    public once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
    public once<S extends string | symbol>(
      event: Exclude<S, keyof ClientEvents>,
      listener: (...args: any[]) => Awaitable<void>,
    ): this;
  
    public emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]): boolean;
    public emit<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, ...args: unknown[]): boolean;
  
    public off<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
    public off<S extends string | symbol>(
      event: Exclude<S, keyof ClientEvents>,
      listener: (...args: any[]) => Awaitable<void>,
    ): this;
  
    public removeAllListeners<K extends keyof ClientEvents>(event?: K): this;
    public removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof ClientEvents>): this;
}
export interface ClientOptions {
    intents: number
    waitTimeout: number 
}
export interface ClientEvents {
    ready: [client: Client]
    messageCreate: [message: Object]
    guildCreate: [guild: Guild]
    guildDelete: [guild: Guild]
}
export class Channel {
    public constructor(client: Client, data?: Object);
    public name: String
    public id: String
    public guild_id?: String

}
export class BaseGuildChannel {
    public constructor(client: Client, data?: Object);
    public permission_overwrites: Object
    public position: Number
    public permissions: String
    public parent_id?: String
}
export class TextBasedChannel extends Channel {
    public constructor(client: Client, data?: Object);
    public nsfw: Boolean
    public last_pin_timestamp?: String
    public last_message_id?: String
}
export class TextChannel extends TextBasedChannel {
    public topic: String

}
export class Guild {
    public name: String
    public id: String
    public icon?: String
    public owner_id: String
    public permissions?: String
    public region?: String
    public afk_channel_id: String|null
    public roles: Map<String, Role>
    public channels: Map<String, BaseGuildChannel>
    public members: Map<String, Member>
    public emojis: Map<String, Emoji>
}
export class Emoji{
    
}
export class Role {

}
export class Member {

}
export class User {
    
}