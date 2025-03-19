"use client";

import { observer } from "mobx-react-lite";

import { Container } from "@/shared/components/shared";
import { authStore } from "@/shared/store/authStore";

import { DeleteAccount } from "./deleteAccount";
import { PasswordInfo } from "./passwordInfo";
import { UserInfo } from "./userInfo";

export default observer(function Profile() {
  const userData = authStore.userData;
  if (!userData) {
    return <div>You are not logined</div>;
  }
  return (
    <section className="bg-secondary-foreground">
      <Container className="py-10 flex flex-col gap-12">
        <UserInfo userData={userData} />
        <PasswordInfo userData={userData} />
        <DeleteAccount userData={userData} />
      </Container>
    </section>
  );
});
