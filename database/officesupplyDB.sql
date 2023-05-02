PGDMP         ;                {           officesupplyDB    15.2    15.2 D    W           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            X           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            Z           1262    16750    officesupplyDB    DATABASE     r   CREATE DATABASE "officesupplyDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
     DROP DATABASE "officesupplyDB";
                postgres    false            �            1255    16847    update_modified_at_column()    FUNCTION     �   CREATE FUNCTION public.update_modified_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.modified_at = NOW();
  RETURN NEW;
END;
$$;
 2   DROP FUNCTION public.update_modified_at_column();
       public          postgres    false            �            1255    16853    update_total_price_column()    FUNCTION     �   CREATE FUNCTION public.update_total_price_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.totalPrice = NEW.quantity * NEW.price;
  RETURN NEW;
END;
$$;
 2   DROP FUNCTION public.update_total_price_column();
       public          postgres    false            �            1259    16752    customer    TABLE     �  CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    shippingaddress character varying(255) NOT NULL,
    creditcard character varying(255),
    cvv integer,
    expirationdate character varying(255),
    billingaddress character varying(255)
);
    DROP TABLE public.customer;
       public         heap    postgres    false            �            1259    16751    customer_customer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.customer_customer_id_seq;
       public          postgres    false    215            [           0    0    customer_customer_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;
          public          postgres    false    214            �            1259    16761    employee    TABLE     �   CREATE TABLE public.employee (
    employee_id integer NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.employee;
       public         heap    postgres    false            �            1259    16760    employee_employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employee_employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.employee_employee_id_seq;
       public          postgres    false    217            \           0    0    employee_employee_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.employee_employee_id_seq OWNED BY public.employee.employee_id;
          public          postgres    false    216            �            1259    16770 	   inventory    TABLE     ?  CREATE TABLE public.inventory (
    inventory_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    weight numeric NOT NULL,
    price numeric NOT NULL,
    itemgroup character varying(255),
    stock integer,
    image character varying(255),
    warehouse character varying(255)
);
    DROP TABLE public.inventory;
       public         heap    postgres    false            �            1259    16769    inventory_inventory_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inventory_inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.inventory_inventory_id_seq;
       public          postgres    false    219            ]           0    0    inventory_inventory_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.inventory_inventory_id_seq OWNED BY public.inventory.inventory_id;
          public          postgres    false    218            �            1259    16826    order_items    TABLE     �   CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer NOT NULL,
    inventory_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    total_price numeric(10,2) NOT NULL
);
    DROP TABLE public.order_items;
       public         heap    postgres    false            �            1259    16825    order_items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.order_items_id_seq;
       public          postgres    false    227            ^           0    0    order_items_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;
          public          postgres    false    226            �            1259    16779    orders    TABLE     
  CREATE TABLE public.orders (
    order_id integer NOT NULL,
    creationdate character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    deliverydate character varying(255),
    customer_id integer,
    shipping_method character varying(255)
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16778    orders_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.orders_order_id_seq;
       public          postgres    false    221            _           0    0    orders_order_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;
          public          postgres    false    220            �            1259    16842    session    TABLE     �   CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.session;
       public         heap    postgres    false            �            1259    16793    shopping_cart    TABLE     �   CREATE TABLE public.shopping_cart (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    modified_at timestamp without time zone DEFAULT now()
);
 !   DROP TABLE public.shopping_cart;
       public         heap    postgres    false            �            1259    16792    shopping_cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.shopping_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.shopping_cart_id_seq;
       public          postgres    false    223            `           0    0    shopping_cart_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.shopping_cart_id_seq OWNED BY public.shopping_cart.id;
          public          postgres    false    222            �            1259    16807    shopping_cart_items    TABLE     Z  CREATE TABLE public.shopping_cart_items (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    inventory_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    modified_at timestamp without time zone DEFAULT now(),
    totalprice numeric(10,2)
);
 '   DROP TABLE public.shopping_cart_items;
       public         heap    postgres    false            �            1259    16806    shopping_cart_items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.shopping_cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.shopping_cart_items_id_seq;
       public          postgres    false    225            a           0    0    shopping_cart_items_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.shopping_cart_items_id_seq OWNED BY public.shopping_cart_items.id;
          public          postgres    false    224            �           2604    16755    customer customer_id    DEFAULT     |   ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);
 C   ALTER TABLE public.customer ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    215    214    215            �           2604    16764    employee employee_id    DEFAULT     |   ALTER TABLE ONLY public.employee ALTER COLUMN employee_id SET DEFAULT nextval('public.employee_employee_id_seq'::regclass);
 C   ALTER TABLE public.employee ALTER COLUMN employee_id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    16773    inventory inventory_id    DEFAULT     �   ALTER TABLE ONLY public.inventory ALTER COLUMN inventory_id SET DEFAULT nextval('public.inventory_inventory_id_seq'::regclass);
 E   ALTER TABLE public.inventory ALTER COLUMN inventory_id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    16829    order_items id    DEFAULT     p   ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);
 =   ALTER TABLE public.order_items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    16782    orders order_id    DEFAULT     r   ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);
 >   ALTER TABLE public.orders ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    16796    shopping_cart id    DEFAULT     t   ALTER TABLE ONLY public.shopping_cart ALTER COLUMN id SET DEFAULT nextval('public.shopping_cart_id_seq'::regclass);
 ?   ALTER TABLE public.shopping_cart ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    16810    shopping_cart_items id    DEFAULT     �   ALTER TABLE ONLY public.shopping_cart_items ALTER COLUMN id SET DEFAULT nextval('public.shopping_cart_items_id_seq'::regclass);
 E   ALTER TABLE public.shopping_cart_items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            G          0    16752    customer 
   TABLE DATA           �   COPY public.customer (customer_id, firstname, lastname, password, email, shippingaddress, creditcard, cvv, expirationdate, billingaddress) FROM stdin;
    public          postgres    false    215   �U       I          0    16761    employee 
   TABLE DATA           U   COPY public.employee (employee_id, firstname, lastname, email, password) FROM stdin;
    public          postgres    false    217   W       K          0    16770 	   inventory 
   TABLE DATA           w   COPY public.inventory (inventory_id, name, description, weight, price, itemgroup, stock, image, warehouse) FROM stdin;
    public          postgres    false    219   �W       S          0    16826    order_items 
   TABLE DATA           _   COPY public.order_items (id, order_id, inventory_id, quantity, price, total_price) FROM stdin;
    public          postgres    false    227   �c       M          0    16779    orders 
   TABLE DATA           l   COPY public.orders (order_id, creationdate, status, deliverydate, customer_id, shipping_method) FROM stdin;
    public          postgres    false    221   ;d       T          0    16842    session 
   TABLE DATA           4   COPY public.session (sid, sess, expire) FROM stdin;
    public          postgres    false    228   �d       O          0    16793    shopping_cart 
   TABLE DATA           Q   COPY public.shopping_cart (id, customer_id, created_at, modified_at) FROM stdin;
    public          postgres    false    223   k       Q          0    16807    shopping_cart_items 
   TABLE DATA           ~   COPY public.shopping_cart_items (id, cart_id, inventory_id, quantity, price, created_at, modified_at, totalprice) FROM stdin;
    public          postgres    false    225   Ak       b           0    0    customer_customer_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.customer_customer_id_seq', 5, true);
          public          postgres    false    214            c           0    0    employee_employee_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.employee_employee_id_seq', 6, true);
          public          postgres    false    216            d           0    0    inventory_inventory_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.inventory_inventory_id_seq', 48, true);
          public          postgres    false    218            e           0    0    order_items_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.order_items_id_seq', 4, true);
          public          postgres    false    226            f           0    0    orders_order_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.orders_order_id_seq', 1, true);
          public          postgres    false    220            g           0    0    shopping_cart_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.shopping_cart_id_seq', 1, true);
          public          postgres    false    222            h           0    0    shopping_cart_items_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.shopping_cart_items_id_seq', 4, true);
          public          postgres    false    224            �           2606    16759    customer customer_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);
 @   ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_pkey;
       public            postgres    false    215            �           2606    16768    employee employee_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (employee_id);
 @   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_pkey;
       public            postgres    false    217            �           2606    16777    inventory inventory_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (inventory_id);
 B   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_pkey;
       public            postgres    false    219            �           2606    16831    order_items order_items_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_pkey;
       public            postgres    false    227            �           2606    16786    orders orders_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    221            �           2606    16849    session session_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            postgres    false    228            �           2606    16814 ,   shopping_cart_items shopping_cart_items_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.shopping_cart_items
    ADD CONSTRAINT shopping_cart_items_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.shopping_cart_items DROP CONSTRAINT shopping_cart_items_pkey;
       public            postgres    false    225            �           2606    16800     shopping_cart shopping_cart_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT shopping_cart_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.shopping_cart DROP CONSTRAINT shopping_cart_pkey;
       public            postgres    false    223            �           1259    16850    session_expire_index    INDEX     J   CREATE INDEX session_expire_index ON public.session USING btree (expire);
 (   DROP INDEX public.session_expire_index;
       public            postgres    false    228            �           2620    16854 3   shopping_cart_items shopping_cart_items_total_price    TRIGGER     �   CREATE TRIGGER shopping_cart_items_total_price BEFORE INSERT OR UPDATE ON public.shopping_cart_items FOR EACH ROW EXECUTE FUNCTION public.update_total_price_column();
 L   DROP TRIGGER shopping_cart_items_total_price ON public.shopping_cart_items;
       public          postgres    false    230    225            �           2620    16852 7   shopping_cart_items update_shopping_cart_items_modified    TRIGGER     �   CREATE TRIGGER update_shopping_cart_items_modified BEFORE UPDATE ON public.shopping_cart_items FOR EACH ROW EXECUTE FUNCTION public.update_modified_at_column();
 P   DROP TRIGGER update_shopping_cart_items_modified ON public.shopping_cart_items;
       public          postgres    false    229    225            �           2620    16851 .   shopping_cart update_shopping_cart_modified_at    TRIGGER     �   CREATE TRIGGER update_shopping_cart_modified_at BEFORE UPDATE ON public.shopping_cart FOR EACH ROW EXECUTE FUNCTION public.update_modified_at_column();
 G   DROP TRIGGER update_shopping_cart_modified_at ON public.shopping_cart;
       public          postgres    false    229    223            �           2606    16837 )   order_items order_items_inventory_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_inventory_id_fkey FOREIGN KEY (inventory_id) REFERENCES public.inventory(inventory_id);
 S   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_inventory_id_fkey;
       public          postgres    false    3491    227    219            �           2606    16832 %   order_items order_items_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);
 O   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_order_id_fkey;
       public          postgres    false    227    3493    221            �           2606    16787    orders orders_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);
 H   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_customer_id_fkey;
       public          postgres    false    215    3487    221            �           2606    16801 ,   shopping_cart shopping_cart_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT shopping_cart_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);
 V   ALTER TABLE ONLY public.shopping_cart DROP CONSTRAINT shopping_cart_customer_id_fkey;
       public          postgres    false    223    3487    215            �           2606    16815 4   shopping_cart_items shopping_cart_items_cart_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.shopping_cart_items
    ADD CONSTRAINT shopping_cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.shopping_cart(id);
 ^   ALTER TABLE ONLY public.shopping_cart_items DROP CONSTRAINT shopping_cart_items_cart_id_fkey;
       public          postgres    false    225    3495    223            �           2606    16820 9   shopping_cart_items shopping_cart_items_inventory_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.shopping_cart_items
    ADD CONSTRAINT shopping_cart_items_inventory_id_fkey FOREIGN KEY (inventory_id) REFERENCES public.inventory(inventory_id);
 c   ALTER TABLE ONLY public.shopping_cart_items DROP CONSTRAINT shopping_cart_items_inventory_id_fkey;
       public          postgres    false    225    219    3491            G   o  x���Mo�0�s����
7ѽ$:�����B�Ղ"��+�%���M����I!�)��q ��:>ٚߧ��x��dmÔ�f��d�Β��No�߬<,X�1��6aBrL�09�* 2-�Y2��`@5�R_b�����"�jp��(M�N)e���=jVgP�2Ȍ����
N�IQ��mDO�eBxIUs!c�m fQ��Rݻ���EI1�5�X�ے6��!�K�Y�AV��iT�O��q�k��(R
�$�S�]�2����70��YȪW?q�i���?��r�P�������nb$�'5N�hP�auȓR�p�`I<�\��B�fށ�64��b�'@��Gd�;C;5M�G~��      I   �   x���Ik�0�����Yx���LҦ.N#�ҋd?d!ɖ�=��!����s�"��k�J�^����+C��B� 
Æ9�����l��"�jܬ�VGJ��z*ٸ�Ͼ9?��Δ뤣$�{��~���' ��D8�Ks��xeU��#����yK�����Gg
+��0�];�YU�㔵���Mw*Y�U�]>�H��'�E	!�pL�A      K   �  x��ZMs�6=ӿ���*K%R��c�$�-;qœ�e/ 	I�H����_���"ei��˔�����͉�'���d�O�ڈ��ڊ���6�bצ0�NDN;	-���7"k�XZQ5eil}-d�gS�2Δ�(���R��j�_U&bY����p�8�΃p�/��/�O&��jc�J��j<�T�B|JU��K��ֽ�>dz�)i�JqY�����X-Ke���u5���U5��B��<����N�AX���,�Y�R���X��LV5�q�I�����e6�\�J���M����=:�2>�2V(Y ��r�>�J����J�A$&3����E^̓;���J�L<*Yo�_�*ij�U�r�I�V�ɝ鱺�HCNw�T8	�N��hJQ1�LDW��o��t9P���ೕ��(}��ɂO��D����YSwH���hS�Q�ߩ�S�����T�d�/����AF�`��3 ����g�ӳ��ae�����H��[���H�ӹ��Z4{�Fë��q�����������G�p�V�T�%.���J�(F�7Y�i��0e�/�[����,�p��d��W�� !��'x��{�3]�x�c�1z���^�
Qeee?�7Ug#��я`�EEd�'�W}��Z!�Jw0��78��0~S	�f��?�W+!)@{���/�Bd�N`��s4ͺ}�5&w��@�����p��"zo���L��I-��3x���7!|�`���~��d��l�}O�9� |��%��F���d��1�gUT���)��Y�%��C%��?�P9��F��h��HZ����Z&�V��`2�aD8�#������g���:��/�Y<���͐2����:��E6�|�U+�9e#�c1߈<��������K��Hl.�[U'�#�S�Z��Y� z�����w��K~1����v$�E��c�/�}'��D��(�l�U�l�Qn��;��l(zT�ZiPc�+?1�n�oN�#�Q��/,3m`$1�`��H85�B����N�Î�@�pG6~���\�Z�K��)��=����䥩4�����,�����	���{2��	�/ucӃ`���F`�*�2F4�2��x�����С���� PȎ��C���J�:G���4	4SQ����ٸ��"���o��vD��l�>�h��k����o�����^��:��UC��n�1Jң�a��I�C.��:Hr�I�If�XK_D`e~99�+ܠ��P��(�AP(��Z"i��w���^+������E�//�(=�2�b4�%%�S�*����j���ҧ�N��EUL䓚c`'�g�Q8 6�/�{�D�.��g>,G���w�ji.�4uj�E.�K�WUE����D7�K���0Skz���z��4�F�dV"昇���[�]�Ź� �Ȫ(I��9���#����Gh�i��@��B��]�$��I�N��wMō��U��sj�&䓘���k�CQ�V$���3D�8X,�:<'9)?[�e�Z�k�[�ERS��h�@���mYnbr�n�Be���ؽ�m��[Q���PB7�îj��kTA�RS��ׅc/�:�+�{^�0�"d{9y�s�{�؛�yc �(�����V\6�Қ��=C�,�(��i��=r�.�PX�F�9R��ɲ<��,k.�a�m���ȨI������IOA�������Q�(�[�北z��Us)���P�� �X*��!�5>�}@ _������κ��|�y E�5�(pT}����G3�����1X�28N����U��~?s�5�32cרm�"l\X�����������x�˻_��>��ZU���󧠚;��Bq]k�6M��4�m�a�h�LtZ���<ʱ�2�N�R�<�7����3�FO������,�����lG���'5��;��˨Y�X��<E�V���VKԪx�o�<��?s��
A̡Pv���Db�aO(ٜ��_	*���5�D��t�.��Z���-�����/��o}�׃}�K��h�ʊS=+��������� ����>���j�h��ra�"���Sd��^uQ��v�^EEޯC��Y #���݋N���x[�G�Z�OGw��
���;��m���-�I��+U��^�J�D~<Q���L"5-�_�p��i�|�z��өMF�R��n�r�m³�ޠe�ū*E�nT���M�ܸ�=H%f�x5�5P�G�n܆h��f0�Z�A�x��@����-�xp	p�[��H�hv#��B�0Ũ6{�_?+�B2dr�j��qg#kj���+�T87�f�}v�r��U��� �2��;�:��?ݎ�@���x���q���Z[�흲���o����Fyz�NA1��/~^J!�[l��]HH�^"���^���#F%|���"�T���ӛQ�����mp�p��Or�����ś��Ʃr~����B�|�ed}�@Y �Q�lt��,�U�J8��6�H��
�c$�=�U���<_�PC&��*���}W���{l����0����d� m���h�8�.�L��Aq�����F*@��,���!0��sYx5��&&S�feɓT?��y������#����;:K ���������w�5ȸR���Pk9O|N��EY��(7�.U ƎQ�M�v�p=i��[7�Cyʓ�/2�8�t�$�+�� �8.9�!%�!��E"�G��v�o|���d���Z�W_�&�G���
�I?�F��Kݎ[�B@�MS�n�d�������C�����4ٔ������~^��ex��l�a�"'e�b��>N0Iw�_�;�.D�_d	�������/
��Fe�������5PƢ'Zw:�]� 1��ǩ��PE�?!��Zl�R�Ї1ſ�h1���7�W%ŝ\W�����R��A�\e���e�$kPZ�����*�[��#>�����o>���O:A1%_�II_�::"�>;wgJwuNÅ�CIc9�3��A<P/��a��7��f߸���e�y�~}�m�}��*�E��ů��@�;������)�      S   :   x�3�4C#KK=KK(�e�bs�(��2�4 A�e2�	�U��qqq X��      M   ?   x�3�4202�50�50R04�25�24�33�47
�s��d�s��q�r��&gs��qqq St�      T   i  x���I��� �u��\x8�0((��x�VY������/�$�M*_q�XM?���$�wܖW�z� ����PVN}`~�m��y����yݢ�NT�co�����+��,>��0B��c�B~��r|������gI�������(�:G�w�����H����$��G���x���4����(������n���k��ԡ�Ցk׾�ǻ��o�P� ntj��'�:�˥�����u�k�r�J1b�1����d	�Og	�����@��H��t�2Do���ٺ|0���kTwU&7��܉�Y�e��B{��Z�.���ݾ%�B�p�S�=���P�m-8�ϷȾ�g4����C��NE3�#�wW�l�+��&���pzI#ӿ3���	��_���p&Z%]Y��k+�خ��wd�w�;�'���9)�N�N5!�����|I|c���>����=>aʃY�`�����XE��;d߈�Q��ib%��}^�
v\�ކPo���:�Ε���?�����W�	��Q�_]�1	�g�>��ޯ�����M2N<���SGt��r"�P(g�I�١{�"�������Y&��v�l:i��Ku�6���.��}��&�#���E��I��CN�]�2v-�uf��d��ƒNM���h���8��x�[;OU���'4ŝ�~��~�G�#��S�!�t7�trx%�|q�?��ϕ���B����0��Rt��48��$���EhW���z��,t�&'�/Y!^� �C���}`ʎ�X,�T��M�x̖1K�1�er}�\Wi�Jkx8Н��b�(��x�f��q
l� 0]�C�l�ϽW4= VAh�Y���A2�맲oD�(�Yۗ"�`H��I�������w~LJ�9{Ϩ%AM-���P�1���_�&����I��z1N��<�U�2zj��%�	��,��}=�ld��U`0ת�se8�d��YG�-����!Ǜ������=B� Ù-#��;2ZU��=pLi�PSVi�qۈk��9��g/���l�������66<J��������J��5�W>�z� �@i����$�$�j[lx��S�kyQV�z��@�89=�4p�>�|8�:ǈ��Gb�UvX6�\������l�]�X�U��&�.�8�*�����K�f�����@ Hx �����k"���h�b"�LkO=�o�M��Qfa!�w{��n�%��"����G��D�\���lz�A�#�־�7d��!���F&:�j�z<J��y2�K@L��q���g��a�ݠ��p��;X�D�}�l�	�K�E+�&�}�?n�{b�FY�J�o�M�Ͼd�����]=�#�M<��7$C�0~>��++:=�נ^ee�
��ֻ�w:�{J]�g|�G2@��2zj|��񶤒�Hd"���{N(��.Q�"�\N.0��h�!<gn!����|~r�c9�l1?:F�[d�cs�1[\V���0+5/��{!t���8y��~E 5�ۦ_�s��S%����l�Ǔr�o���	efO��l�}�(�s���3� ֒��x.�r,4�D�se����]�8�4�䮋󎰨�(q���4D�ժ�ά�_2z��K��%A�}K�      O   .   x�3�4�4202�50�50R04�25�2��35�47��#����� r��      Q      x������ � �     