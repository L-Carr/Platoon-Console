
# LOGIN USER
- **ENDPOINT** : http://127.0.0.1:8000/user/login/
- **Type**: POST
- **Body** : 
```python
{
  "username": "angelfan5741@gmail.com",
  "password" : "10932ALKJ"
}

```
# RESET USER PASSWORD
- **ENDPOINT** : http://127.0.0.1:8000/user/password-reset/
- **Type**: POST
- **Body** : 
```python
{
  "email":"angelfan5741@gmail.com"
}

```

# RESET- CONFIRM PASSWORD
- **ENDPOINT** : http://127.0.0.1:8000/user/password-reset/MjM/c623t0-66fd36f4754acb32921bb30bde934438/
- **Type**: PUT
- **Body** : 
```python
{"new_password": "10932ALKJ"}
```

# REGISTER USER
- **ENDPOINT** : http://127.0.0.1:8000/user/register/
- **Type**: PUT
- **Body** : 
```python
{"email" : "angelfan5741@gmail.com",
"cohort_code": "TYZIAI",
 "password" : "123456",
 "phone_number": 951653911,
 "last_name": "Doe",
 "first_name": "Jane"
}
```




You've reached Platoon.Console Support,

You have requested a password reset. Please click the link below to reset your password. If you did not request this, please ignore this email. http://127.0.0.1:8000/user/password-reset/MjM/c623t0-66fd36f4754acb32921bb30bde934438/