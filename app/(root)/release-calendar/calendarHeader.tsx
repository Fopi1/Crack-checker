import { CrackButton } from "@/shared/components/ui";

interface Props {
  year: number;
  month: string;
  isTodayDisabled: boolean;
  goToPreviousMonth: () => void;
  goToToday: () => void;
  goToNextMonth: () => void;
}

export const CalendarHeader = ({
  year,
  month,
  isTodayDisabled,
  goToPreviousMonth,
  goToToday,
  goToNextMonth,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-center gap-5">
        <CrackButton onClick={goToPreviousMonth}>{"<"}</CrackButton>
        <CrackButton disabled={isTodayDisabled} onClick={goToToday}>
          today
        </CrackButton>
        <CrackButton onClick={goToNextMonth}>{">"}</CrackButton>
      </div>
      <h2 className="text-2xl font-bold leading-[29px] capitalize">
        {`${month} ${year}`}
      </h2>
    </div>
  );
};
