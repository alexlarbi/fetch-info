import axios from "axios";

const crossRefClient = axios
  .create({
    baseURL: "https://api.crossref.org",
    responseType: "json"
  });

const pubMedClient = axios
  .create({
    baseURL: "https://eutils.ncbi.nlm.nih.gov",
  });

const getWorks = async (doi: string) => {
  try {
      const resp = await crossRefClient.get(`/works/${doi}`);
      return resp.data;
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};

const getESummary = async (doi: string) => {
  try {
      const resp = await pubMedClient.get(`/entrez/eutils/esummary.fcgi?db=pubmed&id=${doi}`, { headers: {
                "Content-Type": "application/xml; charset=utf-8"
               }})
      return resp.data;
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};


export {getWorks, getESummary}