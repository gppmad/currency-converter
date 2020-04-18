-- public.currencies definition

-- Drop table

-- DROP TABLE public.currencies;

CREATE TABLE public.currencies (
	"label" varchar NULL,
	value varchar NULL,
	id int4 NOT NULL,
	CONSTRAINT currencies_pk PRIMARY KEY (id)
);