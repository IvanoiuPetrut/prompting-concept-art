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
  return data;
}

async function postImage(image: File, imageName: string, imageTopology: string) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("imageName", `${imageName}-imageType=${imageTopology}`);
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/images`, formData, {
    headers: {
      authorization: cookies.get("auth-token")
    }
  });

  return response;
}

async function editImage(prompt: string, imageName: string) {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/images/edit/?prompt=${prompt}&imageName=${imageName}`,
    {
      headers: {
        authorization: cookies.get("auth-token")
      }
    }
  );

  return response.data;
}

export { getGeneratedImage, postImage, editImage };
