namespace WebAPI.Utils.Mail
{
    public class MailRequest
    {

        //Destinatario
        public string? ToEmail { get; set; }

        //Assunto
        public string? Subject { get; set;}

        //Corpo
        public string? Body { get; set;}
    }
}
