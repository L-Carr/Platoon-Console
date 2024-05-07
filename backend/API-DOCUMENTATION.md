
# User
## LOGIN USER
- **ENDPOINT** : http://127.0.0.1:8000/user/login/
- **Type**: POST
- **Body** : 
```json
{
  "username": "user@email.com",
  "password" : "10932ALKJ"
}

```
## RESET USER PASSWORD
- **ENDPOINT** : http://127.0.0.1:8000/user/password-reset/
- **Type**: POST
- **Body** : 
```json
{
  "email":"user@email.com"
}

```

## RESET- CONFIRM PASSWORD
- **ENDPOINT** : http://127.0.0.1:8000/user/password-reset/MjM/c623t0-66fd36f4754acb32921bb30bde934438/
- **Type**: PUT
- **Body** : 
```json
{"new_password": "10932ALKJ"}
```

## REGISTER USER
- **ENDPOINT** : http://127.0.0.1:8000/user/register/
- **Type**: PUT
- **Body** : 
```json
{"email" : "user@email.com",
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
- **Permissions** : Instructor
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
- **Permissions** : Instructor
- **Response** :
    - Success: HTTP 204


## GET A CONFIG RECORD
- NOTE: There should be only 1 record
- **ENDPOINT** : `https://127.0.0.1:8000/gh/<record id>/`
- **Type** : GET
- **Permissions** : Instructor
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
- **Permissions** : Instructor
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
- **Permissions** : Student
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
- **ENDPOINT** : `https://127.0.0.1:8000/gh/week/<week str>/`
- **Type** : GET
- **Permissions** : Student
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
- **Permissions** : Instructor
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

## RESET COHORT DEMO RECORDS
- NOTE: This changes the status to 'to do' for all records in the cohort
- **ENDPOINT** : `https://127.0.0.1:8000/demo/reset/<cohort_name>/`
- **Type** : PUT
- **Permissions** : Instructor
- **Response** :
    - Success: 201
    ```json
        [
            {
                "id": 1,
                "student": "user@email.com",
                "cohort": "Whiskey",
                "status": "to do"
            }
        ] 
    ```

## RESET COHORT TEAM DEMO RECORDS
- NOTE: This changes the status to 'to do' for all records in the cohort
- **ENDPOINT** : `https://127.0.0.1:8000/demo/resetteams/<cohort_name>/`
- **Type** : PUT
- **Permissions** : Instructor
- **Response** :
    - Success: 201
    ```json
        [
            {
                "id": 1,
                "cohort": "Whiskey",
                "status": "to do",
                "team": 1
            }
        ]
    ```

## VIEW ALL COHORT DEMO RECORDS
- NOTE: This endpoint is obsolete.  Use the POST Method to the same endpoint to ensure records are updated.  The POST method returns all of the cohort records after update.
- **ENDPOINT** : `https://127.0.0.1:8000/demo/all/<cohort_name>/`
- **Type** : GET
- **Permissions** : Student
- **Response** :
    - Success: 200
    ```json
        [
            {
                "id": 1,
                "student": "user@email.com",
                "cohort": "Whiskey",
                "status": "on deck"
            }
        ]
    ```

## VIEW ALL DEMO RECORDS
- **ENDPOINT** : `https://127.0.0.1:8000/demo/all/`
- **Type** : GET
- **Permissions** : Instructor
- **Response** :
    - Success: 200
    ```json
        [
            {
                "id": 1,
                "student": "user@email.com",
                "cohort": "Whiskey",
                "status": "on deck"
            }
        ]
    ```

## VIEW STUDENT DEMO RECORD
- NOTE: This endpoint is currently not used.  This will be marked as obsolete if no use-case is identified.
- **ENDPOINT** : `https://127.0.0.1:8000/demo/student/<student_id>/`
- **Type** : GET
- **Permissions** : Instructor
- **Response** :
    - Success: 200
    ```json
        {
            "id": 1,
            "student": "user@email.com",
            "cohort": "Whiskey",
            "status": "on deck"
        }
    ```

## VIEW TEAM DEMO RECORD
- **ENDPOINT** : `https://127.0.0.1:8000/demo/team/<team_id>`
- **Type** : GET
- **Permission** : Instructor
- **Response** : 
    - Success: 200
    ```json
        {
            "id": 1,
            "cohort": "Whiskey",
            "status": "to do",
            "team": 1
        }
    ```

