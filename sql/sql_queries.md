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

## Get hierarchical JSON from flat table (recursive function)
```postgresql
CREATE TEMP TABLE temp_table_with_tree(id int, parent_id int, name text);

INSERT INTO temp_table_with_tree VALUES
                  (1, null, 'node-1'),
                  (2, 1, 'node-1.1'),
                  (3, 2, 'node-1.1.1'),
                  (4, 2, 'node-1.1.2'),
                  (5, 1, 'node-1.2'),
                  (6, 5, 'node-1.2.1'),
                  (7, 5, 'node-1.2.2'),
                  (8, 1, 'node-1.3'),
                  (9, null, 'node-2'),
                  (10, 9, 'node-2.1'),
                  (11, 10, 'node-2.1.1'),
                  (12, 10, 'node-2.1.2'),
                  (13, 9, 'node-2.2'),
                  (14, 13, 'node-2.2.1'),
                  (15, 13, 'node-2.2.2');

SELECT * FROM temp_table_with_tree;

CREATE OR REPLACE FUNCTION build_hierarchical_object(param_parent_id int) RETURNS SETOF jsonb AS $$
    SELECT
        case
            when count(x) > 0 then jsonb_build_object('id', temp_table_with_tree.id, 'name', temp_table_with_tree.name, 'children', jsonb_agg(f.x))
            else jsonb_build_object('id', temp_table_with_tree.id, 'name', temp_table_with_tree.name)
            end
    FROM temp_table_with_tree
        LEFT JOIN build_hierarchical_object(temp_table_with_tree.id) AS f(x) ON TRUE
    WHERE temp_table_with_tree.parent_id = param_parent_id OR (param_parent_id IS NULL AND temp_table_with_tree.parent_id IS NULL )
    GROUP BY temp_table_with_tree.id, temp_table_with_tree.name
    ORDER BY temp_table_with_tree.name;
$$ LANGUAGE sql;

SELECT jsonb_pretty(build_hierarchical_object) FROM build_hierarchical_object(null::int);

DROP TABLE IF EXISTS temp_table_with_tree;
```

### Result for node-1:
```json
{
    "id": 1,
    "name": "node-1",
    "children": [
        {
            "id": 2,
            "name": "node-1.1",
            "children": [
                {
                    "id": 3,
                    "name": "node-1.1.1"
                },
                {
                    "id": 4,
                    "name": "node-1.1.2"
                }
            ]
        },
        {
            "id": 5,
            "name": "node-1.2",
            "children": [
                {
                    "id": 6,
                    "name": "node-1.2.1"
                },
                {
                    "id": 7,
                    "name": "node-1.2.2"
                }
            ]
        },
        {
            "id": 8,
            "name": "node-1.3"
        }
    ]
}
```

## Export/import table to/from CSV
```postgresql
-- export table to csv:
COPY [Table Name] TO '[File Name]' DELIMITER ',' CSV HEADER;

-- export query result to csv:
COPY ([Query]) TO '[File Name]' DELIMITER ',' CSV HEADER;

-- import csv to table:
COPY [Table Name](Optional Columns)
    FROM '[Absolute Path to File]'
    DELIMITER '[Delimiter Character]' CSV [HEADER];
```
