import nodemailer, { Transporter } from "nodemailer"


class EmailService {
    private transporter: Transporter | null = null
    
    public init = (): void => {
        try {
            this.transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS,
                },
            })
            console.log('Email service transporter is ready')
        } catch (err: unknown) {
            console.log(err)
        }
    }

    public sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
        try {
            if (!this.transporter) return
            await this.transporter.sendMail({
                to,
                subject,
                html
            })
        } catch (err: unknown) {
            console.log(err)
        }
    }
}

export const emailService = new EmailService()