export abstract class DtoFrom<T> {
  mapFrom(t: T): void {
    Object.keys(this).forEach(key => this[key] = t[key]);
  }
}

export abstract class DtoTo<T> {
  mapTo(t: T): void {
    Object.keys(t).forEach(key => t[key] = this[key]);
  }
}

export abstract class Dto<T> {
  mapFrom(t: T): void {
    Object.keys(this).forEach(key => this[key] = t[key]);
  }

  mapTo(t: T): void {
    Object.keys(t).forEach(key => t[key] = this[key]);
  }
}
