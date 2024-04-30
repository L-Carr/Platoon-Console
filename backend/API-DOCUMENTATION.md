
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

## GET A WEEK URL
- NOTE: Keep it simple - use the week number to search
- **ENDPOINT** : `https://127.0.0.1:8000/gh/<week str>/`
- **Type** : GET
- **Response** :
    - Success: HTTP 200
    ```json
        {
            "week_name": "7-Django",
            "week_html_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django",
            "day_one_name": "1-intro-to-django-orm",
            "day_one_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django/1-intro-to-django-orm",
            "day_two_name": "2-validators-and-serializers",
            "day_two_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django/2-validators-and-serializers",
            "day_three_name": "3-associations-and-django-server",
            "day_three_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django/3-associations-and-django-server",
            "day_four_name": "4-api-views-and-testing",
            "day_four_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django/4-api-views-and-testing",
            "day_five_name": "5-back-end-apis",
            "day_five_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django/5-back-end-apis",
            "day_six_name": "6-create-read-update-delete",
            "day_six_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django/6-create-read-update-delete",
            "day_seven_name": "7-user-authentication",
            "day_seven_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django/7-user-authentication",
            "day_eight_name": "8-review",
            "day_eight_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django/8-review",
            "cheatsheets_name": "CheatSheets",
            "cheatsheets_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django/CheatSheets",
            "resources_name": "Resources",
            "resources_url": "https://github.com/Code-Platoon-Curriculum/curriculum/tree/main/7-Django/Resources"
        }

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

# Demo
## UPDATE A DEMO RECORD
- NOTE: Valid options: 'to do', 'on deck', 'complete'
- **ENDPOINT** : `https://127.0.0.1:8000/demo/student/<student_id>/`
- **Type** : PUT
- **Body** :
    ```json
        {
            "status":"on deck"
        }
    ```
- **Response** :
    - Success: HTTP 201
    ```json
        {
            "id": 1,
            "student": "dj.mann78@yahoo.com",
            "cohort": "Whiskey",
            "status": "on deck"
        }
    ```
    - Error: HTTP 400
    ```json
        {
            "status": [
                "Value must be 'to do', 'on deck', or 'complete'.",
                "Ensure this field has no more than 10 characters."
            ]
        }
    ```