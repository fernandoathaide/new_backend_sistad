-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.1-beta
-- PostgreSQL version: 10.0
-- Project Site: pgmodeler.com.br
-- Model Author: ---


-- Database creation must be done outside an multicommand file.
-- These commands were put in this file only for convenience.
-- -- object: new_database | type: DATABASE --
-- -- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database
-- ;
-- -- ddl-end --
-- 

-- object: public.tb_posto_graduacao | type: TABLE --
-- DROP TABLE IF EXISTS public.tb_posto_graduacao CASCADE;
CREATE TABLE public.tb_posto_graduacao(
	id_posto_graduacao bigint NOT NULL,
	sg_posto varchar(20) NOT NULL,
	nr_posto_graduacao varchar(10) NOT NULL,
	cd_hrq varchar(2) NOT NULL,
	sg_icaer varchar(20) NOT NULL,
	CONSTRAINT pk_id_posto_graduacao PRIMARY KEY (id_posto_graduacao)

);
-- ddl-end --
COMMENT ON TABLE public.tb_posto_graduacao IS 'Tabela de postos/graduação para oficiais e graduados da aeronautica.';
-- ddl-end --
COMMENT ON COLUMN public.tb_posto_graduacao.sg_posto IS 'Sigla do posto';
-- ddl-end --
ALTER TABLE public.tb_posto_graduacao OWNER TO postgres;
-- ddl-end --

-- object: public.tb_cargo_funcao_relevante | type: TABLE --
-- DROP TABLE IF EXISTS public.tb_cargo_funcao_relevante CASCADE;
CREATE TABLE public.tb_cargo_funcao_relevante(
	id_cfr bigint NOT NULL,
	sigla_cfr varchar(20) NOT NULL,
	descricao_cfr varchar(100) NOT NULL,
	CONSTRAINT pk_id_crf PRIMARY KEY (id_cfr)

);
-- ddl-end --
COMMENT ON TABLE public.tb_cargo_funcao_relevante IS 'Tabela de cargos e funções relevantes';
-- ddl-end --
ALTER TABLE public.tb_cargo_funcao_relevante OWNER TO postgres;
-- ddl-end --

-- object: public.tb_turma | type: TABLE --
-- DROP TABLE IF EXISTS public.tb_turma CASCADE;
CREATE TABLE public.tb_turma(
	id_turma bigint NOT NULL,
	dt_formacao_turma date NOT NULL,
	fk_id_quadro bigint NOT NULL,
	CONSTRAINT pk_id_turma PRIMARY KEY (id_turma)

);
-- ddl-end --
ALTER TABLE public.tb_turma OWNER TO postgres;
-- ddl-end --

-- object: public.tb_om | type: TABLE --
-- DROP TABLE IF EXISTS public.tb_om CASCADE;
CREATE TABLE public.tb_om(
	id_om bigint NOT NULL,
	nome_om smallint NOT NULL,
	sg_om varchar(10) NOT NULL,
	st_extinta char(1) NOT NULL,
	CONSTRAINT pk_id_om PRIMARY KEY (id_om)

);
-- ddl-end --
ALTER TABLE public.tb_om OWNER TO postgres;
-- ddl-end --

-- object: public.log_acoes_sistema | type: TABLE --
-- DROP TABLE IF EXISTS public.log_acoes_sistema CASCADE;
CREATE TABLE public.log_acoes_sistema(
	id_log bigint NOT NULL,
	fk_id_pessoa bigint,
	acao varchar(500) NOT NULL,
	fk_id_perfil bigint NOT NULL,
	dt_ultimo_acesso timestamp NOT NULL,
	CONSTRAINT pk_id_log PRIMARY KEY (id_log)

);
-- ddl-end --
ALTER TABLE public.log_acoes_sistema OWNER TO postgres;
-- ddl-end --

-- object: public.tb_pessoa_fisica | type: TABLE --
-- DROP TABLE IF EXISTS public.tb_pessoa_fisica CASCADE;
CREATE TABLE public.tb_pessoa_fisica(
	nr_ordem bigint NOT NULL,
	fk_id_posto bigint NOT NULL,
	fk_id_quadro bigint NOT NULL,
	fk_id_om bigint NOT NULL,
	fk_id_cfr bigint NOT NULL,
	fk_id_perfil bigint NOT NULL,
	fk_id_turma bigint NOT NULL,
	nome_pessoa varchar(150) NOT NULL,
	nome_guerra varchar(50) NOT NULL,
	nr_ident_aer varchar(8),
	dt_nascimento date NOT NULL,
	nr_antig integer NOT NULL,
	nr_antig_sigpes integer NOT NULL,
	vl_med_cfr double precision,
	CONSTRAINT pk_nr_ordem PRIMARY KEY (nr_ordem)

);
-- ddl-end --
ALTER TABLE public.tb_pessoa_fisica OWNER TO postgres;
-- ddl-end --

