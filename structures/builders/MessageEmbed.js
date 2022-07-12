module.exports = class MessageEmbed {
    constructor(data){
        this.title = data.title
        this.descripiton = data.descripiton
        this.footer = data.footer
        this.thumbail = data.thumbail
        this.color = data.color
        this.fields = data.fields ?? []
        this.image = data.image
        this.provider = data.provider
        this.type = data.type
        this.timestamp = data.timestamp
        this.url = data.url
        this.video = data.video
    }
    setTitle(title){
        this.title = title
        return this
    }
    addFields(fields){
        for (f in fields){
            this.fields.push(f)
        }
        return this
    }
    setFields(fields){
        this.fields = fields
        return this
    }
    setDescription(descripiton){
        this.descripiton = descripiton
        return this
    }
    setImage(image){
        this.image = image
        return this
    }
    setUrl(url){
        this.url = url
    }
    setFooter(footer){
        this.footer = footer
        return this
    }
    setTimestamp(timestamp){
        if (timestamp instanceof Date) timestamp = timestamp.getTime();
        this.timestamp = timestamp ?? Date.now()
        return this
    }
    setColor(color){
    this.color = color
    return this
    }
    setThumbnail(thumbail){
        this.thumbail = thumbail
        return this
    }
    get length() {
    return (
      (this.title?.length ?? 0) +
      (this.description?.length ?? 0) +
      (this.fields.length >= 1
        ? this.fields.reduce((prev, curr) => prev + curr.name.length + curr.value.length, 0)
        : 0) +
      (this.footer?.text.length ?? 0) +
      (this.author?.name.length ?? 0)
    );
  }
    toJSON() {
        return {
        title: this.title,
        type: 'rich',
        description: this.description,
        url: this.url,
        timestamp: this.timestamp && new Date(this.timestamp),
        color: this.color,
        fields: this.fields,
        thumbnail: this.thumbnail,
        image: this.image,
        author: this.author && {
            name: this.author.name,
            url: this.author.url,
            icon_url: this.author.iconUrl,
        },
        footer: this.footer && {
            text: this.footer.text,
            icon_url: this.footer.iconUrl,
        },
        };
    }
}