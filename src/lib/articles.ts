import { getCollection } from 'astro:content';
export const categoryLabels: Record<string,string> = {
  'projects':'Projects','guides':'Guides','how-tos':'How-Tos','mini-how-tos':'Mini How-Tos',
  'reviews':'Reviews','tests':'Tests','tutorials':'Tutorials','deep-dives':'Deep Dives',
  'teardowns':'Teardowns','experiments':'Experiments','reference':'Reference'
};
export const categoryLabelsNo: Record<string,string> = {
  'projects':'Prosjekter','guides':'Guider','how-tos':'How-Tos','mini-how-tos':'Mini How-Tos',
  'reviews':'Anmeldelser','tests':'Tester','tutorials':'Opplæring','deep-dives':'Dybdeanalyser',
  'teardowns':'Demonteringer','experiments':'Eksperimenter','reference':'Oppslagsverk'
};
export const published = async () => (await getCollection('articles', ({data}) => !data.draft))
  .sort((a,b) => b.data.date.getTime() - a.data.date.getTime() || a.data.title.localeCompare(b.data.title));
export const articleUrl = (id:string,lang:string) => `${lang === 'nb' ? '/no' : ''}/articles/${id.split('/').at(-1)}/`;
