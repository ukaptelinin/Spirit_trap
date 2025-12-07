   let data = [
    
      { id: 1, name: 'Иван',location: 'Tokio', threatLevel:"Low", status: false },
      { id: 2, name: 'Кот Матвей',location: 'Tokio', threatLevel:"Low", status: false },
       { id: 3, name: 'Чебушила',location: 'Tokio', threatLevel:"Low", status: false },
      { id: 4, name: 'Кабан дикий',location: 'Tokio', threatLevel:"Low", status: false },
      { id: 5, name: 'Муфлон тибетский',location: 'Tokio', threatLevel:"Low", status: false },
      { id: 6, name: 'Джугутур',location: 'Tokio', threatLevel:"Low", status: false },
       { id: 7, name: 'Чебушила 2',location: 'Tokio', threatLevel:"Low", status: false },
      { id: 8, name: 'Дормидонт',location: 'Tokio', threatLevel:"Low", status: false },
    
    
  ];

  export async function GET() {
  // Создаем TransformStream для более удобной работы
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      let isActive = true;
      let currentData = [...data];
      
      // Функция для отправки одного сообщения
      const sendUpdate = () => {
        if (!isActive) return;
        
        const idx = Math.floor(Math.random() * currentData.length);
        
        // Обновляем все записи: одна становится CRITICAL, остальные Low
        currentData = currentData.map((item, index) => ({
          ...item,
          threatLevel: index === idx ? "CRITICAL" : "Low"
        }));
        
        // Формируем сообщение в формате Server-Sent Events
        const message = `data: ${JSON.stringify({
          timestamp: new Date().toISOString(),
          data: currentData,
          updatedIndex: idx
        })}\n\n`;
        
        controller.enqueue(encoder.encode(message));
      };
      
      // Отправляем начальное состояние
      sendUpdate();
      
      // Устанавливаем интервал
      const intervalId = setInterval(sendUpdate, 5000);
      
      // Обработчик отмены
      return () => {
        isActive = false;
        clearInterval(intervalId);
        controller.close();
      };
    },
    
    cancel() {
      // Очистка ресурсов при отмене
      console.log('Stream cancelled');
    }
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  });
}