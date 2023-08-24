import nodemailer from 'nodemailer';

class Nodemailer {
  private static transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'a.may3pp@gmail.com',
        // pass: 'M1crobl0g',
        pass: 'pfyokviswhhbofap'
    }
  });

  constructor() {}

  static async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'a.may3pp@gmail.com',
      to,
      subject,
      html
    });
  }
}

export default Nodemailer;