## UPDATE ALL COHORT STUDENT DEMO RECORDS
- NOTE: This endpoint only creates records for students in a cohort who do not have a demo record.  This method returns all demo records in the cohort (after creation).
- **ENDPOINT** : `https://127.0.0.1:8000/demo/all/<cohort_name>/`
- **Type** : POST
- **Permissions** : Student
- **Response** :
    - Success: 201
    ```json
        [
            {
                "id": 1,
                "student": "user@email.com",
                "cohort": "Whiskey",
                "status": "on deck",
                "first_name": "Boba",
                "last_name": "Fett"
            }
        ]
    ```

## UPDATE ALL COHORT TEAM DEMO RECORDS
- NOTE: This endpoint only creates records for teams in a cohort who do not have a demo record.  This method returns all demo records in the cohort (after creation).
- **ENDPOINT** : `https://127.0.0.1:8000/demo/teams/<cohort_name>/`
- **Type** : POST
- **Permissions** : Student
- **Response** :
    - Success: 201
    ```json
        [
            {
                "id": 1,
                "cohort": "Whiskey",
                "status": "to do",
                "team": 1,
                "team_name": "Platoon Console"
            }
        ]
    ```

## UPDATE A STUDENT DEMO RECORD
- NOTE: Valid options: 'to do', 'on deck', 'complete'
- **ENDPOINT** : `https://127.0.0.1:8000/demo/student/<student_id>/`
- **Type** : PUT
- **Permissions** : Instructor
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
            "student": 1,
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
## UPDATE A TEAM DEMO RECORD
- NOTE: Valid options: 'to do', 'on deck', 'complete'
- **ENDPOINT** : `https://127.0.0.1:8000/demo/team/<student_id>/`
- **Type** : PUT
- **Permissions** : Instructor
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
            "cohort": "Whiskey",
            "status": "on deck",
            "team": 1
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

# Cohort

## GET A LIST OF COHORTS
- NOTE: There should be only 1 record
- **ENDPOINT** : "https://127.0.0.1:8000/cohort/"
- **Type** : GET
- **Response** :
    - Success: HTTP 200
    ```json
        {
            "cohort_code": 1,
            "cohort_name": "Whiskey",
            "start_date": "2021-01-09",
            "end_date": "2021-05-10"
        }
    ```


# Team

## GET TEAMS
- **ENDPOINT** : 'https://127.0.0.1:8000/teams/'
- **TYPE**: GET 
- **RESPONSE**: 
    -SUCCESS HTTP 200 
    ```json 

    {
        "id": 1,
        "name": "Purple Cobras",
        "description": "Team 2"
    }

    ``` 

## GET TEAM Members 
- **ENDPOINT** : 'https://127.0.0.1:8000/teams/<int:team_id>/memberships/'
- **TYPE**: GET 
- **RESPONSE**: 
    -SUCCESS HTTP 200 
    ```json 
    {
        "team": 1,
        "user_email": "testuser@fakemail.com",
        "cohort_name": null,
        "first_name": "Test",
        "last_name": "User"
    }

    Returns all members of Team based on Team ID

    ``` 
## CREATE TEAM 
- **ENDPOINT**: https://127.0.0.1:8000/teams/create/
- **TYPE** POST
- - **RESPONSE**: 
    -SUCCESS HTTP 200 
    ```json 
    {
        "id": 1,
        "name": "Purple Cobras",
        "description": "Description of the Team",
        "cohort": 1
       
    }

    Allows instructors to create Teams


## Add Member to Team
- **ENDPOINT**: https://127.0.0.1:8000/teams/add/<int:user_id>/<int:team_id>/
- **TYPE** POST
- - **RESPONSE**: 
    -SUCCESS HTTP 200 
    ```json 
    
      {
            "id": 12,
            "team": 1,
            "user": 3,
            "user_email": "",
            "cohort_name": null,
            "first_name": "",
            "last_name": "",
            "role": "Member"
    }
    

    Allows instructors to add students to a particular team

