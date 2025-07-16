import axios from "axios";

export const getCountries = async () => {
  const { data } = await axios.get(
    "https://restcountries.com/v3.1/all?fields=idd,cca2,name"
  );

  // Flatten into { name, code: "+91" } etc.
  return data
    .filter(c => c.idd?.root)
    .map(c => ({
      name: c.name.common,
      dial: `${c.idd.root}${c.idd.suffixes?.[0] ?? ""}`,
      iso2: c.cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};
