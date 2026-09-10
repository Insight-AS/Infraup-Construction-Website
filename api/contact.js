import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, phone, service, message } = req.body;

        if (!name || !email || !service || !message) {
            return res.status(400).json({
                error: "Please fill in all required fields."
            });
        }

        const { data, error } = await resend.emails.send({
            from: "InfraUp Website <onboarding@resend.dev>",
            to: ["angad5774@gmail.com"],
            subject: `New Website Inquiry - ${service}`,
            replyTo: email,
            html: `
                <h2>New Website Inquiry</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Service:</strong> ${service}</p>

                <h3>Message</h3>
                <p>${message}</p>
            `
        });

        if (error) {
            console.error("Resend error:", error);

            return res.status(500).json({
                error: "Unable to send message."
            });
        }

        return res.status(200).json({
            success: true,
            id: data.id
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            error: "Something went wrong."
        });
    }
}