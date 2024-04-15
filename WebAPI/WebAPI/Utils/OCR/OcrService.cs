using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "54ff9b20c8324977b524f9424e4865e4";

        private readonly string _endpoint = "https://cvvvitalhubgm15.cognitiveservices.azure.com/";

        // metodo para reconhecer o caracteres(texto) a partir de uma imagem
        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                //cria um client para api de computer vision
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                {
                    Endpoint = _endpoint
                };

                //faz chamada para a API
                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                //processa o resultado e retorna o texto reconhecido
                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception ex)
            {

               return("Erro ao reconhecer texto"+ ex.Message);
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {
            
            string recognizedText = "";

            //percorre todas as regioes
            foreach (var region in result.Regions)
            {
                //para cada regiao, percorre as linhas
                foreach (var line in region.Lines)
                {
                    //para cada linha, percorre as palavras
                    foreach (var word in line.Words)
                    {
                        //adiciona cada palavra ao texto, separando com espaco
                        recognizedText += word.Text + " ";
                    }
                    //quebra de linha ao final de cada linha
                    recognizedText += "\n";
                }
            }

            //retorna o texto
            return recognizedText;
        }
    }
}
