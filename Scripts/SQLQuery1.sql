SELECT TOP (1000) [ID]
      ,[SituacaoID]
      ,[PacienteID]
      ,[MedicoClinicaID]
      ,[ReceitaID]
      ,[PrioridadeID]
      ,[DataConsulta]
      ,[Descricao]
      ,[Diagnostico]
  FROM [VitalHub_G15_Manha].[dbo].[Consultas]

  SELECT * FROM Consultas

  INSERT INTO Consultas
  VALUES
	(NEWID(), '5FB79570-4570-4EE9-8BD9-0F666E802F00','412F534F-FAC7-40BF-96B4-40810512418A','CC95DB2B-A1A1-49A3-BE66-DD7289B1F873','45188DEB-356E-4376-BF9B-FF7E57CF92C2','9E53878B-D0CD-4033-A943-74463A2ABF2E','2024-02-03','Consulta Teste','Check-up do Pacente')