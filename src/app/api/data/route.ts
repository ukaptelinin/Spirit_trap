 export interface ISpiritCard {
    id: number,
    name: string,
    location: string,
    threatLevel: string,
    status: boolean,
 }
 
 export async function GET() {
  const data = [
    
      { id: 1, name: 'Иван',location: 'Tokio', threatLevel:"Low", status: false },
      { id: 2, name: 'Кот Матвей',location: 'Tokio', threatLevel:"Low", status: false },
       { id: 3, name: 'Чебушила',location: 'Tokio', threatLevel:"Low", status: false },
      { id: 4, name: 'Кабан дикий',location: 'Tokio', threatLevel:"Low", status: false },
      { id: 5, name: 'Муфлон тибетский',location: 'Tokio', threatLevel:"Low", status: false },
      { id: 6, name: 'Джугутур',location: 'Tokio', threatLevel:"Low", status: false },
       { id: 7, name: 'Чебушила 2',location: 'Tokio', threatLevel:"Low", status: false },
      { id: 8, name: 'Дормидонт',location: 'Tokio', threatLevel:"Low", status: false },
    
    
  ];

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}