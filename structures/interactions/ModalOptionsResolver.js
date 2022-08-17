module.exports = class ModalOptionsResolver {
    constructor(client, options, resolvedOptions){
        Object.defineProperty(this, 'client', { value: client });
        this.data = options
        if (this.data[0]?.type === 2) {
            this._group = this.data[0].name;
            this.data = this.data[0].options ?? [];
          }
        if (this.data[0]?.type === 1) {
            this._subcommand = this.data[0].name;
            this.data = this.data[0].options ?? [];
        }
        this.resolved = resolvedOptions ?? {}
    }
    get(name){
        const option = this.data.find(option => option.name === name)
        return option
    }
}