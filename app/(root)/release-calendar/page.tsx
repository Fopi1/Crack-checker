import { Container } from "@/shared/components/shared";
import { CrackButton } from "@/shared/components/ui";

export default function ReleaseCalendar() {
  return (
    <section className="bg-[#1e1e2033] backdrop-blur-3xl">
      <Container className="mt-20">
        <h2 className="font-bold text-2xl">Release Calendar</h2>
        <div>
          <div className="flex items-center justify-center gap-5">
            <CrackButton>{"<"}</CrackButton>
            <CrackButton>today</CrackButton>
            <CrackButton>{">"}</CrackButton>
          </div>
          <h2>September 2025</h2>
        </div>
        <div>
          <table></table>
        </div>
      </Container>
    </section>
  );
}
