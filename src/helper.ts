import {XML, XMLList} from "sxml";
import { getESummary, getWorks } from "./apiClient";


const parseGetWorks = async () => {
    const works = await getWorks('10.2196/12121');
  
    const authors = works.message.author.map((y: any)=> {
        const res = {
        'first_name': y.given,
        'last_name': y.family,
        orcid: y.ORCID
      }
  
        return res;
      });
  
    const title = works.message.title[0];
    const result = {
      title,
      authors
    };

    return result;
  }
  


const parsePubMed = async () => {
    const works = await getESummary('31115346');

    let xml: XML = new XML(works);
    let xmlList: XMLList = xml.get("DocSum");
    const title = xmlList.at(0).get("Item").at(5).getValue();
        
    const authorElements = xmlList.at(0).get("Item").at(3).get("Item");
    let authors = [];
    for(let i = 0; i < authorElements.size(); i++){
        const name = authorElements.at(i).getValue().split(" ");
        
        const firstName = name[0];
        const lastName = name[1];
        authors.push({
        'first_name': firstName,
        'last_name': lastName,
        });
    }
    
    const result = {
        title,
        authors
    };

    return result;
  }

  // combine results
  const getCombinedResults = async () => {
    const crossRef = await parseGetWorks();
    const pubMed = await parsePubMed();
    return [crossRef, pubMed];
  };
  
export {getCombinedResults}