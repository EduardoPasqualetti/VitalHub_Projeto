USE [VitalHub_G15_Manha];

-- Selecionando todos os endereços
SELECT * FROM dbo.Enderecos;

INSERT INTO
	dbo.Enderecos
VALUES
	(NEWID(), '09510200', 'Rua Niterói', 180, '-23.614942', '-46.570703', 'São Caetano do Sul'),
	(NEWID(), '00620300', 'Av Francisco Matarazzo', 18, '-23.6110675608483', '-46.571990526605596', 'São Caetano do Sul');
	
-- Selecionando todos os tipos de usuários
SELECT * FROM dbo.TiposUsuario;

INSERT INTO dbo.TiposUsuario VALUES (NEWID(), 'Medico'), (NEWID(), 'Paciente');



-- Selecionando todos os usuários
SELECT * FROM dbo.Usuarios;

INSERT INTO
	dbo.Usuarios
VALUES
	(NEWID(), 'FA5552A3-8A5E-4D5B-91F3-03DA8560E556', 'Lucão', 'lucas.Medico@Medico.com', '1234', 'string'),
	(NEWID(), 'FA5552A3-8A5E-4D5B-91F3-03DA8560E556', 'Carlos Roque', 'carlos.roque@gmail.com', 'medico123', 'string'),
	(NEWID(), '7BD5C0F1-84E1-4C61-B790-967F8AB6E703', 'Martin Lorenzo', 'martin_ferreira@gmail.com', 'paciente123', 'string'),
	(NEWID(), '7BD5C0F1-84E1-4C61-B790-967F8AB6E703', 'Heitor Paulo Campos', 'heitor-campos80@gmail.com', 'paciente123', 'string');

UPDATE dbo.Usuarios SET senha = '$2y$10$kZROpWHidaGEbQdfvq3SpeVPGiNcpLQHAOcENJbblYV0aAqXoHnYO' WHERE id = 'F63A83C9-35C7-4BDE-940D-5B07303D8F02';


-- Selecionando todas as especialidades
SELECT * FROM dbo.Especialidades;

INSERT INTO
	dbo.Especialidades
VALUES
	(NEWID(), 'Cardiologista');



-- Selecionando todos os médicos
SELECT * FROM dbo.Medicos;

INSERT INTO
	dbo.Medicos
VALUES
	('6A157056-39A5-47F9-9F76-09EC42BA3C27', '0192837465', '66FEF22C-34A8-49A7-A670-DE8581FA2A94'),
	('953CCC9E-B47D-4A7E-9F81-A1597FF2D921', '5768493021', '542D5FE0-DE84-42B8-97F0-9A5C4EE35C9A');


-- Selecionando todos os pacientes
SELECT * FROM dbo.Pacientes;

INSERT INTO
	dbo.Pacientes
VALUES
	('2000-01-01', '391166037', '01318181801', '66FEF22C-34A8-49A7-A670-DE8581FA2A94'),
	('2001-02-02', '473972438', '25319361815', '542D5FE0-DE84-42B8-97F0-9A5C4EE35C9A');



-- Selecionando todos os niveis
SELECT * FROM dbo.NiveisPrioridade;

INSERT INTO 
	dbo.NiveisPrioridade
VALUES
	(NEWID(), 0), -- Rotina
	(NEWID(), 1), -- Exame
	(NEWID(), 2); -- Urgencia



-- Selecionando todas as situasões
SELECT * FROM dbo.Situacoes;

INSERT INTO
	dbo.Situacoes
VALUES
	(NEWID(), 'Pendentes'),
	(NEWID(), 'Realizados'),
	(NEWID(), 'Cancelados');



-- Selecionando todas as clínicas
SELECT * FROM dbo.Clinicas;

INSERT INTO
	dbo.Clinicas
VALUES
	(NEWID(), 'Clínica Médica Vida & Saúde', '12345800190', 'Clínica Médica Vida & Saúde', 'clinica.vidasaude@gmail.com', '66FEF22C-34A8-49A7-A670-DE8581FA2A94'),
	(NEWID(), 'Centro Médico São Paulo', '24567890101', 'Centro Médico São Paulo', 'medico.saopaulo@gmail.com','542D5FE0-DE84-42B8-97F0-9A5C4EE35C9A');
