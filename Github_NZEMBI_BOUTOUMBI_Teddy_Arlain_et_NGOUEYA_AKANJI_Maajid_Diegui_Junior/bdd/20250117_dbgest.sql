PGDMP  '    "    	             }            dbgest    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24598    dbgest    DATABASE     x   CREATE DATABASE dbgest WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_Gabon.1252';
    DROP DATABASE dbgest;
                postgres    false            �            1259    24599    commande    TABLE     M  CREATE TABLE public.commande (
    numcom integer NOT NULL,
    datecom date NOT NULL,
    xxx character varying(100),
    nomfour character varying(100),
    numfour numeric,
    adressfour character varying(100) NOT NULL,
    nomprod character varying(100) NOT NULL,
    quantprod integer NOT NULL,
    prixunit bigint NOT NULL
);
    DROP TABLE public.commande;
       public         heap    postgres    false            �          0    24599    commande 
   TABLE DATA           t   COPY public.commande (numcom, datecom, xxx, nomfour, numfour, adressfour, nomprod, quantprod, prixunit) FROM stdin;
    public          postgres    false    215   V       P           2606    24603    commande commande_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.commande
    ADD CONSTRAINT commande_pkey PRIMARY KEY (numcom);
 @   ALTER TABLE ONLY public.commande DROP CONSTRAINT commande_pkey;
       public            postgres    false    215            �   �   x���I� E��)r�T6C�ܥ�$�.[��ט �����G<ld��Gr��� 	˲ ����a��y��zغ�`T���{ضm�4kq�����uF��޾�|��=�ӕ�CJ�8O���Q�u�6�!�y2�Py���5��S�q����R��u���;V!w�Ml��@�y9�r��">�/��     