## Modify Team Memberships
- **ENDPOINT**: https://127.0.0.1:8000/teams/memberships/modify/<int:team_id>/
- **TYPE** POST, PUT, DELETE
- - **RESPONSE**: 
    -SUCCESS HTTP 200 
    ```json 
    
      {
            "id": 12,
            "team": 1,
            "user": 3,
            "user_email": "",
            "cohort_name": null,
            "first_name": "",
            "last_name": "",
            "role": "Member"
    }
    

    Allows instructors to change information related to particular student's team membership, update, or delete


# Attendance

## CREATE OR UPDATE USERS ATTENDANCE 
- **ENDPOINT** : `https://127.0.0.1:8000/accountability/record/`
- **Type** : POST
- **Body** :
    ```json
        {
        "accountability_date": "2024-05-02",
        "accountability_status": 2,
        "pair_status": true,
        "absence_reason": "Dog Ate Homework",
        "excused_status": false,
        }
    ```
- **Response** :
    - Success: 200
    ```json
        {
        "id": 220,
        "cohort": "Whiskey",
        "accountability_date": "2024-05-02",
        "accountability_status": 2,
        "pair_status": true,
        "absence_reason": "Dog Ate Homework",
        "excused_status": false,
        "first_name": "Jane",
        "last_name": "Doe",
        "user": 3
        }
    ```


## LIST ATTENDANCE FOR GIVEN COHORT (ALL INSTRUCTOR) 
- **ENDPOINT** : `https://127.0.0.1:8000/accountability/retrieve/?cohort_name=Whiskey`
- **Query Paramater**: cohort_name
- **Type** : GET
{
  "accountability_status": 2,
  "pair_status": true,
  "absence_reason": "Wel",
  "excused_status": true
}
- **Response** :
    - Success: 200
    ```json
        [
  {
    "id": 221,
    "cohort": "Whiskey",
    "accountability_date": "2024-05-02",
    "accountability_status": 0,
    "pair_status": false,
    "absence_reason": "",
    "excused_status": false,
    "first_name": "Carr",
    "last_name": "Landon",
    "user": 4
  },
  {
    "id": 222,
    "cohort": "Whiskey",
    "accountability_date": "2024-05-02",
    "accountability_status": 0,
    "pair_status": false,
    "absence_reason": "",
    "excused_status": false,
    "first_name": "Carr",
    "last_name": "Jane",
    "user": 5
  },
  {
    "id": 223,
    "cohort": "Whiskey",
    "accountability_date": "2024-05-02",
    "accountability_status": 0,
    "pair_status": false,
    "absence_reason": "",
    "excused_status": false,
    "first_name": "Carr",
    "last_name": "Jane",
    "user": 6
  },
  {
    "id": 224,
    "cohort": "Whiskey",
    "accountability_date": "2024-05-02",
    "accountability_status": 0,
    "pair_status": false,
    "absence_reason": "",
    "excused_status": false,
    "first_name": "Carr",
    "last_name": "Jane",
    "user": 7
  },
  {
    "id": 225,
    "cohort": "Whiskey",
    "accountability_date": "2024-05-02",
    "accountability_status": 0,
    "pair_status": false,
    "absence_reason": "",
    "excused_status": false,
    "first_name": "Carr",
    "last_name": "Jane",
    "user": 8
  },
  {
    "id": 226,
    "cohort": "Whiskey",
    "accountability_date": "2024-05-02",
    "accountability_status": 0,
    "pair_status": false,
    "absence_reason": "",
    "excused_status": false,
    "first_name": "",
    "last_name": "Jane",
    "user": 9
  }
        ]
    ```


## REWRITE  ATTENDANCE (ALL INSTRUCTOR) 
- **ENDPOINT** : `https://127.0.0.1:8000/accountability/alter/220/`
- **Query Paramater**: Pass Id of Attendance
- **Type** : PATCH
- **Body** :

    ```json
        {
        "accountability_status": 2,
        "pair_status": true,
        "absence_reason": "Wel",
        "excused_status": true
        }
    ```
- **Response** :
    - Success: 200
    ```json
        {
  "id": 220,
  "accountability_date": "2024-05-02",
  "accountability_status": 2,
  "pair_status": true,
  "absence_reason": "Wel",
  "excused_status": true,
  "first_name": "Jane",
  "last_name": "Doe",
  "user": 3,
  "cohort": 1
        }
    ```
