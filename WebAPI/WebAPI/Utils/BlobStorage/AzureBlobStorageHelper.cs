using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeConteiner )
        {
            try
            {
                   if (arquivo != null)
                   {
                        //Retorna a uri
                        var blobName = Guid.NewGuid().ToString().Replace("-","" + Path.GetExtension(arquivo.FileName));

                        //Cria uma instäncia do BlobServiceClient passando a string de conexão com o blob da azure
                        var blobServiceClient = new BlobServiceClient(stringConexao);

                        //Obtém os dados do container client
                        var blobConteinerCliet = blobServiceClient.GetBlobContainerClient(nomeConteiner);

                        //obtém um blobClient usando o blob name
                        var blobClient = blobConteinerCliet.GetBlobClient(blobName);
                    
                        //Abre o fluxo de entrada do arquivo
                        using (var stream = arquivo.OpenReadStream())
                        {
                            //Carrega o arquivo(foto) para o blob de forma asincrona
                            await blobClient.UploadAsync(stream, true);
                        }

                        //Retorna a uri do blob como uma string
                        return blobClient.Uri.ToString();

                   }
                   else 
                   {
                    //Retorna uri de uma imagem padrão caso nenhuma imagem seja enviada na requisição
                    return "https://blobvitalhubedu.blob.core.windows.net/blobvitalconteineredu/vidar-nordli-mathisen-_RWV-UinSUg-unsplash.jpg";
                   }
            }
            catch (Exception)
            {

                throw;
            }
            
        }
    }
}
