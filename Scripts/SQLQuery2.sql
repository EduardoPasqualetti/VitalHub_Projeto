USE [VitalHub_G15_Manha]

SELECT TOP (1000) [ID]
      ,[ClinicaID]
      ,[MedicoID]
  FROM [VitalHub_G15_Manha].[dbo].[MedicosClinicas]

  SELECT * FROM dbo.MedicosClinicas

  SELECT * FROM dbo.Clinicas
  SELECT * FROM dbo.Medicos



INSERT INTO MedicosClinicas
VALUES 
	(NewId(), 'CBFE34A1-A9B9-44B4-A122-3440EB7ED119','85B83E4F-A999-4D9E-9215-E7C67B2BAFEF')
