using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.ViewModels
{
    public class ExameViewModel
    {
        public Guid? ConsultaId { get; set; }

        [JsonIgnore]
        [NotMapped]
        public IFormFile Imagem { get; set; }

        public string? Descricao { get; set; }
    }
}
