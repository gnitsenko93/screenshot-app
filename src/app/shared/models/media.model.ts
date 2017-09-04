export enum MediaType {
  Music = 0,
  Video = 1
}

export interface IMedia {
  readonly id: number;
  readonly type: MediaType;
  readonly link: string;
  title: string;
  description?: string;
  tags?: string[];
}

export class Media implements IMedia {
  readonly id: number;
  readonly type: number;
  readonly link: string;
  title: string;
  description?: string;
  tags?: string[];

  constructor(id: number, type: number, link: string, title: string, description?: string, tags?: string[]) {
    this.id = id;
    this.type = type;
    this.link = link;
    this.title = title;
    if (description) this.description = description;
    this.tags = tags || [];
  }

  addTag(tag: string): void {
    this.tags.push(tag);
  }

  removeTag(tag: string): void {
    const index: number = this.tags.findIndex(_tag => _tag === tag);
    if (index > -1) this.tags.splice(index, 1);
  }

}
