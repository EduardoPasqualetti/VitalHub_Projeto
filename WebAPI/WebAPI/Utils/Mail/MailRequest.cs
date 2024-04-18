namespace WebAPI.Utils.Mail
{
    public class MailRequest
    {
        //Destinatário do Email
        public string? ToEmail { get; set; }

        //Assunto do Email
        public string? Subject { get; set; }

        //Corpo do Email
        public string? Body { get; set; }
    }
}
