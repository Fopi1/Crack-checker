export const AdminCommandParam = ({
  commandObject,
}: {
  commandObject: Record<string, string>;
}) => {
  return (
    <>
      {Object.entries(commandObject).map(([title, type]) => {
        return (
          <div key={title}>
            <p className="text-2xl font-bold text-crack-gamestatus">{title}</p>
            <p className="">{type === "boolean" ? "Slider" : "Input"}</p>
          </div>
        );
      })}
    </>
  );
};
