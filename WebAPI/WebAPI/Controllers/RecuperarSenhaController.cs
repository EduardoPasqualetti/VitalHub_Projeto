using Microsoft.AspNetCore.Http; // Importa o namespace necessário para lidar com solicitações HTTP
using Microsoft.AspNetCore.Mvc; // Importa o namespace necessário para trabalhar com o padrão MVC
using Microsoft.EntityFrameworkCore; // Importa o namespace necessário para acessar o Entity Framework Core
using WebAPI.Contexts; // Importa o namespace que contém o contexto do Entity Framework
using WebAPI.Utils.Mail; // Importa o namespace que contém o serviço de envio de e-mails

namespace WebAPI.Controllers
{
    [Route("api/[controller]")] // Define o padrão de rota para o controller (api/[nome do controller])
    [ApiController] // Indica que o controller é um controlador de API
    public class RecuperarSenhaController : ControllerBase // Define o controller como um ControllerBase
    {
        private readonly VitalContext _context; // Contexto do banco de dados
        private readonly EmailSendingService _emailSendingService; // Serviço de envio de e-mails

        // Construtor do controller
        public RecuperarSenhaController(VitalContext context, EmailSendingService emailSendingService)
        {
            _context = context; // Inicializa o contexto do banco de dados
            _emailSendingService = emailSendingService; // Inicializa o serviço de envio de e-mails
        }

        // Método para enviar o código de recuperação de senha por e-mail
        [HttpPost]
        public async Task<IActionResult> SendRecoveryCodePassword(string email)
        {
            try
            {
                // Busca o usuário pelo e-mail no banco de dados
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return NotFound("Usuario Nao Encontrado "); // Retorna um erro 404 se o usuário não for encontrado
                }

                // Gera um código de recuperação de senha aleatório
                Random random = new Random();
                int RecoveryCode = random.Next(1000, 9999);

                // Armazena o código de recuperação de senha no usuário
                user.CodRecupSenha = RecoveryCode;

                await _context.SaveChangesAsync(); // Salva as alterações no banco de dados

                // Envia o código de recuperação de senha por e-mail
                await _emailSendingService.SendRecoveryPassword(user.Email!, RecoveryCode);

                return Ok("Codigo Enviado Com Sucesso "); // Retorna uma resposta de sucesso
            }
            catch (Exception)
            {
                return BadRequest("Erro Ao enviar o Codigo "); // Retorna um erro 400 em caso de falha
            }
        }

        // Método para validar o código de recuperação de senha
        [HttpPost("ValidarCodigoRecuperacaoDeSenha")]
        public async Task<IActionResult> ValidatePasswordRecoveryCode(string email, int code)
        {
            try
            {
                // Busca o usuário pelo e-mail no banco de dados
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return NotFound("Usuario Nao Encontrado "); // Retorna um erro 404 se o usuário não for encontrado
                }

                if (user.CodRecupSenha != code)
                {
                    return BadRequest("Codigo Invalido"); // Retorna um erro 400 se o código for inválido
                }

                user.CodRecupSenha = null; // Limpa o código de recuperação de senha do usuário

                await _context.SaveChangesAsync(); // Salva as alterações no banco de dados

                return Ok("Codigo de Recuperacao Valido"); // Retorna uma resposta de sucesso
            }
            catch (Exception e)
            {
                return BadRequest(e.Message); // Retorna um erro 400 em caso de falha
            }
        }
    }
}