import TinyQueue from "tinyqueue";

export declare type Item = any;
export declare type Comparator<Item> = (a: Item, b: Item) => number;
export declare type KeySelector<Item> = (a: Item) => string;
export declare type Updater<Item> = (a: Item, b: Item) => void;

export default class HashQueue<Item> {
  public length : number;
  private queue: TinyQueue<Item>;
  private map: Map<string, Item>;
  private keySelector: KeySelector<Item>;
  private updater: Updater<Item>;
  
  constructor (keySelector: KeySelector<Item>, updater: Updater<Item>, items? : Item[], compare? : Comparator<Item>) {
    this.queue = new TinyQueue([], compare);
    this.map = new Map();

    this.length = this.queue.length;
    this.keySelector = keySelector;
    this.updater = updater;

    if (items) {
      for (const item of items) {
        this.pushOrUpdate(item);
      }
    }
  }

  peek () : Item | undefined {
    return this.queue.peek();
  }

  pop () : Item | undefined {
    const item = this.queue.pop();
    if (item !== undefined) {
      const key = this.keySelector(item);
      this.map.delete(key);
    }
    this.length = this.queue.length;
    return item;
  }

  pushOrUpdate (item: Item) : void {
    const key = this.keySelector(item);
    const existing = this.map.get(key);
    if (existing !== undefined) {
      this.updater(existing, item);
    } else {
      this.queue.push(item);
      this.map.set(key, item);
    }
    this.length = this.queue.length;
  }
}
