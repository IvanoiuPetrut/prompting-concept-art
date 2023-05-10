import axios from "axios";
import type { AxiosResponse } from "axios";
import cookies from "js-cookie";

interface ImageData {
  name: string;
  imageUrl: string;
  width: number;
  height: number;
}

async function getGeneratedImage(prompt: string): Promise<ImageData> {
  const { data }: AxiosResponse = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/images/generate/?prompt=${prompt}`,
    {
      headers: {
        authorization: cookies.get("auth-token")
      }
    }
  );
  console.log(data);
  return data;
}

async function postImage(image: File, imageName: string, isMask: boolean) {
  const formData = new FormData();
  formData.append("imageName", imageName);
  formData.append("isMask", isMask.toString());
  formData.append("image", image);
  console.log(formData);
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/images`, formData, {
    headers: {
      authorization: cookies.get("auth-token")
    }
  });

  console.log(response);
}

export { getGeneratedImage, postImage };
