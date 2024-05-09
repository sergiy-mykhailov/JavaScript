# SQL queries

## Change current schema
```postgresql
SET search_path = "schema-name";
```

## Select from several schema
```postgresql
CREATE OR REPLACE FUNCTION get_data_from_all_schemas(param_user_id int)
   RETURNS TABLE (
     schema_id text,
     project_id int,
     project_name varchar,
     project_value int
   ) AS
 $func$
 BEGIN
   RETURN QUERY EXECUTE (
     SELECT string_agg(
       format(
         'SELECT
           %L AS schema_id,
           project.id AS project_id,
           project.name AS project_name,
           project.value AS project_value,
         FROM %I.project AS project
         WHERE project.user_id = %s',
         schema.id,
         schema.name,
         param_user_id
       ),
       ' UNION ALL '
     )
     FROM (
       SELECT DISTINCT
           schemas.name,
           schemas.id
       FROM default_schema.schema_list AS schemas
     ) AS schema
   );
 END
 $func$ LANGUAGE plpgsql;
 
 SELECT * FROM get_data_from_all_schemas(23);
 
 DROP FUNCTION IF EXISTS get_data_from_all_schemas;
```

## Delete from several schemas
```postgresql
-- Remove migration from all schemas:
DO $$
    BEGIN
        EXECUTE (
            SELECT string_agg(
                format(
                    'DELETE FROM %I.migrations where version = %s;',
                    schema.schema_name,
                    226
                ),
                 E'\n'
            ) FROM (SELECT DISTINCT schema_data.schema_name FROM default_schema.schema_data) AS schema
        );
    END
$$;
```

## Delete from several schemas (with function)
```postgresql
CREATE OR REPLACE FUNCTION delete_disabled_projects_from_several_schemas()
    RETURNS void AS
$func$
BEGIN
    EXECUTE (
        SELECT string_agg(
            format('DELETE FROM %I.project WHERE disabled = TRUE;', schema.schema_name),
            E'\n'
        )
        FROM (SELECT DISTINCT schema_data.schema_name FROM default_schema.schema_data) AS schema
    );
END
$func$ LANGUAGE plpgsql;

SELECT * FROM delete_disabled_projects_from_several_schemas();

DROP FUNCTION IF EXISTS delete_disabled_projects_from_several_schemas;
```

## Change id column from INTEGER to SERIAL
```postgresql
-- table with INTEGER id:
CREATE TABLE foo (id INTEGER PRIMARY KEY, name text);
-- change id column (INTEGER -> SERIAL):
CREATE SEQUENCE foo_id_seq OWNED BY foo.id;
SELECT setval('foo_id_seq', coalesce(max(id), 0) + 1, false) FROM foo;
ALTER TABLE foo ALTER COLUMN id SET DEFAULT nextval('foo_id_seq');
```

## Reset id column sequence (type: SERIAL)
```postgresql
CREATE TABLE user_role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO
    user_role (id, name)
VALUES
    (1, 'User'), (2, 'Admin');

SELECT setval('user_role_id_seq', coalesce(max(id), 0) + 1, false) FROM user_role;
```

## Select recursive (with depth and hierarchical path)
```postgresql
WITH RECURSIVE hierarchical_tree AS (
    SELECT
        tree.id,
        tree.parent_id,
        tree.id::text AS path,
        0 AS depth
    FROM tree
    UNION
    SELECT
        tree.id,
        tree.parent_id,
        concat(hierarchical_tree.path::text, '->', tree.id::text),
        hierarchical_tree.depth + 1
    FROM tree
    INNER JOIN hierarchical_tree ON hierarchical_tree.id = tree.parent_id
)
select * from hierarchical_tree;
```

## Select all nested columns from jsonb (array)
```postgresql
WITH columns_in_jsonb AS (
    SELECT
        '[
          {"id": 1, "role": "COLUMN", "title": "Level 1 - title 1"},
          {"id": 2, "role": "COLUMN", "title": "Level 1 - title 2"},
          {
            "id": 3,
            "role": "GROUP",
            "title": "Level 1 - group 1",
            "columns": [
              {"id": 4, "role": "COLUMN", "title": "Level 2 - title 1"},
              {"id": 5, "role": "COLUMN", "title": "Level 2 - title 2"},
              {
                "id": 6,
                "role": "GROUP",
                "title": "Level 2 - group 1",
                "columns": [
                  {"id": 7, "role": "COLUMN", "title": "Level 3 - title 1"},
                  {"id": 8, "role": "COLUMN", "title": "Level 3 - title 2"}
                ]
              }
            ]
          },
          {"id": 9, "role": "SPACER"}
        ]'::JSONB AS columns
), first_level_column_objects AS (
    SELECT DISTINCT
        jsonb_path_query(columns_in_jsonb.columns, '$[*] ? (@.role == "COLUMN")') as column_object
    FROM columns_in_jsonb
), second_and_other_level_column_objects AS (
    SELECT DISTINCT
        jsonb_path_query(columns_in_jsonb.columns,'$.**.columns[*] ? (@.role == "COLUMN")') as column_object
    FROM columns_in_jsonb
), all_column_objects AS (
    SELECT * FROM first_level_column_objects
    UNION ALL
    SELECT * FROM second_and_other_level_column_objects
)
SELECT
    column_record.*
FROM all_column_objects
CROSS JOIN jsonb_to_record(all_column_objects.column_object)
    AS column_record(id int, role varchar(255), title varchar(255))
;
```

## Select all nested columns from jsonb (object)
```postgresql
WITH columns_in_jsonb AS (
    SELECT
        '{
          "id": 0,
          "title": "root group",
          "role": "GROUP",
          "columns": [
            {"id": 1, "role": "COLUMN", "title": "Level 1 - title 1"},
            {"id": 2, "role": "COLUMN", "title": "Level 1 - title 2"},
            {
              "id": 3,
              "role": "GROUP",
              "title": "Level 1 - group 1",
              "columns": [
                {"id": 4, "role": "COLUMN", "title": "Level 2 - title 1"},
                {"id": 5, "role": "COLUMN", "title": "Level 2 - title 2"},
                {
                  "id": 6,
                  "role": "GROUP",
                  "title": "Level 2 - group 1",
                  "columns": [
                    {"id": 7, "role": "COLUMN", "title": "Level 3 - title 1"},
                    {"id": 8, "role": "COLUMN", "title": "Level 3 - title 2"}
                  ]
                }
              ]
            },
            {"id": 9, "role": "SPACER"}
          ]
        }'::JSONB AS columns
), all_column_objects AS (
    SELECT DISTINCT
        jsonb_path_query(columns_in_jsonb.columns,'$.**.columns[*] ? (@.role == "COLUMN")') as column_object
    FROM columns_in_jsonb
)
SELECT
    column_record.*
FROM all_column_objects
CROSS JOIN jsonb_to_record(all_column_objects.column_object)
    AS column_record(id int, role varchar(255), title varchar(255))
;
```