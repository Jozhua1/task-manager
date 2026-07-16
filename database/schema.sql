--
-- PostgreSQL database dump
--

\restrict fdxUODC0mgJXowy5kInKfwYG4xSs3wx06W0pkH5XAkGouNh5IwDV7wUSG3VfZca

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-16 23:37:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16392)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    completed boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16391)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO postgres;

--
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 219
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 4858 (class 2604 OID 16395)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- TOC entry 5012 (class 0 OID 16392)
-- Dependencies: 220
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, title, description, completed, created_at, updated_at) FROM stdin;
10	Complete React Login Page	Finish the responsive login UI and connect it to the backend API.	f	2026-07-16 22:43:16.103542	2026-07-16 22:43:19.983355
11	Fix Search Bug	Search bar doesn't update results until refresh.	f	2026-07-16 22:43:41.481086	2026-07-16 22:43:41.481086
14	Deploy Backend to Render	Configure environment variables and verify deployment.	f	2026-07-16 22:50:04.63483	2026-07-16 22:50:04.63483
13	Update Documentation	Add API endpoints and setup instructions to the README.	t	2026-07-16 22:48:03.409247	2026-07-16 22:50:09.025993
12	Review Pull Request #12	Check code quality and approve the authentication changes.	t	2026-07-16 22:43:51.276512	2026-07-16 22:50:12.721818
15	Design Dashboard UI	Create wireframes for the analytics dashboard.	f	2026-07-16 22:52:03.02702	2026-07-16 22:52:03.02702
16	Backup Project Files	Push latest changes to GitHub and create a local backup.	f	2026-07-16 22:52:36.651189	2026-07-16 22:52:36.651189
\.


--
-- TOC entry 5021 (class 0 OID 0)
-- Dependencies: 219
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 16, true);


--
-- TOC entry 4863 (class 2606 OID 16403)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 220
-- Name: TABLE tasks; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.tasks TO taskuser;


--
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 219
-- Name: SEQUENCE tasks_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.tasks_id_seq TO taskuser;


--
-- TOC entry 2053 (class 826 OID 16405)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO taskuser;


--
-- TOC entry 2052 (class 826 OID 16404)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO taskuser;


-- Completed on 2026-07-16 23:37:33

--
-- PostgreSQL database dump complete
--

\unrestrict fdxUODC0mgJXowy5kInKfwYG4xSs3wx06W0pkH5XAkGouNh5IwDV7wUSG3VfZca

