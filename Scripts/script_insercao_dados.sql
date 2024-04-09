USE VitalHub_G15M;

-- Selecionando todos os endere�os
SELECT * FROM dbo.Enderecos;

INSERT INTO
	dbo.Enderecos
VALUES
	(NEWID(), '09510200', 'Rua Niter�i', 180, '-23.614942', '-46.570703'),
	(NEWID(), '00620300', 'Av Francisco Matarazzo', 18, '-23.6110675608483', '-46.571990526605596');


-- Selecionando todos os tipos de usu�rios
SELECT * FROM dbo.TiposUsuario;

INSERT INTO dbo.TiposUsuario VALUES (NEWID(), 'Medico'), (NEWID(), 'Paciente');



-- Selecionando todos os usu�rios
SELECT * FROM dbo.Usuarios;

INSERT INTO
	dbo.Usuarios
VALUES
	(NEWID(), '509D6164-24BF-495F-82B0-C679952336A2', 'Lucas Silveira Portal', 'lucas.portal@gmail.com', 'medico123', 'string'),
	(NEWID(), '509D6164-24BF-495F-82B0-C679952336A2', 'Carlos Roque', 'carlos.roque@gmail.com', 'medico123', 'string'),
	(NEWID(), '247DB556-0C4E-466E-895D-6186D8A1AA3A', 'Martin Lorenzo', 'martin_ferreira@gmail.com', 'paciente123', 'string'),
	(NEWID(), '247DB556-0C4E-466E-895D-6186D8A1AA3A', 'Heitor Paulo Campos', 'heitor-campos80@gmail.com', 'paciente123', 'string');

UPDATE dbo.Usuarios SET senha = '$2y$10$kZROpWHidaGEbQdfvq3SpeVPGiNcpLQHAOcENJbblYV0aAqXoHnYO' WHERE id = 'F63A83C9-35C7-4BDE-940D-5B07303D8F02';


-- Selecionando todas as especialidades
SELECT * FROM dbo.Especialidades;

INSERT INTO
	dbo.Especialidades
VALUES
	(NEWID(), 'Cardiologista');



-- Selecionando todos os m�dicos
SELECT * FROM dbo.Medicos;

INSERT INTO
	dbo.Medicos
VALUES
	('F63A83C9-35C7-4BDE-940D-5B07303D8F02', '910D82CF-404A-4A7A-9B39-E343823842F9', '123456789'),
	('04030137-BA59-42CA-9320-1CD586278B7B', '3FA85F64-5717-4562-B3FC-2C963F66AFA6', '987654321');



-- Selecionando todos os pacientes
SELECT * FROM dbo.Pacientes;

INSERT INTO
	dbo.Pacientes
VALUES
	('E4F4A3B1-5AED-4981-8336-7E7A5440AD1F', '2000-01-01', '391166037', '01318181801', 'A13E687B-D94F-41D4-AC8A-AA1E4216D9CA'),
	('683F4955-7BEF-4154-AA38-F7215AD0DCD9', '2001-02-02', '473972438', '25319361815', 'A13E687B-D94F-41D4-AC8A-AA1E4216D9CA');



-- Selecionando todos os niveis
SELECT * FROM dbo.NiveisPrioridade;

INSERT INTO 
	dbo.NiveisPrioridade
VALUES
	(NEWID(), 0), -- Rotina
	(NEWID(), 1), -- Exame
	(NEWID(), 2); -- Urgencia



-- Selecionando todas as situas�es
SELECT * FROM dbo.Situacoes;

INSERT INTO
	dbo.Situacoes
VALUES
	(NEWID(), 'Pendentes'),
	(NEWID(), 'Realizados'),
	(NEWID(), 'Cancelados');



-- Selecionando todas as cl�nicas
SELECT * FROM dbo.Clinicas;

INSERT INTO
	dbo.Clinicas
VALUES
	(NEWID(), 'Cl�nica M�dica Vida & Sa�de', '12345678000190', 'Cl�nica M�dica Vida & Sa�de', 'clinica.vidasaude@gmail.com', 'B5990495-85E2-461D-AA89-4E588A8BED1A'),
	(NEWID(), 'Centro M�dico S�o Paulo', '23456789000101', 'Centro M�dico S�o Paulo', 'medico.saopaulo@gmail.com', '77790E4A-F15F-43B5-8009-AF86DBCA296E');
