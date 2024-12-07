import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLaguages, translateText } from "./redux/actions";
import Select from "react-select";

const App = () => {
  const langState = useSelector((store) => store.language);
  const translateState = useSelector((store) => store.translate);

  console.log(translateState);

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const [text, setText] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLaguages());
  }, [dispatch]);

  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages]
  );

  const handleTranslate = () => {
    dispatch(
      translateText({
        sourceLang,
        targetLang,
        text,
      })
    );
  };

  return (
    <div className="bg-zinc-900 h-screen text-white grid place-items-center">
      <div className=" w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold mb-7">Çeviri +</h1>

        <div className="flex gap-2 text-black">
          <Select
            onChange={(lang) => setSourceLang(lang)}
            value={sourceLang}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            options={formatted || []}
            className="flex-1"
          />
          <button
            onClick={() => {
              const temp = sourceLang;
              setSourceLang(targetLang);
              setTargetLang(temp);
            }}
            className="rounded py-2 px-6 bg-zinc-700 text-white transition hover:ring-2 hover:bg-zinc-800"
          >
            Değiş
          </button>
          <Select
            onChange={(lang) => setTargetLang(lang)}
            value={targetLang}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            options={formatted || []}
            className="flex-1"
          />
        </div>

        <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col ">
          <textarea
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[300px] max-h-[450px] p-[10px] text-[20px] rounded text-black"
          />
          <div className="w-full relative">
            <textarea
              value={translateState.answer}
              disabled
              className="w-full min-h-[300px] max-h-[450px] p-[10px] text-[20px] rounded text-gray-200"
            />
            {translateState.isLoading && (
              <h1 className="absolute top-[40%] left-[40%] translate-x-[-20]">
                Yükleniyor...
              </h1>
            )}
          </div>
        </div>

        <button
          onClick={handleTranslate}
          className="rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-zinc-700 mt-3 hover:ring-2 hover:bg-zinc-900"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
