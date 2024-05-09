namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //Metodo asincronado para o envio do email que recebe MailRequest
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
