import axios from "axios/index";
import ImageStore from "../stores/ImageStore";

export async function getPhotosFromUnsplash() {
  axios.get(`https://api.unsplash.com/search/photos?page=${ImageStore.page}&per_page=20&query=people&client_id=KbxKxe4wThqOVtYBgoSrIoGgq47d9XQgDJc6MTF5W4k`).then((response) => {
    if (response.status === 200) {
      if (ImageStore.page === 1) {
        ImageStore.setImages(response.data.results);
      } else {
        ImageStore.appendImages(response.data.results);
      }
    } else {
      throw new Error(`Unsuccessful request with status code: ${response.status}`);
    }
  });
}


