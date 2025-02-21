import { Container } from "@/shared/components/shared";
import { UserData } from "@/types/store";

import { UserInfo } from "./userInfo";

interface Props {
  userData: UserData;
}

export default function ProfileClient({ userData }: Props) {
  return (
    <section className="bg-secondary-foreground">
      <Container className="py-10">
        <UserInfo userData={userData} />
      </Container>
    </section>
  );
}