## GET ATTENDANCE RECORDS FOR A GIVEN COHORT AND DATE
- **ENDPOINT** : `https://127.0.0.1:8000/accountability/retrieve-filtered/?cohort_name=Whiskey&accountability_date=2024-05-06`
- **Query Paramater**: cohort_name,accountability_date
- **Type** : GET
- **Permissions** : Instructor
- **Response** :
    - Success: 200
    ```json
        [
    {
        "id": 251,
        "cohort": "Whiskey",
        "accountability_date": "2024-05-06",
        "accountability_status": 0,
        "pair_status": false,
        "absence_reason": "",
        "excused_status": false,
        "first_name": "Carr",
        "last_name": "Landon",
        "user": 4
    },
    {
        "id": 252,
        "cohort": "Whiskey",
        "accountability_date": "2024-05-06",
        "accountability_status": 0,
        "pair_status": false,
        "absence_reason": "",
        "excused_status": false,
        "first_name": "Carr",
        "last_name": "Jane",
        "user": 5
    },
    {
        "id": 253,
        "cohort": "Whiskey",
        "accountability_date": "2024-05-06",
        "accountability_status": 0,
        "pair_status": false,
        "absence_reason": "",
        "excused_status": false,
        "first_name": "Carr",
        "last_name": "Jane",
        "user": 6
    },
    {
        "id": 254,
        "cohort": "Whiskey",
        "accountability_date": "2024-05-06",
        "accountability_status": 0,
        "pair_status": false,
        "absence_reason": "",
        "excused_status": false,
        "first_name": "Carr",
        "last_name": "Jane",
        "user": 7
    },
    {
        "id": 255,
        "cohort": "Whiskey",
        "accountability_date": "2024-05-06",
        "accountability_status": 0,
        "pair_status": false,
        "absence_reason": "",
        "excused_status": false,
        "first_name": "Carr",
        "last_name": "Jane",
        "user": 8
    },
    {
        "id": 256,
        "cohort": "Whiskey",
        "accountability_date": "2024-05-06",
        "accountability_status": 0,
        "pair_status": false,
        "absence_reason": "",
        "excused_status": false,
        "first_name": "",
        "last_name": "Jane",
        "user": 9
    },
    {
        "id": 250,
        "cohort": "Whiskey",
        "accountability_date": "2024-05-06",
        "accountability_status": 1,
        "pair_status": false,
        "absence_reason": "",
        "excused_status": false,
        "first_name": "Jane",
        "last_name": "Doe",
        "user": 3
    }
    ]
    ```

## (INSTRUCTOR- GET ALL USERS CONTACT INFO)
- NOTE: Valid options: 'to do', 'on deck', 'complete'
- **ENDPOINT** : `https://127.0.0.1:8000/user/user-all/`
- **Type** : GET
- **Permissions** : Instructor

