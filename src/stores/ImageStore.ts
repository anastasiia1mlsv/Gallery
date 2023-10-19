import { makeAutoObservable } from "mobx";

class ImageStore {
  images: any[] = [];
  page: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setImages(images: any[]) {
    this.images = images;
  }

  appendImages(images: any[]) {
    this.images.push(...images);
  }

  incrementPage() {
    this.page++;
  }
}

export default new ImageStore();
