import axios from "axios";
import type { AxiosResponse } from "axios";
import cookies from "js-cookie";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface ImageData {
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
  const { height, width, imageUrl }: { height: number; width: number; imageUrl: string } = data;
  return { imageUrl, height, width };
}

export { getGeneratedImage };
