
# User
## LOGIN USER
- **ENDPOINT** : http://127.0.0.1:8000/user/login/
- **Type**: POST
- **Body** : 
```python
{
  "username": "angelfan5741@gmail.com",
  "password" : "10932ALKJ"
}

```
## RESET USER PASSWORD
- **ENDPOINT** : http://127.0.0.1:8000/user/password-reset/
- **Type**: POST
- **Body** : 
```python
{
  "email":"angelfan5741@gmail.com"
}

```

## RESET- CONFIRM PASSWORD
- **ENDPOINT** : http://127.0.0.1:8000/user/password-reset/MjM/c623t0-66fd36f4754acb32921bb30bde934438/
- **Type**: PUT
- **Body** : 
```python
{"new_password": "10932ALKJ"}
```

## REGISTER USER
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

# GhApi - GitHub integration

## CREATE A CONFIG RECORD
- **ENDPOINT** : `https://127.0.0.1:800/gh/`
- **Type** : POST
- **Body** :
    ```json
        {
            "repo_owner": "Code-Platoon-Curriculum",
            "repo_name": "curriculum"
        }
    ```
- **Response** :
    - Success: HTTP 201
    ```json
        {
            "id": 1,
            "repo_owner": "Code-Platoon-Curriculum",
            "repo_name": "curriculum"
        }
    ```
    - Error: Config already exsts HTTP 400
    ```json
        {
            "detail": "A config already exists."
        }
    ```

## DELETE A CONFIG RECORD - TESTING ONLY
- NOTE: This endpoint is only functional in DEBUG mode
- **ENDPOINT** : `https://127.0.0.1:8000/gh/<record id>/`
- **Type** : DELETE
- **Response** :
    - Success: HTTP 204

## GET A CONFIG RECORD
- NOTE: There should be only 1 record
- **ENDPOINT** : `https://127.0.0.1:8000/gh/<record id>/`
- **Type** : GET
- **Response** :
    - Success: HTTP 200
    ```json
        {
            "id": 1,
            "repo_owner": "Code-Platoon-Curriculum",
            "repo_name": "curriculum"
        }
    ```

    - Error: HTTP 404

    ```json
        {
            "message": "No GhApiConfig matches the given query."
        }
    ```

## GET ALL CONFIG RECORDS
- NOTE: There should be only 1 record
- **ENDPOINT** : `https://127.0.0.1:8000/gh/all/`
- **Type** : GET
- **Response** :
    ```json
        [
            {
                "id": 1,
                "repo_owner": "Code-Platoon-Curriculum",
                "repo_name": "curriculum"
            }
        ]
    ```

## GET CURRICULUM URL
- **ENDPOINT** : `https://127.0.0.1:8000/gh/main/`
- **Type** : GET
- **Response** :
    - Success: HTTP 200
    ```json
        {
            "name": "curriculum",
            "html_url": "https://github.com/Code-Platoon-Curriculum/curriculum"
        }
    ```

## UPDATE A CONFIG RECORD
- **ENDPOINT** : `https://127.0.0.1:8000/gh/<record id>/`
- **Type** : PUT
- **Body** :
    ```json
        {
            "repo_owner": "Code-Platoon-Curriculum",
            "repo_name": "curriculum"
        }
    ```
- **Response** :
    - Success: HTTP 201
    ```json
       {
            "id": 1,
            "repo_owner": "Code-Platoon-Curriculum",
            "repo_name": "curriculum"
        }
    ```