;

import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/constants/constant";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleContactsButton() {
  const login = useGoogleLogin({
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/contacts.readonly",
    onSuccess: async ({ code }) => {
      const tokens = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          code,
          grant_type: "authorization_code",
          redirect_uri: "postmessage",
        }
      );

      await axios.post(`${BACKEND_URL}/api/v1/auth/google/contacts`, {
        access_token: tokens.data.access_token,
      });
    },
  });

  return (
    <Button onClick={() => login()}>
      Import Contacts
    </Button>
  );
}
