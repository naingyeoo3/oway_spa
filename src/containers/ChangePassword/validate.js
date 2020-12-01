const validate = values => {
    const errors = {};
    if (!values.newPassword) {
      errors.newPassword = 'Required';
    }
    if (!values.confirmNewPassword) {
      errors.confirmNewPassword = 'Required';
    }
    if (values.newPassword != values.confirmNewPassword) {
        errors.confirmNewPassword = 'should be same new password';
      }
    return errors;
  };
  
  export default validate;