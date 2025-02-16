import { SiteApi } from "@/services/siteApi/apiClient";

import ProfileClient from "./page.client";

export default async function ProfileServer() {
  const payload = await SiteApi.users.getJWTPayload();
  const userData = payload
    ? { id: payload.id, name: payload.name, email: payload.email }
    : null;
  return <ProfileClient userData={userData} />;
}
