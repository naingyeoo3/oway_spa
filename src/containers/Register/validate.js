const validate = values => {
    const errors = {};
    if(!values.email){
      if (!values.phoneCode) {
        errors.phoneCode = 'Required';
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = 'Required';
      }      
    }else{
      if (!values.email) {
        errors.email = 'Required';
      }  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
    }            
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else if(values.password != values.confirmPassword) {
      errors.confirmPassword = 'should be same password';
    }
    return errors;
  };
  
  export default validate;
  