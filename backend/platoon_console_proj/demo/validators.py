from django.core.exceptions import ValidationError

def validate_status(status):
    error_message = "Value must be 'to do', 'on deck', or 'complete'."

    valid_status = [
        'to do',
        'on deck',
        'complete'
    ]

    if status in valid_status:
        return status
    
    raise ValidationError(error_message, params={'Current Value':status})