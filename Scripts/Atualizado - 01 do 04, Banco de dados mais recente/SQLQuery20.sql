SELECT TOP (1000) [ID]
      ,[TipoUsuario]
  FROM [VitalHub_G15M].[dbo].[TiposUsuario]

  INSERT INTO TiposUsuario Values(NewId(),'Medico'), (NewId(),'Paciente')