"use client";

// import { SiteApi } from "@/services/apiClient";
import { adminCommands, IAdminCommand } from "./constants";
import { AdminCommandParam } from "./adminCommandParam";
// import { SteamQuerySchema } from "@/schemas/steam";
// import { z } from "zod";

export const AdminCommand = ({
  name,
  description,
  // path,
  // data,
}: IAdminCommand) => {
  const handleClick = async () => {
    try {
      // await SiteApi.admin.trigger({ path });
    } catch (error) {
      console.error(`Error with ${name} admin command`, error);
      throw error;
    }
  };
  return (
    <dl className="w-full flex gap-10 p-3">
      <div className="w-full flex gap-10">
        <dt>{name}</dt>
        <dd>{description}</dd>
      </div>
      <dd className="max-w-full">
        {adminCommands.map((command, index) => {
          if (!command.data || !Object.keys(command.data).length) return;
          return <AdminCommandParam commandObject={command.data} key={index} />;
        })}
      </dd>
      <button onClick={handleClick}>Launch</button>
    </dl>
  );
};
