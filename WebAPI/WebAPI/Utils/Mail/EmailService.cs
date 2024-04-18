
////// HEAD
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

//////
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
//////> 3399c78871c08a67a8ad0b37e471a3e5ea0169c6

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
                ////// HEAD
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
                //////
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
                ////// 3399c78871c08a67a8ad0b37e471a3e5ea0169c6

                //define o assunto do e-mail
                email.Subject = mailRequest.Subject;

                //Cria o corpo do e-mail
                var builder = new BodyBuilder();

                //define o corpo do e-mail como html
                builder.HtmlBody = mailRequest.Body;

                //define o corpo do email no obj MimeMessage 
                email.Body = builder.ToMessageBody();

                //cria um cliente SMTP para envio de email
                ////// HEAD
                using (var smtp = new SmtpClient())
                {
                    try
                    {
                        //Conecta-se ao servidor SMTP usando os dados do emailSettings
                        smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);

                        smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                        ////// HEAD
                        await smtp.SendAsync(email);
                    }
                    catch (Exception)
                    {

                        throw;
                    }

                }

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
   

