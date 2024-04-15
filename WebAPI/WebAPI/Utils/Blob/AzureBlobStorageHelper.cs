using Azure.Storage.Blobs; // Importa o namespace necessário para trabalhar com o Azure Blob Storage
using Microsoft.AspNetCore.Http; // Importa o namespace necessário para trabalhar com arquivos no ASP.NET Core
using System; // Importa o namespace para utilizar tipos básicos do .NET
using System.IO; // Importa o namespace para trabalhar com streams de dados

namespace WebAPI.Utils.Blob
{
    public static class AzureBlobStorageHelper
    {
        // Método para fazer upload de uma imagem para o Azure Blob Storage
        // file: O arquivo a ser enviado
        // stringConection: A string de conexão com a conta de armazenamento
        // containerName: O nome do contêiner onde a imagem será armazenada
        public static async Task<string> UploadImage(IFormFile file, string stringConection, string containerName)
        {
            try
            {
                if (file != null)
                {
                    // Gera um nome único para o blob, baseado no nome original do arquivo
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);

                    // Cria um cliente para se conectar ao serviço de armazenamento
                    var blobServiceClient = new BlobServiceClient(stringConection);

                    // Obtém uma referência para o contêiner onde a imagem será armazenada
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);

                    // Obtém uma referência para o blob que será criado
                    var blobClient = blobContainerClient.GetBlobClient(blobName);

                    // Abre um fluxo de dados para o arquivo
                    using (var stream = file.OpenReadStream())
                    {
                        // Faz o upload do arquivo para o blob
                        await blobClient.UploadAsync(stream, true);
                    }

                    // Retorna a URI do blob, que pode ser utilizada para acessar a imagem
                    return blobClient.Uri.ToString();
                }
                else
                {
                    // Se o arquivo for nulo, retorna a URI padrão para uma imagem genérica
                    return "https://blobvitalhubg4.blob.core.windows.net/containervitalhub/imageDefalult.png";
                }
            }
            catch (Exception)
            {
                // Em caso de erro, lança uma exceção para ser tratada pelo código que chamou o método
                throw;
            }
        }
    }
}