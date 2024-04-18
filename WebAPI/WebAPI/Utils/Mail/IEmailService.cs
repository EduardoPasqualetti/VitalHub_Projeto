namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //Método asincrono para envio de email que recebe o MailRequest
        Task sendEmailAsync(MailRequest mailRequest);

    }
}
