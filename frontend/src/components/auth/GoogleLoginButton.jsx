import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginButton({ onSuccess }) {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const { data } = await axios.post(
            "http://localhost:3000/api/auth/google",
            { tokenId: credentialResponse.credential }
          );
          if (onSuccess) onSuccess(data);
        } catch (error) {
          console.error("Google login failed", error);
          alert("Google login failed");
        }
      }}
      onError={() => console.log("Google login failed")}
    />
  );
}
