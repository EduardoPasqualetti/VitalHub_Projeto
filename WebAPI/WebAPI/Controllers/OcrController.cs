using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Utils.OCR;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OcrController : ControllerBase
    {
        private readonly OcrService _ocrService;
        public OcrController(OcrService ocrService)
        {
            _ocrService = ocrService;
        }

        [HttpPost("PostOCR")]
        //FromForm quer dizer que vem de um formulário
        public async Task<IActionResult> RecognizeText([FromForm] FileUploadModel fileUploadForm )
        {
            try
            {
                //Verifica se a imagem foi recebida 
                if ( fileUploadForm == null || fileUploadForm.Image == null) 
                {
                    return BadRequest("Nenhuma imagem foi fornecida");
                }
               
                //abre a conexão com o recurso
                using (var stream = fileUploadForm.Image.OpenReadStream())
                {
                    //chama o método para reconhcer a imagem
                    var result = await _ocrService.RecognizeTextAsync(stream);

                    //retorna o resultado
                    return Ok(result);
                }
            }
            catch (Exception e)
            {
                return BadRequest("Erro ao processar a imagem" + e.Message);
            }
        }
    }
}
