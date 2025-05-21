"use client";

// import { checkIsAdmin } from "@/lib/auth";
//
// import { redirect } from "next/navigation";
// import { AppRoutes } from "@/constants";
import { Container } from "@/shared/components/shared";
import { adminCommands } from "./constants";
import { AdminCommand } from "./adminCommand";

export default function PanelServer() {
  // const isAdmin = await checkIsAdmin();
  // if (!isAdmin) {
  //   redirect(AppRoutes.MAIN)
  // };
  return (
    <section className="bg-crack-secondary">
      <Container className="p-10">
        <h2 className="uppercase text-5xl font-bold text-crack-secondary text-center">
          admin panel
        </h2>
        <div className="rounded-lg bg-gray-700/30 backdrop-blur-md drop-shadow-2xl p-5">
          <ul className="flex flex-col gap-3">
            {adminCommands.map((command) => (
              <li
                key={command.name}
                className="rounded-xl border border-white w-full"
              >
                <AdminCommand
                  key={command.path}
                  name={command.name}
                  description={command.description}
                  path={command.path}
                  data={command.data}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