- **Response** :
    - Success: HTTP 200
    ```json
        [
    {
        "userdetail": null,
        "profile": null,
        "first_name": "",
        "last_name": "",
        "email": "landon.c.carr@gmail.com",
        "id": 1,
        "groups": [],
        "last_login": "2024-04-26T18:01:36.230918Z"
    },
    {
        "userdetail": {
        "phone_number": "1111111111",
        "user": 12,
        "slack_handle": null,
        "github_handle": null
        },
        "profile": {
        "cohort_name": "XRay",
        "user": 12
        },
        "first_name": "Emma",
        "last_name": "Ralph",
        "email": "dev-account-17@platoon-console.com",
        "id": 12,
        "groups": [
        "Students"
        ],
        "last_login": null
    },
    {
        "userdetail": null,
        "profile": null,
        "first_name": "",
        "last_name": "",
        "email": "",
        "id": 13,
        "groups": [],
        "last_login": null
    },
    {
        "userdetail": {
        "phone_number": "9517968963",
        "user": 4,
        "slack_handle": null,
        "github_handle": null
        },
        "profile": {
        "cohort_name": "Whiskey",
        "user": 4
        },
        "first_name": "Carr",
        "last_name": "Landon",
        "email": "1@gmail.com",
        "id": 4,
        "groups": [
        "Students"
        ],
        "last_login": null
    },
    {
        "userdetail": {
        "phone_number": "1111111111",
        "user": 5,
        "slack_handle": null,
        "github_handle": null
        },
        "profile": {
        "cohort_name": "Whiskey",
        "user": 5
        },
        "first_name": "Carr",
        "last_name": "Jane",
        "email": "1@devcodeplatoonconsole.com",
        "id": 5,
        "groups": [
        "Students"
        ],
        "last_login": null
    },
    {
        "userdetail": {
        "phone_number": "1111111111",
        "user": 6,
        "slack_handle": null,
        "github_handle": null
        },
        "profile": {
        "cohort_name": "Whiskey",
        "user": 6
        },
        "first_name": "Carr",
        "last_name": "Jane",
        "email": "2@devcodeplatoonconsole.com",
        "id": 6,
        "groups": [
        "Students"
        ],
        "last_login": null
    },
    {
        "userdetail": {
        "phone_number": "1111111111",
        "user": 7,
        "slack_handle": null,
        "github_handle": null
        },
        "profile": {
        "cohort_name": "Whiskey",
        "user": 7
        },
        "first_name": "Carr",
        "last_name": "Jane",
        "email": "3@devcodeplatoonconsole.com",
        "id": 7,
        "groups": [
        "Students"
        ],
        "last_login": null
    },
    {
        "userdetail": {
        "phone_number": "1111111111",
        "user": 8,
        "slack_handle": null,
        "github_handle": null
        },
        "profile": {
        "cohort_name": "Whiskey",
        "user": 8
        },
        "first_name": "Carr",
        "last_name": "Jane",
        "email": "4@devcodeplatoonconsole.com",
        "id": 8,
        "groups": [
        "Students"
        ],
        "last_login": null
    },
    {
        "userdetail": {
        "phone_number": "1111111111",
        "user": 9,
        "slack_handle": null,
        "github_handle": null
        },
        "profile": {
        "cohort_name": "Whiskey",
        "user": 9
        },
        "first_name": "",
        "last_name": "Jane",
        "email": "dev-account-1-@platoon-console.com",
        "id": 9,
        "groups": [
        "Students"
        ],
        "last_login": null
    },
    {
        "userdetail": {
        "phone_number": "1111111111",
        "user": 10,
        "slack_handle": null,
        "github_handle": null
        },
        "profile": {
        "cohort_name": "XRay",
        "user": 10
        },
        "first_name": "Doe",
        "last_name": "Jane",
        "email": "dev-account-15@platoon-console.com",
        "id": 10,
        "groups": [
        "Students"
        ],
        "last_login": null
    },
    {
        "userdetail": {
        "phone_number": "1111111111",
        "user": 11,
        "slack_handle": null,
        "github_handle": null
        },
        "profile": {
        "cohort_name": "XRay",
        "user": 11
        },
        "first_name": "Johnson",
        "last_name": "Ralph",
        "email": "dev-account-16@platoon-console.com",
        "id": 11,
        "groups": [
        "Students"
        ],
        "last_login": null
    },
    {
        "userdetail": {
        "phone_number": "951653911",
        "user": 3,
        "slack_handle": "Blackmagk",
        "github_handle": "test"
        },
        "profile": {
        "cohort_name": "Whiskey",
        "user": 3
        },
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "angelfan5741@gmail.com",
        "id": 3,
        "groups": [
        "Students"
        ],
        "last_login": "2024-05-03T20:48:11.612929Z"
    },
    {
        "userdetail": null,
        "profile": null,
        "first_name": "",
        "last_name": "",
        "email": "ImaTeacher@platoon-console.com",
        "id": 14,
        "groups": [
        "Instructors"
        ],
        "last_login": null
    }
    ]
    ```    
## CREATE/READ/UPDATE USER DETAILS - 
- **ENDPOINT** : `https://127.0.0.1:8000/user/user-details/`

- **Type** : GET,POST, PUT, PATCH
- **Permissions** : Student

- **Body** :

    ```json
         {
  "phone_number": "951653911",
  "user": 3,
  "slack_handle": "Blackmagk",
  "github_handle": "test"
    }
    ```
- **Response** :
    - Success: 200,201
    ```json
   {
  "phone_number": "951653911",
  "user": 3,
  "slack_handle": "Blackmagk",
  "github_handle": "test"
    }
    ```
