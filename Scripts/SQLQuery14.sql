USE [VitalHub_G15_Manha]

SELECT TOP (1000) [ID]
      ,[Medicamento]
      ,[Observacoes]
  FROM [VitalHub_G15_Manha].[dbo].[Receitas]

SELECT * FROM dbo.Receitas

INSERT INTO 
	dbo.Receitas
VALUES
	('Med1','Deve ser tomado de 2 vezes ao dia')