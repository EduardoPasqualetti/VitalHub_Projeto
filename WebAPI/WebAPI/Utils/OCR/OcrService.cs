using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "";

        private readonly string _endpoint = "https://cvvitalhubg15.cognitiveservices.azure.com/";

        public async Task<string> RecognizeTextAsync(Stream ImageStream)
        {
            try
            {
                //Cria um Client para API do visão computacional (ComputerVision)
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials
                    (_subscriptionKey))
                {
                    Endpoint = _endpoint
                };

                //ImageStrem é o parâmetro passado no RecognizeTextAsync
                //faz a chamada para a api
                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, ImageStream);

                //processa o resultado e retorna o texto reconhecido
                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception e)
            {
                return "Erro ao reconhecer o texto" + e.Message;
            }
        }

        // O Static é para usar o método em outros lugares
        // A classe OcrResult vai pegar o resultado
        private static string ProcessRecognitionResult(OcrResult result)
        {
            string recognizedText = "";

            //Foreach para pegar cada "Região" onde o texto está, depois pegar cada linha dentro da região, e depois cada palavra dentro das linhas
            // += Operador de incremento
            foreach (var region in result.Regions)
            {
                //Para cada região percorre as linhas
                foreach (var line in region.Lines)
                {
                    //Para cada linha percorre as palavras
                    foreach (var word in line.Words)
                    {
                        //Adiciona cada palavra ao texto, separando com espaço cada palavra
                        recognizedText += word.Text + " ";   
                    }
                    //Quebra de linha ao final de cada linha
                    recognizedText += "\n";
                }
            }
            return recognizedText;
        }
    }
}
