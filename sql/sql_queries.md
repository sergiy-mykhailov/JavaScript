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

