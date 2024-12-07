import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
//api'dan dil verilerini alıp  store'a dispatch edicek asenkron thunk aksiyonu

export const getLaguages = createAsyncThunk(
  "languages/getLanguages",
  async () => {
    const res = await api.get("/getLanguages");

    return res.data.data.languages;
  }
);

// api'dan çeviri sonucunu alır
export const translateText = createAsyncThunk(
  "translate/translateText",
  async (p) => {
    console.log(p);

    //api'a gönderilecek parametreleri belirle
    const params = new URLSearchParams();
    params.set("source_language", p.sourceLang.value);
    params.set("target_language", p.targetLang.value);
    params.set("text", p.text);
    //api'a gönderilecek header'ı belirle
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    };

    //api isteği at
    const res = await api.post("/translate", params, { headers });
    return res.data.data.translatedText;
  }
);
