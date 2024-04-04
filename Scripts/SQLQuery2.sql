USE [VitalHub_G15_Manha]

SELECT TOP (1000) [ID]
      ,[ClinicaID]
      ,[MedicoID]
  FROM [VitalHub_G15_Manha].[dbo].[MedicosClinicas]

  SELECT * FROM dbo.MedicosClinicas

  SELECT * FROM dbo.Clinicas
  SELECT * FROM dbo.Medicos

INSERT INTO 
	dbo.MedicosClinicas
VALUES 
	('cbfe34a1-a9b9-44b4-a122-3440eb7ed119','85b83e4f-a999-4d9e-9215-e7c67b2bafef');

	UPDATE MedicosClinicas
SET ID_Origem = TabelaOrigem.ID
FROM TabelaDestino
INNER JOIN TabelaOrigem ON TabelaDestino.coluna_chave = TabelaOrigem.coluna_chave
