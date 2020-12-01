import moment from 'moment';

const validate = values => {
    const errors = {};    
    if (!values.emailId) {
      errors.emailId = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailId)) {
      errors.emailId = 'Invalid email address';
    }
    if (!values.re_email) {
        errors.re_email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.re_email)) {
        errors.re_email = 'Invalid email address';
      }      
    if (!values.portOfEntry) {
        errors.portOfEntry = 'Required';
    }
    if (!values.passportNumber) {
      errors.passportNumber = 'Required';
    }
    if (!values.favoriteColor) {
      errors.favoriteColor = 'Required';
    }
    if (!values.firstName) {
        errors.firstName = 'Required';
      }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    if (!values.dateOfBirth) {
      errors.dateOfBirth = 'Required';
    }else if(moment().diff(moment(values.dateOfBirth, 'YYYY-MM-DD'), 'years') < 18){
      errors.dateOfBirth = 'must be greater than age 18 years';
    }
    if (!values.placeOfBirth) {
      errors.placeOfBirth = 'Required';
    }
    if (!values.fatherName) {
      errors.fatherName = 'Required';
    }
    if (!values.religion) {
      errors.religion = 'Required';
    }
    if (!values.race) {
      errors.race = 'Required';
    }
    if (!values.occupation) {
      errors.occupation = 'Required';
    }
    if (!values.permanentAddress) {
      errors.permanentAddress = 'Required';
    }
    if (!values.passportCopyFilename) {
      errors.passportCopyFilename = 'Required';
    }
    if (!values.passportSizePhotoFilename) {
      errors.passportSizePhotoFilename = 'Required';
    }
    if (!values.portOfEntry) {
      errors.portOfEntry = 'Required';
    }
    if (!values.passportNumber) {
      errors.passportNumber = 'Required';
    }
    if (!values.dateOfIssue) {
      errors.dateOfIssue = 'Required';
    }
    if (!values.placeOfIssue) {
      errors.placeOfIssue = 'Required';
    }
    if (!values.dateOfExpiry) {
      errors.dateOfExpiry = 'Required';
    }
    if (!values.issueAuthority) {
      errors.issueAuthority = 'Required';
    }
    if (!values.addressInMyanmar) {
      errors.addressInMyanmar = 'Required';
    }
    if (!values.travelPlan) {
      errors.travelPlan = 'Required';
    }
    if (!values.purposeOfEntry) {
      errors.purposeOfEntry = 'Required';
    }
    if (!values.arrivalDate) {
      errors.arrivalDate = 'Required';
    }
    if (!values.arrivalFlight) {
      errors.arrivalFlight = 'Required';
    }
    if (!values.departureDate) {
      errors.departureDate = 'Required';
    }
    if (!values.departureFlight) {
      errors.departureFlight = 'Required';
    }
    return errors;
  };
  
  export default validate;
  