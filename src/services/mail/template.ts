export function mailTemplate (name: string,token: string) {
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
        <h1 style="color: #000;">Hi 👋 <span style="color: #48e;">${name}</span></h1>
        <p style="font-size: 20px; color: #000; text-align: center;">It's great that you consider using our services, we offer the best products, at the lowest price so you can fulfill the dream of your gaming PC.</p>
        <p style="font-size: 20px; color: #000;">Please click on the link below to verify your email address:</p>
        <a style="text-decoration: none; color: #000; border: 2px solid #48e;; border-radius: 10px; padding: 15px; background: transparent; cursor: pointer; font-size: 15px;" href="http://localhost:5173/verify/?token=${token}">verify yourself now</a>
    </main>
  </body>
  </html>
      `;
}