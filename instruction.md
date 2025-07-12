###



### Commands to create common module

```bash
nest generate library common
```

To create another common module within same common module

```bash
nest generate module database -p common
```


NOTES 

- `Joi` to validate the schema
- `ConfigModule` for env setup