-- object: public.tb_perfil | type: TABLE --
-- DROP TABLE IF EXISTS public.tb_perfil CASCADE;
CREATE TABLE public.tb_perfil(
	id_perfil bigint NOT NULL,
	descricao varchar(100) NOT NULL
);
-- ddl-end --
COMMENT ON COLUMN public.tb_perfil.descricao IS 'Ativa, Reserva, Graduado, Oficial...';
-- ddl-end --
ALTER TABLE public.tb_perfil OWNER TO postgres;
-- ddl-end --

-- object: public.tb_posto | type: TABLE --
-- DROP TABLE IF EXISTS public.tb_posto CASCADE;
CREATE TABLE public.tb_posto(
	id_posto bigint NOT NULL,
	dsc_posto varchar(100) NOT NULL,
	CONSTRAINT pk_id_posto PRIMARY KEY (id_posto)

);
-- ddl-end --
ALTER TABLE public.tb_posto OWNER TO postgres;
-- ddl-end --

-- object: public.tb_quadro | type: TABLE --
-- DROP TABLE IF EXISTS public.tb_quadro CASCADE;
CREATE TABLE public.tb_quadro(
	id_quadro bigint NOT NULL,
	dsc_quadro varchar(100) NOT NULL,
	CONSTRAINT pk_id_quadro PRIMARY KEY (id_quadro)

);
-- ddl-end --
ALTER TABLE public.tb_quadro OWNER TO postgres;
-- ddl-end --

-- object: fk_id_pessoa_fisica | type: CONSTRAINT --
-- ALTER TABLE public.log_acoes_sistema DROP CONSTRAINT IF EXISTS fk_id_pessoa_fisica CASCADE;
ALTER TABLE public.log_acoes_sistema ADD CONSTRAINT fk_id_pessoa_fisica FOREIGN KEY (fk_id_pessoa)
REFERENCES public.tb_pessoa_fisica (nr_ordem) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_perfil | type: CONSTRAINT --
-- ALTER TABLE public.log_acoes_sistema DROP CONSTRAINT IF EXISTS fk_id_perfil CASCADE;
ALTER TABLE public.log_acoes_sistema ADD CONSTRAINT fk_id_perfil FOREIGN KEY (fk_id_perfil)
REFERENCES public.tb_perfil (id_perfil) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_om | type: CONSTRAINT --
-- ALTER TABLE public.tb_pessoa_fisica DROP CONSTRAINT IF EXISTS fk_id_om CASCADE;
ALTER TABLE public.tb_pessoa_fisica ADD CONSTRAINT fk_id_om FOREIGN KEY (fk_id_om)
REFERENCES public.tb_om (id_om) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_cfr | type: CONSTRAINT --
-- ALTER TABLE public.tb_pessoa_fisica DROP CONSTRAINT IF EXISTS fk_id_cfr CASCADE;
ALTER TABLE public.tb_pessoa_fisica ADD CONSTRAINT fk_id_cfr FOREIGN KEY (fk_id_cfr)
REFERENCES public.tb_cargo_funcao_relevante (id_cfr) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_turma | type: CONSTRAINT --
-- ALTER TABLE public.tb_pessoa_fisica DROP CONSTRAINT IF EXISTS fk_id_turma CASCADE;
ALTER TABLE public.tb_pessoa_fisica ADD CONSTRAINT fk_id_turma FOREIGN KEY (fk_id_turma)
REFERENCES public.tb_turma (id_turma) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_perfil | type: CONSTRAINT --
-- ALTER TABLE public.tb_pessoa_fisica DROP CONSTRAINT IF EXISTS fk_id_perfil CASCADE;
ALTER TABLE public.tb_pessoa_fisica ADD CONSTRAINT fk_id_perfil FOREIGN KEY (fk_id_perfil)
REFERENCES public.tb_perfil (id_perfil) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_quadro | type: CONSTRAINT --
-- ALTER TABLE public.tb_pessoa_fisica DROP CONSTRAINT IF EXISTS fk_id_quadro CASCADE;
ALTER TABLE public.tb_pessoa_fisica ADD CONSTRAINT fk_id_quadro FOREIGN KEY (fk_id_quadro)
REFERENCES public.tb_quadro (id_quadro) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_posto | type: CONSTRAINT --
-- ALTER TABLE public.tb_pessoa_fisica DROP CONSTRAINT IF EXISTS fk_id_posto CASCADE;
ALTER TABLE public.tb_pessoa_fisica ADD CONSTRAINT fk_id_posto FOREIGN KEY (fk_id_posto)
REFERENCES public.tb_posto (id_posto) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


