import { Container } from "@/shared/components/shared";
import { UserData } from "@/types/store";

import { PasswordInfo } from "./passwordInfo";
import { UserInfo } from "./userInfo";

interface Props {
  userData: UserData;
}

export default function ProfileClient({ userData }: Props) {
  return (
    <section className="bg-secondary-foreground">
      <Container className="py-10 flex flex-col gap-12">
        <UserInfo userData={userData} />
        <PasswordInfo />
      </Container>
    </section>
  );
}
