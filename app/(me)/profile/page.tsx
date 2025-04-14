import { Container } from "@/shared/components/shared";

import { DeleteAccount } from "./deleteAccount";
import { PasswordInfo } from "./passwordInfo";
import { UserInfo } from "./userInfo";

export default function Profile() {
  return (
    <section className="bg-crack-secondary">
      <Container className="py-10 flex flex-col gap-12">
        <UserInfo />
        <PasswordInfo />
        <DeleteAccount />
      </Container>
    </section>
  );
}
