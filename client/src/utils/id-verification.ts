import { IDInfo } from "@/interfaces";
import axios from "axios";

const IDVerificationApiUrl = import.meta.env.VITE_ID_VERIFICATION_API_URL
const IDVerificationApiKey = import.meta.env.VITE_ID_VERIFICATION_API_KEY

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function IDVerification(file: File, cb: (idInfo: IDInfo) => void) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await axios.post(IDVerificationApiUrl, formData,
    {
      headers: {
        "api-key": IDVerificationApiKey
      },
    })
  cb(res.data.data[0])
}
