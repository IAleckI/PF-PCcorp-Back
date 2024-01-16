export function paymentTemplate (name: string, paymentId: string, price: number) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <main style="background-color: #fff; height: 700px; width: 100%; font-family: sans-serif;">
        <div style="height: 100px; width: 100%; background-color: #48e; box-sizing: border-box; padding: 0; margin: 0;">
        </div>
          <h1 style="color: #000;">Gracias por su compra 👋 <span style="color: #48e;">${name}</span></h1>
          <h2>Id de compra: ${paymentId}</h2>
          <h2>Por un precio de: ${price}</h2>
      </main>
    </body>
    </html>
        `;
}