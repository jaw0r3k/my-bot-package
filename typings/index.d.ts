import { EventEmitter } from "node:events";
import { Stream } from "node:stream";
import { Url } from "node:url";
export type Awaitable<T> = T | PromiseLike<T>;
export type EnumHolder<T> = { [P in keyof T]: T[P] };
export type Constructable<T> = abstract new (...args: any[]) => T;
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
    intents: BitFieldResolvable<IntentsString, number>
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
export type RecursiveReadonlyArray<T> = ReadonlyArray<T | RecursiveReadonlyArray<T>>;
export class BitField<S extends string, N extends number | bigint = number> {
    public constructor(bits?: BitFieldResolvable<S, N>);
    public bitfield: N;
    public add(...bits: BitFieldResolvable<S, N>[]): BitField<S, N>;
    public any(bit: BitFieldResolvable<S, N>): boolean;
    public equals(bit: BitFieldResolvable<S, N>): boolean;
    public freeze(): Readonly<BitField<S, N>>;
    public has(bit: BitFieldResolvable<S, N>): boolean;
    public missing(bits: BitFieldResolvable<S, N>, ...hasParams: readonly unknown[]): S[];
    public remove(...bits: BitFieldResolvable<S, N>[]): BitField<S, N>;
    public serialize(...hasParams: readonly unknown[]): Record<S, boolean>;
    public toArray(...hasParams: readonly unknown[]): S[];
    public toJSON(): N extends number ? number : string;
    public valueOf(): N;
    public [Symbol.iterator](): IterableIterator<S>;
    public static Flags: Record<string, number | bigint>;
    public static resolve(bit?: BitFieldResolvable<string, number | bigint>): number | bigint;
  }
export type BitFieldResolvable<T extends string, N extends number | bigint> =
  | RecursiveReadonlyArray<T | N | `${bigint}` | Readonly<BitField<T, N>>>
  | T
  | N
  | `${bigint}`
  | Readonly<BitField<T, N>>;
export type IntentsString =
    'Guilds'|
    'GuildMembers'|
    'GuildBans'|
    'GuildEmojisAndStickers'|
    'GuildIntegrations'|
    'GuildWebhooks'|
    'GuildInvites'|
    'GuildVoiceStates:'|
    'GuildPresences'|
    'GuildMessages'|
    'GuildMessageReactions'|
    'GuildMessageTyping'|
    'DirectMessages'|
    'DirectMessageReactions'|
    'DirectMessageTyping'|
    'MessageContent'|
    'GuildScheduledEvents'|
    'AutoModerationConfiguration'|
    'AutoModerationExecution'
export class Intents extends BitField<IntentsString> {
    public static Flags: Record<IntentsString, number>;
    public static resolve(bit?: BitFieldResolvable<IntentsString, number>): number;
  }
  export type PermissionString =
    'CreateInstantInvite'|
    'KickMembers'|
    'BanMembers'|
    'Administrator'|
    'ManageChannels'|
    'ManageGuild'|
    'AddReactions'|
    'ViewAuditLog'|
    'PrioritySpeaker'|
    'Stream'|
    'ViewChannel'|
    'SendMessages'|
    'SendTtsMessages'|
    'ManageMessages'|
    'EmbedLinks'|
    'AttachFiles'|
    'ReadMessageHistory'|
    'MentionEveryone'|
    'UseExternalEmojis'|
    'ViewGuildInsigths'|
    'Connect'|
    'Speak'|
    'MuteMembers'|
    'DeafenMembers'|
    'MoveMembers'|
    'UseVad'|
    'ChangeNickname'|
    'ManageNicknames'|
    'ManageRoles'|
    'ManageWebhooks'|
    'ManageEmojisAndStickers'|
    'UseApplicationCommands'|
    'RequestToSpeak'|
    'ManageEvents'|
    'ManageThreads'|
    'CreatePublicThreads'|
    'CreatePrivateThreads'|
    'UseExternalStickers'|
    'SendMessagesInThread'|
    'StartEmbeddedActivities'|
    'ModerateMembers'
  export type PermissionFlags = Record<PermissionString, bigint>;
  export type PermissionResolvable = BitFieldResolvable<PermissionString, bigint>;

  export class Permissions extends BitField<PermissionString, bigint> {
    public any(permission: PermissionResolvable, checkAdmin?: boolean): boolean;
    public has(permission: PermissionResolvable, checkAdmin?: boolean): boolean;
    public missing(bits: BitFieldResolvable<PermissionString, bigint>, checkAdmin?: boolean): PermissionString[];
    public serialize(checkAdmin?: boolean): Record<PermissionString, boolean>;
    public toArray(): PermissionString[];
  
    public static All: bigint;
    public static Default: bigint;
    public static Flags: PermissionFlags;
    public static resolve(permission?: PermissionResolvable): bigint;
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
  public name: string
  public id: string
  public color: number
  public mentionable: boolean
  public hoist: boolean
  public position: number
  public permissions: Permissions
  public icon: string | null;
  public tags: { botId?: string, integrationId? : string, premiumSubscriber: boolean}
  public unicodeEmoji: string | null
}
export enum ButtonStyle {
  Primary,
  Secondary,
  Success,
  Danger,
  Link
}

// export type EnumResolvable<T> = T | (keyof typeof T);
export class Button {
    public constructor(data?: object)
    public label: string
    public url: string
    public customId: string
    public emoji: object
    public style: ButtonStyle
    public setStyle(style: ButtonStyle| (keyof typeof ButtonStyle)) 
}export class Member {
  public constructor(data:object)
  public nickname: string|null
  public user: User
  public roles: MemberRolesManager
  public avatar: string|null

}
export class User {
    
}
export class Attachment {
  public constructor(data?:object)
  setName(name:string): this
  seFile(attachment: Buffer|Stream|string, name:string): this
  setSpoiler(spoiler?:boolean): this
  setDescription(description:string): this
  setName(name:string): this
}
export abstract class CachedManager<K, Holds, R> extends DataManager<K, Holds, R> {
  protected constructor(client: Client, holds: Constructable<Holds>);
  private _add(data: unknown, cache?: boolean, { id, extras }?: { id: K; extras: unknown[] }): Holds;
}
export class DataManager<K, Holds, R> {
    protected constructor(client: Client, holds: Constructable<Holds>);
    private client: Client
    public readonly cache: Collection<K, Holds>;
    private holds: Constructable<Holds>
    public resolve(resolvable: Holds): Holds;
    public resolve(resolvable: R): Holds | null;
    public resolveId(resolvable: K | Holds): K;
    public resolveId(resolvable: R): K | null;
    public valueOf(): Collection<K, Holds>;
}

export class Collection<K, Holds>{
  public constructor(keys: Array<Array<K|Holds>>)
}
  export class GuildManager extends CachedManager<string, Guild, Guild> {
    private constructor(client: Client, iterable?: Iterable<object>);
    public fetch(options: string): Promise<Guild>;
  }
  export class MemberManager extends CachedManager<string, Member, Guild> {
    private constructor(client: Client, iterable?: Iterable<object>);
    public guild: Guild;
    public create(name: string, options?: object): Promise<Guild>;
    public fetch(options: string): Promise<Guild>;
  }
export class MemberRolesManager extends CachedManager<string, Role, Member> {
  
}