import { useCapitalGameStore } from "../stores/capitalGameStore";

export const HintDetails = () => {
  const capital = useCapitalGameStore(({ country }) => country.capital);
  const hintCount = useCapitalGameStore(({ hintCount }) => hintCount);

  const hintedWord = capital.substring(0, hintCount);

  const percentOfWordShown = Math.round((hintCount / capital.length) * 100);

  return (
    <div className="w-full grid gap-1 grid-cols-7 pb-1 h-9 text-center">
      <div className="flex items-center justify-center border-2 col-span-5 rounded ">
        {hintedWord}
      </div>
      <div className="flex items-center justify-center border-2 col-span-1 rounded">
        {hintCount}
      </div>
      <div className="flex items-center justify-center border-2 col-span-1 rounded">
        {percentOfWordShown}%
      </div>
    </div>
  );
};
