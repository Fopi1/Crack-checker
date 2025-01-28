interface Props {
  releaseDate: string;
  crackDate: string | null;
  hackedGroups: string;
}

export const useCrackStatus = ({
  releaseDate,
  crackDate,
  hackedGroups,
}: Props) => {
  const formattedReleaseDate = new Date(releaseDate).getTime();
  if (crackDate) {
    const formattedCrackDate = new Date(crackDate).getTime();
    const daysForCrack = Math.floor(
      (formattedCrackDate - formattedReleaseDate) / (1000 * 60 * 60 * 24)
    );

    const crackedBy = hackedGroups.length === 0 ? "Drm-free" : hackedGroups;
    const crackStatus =
      daysForCrack <= 0
        ? `Cracked on release day`
        : `Cracked in ${daysForCrack} day(s)`;
    return { crackedBy, crackStatus };
  } else {
    const daysNotCracked = Math.floor(
      (new Date().getTime() - formattedReleaseDate) / (1000 * 60 * 60 * 24)
    );
    const crackedBy = "Not cracked yet";
    const crackStatus =
      daysNotCracked <= 0
        ? `Not cracked yet`
        : `Not cracked ${daysNotCracked} day(s)`;

    return { crackedBy, crackStatus };
  }
};
