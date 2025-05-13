import nodemailer from "nodemailer";

// Cette fonction s'exécute lorsque la méthode POST est utilisée
export async function POST(req: Request) {
  console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASSWORD:", process.env.SMTP_PASSWORD);

  try {
    // On récupère les données envoyées dans le corps de la requête
    const { name, email, message } = await req.json();

    // Vérification des champs obligatoires
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing fields" }),
        { status: 400 }
      );
    }

    // Création du transporteur pour envoyer l'email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Envoi de l'email
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_TO,
      subject: `Message from ${name}`,
      text: message,
    });

    // Réponse réussie
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send email" }),
      { status: 500 }
    );
  }
}
