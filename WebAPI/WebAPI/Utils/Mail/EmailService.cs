
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Net.Mail;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        //Variável privada com as configs do email
        private readonly EmailSettings emailSettings;
        public EmailService(IOptions<EmailSettings> options)
        {
            //obtém as configs do email e armazena na variável privada
            emailSettings = options.Value;
        }
        public async Task sendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //Objeto que representa o e-mail
                var email = new MimeMessage();

                //Define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //adiciona o destinatário do e-nail
                email.To.Add(MailboxAddress.Parse(mailRequest.toEmail));

                //define o assunto do e-mail
                email.Subject = mailRequest.Subject;

                //Cria o corpo do e-mail
                var builder = new BodyBuilder();

                //define o corpo do e-mail como html
                builder.HtmlBody = mailRequest.Body;

                //define o corpo do email no obj MimeMessage 
                email.Body = builder.ToMessageBody();

                //cria um cliente SMTP para envio de email
                using(var smtp = new SmtpClient())
                {
                    //Conecta-se ao servidor SMTP usando os dados do emailSettings
                    smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);

                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    //await smtp.SendAsync(email);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
