import { Container, GamesByCategories } from "@/shared/components/shared";

export default function Home() {
  return (
    <Container className="flex flex-col h-full">
      <GamesByCategories />
    </Container>
  );
}
